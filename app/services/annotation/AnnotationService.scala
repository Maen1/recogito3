package services.annotation

import com.sksamuel.elastic4s.ElasticDsl._
import java.util.UUID
import javax.inject.{Inject, Singleton}
import services.entity.{EntityService, IndexedEntity}
import org.joda.time.DateTime
import play.api.Logger
import scala.concurrent.{ExecutionContext, Future}
import storage.ES

@Singleton
class AnnotationService @Inject() (
  entityService: EntityService,
  implicit val ctx: ExecutionContext,
  implicit val es: ES
) extends HasAnnotationIndexing with AnnotationHistoryService {

  /** Upserts an annotation.
    *  
    * Automatically deals with version history.
    *
    * @return a boolean flag indicating successful completion, the internal ElasticSearch
    * version, and the previous version of the annotation, if any.
    */
  def insertOrUpdateAnnotation(annotation: Annotation, versioned: Boolean = true): Future[(Boolean, Option[Annotation])] = {

    val fResolveEntityReferences = {
      val entityURIs = annotation.bodies.flatMap(_.uri)
      val fResolved = Future.sequence(entityURIs.map(entityService.findByURI(_)))
      for {
        resolved <- fResolved
      } yield resolved.flatten
    }
    
    def addUnionIds(annotation: Annotation, resolvedIndexed: Seq[IndexedEntity]) = {
      val resolved = resolvedIndexed.map(_.entity)
      annotation.copy(bodies = annotation.bodies.map { body =>
        val referencedEntity = body.uri.flatMap(uri => resolved.find(_.uris.contains(uri)))
        referencedEntity match {
          case None => body // No referenced entity, just return original body
          case Some(e) =>
            body.copy(reference = body.reference.map(_.copy(unionId = Some(e.unionId))))
        }
      })
    }
    
    def upsertAnnotation(a: Annotation): Future[Boolean] =
      es.client execute {
        update(a.annotationId.toString) in ES.RECOGITO / ES.ANNOTATION docAsUpsert a
      } map { _ => true
      } recover { case t: Throwable =>
        Logger.error(s"Error indexing annotation ${annotation.annotationId}: ${t.getMessage}")
        t.printStackTrace
        false
      }
      
    for {
      resolvedEntities <- fResolveEntityReferences
      maybePrevious <- findById(annotation.annotationId)
      stored <- upsertAnnotation(addUnionIds(annotation, resolvedEntities))
      storedToHistory <- if (stored) insertVersion(annotation)
                         else Future.successful(false)
    } yield (storedToHistory, maybePrevious.map(_._1))

  }

  def insertOrUpdateAnnotations(annotations: Seq[Annotation], retries: Int = ES.MAX_RETRIES): Future[Seq[Annotation]] =
    annotations.foldLeft(Future.successful(Seq.empty[Annotation])) { case (future, annotation) =>
      future.flatMap { failedAnnotations =>
        insertOrUpdateAnnotation(annotation).map { case (success, _) =>
          if (success) failedAnnotations else failedAnnotations :+ annotation
        }
      }
    } flatMap { failed =>
      if (failed.size > 0 && retries > 0) {
        Logger.warn(failed.size + " annotations failed to import - retrying")
        insertOrUpdateAnnotations(failed, retries - 1)
      } else {
        Logger.info("Successfully imported " + (annotations.size - failed.size) + " annotations")
        if (failed.size > 0)
          Logger.error(failed.size + " annotations failed without recovery")
        else
          Logger.info("No failed imports")
        Future.successful(failed)
      }
    }

  def findById(annotationId: UUID): Future[Option[(Annotation, Long)]] =
    es.client execute {
      get(annotationId.toString) from ES.RECOGITO / ES.ANNOTATION
    } map { response =>
      if (response.exists)
        Some(response.to[(Annotation, Long)])
      else
        None
    }
    
  private def deleteById(annotationId: String): Future[Boolean] =
    es.client execute {
      delete(annotationId.toString) from ES.RECOGITO / ES.ANNOTATION
    } map { _ =>
      true
    } recover { case t: Throwable =>
      t.printStackTrace()
      false
    }

  /** Deletes the annotation with the given ID **/
  def deleteAnnotation(annotationId: UUID, deletedBy: String, deletedAt: DateTime): Future[Option[Annotation]] =
    findById(annotationId).flatMap(_ match {
      case Some((annotation, _)) =>
        val f = for {
          markerInserted <- insertDeleteMarker(annotation, deletedBy, deletedAt)
          if (markerInserted)
            deleted <- deleteById(annotationId.toString)
        } yield deleted

        f.map { success =>
          if (!success) throw new Exception("Error deleting annotation")
          Some(annotation)
        } recover { case t: Throwable =>
          t.printStackTrace()
          None 
        }

      case None => Future.successful(None)
    })

  def countTotal(): Future[Long] =
    es.client execute {
      search(ES.RECOGITO / ES.ANNOTATION) limit 0
    } map { _.totalHits }

  def countByDocId(id: String): Future[Long] =
    es.client execute {
      search(ES.RECOGITO / ES.ANNOTATION) query {
        termQuery("annotates.document_id" -> id)
      } limit 0
    } map { _.totalHits }

  def findByDocId(id: String, offset: Int = 0, limit: Int = ES.MAX_SIZE): Future[Seq[(Annotation, Long)]] =
    es.client execute {
      search(ES.RECOGITO / ES.ANNOTATION) query {
        termQuery("annotates.document_id" -> id)
      } start offset limit limit
    } map(_.to[(Annotation, Long)].toSeq)

  /** Deletes all annotations & version history on a given document **/
  def deleteByDocId(docId: String): Future[Boolean] = {
    val deleteAnnotations = findByDocId(docId).flatMap { annotationsAndVersions =>
      if (annotationsAndVersions.size > 0) {
        es.client.java.prepareBulk()
        es.client execute {
          bulk ( annotationsAndVersions.map { case (annotation, _) => delete(annotation.annotationId.toString) from ES.RECOGITO / ES.ANNOTATION } )
        } map { response =>
          if (response.hasFailures)
            Logger.error("Failures while deleting annotations: " + response.failureMessage)
          !response.hasFailures
        } recover { case t: Throwable =>
          t.printStackTrace()
          false
        }
      } else {
        // Nothing to delete
        Future.successful(true)
      }
    }

    val deleteVersions = deleteHistoryRecordsByDocId(docId)

    for {
      s1 <- deleteAnnotations
      s2 <- deleteVersions
    } yield (s1 && s2)
  }

  /** Retrieves all annotations on a given filepart **/
  def findByFilepartId(id: UUID, limit: Int = ES.MAX_SIZE): Future[Seq[(Annotation, Long)]] =
    es.client execute {
      search(ES.RECOGITO / ES.ANNOTATION) query {
        termQuery("annotates.filepart_id" -> id.toString)
      } limit limit
    } map(_.to[(Annotation, Long)].toSeq)

  /** Retrieves annotations on a document last updated after a given timestamp **/
  def findModifiedAfter(documentId: String, after: DateTime): Future[Seq[Annotation]] =
    es.client execute {
      search(ES.RECOGITO / ES.ANNOTATION) query {
        boolQuery
          must (
            termQuery("annotates.document_id" -> documentId)
          ) filter (
            rangeQuery("last_modified_at").gt(formatDate(after))
          )
      } limit ES.MAX_SIZE
    } map { _.to[(Annotation, Long)].toSeq.map(_._1) }

  /** Rolls back the document to the state at the given timestamp **/
  def rollbackToTimestamp(documentId: String, timestamp: DateTime): Future[Boolean] = {

    // Rolls back one annotation, i.e. updates to the latest state recorded in the history or deletes
    def rollbackOne(annotationId: String): Future[Boolean] = {
      getAnnotationStateAt(annotationId, timestamp).flatMap(_ match {
        case Some(historyRecord) =>
          if (historyRecord.deleted)
            // The annotation was already deleted at the rollback state - do nothing
            Future.successful(true)
          else
            insertOrUpdateAnnotation(historyRecord.asAnnotation, false).map(_._1)

        case None =>
          // The annotation did not exist at the rollback time - delete
          deleteById(annotationId)
      }).recover { case t: Throwable =>
        t.printStackTrace()
        Logger.warn("Rollback failed for " + annotationId)
        false
      }
    }

    // Rolls back a list of annotations, i.e. updates to latest state recorded in the history or deletes
    def rollbackAnnotations(annotations: Seq[String]): Future[Seq[String]] =
      annotations.foldLeft(Future.successful(Seq.empty[String])) { case (future, annotationId) =>
        future.flatMap { failedAnnotationIds =>
          rollbackOne(annotationId).map { success =>
            if (success) failedAnnotationIds else failedAnnotationIds :+ annotationId
          }
        }
      }

    val failedRollbacks = getChangedAfter(documentId, timestamp).flatMap(rollbackAnnotations)
    failedRollbacks.flatMap { failed =>
      if (failed.size == 0) {
        deleteHistoryRecordsAfter(documentId, timestamp)
      } else {
        Logger.warn(failed.size + " failed rollbacks")

        // TODO what would be a good recovery strategy?

        Future.successful(false)
      }
    }
  }

  /** Sorts the given list of document IDs by the number of annotations on the documents **/
  def sortDocsByAnnotationCount(docIds: Seq[String], sortOrder: services.SortOrder, offset: Int, limit: Int) = {

    import scala.collection.JavaConverters._

    val numberOfBuckets =
      if (sortOrder == services.SortOrder.ASC)
        offset + limit
      else
        docIds.size

    es.client execute {
      search(ES.RECOGITO / ES.ANNOTATION) query {
        boolQuery
          should {
            docIds.map(id => termQuery("annotates.document_id" -> id))
          }
      } aggs {
        termsAggregation("by_document") field "annotates.document_id"
      } size numberOfBuckets limit 0
    } map { response =>
      val byDocument = response.aggregations.termsResult("by_document")
      val annotatedDocs = byDocument.getBuckets.asScala.map(_.getKeyAsString).toSeq
      val unannotatedDocs = (docIds diff annotatedDocs)
      val docs =
        if (sortOrder == services.SortOrder.ASC)
          (annotatedDocs ++ unannotatedDocs)
        else
          (annotatedDocs ++ unannotatedDocs).reverse

      docs.drop(offset).take(limit)
    }
  }

}
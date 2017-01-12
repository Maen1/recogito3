package controllers.document.downloads

import akka.util.ByteString
import akka.stream.scaladsl.Source
import controllers.{ BaseOptAuthController, WebJarAssets }
import controllers.document.downloads.serializers._
import javax.inject.Inject
import jp.t2v.lab.play2.stackc.RequestWithAttributes
import models.annotation.AnnotationService
import models.document.{ DocumentInfo, DocumentService }
import models.place.PlaceService
import models.user.UserService
import org.apache.jena.riot.RDFFormat
import play.api.Configuration
import play.api.libs.json.Json
import play.api.libs.iteratee.Enumerator
import play.api.mvc.{ AnyContent, Result }
import play.api.http.HttpEntity
import play.api.libs.streams.Streams
import scala.concurrent.{ ExecutionContext, Future }
import storage.Uploads

class DownloadsController @Inject() (
    val config: Configuration,
    val users: UserService,
    implicit val uploads: Uploads,
    implicit val annotations: AnnotationService,
    implicit val documents: DocumentService,
    implicit val places: PlaceService,
    implicit val webjars: WebJarAssets,
    implicit val ctx: ExecutionContext
  ) extends BaseOptAuthController(config, documents, users)
      with CSVSerializer
      with GeoJSONSerializer
      with RDFSerializer
      with TEISerializer {
  
  private def download(documentId: String, export: DocumentInfo => Future[Result])(implicit request: RequestWithAttributes[AnyContent]) = {
    val maybeUser = loggedIn.map(_.user)
    documentReadResponse(documentId, maybeUser, { case (docInfo, _) => // Used just for the access permission check
      export(docInfo)
    })
  }

  def showDownloadOptions(documentId: String) = AsyncStack { implicit request =>
    val maybeUser = loggedIn.map(_.user)
    documentReadResponse(documentId, maybeUser, { case (doc, accesslevel) =>
      annotations.countByDocId(documentId).map { documentAnnotationCount =>
        Ok(views.html.document.downloads.index(doc, maybeUser, accesslevel, documentAnnotationCount))
      }
    })
  }

  /** Exports either 'plain' annotation CSV, or merges annotations with original DATA_* uploads, if any **/
  def downloadCSV(documentId: String, exportTables: Boolean) = AsyncStack { implicit request =>
    if (exportTables) {
      download(documentId, { doc =>
        exportMergedTables(doc).map { case (file, filename) =>
          Ok.sendFile(file).withHeaders(CONTENT_DISPOSITION -> { "attachment; filename=" + filename })
        }
      })
    } else {
      download(documentId, { doc =>
        annotationsToCSV(documentId).map { csv =>
          Ok.sendFile(csv).withHeaders(CONTENT_DISPOSITION -> { "attachment; filename=" + documentId + ".csv" })
        } 
      })
    }
  }
  
  private def downloadRDF(documentId: String, format: RDFFormat, extension: String) = AsyncStack { implicit request =>
    download(documentId, { doc =>
      documentToRDF(doc, format).map { file => 
        Ok.sendFile(file).withHeaders(CONTENT_DISPOSITION -> { "attachment; filename=" + documentId + "." + extension })
      }
    })
  }
  
  def downloadTTL(documentId: String) = downloadRDF(documentId, RDFFormat.TTL, "ttl") 
  def downloadRDFXML(documentId: String) = downloadRDF(documentId, RDFFormat.RDFXML, "rdf.xml") 
  def downloadJSONLD(documentId: String) = downloadRDF(documentId, RDFFormat.JSONLD_PRETTY, "jsonld") 

  def downloadGeoJSON(documentId: String) = AsyncStack { implicit request =>
    download(documentId, { doc =>
      placesToGeoJSON(documentId).map { featureCollection =>
        Ok(Json.prettyPrint(Json.toJson(featureCollection)))
          .withHeaders(CONTENT_DISPOSITION -> { "attachment; filename=" + documentId + ".json" })
      }
    })    
  }
  
  def downloadTEI(documentId: String) = AsyncStack { implicit request =>
    download(documentId, { doc =>
      documentToTEI(doc).map(xml => Ok(xml))
    })
  }

}

define([
  'common/utils/annotationUtils',
  'document/map/style/palette',
], function(AnnotationUtils, Palette) {

  var ByTagRule = function(annotationView) {

        // To work anround the otherwise circular dependency
    var MapStyle = require('document/map/style/mapStyle'),

        self = this,

        /** tag -> color lookup table **/
        legend = {},

        initLegend = function() {
          var numColors = Palette.CATEGORY_SCALE.length,
              tags = annotationView.listUniqueTags();

          tags.forEach(function(tag, idx) {
            var colIdx = idx % numColors;
            legend[tag] = Palette.CATEGORY_SCALE[colIdx];
          });
        },

        getTags = function(annotations) {
          var asSet = annotations.reduce(function(set, annotation) {
                if (set.size < 2) {
                  var tags = AnnotationUtils.getTags(annotation);
                  tags.forEach(function(t) { set.add(t); });
                }

                return set;
              }, new Set());

          return Array.from(asSet);
        },

        // TODO remove redundancy with getShapeStyle
        getPointStyle = function(place, annotations) {
          var tags = getTags(annotations);
          if (tags.length > 0) {
            return MapStyle.pointStyle(legend[tags[0]]);
          }
        },

        getShapeStyle = function(place, annotations) {
          var tags = getTags(annotations);
          if (tags.length > 0) {
            return MapStyle.shapeStyle(legend[tags[0]]);
          }
        };

    initLegend();

    this.getPointStyle = getPointStyle;
    this.getShapeStyle = getShapeStyle;
  };

  return ByTagRule;

});

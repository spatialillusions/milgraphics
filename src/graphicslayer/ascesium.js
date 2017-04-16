function asCesium() {
  var ratio = window.devicePixelRatio || 1;
  var entities = new Cesium.EntityCollection();

  for (var i = 0; i < this.data.features.length; i++) {
    var feature = this.data.features[i];

    if (feature.geometry.type == "Point") {
      console.info("point");
      var properties = feature.properties;
      if (properties.sidc.charAt(0) != "X") {
        //TODO handle sitaware custom graphics
        var milsymbol = feature.symbol;
        var ctx = milsymbol.asCanvas(ratio);
        var entity = {
          position: Cesium.Cartesian3.fromDegrees(
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1]
          ), //Cesium.Cartesian3.fromArray( feature.geometry.coordinates ),
          billboard: {
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, // default
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            image: ctx,
            imageSubRegion: new Cesium.BoundingRectangle(
              0,
              0,
              ctx.width + 2,
              ctx.height + 2
            ),
            height: milsymbol.getSize().height,
            width: milsymbol.getSize().width,
            pixelOffset: new Cesium.Cartesian2(
              -milsymbol.getAnchor().x,
              -milsymbol.getAnchor().y
            ) // default: (0, 0)
          }
        };
        entities.add(entity);
      }
    }

    if (
      feature.graphic.isConverted() &&
      (feature.geometry.type == "LineString" ||
        feature.geometry.type == "MultiLineString")
    ) {
      //console.log('line')
      var lineparts;
      if (feature.geometry.type == "LineString") {
        lineparts = [feature.geometry.coordinates]; // Make linestring to a sort of multiline
      } else {
        lineparts = feature.geometry.coordinates;
      }

      for (var key in lineparts) {
        var coordinates = lineparts[key];
        var positions = [];
        for (var c in coordinates) {
          positions.push(
            Cesium.Cartesian3.fromDegrees(
              coordinates[c][0],
              coordinates[c][1],
              coordinates[c][2]
            )
          );
        }

        entity = new Cesium.Entity({
          polyline: new Cesium.PolylineGraphics({
            positions: positions,
            material: Cesium.Color.BLACK,
            width: 1.5
          })
        });

        entities.add(entity);
      }
    }

    if (feature.graphic.isConverted() && feature.geometry.type == "Polygon") {
      coordinates = feature.geometry.coordinates[0];
      positions = [];
      for (c in coordinates) {
        positions.push(
          Cesium.Cartesian3.fromDegrees(
            coordinates[c][0],
            coordinates[c][1],
            coordinates[c][2]
          )
        );
      }

      /*var entity = new Cesium.Entity({
          polygon: new Cesium.PolygonGraphics({
            hierarchy: new Cesium.PolygonHierarchy(positions),
            fill: false,
            outline: true,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 3
          })
        });*/

      entity = new Cesium.Entity({
        polyline: new Cesium.PolylineGraphics({
          positions: positions,
          material: Cesium.Color.BLACK,
          width: 1.5
        })
      });

      entities.add(entity);
    }
  }

  return entities;
}

module.exports = asCesium;

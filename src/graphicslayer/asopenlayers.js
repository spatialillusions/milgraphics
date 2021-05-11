var GeoJSON = require('ol/format/GeoJSON');
var style = require('ol/style');

function asOpenLayers(crs) {
  crs = crs || "EPSG:3857";
  //var ua = window.navigator.userAgent;
  //var isIE = ( ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/')  > 0) ? true : false;
  var ratio = window.devicePixelRatio || 1;
  var features = [];
  for (var i = 0; i < this.data.features.length; i++) {
    var feature = this.data.features[i];
    var olFeature = GeoJSON.default.prototype.readFeature(feature, {
      dataProjection: 'EPSG:4326',
      featureProjection: crs
    });

    if (
      olFeature.getGeometry() &&
      olFeature.getGeometry().getType() == "Point"
    ) {
      var properties = olFeature.getProperties();
      if (properties.sidc.charAt(0) != "X") {
        //TODO handle sitaware custom graphics
        var milsymbol = this.data.features[i].symbol;
        //var image = isIE ? mysymbol.asCanvas() : mysymbol.toDataURL();
        olFeature.setStyle(
          new style.Style({
            image: new style.Icon({
              scale: 1 / ratio,
              anchor: [
                milsymbol.getAnchor().x * ratio,
                milsymbol.getAnchor().y * ratio
              ],
              anchorXUnits: "pixels",
              anchorYUnits: "pixels",
              imgSize: [
                Math.floor(milsymbol.getSize().width * ratio),
                Math.floor(milsymbol.getSize().height * ratio)
              ],
              img: milsymbol.asCanvas(ratio)
            })
          })
        );
      }
    }

    if (
      feature.graphic.isConverted() &&
      (olFeature.getGeometry().getType() == "LineString" ||
        olFeature.getGeometry().getType() == "MultiLineString")
    ) {
      var styles = [
        new style.Style({
          stroke: new style.Stroke({
            lineCap: "butt",
            color: "#000000",
            width: 2
          })
        })
      ];
      if (feature.graphic.annotations) {
        for(y=0;y<feature.graphic.annotations.length;y++){ 
          var labelgeom = GeoJSON.default.prototype.readFeature(feature.graphic.annotations[y].geometry,
            {
              dataProjection: 'EPSG:4326',
              featureProjection: crs
            }).getGeometry();
        styles.push(
          new style.Style({
            text: new style.Text({
              fill: new style.Fill({ color: "black" }),
              font: "bold 16px sans-serif",
              stroke: new style.Stroke({
                color: "rgb(239, 239, 239)", // off-white
                width: 4
              }),
              text: feature.graphic.annotations[y].properties.text
            }),
            geometry: labelgeom
          })
        );
     
      }
      olFeature.setStyle(styles);
    }
    }

    if (
      feature.graphic.isConverted() &&
      olFeature.getGeometry().getType() == "Polygon"
    ) {
      styles = new style.Style({
        stroke: new style.Stroke({
          lineCap: "butt",
          color: "#000000",
          width: 2
        }),
        fill: new style.Fill({ color: "rgba(0,0,0,0)" }),
        text: new style.Text({
          fill: new style.Fill({ color: "black" }),
          font: "bold 16px sans-serif",
          stroke: new style.Stroke({
            color: "rgb(239, 239, 239)", // off-white
            width: 4
          }),
          text: feature.graphic.annotations
            ? feature.graphic.annotations[0].properties.text
            : ""
        })
      });
      olFeature.setStyle(styles);
    }

    features.push(olFeature);
  }

  return features;
}

module.exports = asOpenLayers;

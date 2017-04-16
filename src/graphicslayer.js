var ms = require("milsymbol");

function GraphicsLayer(data) {
  this.data = data;
  for (var i = 0; i < this.data.features.length; i++) {
    var feature = this.data.features[i];

    feature.graphic = new ms.Graphic(feature);
    feature.geometry = feature.graphic.geometry;

    if (feature.geometry && feature.geometry.type == "Point") {
      var properties = feature.properties;
      properties.size = properties.size || 30; //TODO set default size value from setting
      if (properties.sidc.charAt(0) != "X") {
        //Skip SitaWare custom graphics for now
        feature.symbol = new ms.Symbol(properties);
      }
    }
  }
}

GraphicsLayer.prototype.asCesium = require("./graphicslayer/ascesium.js");

GraphicsLayer.prototype.asOpenLayers = require("./graphicslayer/asopenlayers.js");

module.exports = GraphicsLayer;

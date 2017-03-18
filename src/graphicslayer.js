//var ms = require('./ms.js');

function GraphicsLayer (data) {
  this.data = data;
  for (var i = 0; i< this.data.features.length; i++) {
    var feature = this.data.features[i];

/* TODO
Add code that figures out if a point should use a point symbol or is a circle...
*/

    if (feature.geometry.type == 'Point') {
      var properties = feature.properties;
      properties.size = properties.size || 30; //TODO set default size value from setting
      if (properties.sidc.charAt(0) != 'X') { //Skip SitaWare custom graphics for now
        feature.symbol = new ms.Symbol(properties);
      }
    }
    if (feature.geometry.type != 'Point') {
      feature.graphic = new ms.Graphic(feature);
      feature.geometry = feature.graphic.geometry;
    }
  }
};

GraphicsLayer.prototype.asOpenLayers = require('./graphicslayer/asopenlayers.js');

module.exports = GraphicsLayer;
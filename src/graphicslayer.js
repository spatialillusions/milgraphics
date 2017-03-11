//var ms = require('./ms.js');

function GraphicsLayer (data) {
  this.data = data;
  //console.log(data)
  for (var i = 0; i< this.data.features.length; i++) {
    var feature = this.data.features[i];

    if (feature.geometry.type == 'Point') {
      var properties = feature.properties;
      properties.size = properties.size || 30; //TODO set default size value from setting
      if (properties.SIDC.charAt(0) != 'X') { //Skip SitaWare custom graphics for now
        feature.symbol = new ms.Symbol('', properties);
      }
    }
    if (feature.geometry.type == 'MultiPoint') {
    //console.log('multipoint')
    console.log(feature.properties.SIDC)
      feature.graphic = new ms.Graphic(feature);
      //console.log('woo we got something special')
      feature.geometry = feature.graphic.geometry;
      //feature.geometry = feature.graphic.geometry;//quick override of geometry
/*      	var style = new ol.style.Style({
          stroke: new ol.style.Stroke({lineCap:'butt', color:'#000000', width: 2})
        });
        feature.setStyle(style);*/
    }
  }
};

GraphicsLayer.prototype.asOpenLayers = require('./graphicslayer/asopenlayers.js');

module.exports = GraphicsLayer;
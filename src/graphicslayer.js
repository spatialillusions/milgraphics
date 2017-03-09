//var ms = require('./ms.js');

function GraphicsLayer (data) {
  this.data = data;
};

GraphicsLayer.prototype.asOpenLayers = require('./graphicslayer/asopenlayers.js');

module.exports = GraphicsLayer;
var ms = require("milsymbol");
const toDistanceBearing = require("../geometry/todistancebearing");

module.exports = function (feature) {
  var annotations = [];
  var annotationText = feature.properties.name;
  var points = feature.geometry.coordinates;
  var distance = feature.properties.distance; //distance in meters
  var centerPoint = points;
  var topP = ms.geometry.toDistanceBearing(centerPoint, distance, 360);
  var bottP = ms.geometry.toDistanceBearing(centerPoint, distance, 180);
  var sym = new ms.Symbol("SFG-UCI----D");
  sym.setOptions({size:35});
  var canvasElement = sym.asCanvas();
  
  annotations.push(ms.geometry.addAnotation(centerPoint[0], "ACP 1"));
  annotations.push(ms.geometry.addAnotation(centerPoint[1], "CCP 1"));
  annotations.push(ms.geometry.addAnotation(centerPoint[2], "ACP 2"));
  
  var shape = ms.geometry.corridor(feature);
  
  
  return {
    geometry: shape.geometry,
    annotations: annotations
  };

};
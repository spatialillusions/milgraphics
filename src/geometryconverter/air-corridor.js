var ms = require("milsymbol");
const toDistanceBearing = require("../geometry/todistancebearing");

module.exports = function (feature) {
  var annotations = [];
  var points = feature.geometry.coordinates;
  var annotationText = feature.properties.name;
  var distance = feature.properties.distance; //distance in meters

  var centerPoint = points;
  var topP = ms.geometry.toDistanceBearing(centerPoint, distance, 360);
  var bottP = ms.geometry.toDistanceBearing(centerPoint, distance, 180);
   
  annotations.push(ms.geometry.addAnotation(centerPoint[0], "1"));
  annotations.push(ms.geometry.addAnotation(centerPoint[1], "2"));

  console.log(topP, bottP);  
  var shape = ms.geometry.corridor(feature);

  return {
    geometry: shape.geometry,
    annotations: annotations
  };

};
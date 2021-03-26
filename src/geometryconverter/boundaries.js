var ms = require("milsymbol");
var annotations = [{},{},{}];
//Converting lines to dashed lines
//const convertToDashes = require("../geometry/converttodashes");


function boundaries(feature) {
  //var direction, width;
  var points = feature.geometry.coordinates;

  var geometry = {type: "MultiLineString"};
  geometry.coordinates = [];
  var geometry1 = [];

  for (var i = 0; i < points.length; i += 1) {
    // measure distance between each two points
    distance = ms.geometry.distanceBetween(points[i], points[i])

    // Making each segment straight
    geometry1 = flotify(geometry1, points[i], points[i], 0, 0)
    addAnotation(i,points[i], "Point");
  }
  geometry.coordinates = [geometry1];

  //console.log(annotations);

  //Converting lines to dashed lines
  //geometry.coordinates = convertToDashes(geometry1, 1 / 64);
  
  return {geometry: geometry, annotations: annotations};
}

function flotify(geo, pointa, pointb, degree = 0) {

  if (degree <= 0) {
    geo.push(pointa, pointb)
    return geo;
  }

  const width = ms.geometry.distanceBetween(pointa, pointb);
  const midpoint = ms.geometry.pointBetween(pointa, pointb, 0.5);

}

function addAnotation(annotationNumber, annotationPoint, annotationText){
  
  annotations[annotationNumber].geometry = {type: "Point"};
  annotations[annotationNumber].properties = {};
  annotations[annotationNumber].geometry.coordinates = annotationPoint;
  annotations[annotationNumber].properties.text = annotationText;
}
module.exports = boundaries;


var ms = require("milsymbol");
var annotations = [{},{},{}];


function phaseLine(feature) {
  //var direction, width;
  var points = feature.geometry.coordinates;

  var geometry = {type: "MultiLineString"};
  geometry.coordinates = [];
  var geometry1 = [];

  for (var i = 1; i < points.length; i += 1) {
    // measure distance between each two points
    distance = ms.geometry.distanceBetween(points[i - 1], points[i])

    // Making each segment straight
    geometry1 = laundery(geometry1, points[i - 1], points[i], 0, 0)

  }
  geometry.coordinates = [geometry1];
    
addAnotation(0,points[0],"(PL NAME)");
addAnotation(1,points[4],"(SOMETHING)");
addAnotation(2,points[7],"(PL NAME)");

  console.log(annotations);

  return {geometry: geometry, annotations: annotations};
}

function laundery(geo, pointa, pointb, degree = 0) {

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
module.exports = phaseLine;


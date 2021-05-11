var ms = require("milsymbol");

function phaseLine(feature) {
  //var direction, width;
  var points = feature.geometry.coordinates;
  var annotations = [];
  var geometry = { type: "MultiLineString" };
  var geometry1 = [];
  for (var i = 1; i < points.length; i += 1) {
    // measure distance between each two points
    distance = ms.geometry.distanceBetween(points[i - 1], points[i])

    // Making each segment straight
    geometry1 = laundery(geometry1, points[i - 1], points[i], 0, 0)
  }
  geometry.coordinates = [geometry1];
    
  annotations.push(ms.geometry.addAnotation(points[0],"(PL NAME)"));
  annotations.push(ms.geometry.addAnotation(points[4],"(SOMETHING)"));
  annotations.push(ms.geometry.addAnotation(points[7],"(PL NAME)"));

  return {geometry: geometry, annotations: annotations};
}

function laundery(geo, pointa, pointb, degree = 0) {
  if (degree <= 0) {
    geo.push(pointa, pointb)
    return geo;
  }
}

module.exports = phaseLine;


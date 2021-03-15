var ms = require("milsymbol");

function lateralBoundary(feature) {
  //var direction, width;
  var annotations = [{},{},{}];
  var points = feature.geometry.coordinates;

  var geometry = {type: "MultiLineString"};
  geometry.coordinates = [];

  // Geometry 1 - bearing line of n points
  var geometry1 = [];
  var distance = 0;
  for (var i = 1; i < points.length; i += 1) {
    // measure distance between each two points
    distance = ms.geometry.distanceBetween(points[i - 1], points[i])

    // Making each segment straight
    geometry1 = laundery(geometry1, points[i - 1], points[i], 0, 0)

  }
  geometry.coordinates = [geometry1];
    
  annotations[0].geometry = {type: "Point"};
  annotations[0].properties = {};
  annotations[0].geometry.coordinates = points[0];
  annotations[0].properties.text = "(PL NAME)";

  annotations[1].geometry = {type: "Point"};
  annotations[1].properties = {};
  annotations[1].geometry.coordinates = points[3];
  annotations[1].properties.text = "Something";

  annotations[2].geometry = {type: "Point"};
  annotations[2].properties = {};
  annotations[2].geometry.coordinates = points[7];
  annotations[2].properties.text = "(PL NAME)";


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

module.exports = lateralBoundary;


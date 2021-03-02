var ms = require("milsymbol");

function block(feature) {
  //var direction, width;
  var annotations = [{}];
  var points = feature.geometry.coordinates;
  var width = ms.geometry.distanceBetween(points[0], points[1]);
  var bearing = ms.geometry.bearingBetween(points[0], points[1]);
  var geometry = { type: "MultiLineString" };
  geometry.coordinates = [];
 var midpoint = ms.geometry.pointBetween(points[0], points[1], 0.5);

 var geometry1 = [];
 geometry1.push(points[0], points[1]);
  // Geometry 2 - The head of the arrow:
  var geometry2 = [];
  // Right end:
  geometry2.push(
    ms.geometry.testBearing(points[1], width * 0.7, bearing + 120)
  );
  // Tip of the arrow:
  geometry2.push(midpoint);
  // Left end:
  geometry2.push(
    ms.geometry.testBearing(points[1], width * 0.7, bearing - 120)
  );

  geometry.coordinates = [geometry1, geometry2];

  annotations[0].geometry = { type: "Point" };
  annotations[0].properties = {};
  annotations[0].properties.text = "II";
  annotations[0].geometry.coordinates = ms.geometry.pointBetween(
    points[0],
    points[1],
    0.5
  );
  return { geometry: geometry, annotations: annotations };
}

module.exports = block;

var ms = require("milsymbol");

function fix(feature) {
  var points = feature.geometry.coordinates;
  var length = ms.geometry.distanceBetween(points[0], points[1]);
  var bearing = ms.geometry.bearingBetween(points[0], points[1]);
  var widht = length * 0.10;

  var geometry = { type: "MultiLineString", coordinates: [] };
  var geometry1 = [];
  var opposite = -90;
  geometry1.push(points[0], ms.geometry.pointBetween(points[0], points[1], 0.2));
  for (var i = 0.25; i < 0.8; i= i + 0.05) {
    opposite = -opposite
    geometry1.push(
      ms.geometry.toDistanceBearing(
        ms.geometry.pointBetween(points[0], points[1], i),
        widht,
        bearing + opposite
      )
    );
  }
  geometry1.push(ms.geometry.pointBetween(points[0], points[1], 0.8), points[1]);

  var geometry2 = [
    ms.geometry.toDistanceBearing(points[0], widht * 1.5, bearing + 45),
    points[0],
    ms.geometry.toDistanceBearing(points[0], widht * 1.5, bearing - 45)
  ];

  geometry.coordinates = [geometry1, geometry2];
  return { geometry: geometry };
}

module.exports = fix;

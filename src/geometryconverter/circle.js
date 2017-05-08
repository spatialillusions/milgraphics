var ms = require("milsymbol");

// Draws a circle withe a radius in meters
module.exports = function(feature) {
  var p = feature.geometry.coordinates;
  var r = feature.properties.distance;
  var geometry = { type: "Polygon" };
  geometry.coordinates = [[]];
  for (var direction = 360; direction >= 0; direction -= 5) {
    geometry.coordinates[0].push(
      ms.geometry.toDistanceBearing(p, r, direction)
    );
  }
  return { geometry: geometry };
};

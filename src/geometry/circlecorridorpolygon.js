var ms = require("milsymbol");

module.exports = function(feature) {
  var annotation = {};
  var geometry;

  switch (feature.geometry.type) {
    case "Point":
      geometry = ms.geometry.circle(feature).geometry;
      annotation.geometry.coordinates = feature.geometry.coordinates;
      break;
    case "LineString":
      geometry = ms.geometry.rectangle(feature).geometry;
      annotation.geometry.coordinates = ms.geometry.pointBetween(
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
        0.5
      );
      break;
    case "Polygon":
      geometry = { type: feature.geometry.type };
      geometry.coordinates = feature.geometry.coordinates;
      // add annotation geometry
      break;
    default:
      console.warn("Invalid feature type in SIDC: " + feature.properties.sidc);
  }

  return { annotation: annotation, geometry: geometry };
};

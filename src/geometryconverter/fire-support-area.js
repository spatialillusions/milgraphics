var ms = require("milsymbol");

// Draws a Fire Support Area
module.exports = function(feature) {
  var annotations = [{}];
  var geometry;

  annotations[0].geometry = { type: "Point" };
  annotations[0].properties = {};
  annotations[0].properties.text =
    "FSA " + (feature.properties.uniqueDesignation || "");
  //TODO add DTG

  switch (feature.geometry.type) {
    case "Point":
      geometry = ms.geometry.circle(feature).geometry;
      annotations[0].geometry.coordinates = feature.geometry.coordinates;
      break;
    case "LineString":
      geometry = ms.geometry.rectangle(feature).geometry;
      annotations[0].geometry.coordinates = ms.geometry.pointBetween(
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
  return { geometry: geometry, annotations: annotations };
};

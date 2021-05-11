var ms = require("milsymbol");

// Draws a NAI
module.exports = function(feature) {
  var annotations = {
    geometry: { type: "Point" },
    properties: { text: "TAI" }
  };
  if (feature.properties.uniqueDesignation)
    annotations.properties.text +=
      "\n" + feature.properties.uniqueDesignation;

  var polygon = ms.geometry.circleCorridorPolygon(feature);
  if (polygon.annotation.hasOwnProperty("geometry")) {
    annotations.geometry = polygon.annotation.geometry;
  }

  return { geometry: polygon.geometry, annotations: [annotations] };
};

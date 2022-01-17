var ms = require("milsymbol");

// Draws a NAI
module.exports = function(feature) {
  var annotations = {
    geometry: { type: "Point" },
    properties: { text: "ACA" }
  };
  if (feature.properties.uniqueDesignation)
    annotations.properties.text +=
      "\n" + feature.properties.uniqueDesignation;
  if (feature.properties.altitudeDepth)
    annotations.properties.text +=
      "\nMIN ALT: " + feature.properties.altitudeDepth;
  if (feature.properties.altitudeDepth1)
    annotations.properties.text +=
      "\nMAX ALT: " + feature.properties.altitudeDepth1;
  if (feature.properties.additionalInformation1)
    annotations.properties.text +=
      "\nGrids " + feature.properties.additionalInformation1;
  if (feature.properties.dtg)
    annotations.properties.text += "\nEFF: " + feature.properties.dtg;
  if (feature.properties.dtg1)
    annotations.properties.text += "\n- " + feature.properties.dtg1;

  var polygon = ms.geometry.circleCorridorPolygon(feature);
  if (polygon.annotation.hasOwnProperty("geometry")) {
    annotations.geometry = polygon.annotation.geometry;
  }

  return {
    geometry: polygon.geometry,
    annotations: [annotations]};
};

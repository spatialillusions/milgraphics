var ms = require("milsymbol");

// Draws a NAI
module.exports = function(feature) {
  var annotations = [{}];
  var geometry;

  annotations[0].geometry = { type: "Point" };
  annotations[0].properties = {};
  annotations[0].properties.text = "ACA";
  if (feature.properties.uniqueDesignation)
    annotations[0].properties.text +=
      "\n" + feature.properties.uniqueDesignation;
  if (feature.properties.altitudeDepth)
    annotations[0].properties.text +=
      "\nMIN ALT: " + feature.properties.altitudeDepth;
  if (feature.properties.altitudeDepth1)
    annotations[0].properties.text +=
      "\nMAX ALT: " + feature.properties.altitudeDepth1;
  if (feature.properties.additionalInformation1)
    annotations[0].properties.text +=
      "\nGrids " + feature.properties.additionalInformation1;
  if (feature.properties.dtg)
    annotations[0].properties.text += "\nEFF: " + feature.properties.dtg;
  if (feature.properties.dtg1)
    annotations[0].properties.text += "\n- " + feature.properties.dtg1;

  var polygon = ms.geometry.circleCorridorPolygon(feature);
  geometry = polygon.geometry;
  if (polygon.annotation.hasOwnProperty("geometry")) {
    annotations[0].geometry = polygon.annotation.geometry;
  }

  return { geometry: geometry, annotations: annotations };
};

var ms = require("milsymbol");

// Draws a Fire Support Area
module.exports = function(feature) {
  var annotations = [{}];
  var geometry;

  annotations[0].geometry = { type: "Point" };
  annotations[0].properties = {};
  annotations[0].properties.text =
    "FSA " + (feature.properties.uniqueDesignation || "");
  if (feature.properties.dtg)
    annotations[0].properties.text += "\n" + feature.properties.dtg;
  if (feature.properties.dtg1)
    annotations[0].properties.text += "\n" + feature.properties.dtg1;

  var polygon = ms.geometry.circleCorridorPolygon(feature);
  geometry = polygon.geometry;
  if (polygon.annotation.hasOwnProperty("geometry")) {
    annotations[0].geometry = polygon.annotation.geometry;
  }

  return { geometry: geometry, annotations: annotations };
};

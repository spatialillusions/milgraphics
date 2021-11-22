var ms = require("milsymbol");

// Draws a Fire Support Area
module.exports = function(feature) {
  var annotations = {
    geometry: { type: "Point" },
    properties: { text: "RFA" }
  };
  if (feature.properties.administrator)
    annotations.properties.text +=
      "\n" + feature.properties.administrator;
  if (feature.properties.dtg)
    annotations.properties.text += "\n" + feature.properties.dtg;
  if (feature.properties.dtg1)
    annotations.properties.text += " - " + feature.properties.dtg1;

  var polygon = ms.geometry.circleCorridorPolygon(feature);
  if (polygon.annotation.hasOwnProperty("geometry")) {
    annotations.geometry = polygon.annotation.geometry;
  }
  return { geometry: polygon.geometry, annotations: [annotations] };
};

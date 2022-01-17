var ms = require("milsymbol");

module.exports = function(feature) {
  var annotations = {
    geometry: { type: "Point" },
    properties: { text: "ZOR" }
  };
  if (feature.properties.uniqueDesignation)
    annotations.properties.text +=
      "\n" + feature.properties.uniqueDesignation;
  if (feature.properties.dtg)
    annotations.properties.text += "\n" + feature.properties.dtg;
  if (feature.properties.dtg1)
    annotations.properties.text += "\n" + feature.properties.dtg1;

  var polygon = ms.geometry.circleCorridorPolygon(feature);
  if (polygon.annotation.hasOwnProperty("geometry")) {
    annotations.geometry = polygon.annotation.geometry;
  }

  return { geometry: polygon.geometry, annotations: [annotations] };
};

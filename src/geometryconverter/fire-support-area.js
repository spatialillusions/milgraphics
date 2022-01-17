var ms = require("milsymbol");

module.exports = function(feature) {
  var annotations = {
    geometry: { type: "Point" },
    properties: { text: "FSA " + (feature.properties.uniqueDesignation || "") }
  };
  if (feature.properties.dtg)
    annotations.properties.text += "\n" + feature.properties.dtg;
  if (feature.properties.dtg1)
    annotations.properties.text += "\n" + feature.properties.dtg1;

  var polygon = ms.geometry.circleCorridorPolygon(feature);
  geometry = polygon.geometry;
  if (polygon.annotation.hasOwnProperty("geometry")) {
    annotations.geometry = polygon.annotation.geometry;
  }

  return { geometry: geometry, annotations: [annotations] };
};

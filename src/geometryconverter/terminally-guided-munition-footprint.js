var ms = require("milsymbol");

module.exports = function(feature) {
  var annotations = {
    geometry: { type: "Point" },
    properties: { text: "TGMF" }
  };
  var polygon = ms.geometry.circleCorridorPolygon(feature);
  if (polygon.annotation.hasOwnProperty("geometry")) {
    annotations.geometry = polygon.annotation.geometry;
  }

  return { geometry: polygon.geometry, annotations: [annotations] };
};

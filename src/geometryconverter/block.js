var ms = require("milsymbol");

function block(feature) {
  //var direction, width;
  var points = feature.geometry.coordinates;

  var geometry1 = [points[0], points[1]];  
  var midpoint = ms.geometry.pointBetween(points[0], points[1], 0.5);
  var geometry2 = [points[2], midpoint];

  var geometry = { type: "MultiLineString", coordinates: [geometry1, geometry2] };

  var annotations = {
    geometry: {
      type: "Point",
      coordinates: ms.geometry.pointBetween(
        midpoint,
        points[2],
        0.5
      )
    },
    properties: { text: "B" }
  };
  return { geometry: geometry, annotations: [annotations] };
}

module.exports = block;

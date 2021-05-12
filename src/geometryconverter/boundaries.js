var ms = require("milsymbol");

function boundaries(feature) {
  var points = feature.geometry.coordinates;
  var geometry = { type: "MultiLineString", coordinates: [] };

  var point = [];
  if (points.length % 2 === 0) {
    var index = points.length / 2;
    var f = ms.geometry.distanceBetween(points[index - 1], points[index]);
    point = ms.geometry.pointBetweenAbsolute(points[index - 1], points[index], f / 2);
  } else {
    point = points.slice((points.length - 1) / 2)[0];
  }
  
  var annotations = {
    geometry: { type: "Point", coordinates: point },
    properties: { text: "III" }
  };

  geometry.coordinates = [points];
  
  return { geometry: geometry, annotations: [annotations] };
}


module.exports = boundaries;


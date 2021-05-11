var ms = require("milsymbol");
//Converting lines to dashed lines
const convertToDashes = require("../geometry/converttodashes");

function boundaries(feature) {
  //var direction, width;
  var annotations = [];
  var points = feature.geometry.coordinates;
  var geometry = { type: "MultiLineString", coordinates: [] };

  var geometry1 = [];
  for (var i = 0; i < points.length; i += 1) {
    // Making each segment straight
    geometry1 = flotify(geometry1, points[i], points[i], 0, 0)
    annotations.push(ms.geometry.addAnotation(points[i], "III"));
  }
  //Converting lines to dashed lines
  geometry.coordinates = convertToDashes(geometry1, 1 / 64);
  
  return { geometry: geometry, annotations: annotations };
}

function flotify(geo, pointa, pointb, degree = 0) {
  if (degree <= 0) {
    geo.push(pointa, pointb)
    return geo;
  }
}

module.exports = boundaries;


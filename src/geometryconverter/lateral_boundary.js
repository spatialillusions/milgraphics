var ms = require("milsymbol");

function block(feature) {
  //var direction, width;
  var annotations = [{}];
  var points = feature.geometry.coordinates;
  
  var geometry = { type: "MultiLineString" };
  geometry.coordinates = [];
// 
var midpoint = ms.geometry.testGeometry(points[0], points[1], 0.5);
 var geometry1 = [];
 geometry1.push(midpoint, points[1]);
 var geometry2 = [];
 
 geometry2.push(points[0], midpoint);


  geometry.coordinates = [geometry1, geometry2];

  annotations[0].geometry = { type: "Point" };
  annotations[0].properties = {};
  annotations[0].properties.text = "II";
  annotations[0].geometry.coordinates = ms.geometry.testGeometry(
    points[0],
    points[1],
    0.5
  );
  return { geometry: geometry, annotations: annotations };
}

module.exports = block;

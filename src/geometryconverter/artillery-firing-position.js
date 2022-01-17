var ms = require("milsymbol");
const toDistanceBearing = require("../geometry/todistancebearing");

module.exports = function (feature) {
  var annotations = [];
  var geometry = {
    type: "MultiLineString",
    coordinates: []
  };
  var points = feature.geometry.coordinates;
  var bearing = ms.geometry.bearingBetween(points[0], points[1]);
  var scale = ms.geometry.distanceBetween(points[0], points[1]);
  var centerPoint;

  var geom = [
    points[0],
    ms.geometry.toDistanceBearing(points[0], length, bearing + 90),
    ms.geometry.toDistanceBearing(points[1], length, bearing + 90),
    points[1]
  ];
  geometry.coordinates.push(geom);
  geom = [
    ms.geometry.toDistanceBearing(points[0], scale * 0.1, bearing + 90), 
    ms.geometry.toDistanceBearing(points[0], 0, bearing - 90)

];
geometry.coordinates.push(geom);
geom = [
  ms.geometry.toDistanceBearing(points.slice(-1)[0], scale * 0.1, bearing + 90), 
  ms.geometry.toDistanceBearing(points.slice(-1)[0], 0, bearing - 90),
  centerPoint = ms.geometry.pointBetween(ms.geometry.toDistanceBearing(points.slice(-1)[0], scale * 0.1, bearing + 90),ms.geometry.toDistanceBearing(points.slice(-1)[0], 0, bearing - 90),0.5)
];
geometry.coordinates.push(geom);
console.log(centerPoint);
  if(feature.properties.firNum){
    var annotationPoint = ms.geometry.toDistanceBearing(centerPoint, scale*0.01, bearing + 45);
    annotations.push(ms.geometry.addAnotation(annotationPoint, feature.properties.firNum));
  }
  

  return {
    geometry: geometry,
    annotations: annotations
  };

};
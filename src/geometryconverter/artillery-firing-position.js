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
  var centerPoint = ms.geometry.pointBetween(points[0], points[1], 0.5);
  var annotTopPos = ms.geometry.toDistanceBearing(centerPoint, scale * 0.05, bearing - 90); //annotation above the line
  var annotUndPos = ms.geometry.toDistanceBearing(centerPoint, scale * 0.05, bearing + 90); //annotation below the line

  var geom = [
    points[0],
    ms.geometry.toDistanceBearing(points[0], length, bearing + 90),
    ms.geometry.toDistanceBearing(points[1], length, bearing + 90),
    points[1]
  ];
  geometry.coordinates.push(geom);
  geom = [
    
    ms.geometry.toDistanceBearing(points[0], scale * 0.1, bearing - 90) // Left end

];
geometry.coordinates.push(geom);
geom = [
  
  ms.geometry.toDistanceBearing(points.slice(-1)[0], scale * 0.1, bearing - 90) // Left end
];
geometry.coordinates.push(geom);
  if(feature.properties.administrator){
    annotations.push(ms.geometry.addAnotation(annotTopPos, feature.properties.administrator));
  }
  if(feature.properties.type){
    annotations.push(ms.geometry.addAnotation(annotUndPos, feature.properties.type));
  }
  

  return {
    geometry: geometry,
    annotations: annotations
  };

};
var ms = require("milsymbol");
const toDistanceBearing = require("../geometry/todistancebearing");

module.exports = function (feature) {
  var annotations = [];
  var points = feature.geometry.coordinates;
  var annotationText = feature.properties.name;
  var distance = feature.properties.distance; //distance in meters

  var centerPoint;

  if (feature.geometry.type == "Point") {
    centerPoint = points;
  } else if (feature.geometry.type == "LineString") {
    centerPoint = ms.geometry.pointBetween(points[0], points[1], 0.5);
    distance = distance / 2;
  } else if (feature.geometry.type = "Polygon"){
    centerPoint = points[0];

   //console.log(points);
   //Variables for northernmost, southernmost, easternmost and westernmost coordinates for annotations in polygon
    var maxLatitudes = Math.max.apply(null, getLatLong(points).latitudes);
    var maxLongitudes =  Math.max.apply(null, getLatLong(points).longitudes);
    var minLatitudes = Math.min.apply(null, getLatLong(points).latitudes);
    var minLongitudes =  Math.min.apply(null, getLatLong(points).longitudes);

    for(var a = 0; a < points[0].length; a++){

       if(points[0][a][0] == minLatitudes){
            annotations.push(ms.geometry.addAnotation(points[0][a], annotationText));
        }else if(points[0][a][0] == maxLatitudes){
            annotations.push(ms.geometry.addAnotation(points[0][a], annotationText));
        }else if(points[0][a][1] == minLongitudes){
            annotations.push(ms.geometry.addAnotation(points[0][a], annotationText));
        }else if(points[0][a][1] == maxLongitudes){
            annotations.push(ms.geometry.addAnotation(points[0][a], annotationText));
        }

    }

  }

  annotations.push(ms.geometry.addAnotation(ms.geometry.toDistanceBearing(centerPoint, distance, 360), annotationText));
  annotations.push(ms.geometry.addAnotation(ms.geometry.toDistanceBearing(centerPoint, distance, 180), annotationText));
  annotations.push(ms.geometry.addAnotation(ms.geometry.toDistanceBearing(centerPoint, distance, -90), annotationText));
  annotations.push(ms.geometry.addAnotation(ms.geometry.toDistanceBearing(centerPoint, distance, 90), annotationText));

  var shape = ms.geometry.circleCorridorPolygon(feature);

  return {
    geometry: shape.geometry,
    annotations: annotations
  };

}
function getLatLong(array){
    var latitudes = [];
    var longitudes = [];
    
    for(var i = 0; i < array[0].length; i++){          
        latitudes.push(array[0][i][0]);
        longitudes.push(array[0][i][1]);
    }
  
    return {latitudes, longitudes};
};
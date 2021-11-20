var ms = require("milsymbol");
const toDistanceBearing = require("../geometry/todistancebearing");

module.exports = function (feature) {
  var annotations = [];
  var points = feature.geometry.coordinates;
  var annotationText = feature.properties.name;
  var distance = feature.properties.distance; //distance in meters

  //variables for annotation coordinations
  var centerPoint;
  var topAnn;
  var bottomAnn;
  var sideAnn1;
  var sideAnn2;



  if (feature.geometry.type == "Point") {
    centerPoint = points;
  } else if (feature.geometry.type == "LineString") {
    centerPoint = ms.geometry.pointBetween(points[0], points[1], 0.5);
    distance = distance / 2;
  } else if (feature.geometry.type = "Polygon"){
    centerPoint = points[0];

    //console.log(points);
   //console.log(Math.max(getLatLong(points).latitudes));

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
  topAnn = ms.geometry.toDistanceBearing(centerPoint, distance, 360);
  bottomAnn = ms.geometry.toDistanceBearing(centerPoint, distance, 180);
  sideAnn2 = ms.geometry.toDistanceBearing(centerPoint, distance, 90);
  sideAnn1 = ms.geometry.toDistanceBearing(centerPoint, distance, -90);

  annotations.push(ms.geometry.addAnotation(topAnn, annotationText));
  annotations.push(ms.geometry.addAnotation(bottomAnn, annotationText));
  annotations.push(ms.geometry.addAnotation(sideAnn1, annotationText));
  annotations.push(ms.geometry.addAnotation(sideAnn2, annotationText));

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
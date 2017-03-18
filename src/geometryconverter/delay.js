// 
function delay(feature){
  var direction, width;
  var directionFactor = -1;
  var points = feature.geometry.coordinates;
  
  var width = ms.geometry.distanceBetween(points[1],points[2]);
  var bearing = ms.geometry.bearingBetween(points[0],points[1]);
  
  var geometry = {"type": "MultiLineString"};

  geometry.coordinates = [];
  
  var geometry1 = [];
  geometry1.push(points[0]);
  geometry1.push(points[1]);
//console.log('arrow bearing ' + bearing)
//console.log('fjomp bearing ' + ms.geometry.bearingBetween(points[1],points[2]))
  
  var midpoint = ms.geometry.pointBetween(points[1],points[2],0.5);
  var curveBearing = ms.geometry.bearingBetween(points[1],points[2]);
  if (curveBearing < 0 && bearing < 0)directionFactor = 1; // OK
  //if (curveBearing > 0 && bearing < 0)directionFactor = -1; // OK
  //if (curveBearing < 0 && bearing > 0)directionFactor = -1; // OK
  //if (curveBearing > 0 && bearing > 0)directionFactor = -1; // OK
  //var directionFactor = (Math.abs(curveBearing)/curveBearing)*(Math.abs(bearing)/bearing);

  for (var i = 10; i<180; i+=10){
      geometry1.push(ms.geometry.toDistanceBearing(midpoint,width/2,curveBearing+(i*directionFactor)+180));
  }

  geometry1.push(points[2]);
    
  var geometry2 = [];
  geometry2.push(ms.geometry.toDistanceBearing(points[0],width*0.4,bearing+45));
  geometry2.push(points[0]);
  geometry2.push(ms.geometry.toDistanceBearing(points[0],width*0.4,bearing-45));
  
  geometry.coordinates = [geometry1,geometry2];
  return {geometry:geometry};
}

module.exports = delay;
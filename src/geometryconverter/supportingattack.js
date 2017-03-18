// Draws a corridor with a widht in meters
function supportingAttack(feature){
  var direction, width;
  var points = feature.geometry.coordinates;
  var arrowHead = points.pop();
  var widthHeadRatio = 0.7;
  
  var geometry = {"type": "LineString"};
  geometry.coordinates = [];
  
  var geometry1 = [];
  
  // Width of the arrow
  direction = ms.geometry.bearingBetween(points[0],points[1]);
  var deltaDirection = direction - ms.geometry.bearingBetween(points[0],arrowHead);
  //console.log(deltaDirection)
  var distance = ms.geometry.distanceBetween(points[0],arrowHead);
  var arrowHead2 = ms.geometry.toDistanceBearing(points[0], distance, direction+deltaDirection);
  width = ms.geometry.distanceBetween(arrowHead,arrowHead2)/2;

  direction = (ms.geometry.bearingBetween(points[points.length-1],points[points.length-2]) +360) % 360;
  geometry1.push(ms.geometry.toDistanceBearing(points[points.length-1], width*widthHeadRatio, direction-90));

  for (var j = points.length-2; j > 0; j--){
    var direction1 = (ms.geometry.bearingBetween(points[j], points[j+1]) +360) % 360;
    var direction2 = (ms.geometry.bearingBetween(points[j], points[j-1]) +360) % 360;
    var factor = 1/Math.sin(((direction2-direction1)/2)*(Math.PI/180));
    geometry1.push(ms.geometry.toDistanceBearing(points[j], (width*widthHeadRatio)*factor , ((direction1+direction2)/2)));
  }
  
  // Arrowhead  
  direction = (ms.geometry.bearingBetween(points[0],points[1])+180) % 360;
  geometry1.push(ms.geometry.toDistanceBearing(arrowHead, width*(1-widthHeadRatio), direction+90))
  geometry1.push(arrowHead);
  geometry1.push(points[0]);
  geometry1.push(arrowHead2);
  geometry1.push(ms.geometry.toDistanceBearing(arrowHead2, width*(1-widthHeadRatio), direction-90)) 
  
  for (var j = 1; j < points.length-1; j++){
    var direction1 = (ms.geometry.bearingBetween(points[j], points[j+1]) +360) % 360;
    var direction2 = (ms.geometry.bearingBetween(points[j], points[j-1]) +360) % 360;
    var factor = 1/Math.sin(((direction2-direction1)/2)*(Math.PI/180));
    geometry1.push(ms.geometry.toDistanceBearing(points[j], -(width*widthHeadRatio)*factor, ((direction1+direction2)/2)));
  }
 
  direction = (ms.geometry.bearingBetween(points[points.length-1],points[points.length-2]) +360) % 360;
  geometry1.push(ms.geometry.toDistanceBearing(points[points.length-1], width*widthHeadRatio, direction+90));
  
  geometry.coordinates = geometry1;
  return {geometry:geometry};
}


module.exports = supportingAttack;
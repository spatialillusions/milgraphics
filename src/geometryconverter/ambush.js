// 
function block(feature){  
  var direction, width, geom;
  var points = feature.geometry.coordinates;
  var geometry = {"type": "MultiLineString"};
  geometry.coordinates = [];
  
  var midpoint = ms.geometry.pointBetween(points[1],points[2],0.5);
  var bearing1 = (ms.geometry.bearingBetween(points[1],points[2])+360)%360;
  var bearing2 = (ms.geometry.bearingBetween(points[1],points[0])+360)%360;
 

  
  var distance = Math.sin( (bearing1-bearing2) * (Math.PI/180) ) * ms.geometry.distanceBetween(points[0],points[1]);
  if (distance < 0) { // Wrong order in input
    points = [points[0],points[2],points[1]];
    bearing1 = (ms.geometry.bearingBetween(points[1],points[2])+360)%360;
    bearing2 = (ms.geometry.bearingBetween(points[1],points[0])+360)%360;
    distance = -distance;
  }
  var rotationpoint = ms.geometry.toDistanceBearing(midpoint, distance, bearing1+90)
  var radius = ms.geometry.distanceBetween(rotationpoint,points[1]);
  var b1 = (ms.geometry.bearingBetween(rotationpoint,points[1])+360)%360;
  var b2 = (ms.geometry.bearingBetween(rotationpoint,points[2])+360)%360;
  if (b1>b2){
    b2 = b2+360;
  } 
  var midAngle = ((b1+b2)/2);
  var tip = ms.geometry.toDistanceBearing(rotationpoint, distance*2, midAngle);
  var b3 = (ms.geometry.bearingBetween(tip,rotationpoint)+360)%360;
  
  // Arc
  geom = [];
  geom.push(points[1]);

  for (var i = b1; i <= b2; i+= 5 ) {
    geom.push(ms.geometry.toDistanceBearing(rotationpoint, radius, i));
  }
  geom.push(points[2]);
  geometry.coordinates.push(geom);

  // Lines
  var diff = (b2-b1)/7;
  var p1,p2;
  for (var i = 1; i<=6; i++){
    geom = [];
    p1 = ms.geometry.toDistanceBearing(rotationpoint, radius, b1+(diff*i));
    p2 = ms.geometry.toDistanceBearing(p1, distance*0.3, b3);
    geom.push(p1,p2);
    geometry.coordinates.push(geom);
  }
     
  // Arrow
  geom = [];
  geom.push(ms.geometry.toDistanceBearing(rotationpoint, radius, midAngle));
  geom.push(ms.geometry.toDistanceBearing(rotationpoint, distance*2, midAngle));
  geometry.coordinates.push(geom);

  // Arrow head
  geom = [];
  geom.push(ms.geometry.toDistanceBearing(tip, distance*0.2, b3+45));
  geom.push(tip);
  geom.push(ms.geometry.toDistanceBearing(tip, distance*0.2, b3-45));
  geometry.coordinates.push(geom);
  
  return {geometry:geometry};
}

module.exports = block;
// Draws a circle withe a radius in meters
function occupy(feature){
  var p = feature.geometry.coordinates;
  var r = ms.geometry.distanceBetween(p[0],p[1]);
  var bearing = ms.geometry.bearingBetween(p[0],p[1]);
  
  var geometry = {"type": "MultiLineString"};
  geometry.coordinates = [[]];
  for (var d = 0; d <= 340; d+=5){
    geometry.coordinates[0].push( ms.geometry.toDistanceBearing(p[0], r, d+bearing));
  }

  var geom = [];
  var pEnd = ms.geometry.toDistanceBearing(p[0], r, 340+bearing);
  geom.push( ms.geometry.toDistanceBearing(pEnd, r*0.2, 320+bearing-(90-15)+45));
  geom.push( pEnd );
  geom.push( ms.geometry.toDistanceBearing(pEnd, r*0.2, 320+bearing-(90-15)-45));
  geometry.coordinates.push(geom);

  geom = [];
  pEnd = ms.geometry.toDistanceBearing(p[0], r, 340+bearing);
  geom.push( ms.geometry.toDistanceBearing(pEnd, r*0.2, 320+bearing+(90+15)+45));
  geom.push( pEnd );
  geom.push( ms.geometry.toDistanceBearing(pEnd, r*0.2, 320+bearing+(90+15)-45));
  geometry.coordinates.push(geom);

  return {geometry:geometry};
}

module.exports = occupy;
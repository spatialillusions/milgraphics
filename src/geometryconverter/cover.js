// Draws a circle withe a radius in meters
function cover(feature){
  var p = feature.geometry.coordinates;
  var scale = Math.max(ms.geometry.distanceBetween(p[0],p[1]),ms.geometry.distanceBetween(p[0],p[2]));
  var geometry = {"type": "MultiLineString"};
  geometry.coordinates = [[]];

  var geom = [];
  var pMid = ms.geometry.pointBetween(p[0], p[1], 0.5);
  var bearing = ms.geometry.bearingBetween(p[0], p[1]);
  geom.push(p[0]);
  geom.push( ms.geometry.toDistanceBearing(pMid, scale*0.05, bearing + (120-180) ));
  var pMid2 = ms.geometry.toDistanceBearing(pMid, scale*0.05, bearing + (120) );
  geom.push( pMid2 );
  geom.push( p[1] );
  geometry.coordinates.push(geom);

  geom = [];
  bearing = ms.geometry.bearingBetween(p[1], pMid2);
  geom.push( ms.geometry.toDistanceBearing(p[1], scale*0.08, bearing - 45 ));
  geom.push( p[1] );
  geom.push( ms.geometry.toDistanceBearing(p[1], scale*0.08, bearing + 45 ));
  geometry.coordinates.push(geom);
  
  geom = [];
  pMid = ms.geometry.pointBetween(p[0], p[2], 0.5);
  bearing = ms.geometry.bearingBetween(p[0], p[2]);
  geom.push(p[0]);
  geom.push( ms.geometry.toDistanceBearing(pMid, scale*0.05, bearing + (120-180) ));
  pMid2 = ms.geometry.toDistanceBearing(pMid, scale*0.05, bearing + (120) );
  geom.push( pMid2 );
  geom.push( p[2] );
  geometry.coordinates.push(geom);
  
  geom = [];
  bearing = ms.geometry.bearingBetween(p[2], pMid2);
  geom.push( ms.geometry.toDistanceBearing(p[2], scale*0.08, bearing - 45 ));
  geom.push( p[2] );
  geom.push( ms.geometry.toDistanceBearing(p[2], scale*0.08, bearing + 45 ));
  geometry.coordinates.push(geom);
  
  return {geometry:geometry};
}

module.exports = cover;
var ms = require("milsymbol");

// Draws a circle withe a radius in meters
function cover(feature) {
  var p = feature.geometry.coordinates;
  var scale = Math.max(
    ms.geometry.distanceBetween(p[0], p[1]),
    ms.geometry.distanceBetween(p[0], p[2])
  );
  var geometry = { type: "MultiLineString", coordinates: [[]] };

  var pMid = ms.geometry.pointBetween(p[0], p[1], 0.5);
  var bearing = ms.geometry.bearingBetween(p[0], p[1]);
  var pMid2 = ms.geometry.toDistanceBearing(pMid, scale * 0.05, bearing + 120);
  var geom = [
    p[0],    
    ms.geometry.toDistanceBearing(pMid, scale * 0.05, bearing + (120 - 180)),  
    pMid2,
    p[1]
  ];
  geometry.coordinates.push(geom);

  bearing = ms.geometry.bearingBetween(p[1], pMid2);
  geom = [
    ms.geometry.toDistanceBearing(p[1], scale * 0.08, bearing - 45),
    p[1],
    ms.geometry.toDistanceBearing(p[1], scale * 0.08, bearing + 45)
  ];
  geometry.coordinates.push(geom);

  pMid = ms.geometry.pointBetween(p[0], p[2], 0.5);
  bearing = ms.geometry.bearingBetween(p[0], p[2]);
  pMid2 = ms.geometry.toDistanceBearing(pMid, scale * 0.05, bearing + 120);
  geom = [
    p[0],
    ms.geometry.toDistanceBearing(pMid, scale * 0.05, bearing + (120 - 180)),  
    pMid2,
    p[2]
  ];
  geometry.coordinates.push(geom);

  bearing = ms.geometry.bearingBetween(p[2], pMid2);
  geom = [
    ms.geometry.toDistanceBearing(p[2], scale * 0.08, bearing - 45),
    p[2],
    ms.geometry.toDistanceBearing(p[2], scale * 0.08, bearing + 45)
  ];
  geometry.coordinates.push(geom);

  return { geometry: geometry };
}

module.exports = cover;

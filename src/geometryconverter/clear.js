var ms = require("milsymbol");

function clear(feature) {
  //var direction, width;
  var annotations = [{}];

  var points = feature.geometry.coordinates;
  var geometry = { type: "MultiLineString" };
  var scale = ms.geometry.distanceBetween(points[0], points[1]);

  geometry.coordinates = [];

  var geom = [points[0], points[1]];
  geometry.coordinates.push(geom);

  var pMid = ms.geometry.pointBetween(points[0], points[1], 0.5);
  var length = ms.geometry.distanceBetween(pMid, points[2]);
  var bearing = ms.geometry.bearingBetween(points[0], points[1]);

  geom = [pMid, ms.geometry.toDistanceBearing(pMid, length, bearing + 90)];
  geometry.coordinates.push(geom);

  annotations[0].geometry = { type: "Point" };
  annotations[0].properties = {};
  annotations[0].properties.text = "C";
  annotations[0].geometry.coordinates = ms.geometry.pointBetween(
    pMid,
    geom[1],
    0.5
  );

  geom = [];
  geom.push(ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60));
  geom.push(pMid);
  geom.push(
    ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60 + 60)
  );
  geometry.coordinates.push(geom);

  pMid = ms.geometry.pointBetween(points[0], points[1], 0.2);
  geom = [pMid, ms.geometry.toDistanceBearing(pMid, length, bearing + 90)];
  geometry.coordinates.push(geom);

  geom = [];
  geom.push(ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60));
  geom.push(pMid);
  geom.push(
    ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60 + 60)
  );
  geometry.coordinates.push(geom);

  pMid = ms.geometry.pointBetween(points[0], points[1], 0.8);
  geom = [pMid, ms.geometry.toDistanceBearing(pMid, length, bearing + 90)];
  geometry.coordinates.push(geom);

  geom = [];
  geom.push(ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60));
  geom.push(pMid);
  geom.push(
    ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60 + 60)
  );
  geometry.coordinates.push(geom);

  return { geometry: geometry, annotations: annotations };
}

module.exports = clear;

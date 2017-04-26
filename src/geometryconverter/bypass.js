var ms = require("milsymbol");

function bypass(feature) {
  //var direction, width;
  var annotations = [{}];

  var points = feature.geometry.coordinates;
  var geometry = { type: "MultiLineString" };
  var scale = ms.geometry.distanceBetween(points[0], points[1]);
  var pMid = ms.geometry.pointBetween(points[0], points[1], 0.5);
  var length = ms.geometry.distanceBetween(pMid, points[2]);
  var bearing = ms.geometry.bearingBetween(points[0], points[1]);

  geometry.coordinates = [];

  var geom = [points[0]];
  geom.push(ms.geometry.toDistanceBearing(points[0], length, bearing + 90));
  geom.push(ms.geometry.toDistanceBearing(points[1], length, bearing + 90));
  geom.push(points[1]);
  geometry.coordinates.push(geom);

  geom = [];
  geom.push(
    ms.geometry.toDistanceBearing(points[0], scale * 0.2, bearing + 90 - 30)
  );
  geom.push(points[0]);
  geom.push(
    ms.geometry.toDistanceBearing(points[0], scale * 0.2, bearing + 90 + 30)
  );
  geometry.coordinates.push(geom);

  geom = [];
  geom.push(
    ms.geometry.toDistanceBearing(points[1], scale * 0.2, bearing + 90 - 30)
  );
  geom.push(points[1]);
  geom.push(
    ms.geometry.toDistanceBearing(points[1], scale * 0.2, bearing + 90 + 30)
  );
  geometry.coordinates.push(geom);

  annotations[0].geometry = { type: "Point" };
  annotations[0].properties = {};
  annotations[0].properties.text = "B";
  annotations[0].geometry.coordinates = points[2];

  return { geometry: geometry, annotations: annotations };
}

module.exports = bypass;

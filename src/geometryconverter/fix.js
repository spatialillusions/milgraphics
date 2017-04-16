var ms = require("milsymbol");

function fix(feature) {
  //var direction, width;
  var points = feature.geometry.coordinates;

  var length = ms.geometry.distanceBetween(points[0], points[1]);
  var bearing = ms.geometry.bearingBetween(points[0], points[1]);
  var widht = length * 0.10;

  var geometry = { type: "MultiLineString" };

  geometry.coordinates = [];

  var geometry1 = [];

  geometry1.push(points[0]);

  geometry1.push(ms.geometry.pointBetween(points[0], points[1], 0.2));

  geometry1.push(
    ms.geometry.toDistanceBearing(
      ms.geometry.pointBetween(points[0], points[1], 0.25),
      widht,
      bearing + 90
    )
  );
  geometry1.push(
    ms.geometry.toDistanceBearing(
      ms.geometry.pointBetween(points[0], points[1], 0.3),
      widht,
      bearing - 90
    )
  );
  geometry1.push(
    ms.geometry.toDistanceBearing(
      ms.geometry.pointBetween(points[0], points[1], 0.35),
      widht,
      bearing + 90
    )
  );
  geometry1.push(
    ms.geometry.toDistanceBearing(
      ms.geometry.pointBetween(points[0], points[1], 0.4),
      widht,
      bearing - 90
    )
  );
  geometry1.push(
    ms.geometry.toDistanceBearing(
      ms.geometry.pointBetween(points[0], points[1], 0.45),
      widht,
      bearing + 90
    )
  );
  geometry1.push(
    ms.geometry.toDistanceBearing(
      ms.geometry.pointBetween(points[0], points[1], 0.5),
      widht,
      bearing - 90
    )
  );
  geometry1.push(
    ms.geometry.toDistanceBearing(
      ms.geometry.pointBetween(points[0], points[1], 0.55),
      widht,
      bearing + 90
    )
  );
  geometry1.push(
    ms.geometry.toDistanceBearing(
      ms.geometry.pointBetween(points[0], points[1], 0.6),
      widht,
      bearing - 90
    )
  );
  geometry1.push(
    ms.geometry.toDistanceBearing(
      ms.geometry.pointBetween(points[0], points[1], 0.65),
      widht,
      bearing + 90
    )
  );
  geometry1.push(
    ms.geometry.toDistanceBearing(
      ms.geometry.pointBetween(points[0], points[1], 0.7),
      widht,
      bearing - 90
    )
  );
  geometry1.push(
    ms.geometry.toDistanceBearing(
      ms.geometry.pointBetween(points[0], points[1], 0.75),
      widht,
      bearing + 90
    )
  );

  geometry1.push(ms.geometry.pointBetween(points[0], points[1], 0.8));

  geometry1.push(points[1]);

  var geometry2 = [];
  geometry2.push(
    ms.geometry.toDistanceBearing(points[0], widht * 1.5, bearing + 45)
  );
  geometry2.push(points[0]);
  geometry2.push(
    ms.geometry.toDistanceBearing(points[0], widht * 1.5, bearing - 45)
  );

  geometry.coordinates = [geometry1, geometry2];
  return { geometry: geometry };
}

module.exports = fix;

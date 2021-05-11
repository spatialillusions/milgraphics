var ms = require("milsymbol");
const convertToDashes = require("../geometry/converttodashes");

// Draws a corridor with a widht in meters
function counterattack(feature) {
  var direction, width;
  var points = [...feature.geometry.coordinates];
  var arrowHead = points.pop();
  var widthHeadRatio = 0.7;
  var annotations = [];
  var geometry = { type: "MultiLineString", coordinates: [] };
  var geometry1 = [];

  // Width of the arrow
  direction = ms.geometry.bearingBetween(points[0], points[1]);
  var deltaDirection = direction - ms.geometry.bearingBetween(points[0], arrowHead);
  var distance = ms.geometry.distanceBetween(points[0], arrowHead);
  var arrowHead2 = ms.geometry.toDistanceBearing(
    points[0],
    distance,
    direction + deltaDirection
  );
  width = ms.geometry.distanceBetween(arrowHead, arrowHead2) / 2;

  direction =
    (ms.geometry.bearingBetween(
      points[points.length - 1],
      points[points.length - 2]
    ) +
      360) %
    360;
  geometry1.push(
    ms.geometry.toDistanceBearing(
      points[points.length - 1],
      width * widthHeadRatio,
      direction - 90
    )
  );

  for (var j = points.length - 2; j > 0; j--) {
    var direction1 =
      (ms.geometry.bearingBetween(points[j], points[j + 1]) + 360) % 360;
    var direction2 =
      (ms.geometry.bearingBetween(points[j], points[j - 1]) + 360) % 360;
    var factor = 1 / Math.sin((direction2 - direction1) / 2 * (Math.PI / 180));
    geometry1.push(
      ms.geometry.toDistanceBearing(
        points[j],
        width * widthHeadRatio * factor,
        (direction1 + direction2) / 2
      )
    );
  }

  // Arrowhead
  direction = (ms.geometry.bearingBetween(points[0], points[1]) + 180) % 360;
  geometry1.push(
    ms.geometry.toDistanceBearing(
      arrowHead,
      width * (1 - widthHeadRatio),
      direction + 90
    )
  );
  geometry1.push(arrowHead, points[0], arrowHead2,
    ms.geometry.toDistanceBearing(
      arrowHead2,
      width * (1 - widthHeadRatio),
      direction - 90
    )
  );

  for (j = 1; j < points.length - 1; j++) {
    direction1 =
      (ms.geometry.bearingBetween(points[j], points[j + 1]) + 360) % 360;
    direction2 =
      (ms.geometry.bearingBetween(points[j], points[j - 1]) + 360) % 360;
    factor = 1 / Math.sin((direction2 - direction1) / 2 * (Math.PI / 180));
    geometry1.push(
      ms.geometry.toDistanceBearing(
        points[j],
        -(width * widthHeadRatio) * factor,
        (direction1 + direction2) / 2
      )
    );
  }

  direction =
    (ms.geometry.bearingBetween(
      points[points.length - 1],
      points[points.length - 2]
    ) +
      360) %
    360;
  geometry1.push(
    ms.geometry.toDistanceBearing(
      points[points.length - 1],
      width * widthHeadRatio,
      direction + 90
    )
  );

  annotations.push(ms.geometry.addAnotation(ms.geometry.pointBetween(points[0], points[1], 0.5), "CATK"));
  geometry.coordinates = convertToDashes(geometry1, 1 / 64);

  return { geometry: geometry, annotations: annotations, props: { dashes: true } };
}

module.exports = counterattack;

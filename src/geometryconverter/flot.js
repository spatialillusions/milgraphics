var ms = require("milsymbol");

function flot(feature) {
  const bearing_width = 50; // Width of bearings in FLOT TODO - implement
  const spacing = 2; // Spacing between bearings in FLOT TODO - implement

  //var direction, width;
  var annotations = [{}];
  var points = feature.geometry.coordinates;

  var geometry = {type: "MultiLineString"};
  geometry.coordinates = [];

  // Geometry 1 - bearing line of n points
  var geometry1 = [];
  var distance = 0;
  for (var i = 1; i < points.length; i += 1) {
    // measure distance between each two points
    distance = ms.geometry.distanceBetween(points[i - 1], points[i])
    // TODO calculate how many bearings can fit
    
    // TODO visualize that many bearings

    // Making each segment into a bearing line with 2^5 = 32 bearings
    geometry1 = flotify(geometry1, points[i - 1], points[i], 5)
  }

  geometry.coordinates = [geometry1];

  annotations[0].geometry = {type: "Point"};
  annotations[0].properties = {};
  annotations[0].properties.text = "FLOT";
  annotations[0].geometry.coordinates = ms.geometry.pointBetween(// TODO change to point if odd number
    points[parseInt(points.length / 2) - 1],
    points[parseInt(points.length / 2)],
    0.5
  );

  return {geometry: geometry, annotations: annotations};
}

function flotify(geo, pointa, pointb, degree = 0) {

  // Logging - TODO remove when no longer necessary
  // console.log("FLOT DEG ", degree)
  // console.log("geo: ", geo)
  // console.log("A: ", pointa, "| B: ", pointb)

  if (degree <= 0) {
    geo.push(pointa, pointb)
    return geo;
  }

  const width = ms.geometry.distanceBetween(pointa, pointb);
  const midpoint = ms.geometry.pointBetween(pointa, pointb, 0.5);
  const curveBearing = ms.geometry.bearingBetween(pointa, pointb);

  // TODO try to implement gaps between bearings
  // TODO implement absolute unchanging width
  if (degree === 1) {
    for (var i = 0; i < 180; i += 10) {
      geo.push(
        ms.geometry.toDistanceBearing(
          midpoint,
          width / 2,
          curveBearing + i + 180
        )
      );
    }
  } else {
    geo = flotify(geo, pointa, midpoint, degree - 1)
    geo = flotify(geo, midpoint, pointb, degree - 1)
  }
  return geo;
}

module.exports = flot;


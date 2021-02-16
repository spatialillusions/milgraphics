var ms = require("milsymbol");

function flot(feature) {
  const bearing_width = 50; // Width of bearings in FLOT TODO - implement
  const spacing = 2; // Spacing between bearings in FLOT TODO - implement

  //var direction, width;
  var annotations = [{}];
  var points = feature.geometry.coordinates;

  var geometry = {type: "MultiLineString"};
  geometry.coordinates = [];

  var geometry1 = [];
  geometry1 = flotify(geometry1, points[0], points[1], 5)
  geometry1 = flotify(geometry1, points[1], points[2], 0)
  geometry1 = flotify(geometry1, points[2], points[3], 0)
  //geometry1.push(points[0], points[1], points[2], points[3]); // TODO - implement for more input points

  /*  var geometry2 = [];
    var midpoint = ms.geometry.pointBetween(points[0], points[1], 0.5);
    geometry2.push(points[2], points[3], midpoint);
  */
  geometry.coordinates = [geometry1];

  annotations[0].geometry = {type: "Point"};
  annotations[0].properties = {};
  annotations[0].properties.text = "FLOT";
  annotations[0].geometry.coordinates = ms.geometry.pointBetween(
    points[1],
    points[2],
    0.5
  );

  return {geometry: geometry, annotations: annotations};
}

function flotify(geo, pointa, pointb, degree = 0) {

  console.log("FLOT DEG ", degree)
  console.log("geo: ", geo)
  console.log("A: ", pointa, "| B: ", pointb)

  if (degree <= 0) {
    geo.push(pointa, pointb)
    return geo;
  }

  const width = ms.geometry.distanceBetween(pointa, pointb);
  const midpoint = ms.geometry.pointBetween(pointa, pointb, 0.5);
  const curveBearing = ms.geometry.bearingBetween(pointa, pointb);


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
    // TODO add midpoint?
    geo = flotify(geo, midpoint, pointb, degree - 1)
  }
  return geo;
}

module.exports = flot;


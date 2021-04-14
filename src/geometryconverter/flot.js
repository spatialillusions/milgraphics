var ms = require("milsymbol");

function flot(feature) {

  //var direction, width;
  var annotations = [{}];
  var points = feature.geometry.coordinates;

  var geometry = {type: "MultiLineString"};
  geometry.coordinates = [];

  // Geometry 1 - bearing line of n points
  var geometry1 = [];
  var distance = 0;
  // loop to repeat for every segment of the polygon that was input
  for (var i = 1; i < points.length; i += 1) {
    // visualize that many bearings
    geometry1 = flotifyAbsolute(geometry1, points[i - 1], points[i])

    // Alternative - old implementation based on relative sizes of bearings
    // Making each segment into a bearing line with 2^5 = 32 bearings
    // geometry1 = flotify(geometry1, points[i - 1], points[i], 5)
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

function flotifyAbsolute(geo, pointa, pointb, bearingWidth = 50, bearingSpacing = 2) {// TODO Add spacing if relevant

  // measure distance between each two points
  let distance = ms.geometry.distanceBetween(pointa, pointb);
  // calculate how many bearings can fit
  let numBearings = Math.floor(distance / bearingWidth)
  // calculate padding
  let padding = ((distance - (numBearings * bearingWidth)) / 2)

  console.log("distance: ", distance)
  console.log("numBearings: ", numBearings)
  console.log("padding: ", padding)

  // add first point before padding
  geo.push(pointa)

  // loop for number of bearings, move the starting point and create the bearing
  for (var i = 1; i <= numBearings; i += 1) {
    // draw bearings of constant size along the dedicated segment, starting at a point offset by the internal padding
    let leftAnchor = ms.geometry.pointBetweenAbsolute(pointa, pointb, (padding + ((i * bearingWidth) - bearingWidth)));
    let rightAnchor = ms.geometry.pointBetweenAbsolute(pointa, pointb, (padding + ((i * bearingWidth))));
    let curveBearing = ms.geometry.bearingBetween(leftAnchor, rightAnchor);
    midpoint = ms.geometry.pointBetweenAbsolute(pointa, pointb, (padding + ((i * bearingWidth) - bearingWidth / 2)));
    for (var j = 0; j <= 180; j += 10) {
      geo.push(
        ms.geometry.toDistanceBearing(
          midpoint,
          bearingWidth / 2,
          curveBearing + j + 180
        )
      )
    }
  }
  // add last point before padding
  geo.push(pointb)
  // possible TODO: try to implement gaps between bearings

  return geo;
}

module.exports = flot;


var ms = require("milsymbol");

function contain(feature) {
    let annotations = [],
        points = feature.geometry.coordinates,
        center = ms.geometry.pointBetween(points[0], points[1], 0.5),
        geometry = { type: "MultiLineString", coordinates: [] };

    // Ensure points are counter-clockwise, so the semi circle is drawn on the correct side
    if(ms.geometry.isClockwise(...points))
        points = [points[1], points[0], points[2]];

    // Draw a semicircle with openings points[0] and points[1], oriented away from points[2], with "spokes" facing inward
    let semiCircle = [],
        spokes = [],
        radius = ms.geometry.distanceBetween(points[0], points[1]) / 2,
        intialBearing = ms.geometry.bearingBetween(center, points[0]);
    for (var direction = intialBearing; direction <= intialBearing + 180; direction += 18) {
        let vert = ms.geometry.toDistanceBearing(center, radius, direction);
        semiCircle.push(vert);
        spokes.push([vert, ms.geometry.pointBetween(vert, center, 0.33)]);
    }
    geometry.coordinates.push(semiCircle, ...spokes);

    // Draw the arrow head
    let scale = ms.geometry.distanceBetween(points[2], center),
        bearing = ms.geometry.bearingBetween(points[0], points[1]),
        arrowHead = [];
    arrowHead.push(ms.geometry.toDistanceBearing(center, scale * 0.15, bearing + 60));
    arrowHead.push(center);
    arrowHead.push(ms.geometry.toDistanceBearing(center, scale * 0.15, bearing + 60 + 60));
    geometry.coordinates.push(arrowHead);

    // Draw the arrow body
    geometry.coordinates.push([points[2], center]);

    annotations[0] = {};
    annotations[0].geometry = { type: "Point" };
    annotations[0].properties = {};
    annotations[0].properties.text = "C";
    annotations[0].geometry.coordinates = ms.geometry.toDistanceBearing(center, radius, intialBearing + 90);

    annotations[1] = {};
    annotations[1].geometry = { type: "Point" };
    annotations[1].properties = {};
    annotations[1].properties.text = "ENY";
    annotations[1].geometry.coordinates = ms.geometry.pointBetween(points[2], center, 0.5);

    return { geometry: geometry, annotations: annotations };
}

module.exports = contain;

var ms = require("milsymbol");

module.exports = function(feature) {
    var points = feature.geometry.coordinates;
    var geometry = { type: "MultiLineString", coordinates: [] };
    var scale = ms.geometry.distanceBetween(points[0], points[1]);
    var pMid = ms.geometry.pointBetween(points[0], points[1], 0.5);
    var length = ms.geometry.distanceBetween(pMid, points[2]);
    var bearing = ms.geometry.bearingBetween(points[0], points[1]);

    var geom = [
        points[0],
        ms.geometry.toDistanceBearing(points[0], length, bearing + 90),
        ms.geometry.toDistanceBearing(points[1], length, bearing + 90),
        points[1]
    ];
    geometry.coordinates.push(geom);

    geom = [
        ms.geometry.toDistanceBearing(points[0], scale * 0.2, bearing + 90 - 30),
        points[0],
        ms.geometry.toDistanceBearing(points[0], scale * 0.2, bearing + 90 + 30),
    ];
    geometry.coordinates.push(geom);

    geom = [
        ms.geometry.toDistanceBearing(points[1], scale * 0.2, bearing + 90 - 30),
        points[1],
        ms.geometry.toDistanceBearing(points[1], scale * 0.2, bearing + 90 + 30),
    ];
    geometry.coordinates.push(geom);

    var annotations = [{
        geometry: { type: "Point", coordinates: points[2] },
        properties: { text: "B" }
    }];

    return { geometry: geometry, annotations: annotations };
};
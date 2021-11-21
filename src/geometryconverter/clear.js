var ms = require("milsymbol");

module.exports = function(feature) {
    var points = feature.geometry.coordinates;
    var geometry = { type: "MultiLineString", coordinates: [] };
    var scale = ms.geometry.distanceBetween(points[0], points[1]);

    var geom = [points[0], points[1]];
    geometry.coordinates.push(geom);

    var pMid = ms.geometry.pointBetween(points[0], points[1], 0.5);
    var length = ms.geometry.distanceBetween(pMid, points[2]);
    var bearing = ms.geometry.bearingBetween(points[0], points[1]);

    geom = [pMid, ms.geometry.toDistanceBearing(pMid, length, bearing + 90)];
    geometry.coordinates.push(geom);

    var annotations = [{
        geometry: {
            type: "Point",
            coordinates: ms.geometry.pointBetween(
                pMid,
                geom[1],
                0.5
            )
        },
        properties: { text: "C" }
    }];

    geom = [
        ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60),
        pMid,
        ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60 + 60)
    ];
    geometry.coordinates.push(geom);

    pMid = ms.geometry.pointBetween(points[0], points[1], 0.2);
    geom = [pMid, ms.geometry.toDistanceBearing(pMid, length, bearing + 90)];
    geometry.coordinates.push(geom);

    geom = [
        ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60),
        pMid,
        ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60 + 60)
    ];
    geometry.coordinates.push(geom);

    pMid = ms.geometry.pointBetween(points[0], points[1], 0.8);
    geom = [pMid, ms.geometry.toDistanceBearing(pMid, length, bearing + 90)];
    geometry.coordinates.push(geom);

    geom = [
        ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60),
        pMid,
        ms.geometry.toDistanceBearing(pMid, scale * 0.15, bearing + 60 + 60)
    ];
    geometry.coordinates.push(geom);

    return { geometry: geometry, annotations: annotations };
};
var ms = require("milsymbol");

module.exports = function(feature) {
    var directionFactor = -1;
    var points = feature.geometry.coordinates;
    var width = ms.geometry.distanceBetween(points[1], points[2]);
    var bearing = ms.geometry.bearingBetween(points[0], points[1]);

    var geometry = { type: "MultiLineString", coordinates: [] };
    var geometry1 = [
        points[0],
        points[1]
    ];

    var midpoint = ms.geometry.pointBetween(points[1], points[2], 0.5);
    var curveBearing = ms.geometry.bearingBetween(points[1], points[2]);
    if (curveBearing < 0 && bearing < 0) directionFactor = 1; // OK
    //if (curveBearing > 0 && bearing < 0)directionFactor = -1; // OK
    //if (curveBearing < 0 && bearing > 0)directionFactor = -1; // OK
    //if (curveBearing > 0 && bearing > 0)directionFactor = -1; // OK
    //var directionFactor = (Math.abs(curveBearing)/curveBearing)*(Math.abs(bearing)/bearing);

    for (var i = 10; i < 180; i += 10) {
        geometry1.push(
            ms.geometry.toDistanceBearing(
                midpoint,
                width / 2,
                curveBearing + i * directionFactor + 180
            )
        );
    }
    geometry1.push(points[2]);

    // Geometry 2 - The head of the arrow:
    var geometry2 = [
        ms.geometry.toDistanceBearing(points[0], width * 0.4, bearing + 45), // Right end
        points[0], // Tip of the arrow
        ms.geometry.toDistanceBearing(points[0], width * 0.4, bearing - 45) // Left end
    ];

    geometry.coordinates = [geometry1, geometry2];
    var annotations = [{
        geometry: {
            type: "Point",
            coordinates: ms.geometry.pointBetween(
                points[0],
                points[1],
                0.5
            )
        },
        properties: {
            text: feature.properties.dtg ? feature.properties.dtg + "\nD" : "D"
        }
    }];

    return { geometry: geometry, annotations: annotations };
};
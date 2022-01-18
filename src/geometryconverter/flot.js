var ms = require("milsymbol");

function flot(feature, relative = false) {
    var points = feature.geometry.coordinates;
    var geometry = { type: "MultiLineString", coordinates: [] };

    // Geometry 1 - bearing line of n points
    var bearingGeos = [];

    var bearingWidth = (feature.properties.bearingWidth) ? feature.properties.bearingWidth : 400;



    // loop to repeat for every segment of the polygon that was input
    for (var i = 1; i < points.length; i += 1) {
        if (relative === false) {
            // visualize that many bearings with absolute width
            bearingGeos = flotifyAbsolute(bearingGeos, points[i - 1], points[i], bearingWidth)
        } else {
            // Alternative - old implementation based on relative sizes of bearings
            // Making each segment into a bearing line with 2^5 = 32 bearings
            bearingGeos = flotifyRelative(bearingGeos, points[i - 1], points[i], 5)
        }
    }

    // visualise individual bearings
    for (var i = 0; i < bearingGeos.length; i += 1) {
        geometry.coordinates.push(bearingGeos[i]);
    }

    var annotations = {
        geometry: { type: "Point" },
        properties: { text: "FLOT" }
    };
    // if odd number of vertices, put on central vertex
    if (points.length % 2 !== 0) {
        // takes the central vertex by automatic rounding down and indexing from zero
        annotations.geometry.coordinates = points[parseInt(points.length / 2)];
    }
    // otherwise even number of vertices mean odd number of sides, put on central side
    else {
        annotations.geometry.coordinates = ms.geometry.pointBetween(
            points[parseInt(points.length / 2) - 1],
            points[parseInt(points.length / 2)],
            0.5
        );
    }

    return { geometry: geometry, annotations: [annotations] };
}

// old implementation, creates a bearing line with 2^(degree-1) bearings, each segment has bearings of different size
// example: degree = 5, then number of bearings is 2^4 = 16 in each segment
// if degree is zero, it draws a straight line
//  gaps or spacing is implemented in this version
function flotifyRelative(geo, pointa, pointb, degree = 0, bearingSpacing = 4) {

    if (degree <= 0) {
        geo.push(pointa, pointb)
        return geo;
    }

    const width = ms.geometry.distanceBetween(pointa, pointb);
    const midpoint = ms.geometry.pointBetween(pointa, pointb, 0.5);
    const curveBearing = ms.geometry.bearingBetween(pointa, pointb);

    if (degree === 1) {
        var bearingGeo = [];
        for (var i = 0; i <= 180; i += 10) {
            bearingGeo.push(
                ms.geometry.toDistanceBearing(
                    midpoint,
                    width / 2 - bearingSpacing / 2,
                    curveBearing + i + 180
                )
            );
        }
        geo.push(bearingGeo)
    } else {
        geo = flotifyRelative(geo, pointa, midpoint, degree - 1)
        geo = flotifyRelative(geo, midpoint, pointb, degree - 1)
    }
    return geo;
}


function flotifyAbsolute(geo, pointa, pointb, bearingWidth, bearingSpacing = 4) {
    // measure distance between each two points
    let distance = ms.geometry.distanceBetween(pointa, pointb);
    // calculate how many bearings can fit
    let widthMeasure = 0;
    let numBearings = 0;
    // if segment is longer than at least one bearing, calculate number and length of bearing line
    if (bearingWidth < distance) {
        numBearings = 1;
        widthMeasure = widthMeasure + bearingWidth;
        if (widthMeasure <= distance) {
            while (widthMeasure <= distance) {
                widthMeasure = widthMeasure + bearingSpacing + bearingWidth;
                numBearings = numBearings + 1;
            }
            // correction due to overshoot in while loop
            numBearings = numBearings - 1;
            widthMeasure = widthMeasure - bearingSpacing - bearingWidth;
        }
    }
    // calculate padding on the sides of the segment
    let padding = ((distance - widthMeasure) / 2)

    // loop for number of bearings, move the starting point and create the bearing
    for (var i = 1; i <= numBearings; i += 1) {

        var bearingGeo = [];

        // draw bearings of constant size along the dedicated segment, starting at a point offset by the internal padding
        let leftAnchor = ms.geometry.pointBetweenAbsolute(
            pointa, pointb, (padding + ((i * bearingWidth) - bearingWidth) + (i - 1) * bearingSpacing)
        );
        let rightAnchor = ms.geometry.pointBetweenAbsolute(
            pointa, pointb, (padding + ((i * bearingWidth)) + (i - 1) * bearingSpacing)
        );
        let curveBearing = ms.geometry.bearingBetween(leftAnchor, rightAnchor);
        midpoint = ms.geometry.pointBetweenAbsolute(
            pointa, pointb, (padding + ((i * bearingWidth) - bearingWidth / 2) + (i - 1) * bearingSpacing)
        );
        // actually visualising the bearing
        for (var j = 0; j <= 180; j += 10) {
            bearingGeo.push(
                ms.geometry.toDistanceBearing(
                    midpoint,
                    bearingWidth / 2,
                    curveBearing + j + 180
                )
            )
        }
        geo.push(bearingGeo)
    }

    return geo;
}

module.exports = flot;
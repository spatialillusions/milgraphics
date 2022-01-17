var ms = require("milsymbol");

module.exports = function(feature) {
    //var direction, width;
    console.log(feature);
    var points = feature.geometry.coordinates;
    var name = feature.properties.name;
    var annotations = [];
    var geometry = { type: "MultiLineString" };
    var geometry1 = [];
    for (var i = 1; i < points.length; i += 1) {
        // measure distance between each two points
        distance = ms.geometry.distanceBetween(points[i - 1], points[i])
            // Making each segment straight
        geometry1 = laundery(geometry1, points[i - 1], points[i], 0, 0)
    }
    geometry.coordinates = [geometry1];

    annotations.push(ms.geometry.addAnotation(points[0], name));
    annotations.push(ms.geometry.addAnotation(points.slice(-1)[0], name));

    return { geometry: geometry, annotations: annotations };
}

function laundery(geo, pointa, pointb, degree = 0) {
    if (degree <= 0) {
        geo.push(pointa, pointb)
        return geo;
    }
}
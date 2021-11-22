var ms = require("milsymbol");

module.exports = function(feature) {


    var points = feature.geometry.coordinates;
    var geometry = { type: "MultiLineString", coordinates: [] };

    var annotations = [];
    var annotationTop = feature.properties.name;
    var annotationUnder = "";


    if (feature.properties.administrator)
        annotationTop +=
        " " + feature.properties.administrator;
    if (feature.properties.w)
        annotationUnder += feature.properties.w;
    if (feature.properties.w1)
        annotationUnder += " -\n" + feature.properties.w1;

    geometry.coordinates = [points];
    annotations.push(ms.geometry.addAnotation(ms.geometry.toDistanceBearing(points[0], 30, 45), annotationTop));
    annotations.push(ms.geometry.addAnotation(ms.geometry.toDistanceBearing(points.slice(-1)[0], 30, -45), annotationTop));

    annotations.push(ms.geometry.addAnotation(ms.geometry.toDistanceBearing(points[0], -30, -45), annotationUnder));
    annotations.push(ms.geometry.addAnotation(ms.geometry.toDistanceBearing(points.slice(-1)[0], -30, 45), annotationUnder));

    annotations.push(ms.geometry.addAnotation(ms.geometry.toDistanceBearing(points[0], 40, -90), "PL "+feature.properties.t1));
    annotations.push(ms.geometry.addAnotation(ms.geometry.toDistanceBearing(points.slice(-1)[0], 40, 90), "PL "+feature.properties.t1));

    return { geometry: geometry, annotations: annotations };
};
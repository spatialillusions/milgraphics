var ms = require("milsymbol");
const { getPointResolution } = require("ol/proj");
const convertToDashes = require("../geometry/converttodashes");

module.exports = function(feature) {

    var points = feature.geometry.coordinates;
    var geometry = { type: "MultiLineString", coordinates: [] };
    var geometry1 = [];
    var annotationText = feature.properties.name;

    for (var i = 0; i < points.length; i++) {
        geometry1.push(points[i]);

    }

    var annotations = {
        geometry: { type: "Point" },
        properties: { text: annotationText }
    };

    // if odd number of vertices, put on central vertex
    if (points.length % 2 !== 0) {
        annotations.geometry.coordinates = points[parseInt(points.length / 2)];
    } else {
        annotations.geometry.coordinates = ms.geometry.pointBetween(
            points[parseInt(points.length / 2) - 1],
            points[parseInt(points.length / 2)],
            0.5
        );
    }
    if (feature.properties.administrator)
        annotations.properties.text +=
        " " + feature.properties.administrator;
    if (feature.properties.nationality)
        annotations.properties.text += " (" + feature.properties.nationality + ") ";


    geometry.coordinates = convertToDashes(geometry1, 1 / 50);


    return { geometry: geometry, annotations: [annotations], props: { dashes: true } };
};
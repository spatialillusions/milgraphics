var ms = require("milsymbol");
const toDistanceBearing = require("../geometry/todistancebearing");

module.exports = function(feature) {
    var annotations = [];
    var points = feature.geometry.coordinates;
    var annotationText = feature.properties.name;
    var distance = feature.properties.distance; //distance in meters
    var centerPoint = ms.geometry.pointBetween(points[0], points[1], 0.5);
    var topPoint = ms.geometry.toDistanceBearing(centerPoint, distance / 2, 360);
    var bottomPoint = ms.geometry.toDistanceBearing(centerPoint, distance / 2, 180);

    annotations.push(ms.geometry.addAnotation(topPoint, annotationText));
    annotations.push(ms.geometry.addAnotation(bottomPoint, annotationText));
    annotations.push(ms.geometry.addAnotation(points[0], annotationText));
    annotations.push(ms.geometry.addAnotation(points[1], annotationText));
    console.log(topPoint);

    switch (feature.properties.shape) {
        case "rectangular":
            var shape = ms.geometry.corridor(feature);
        case "circle":
            var shape = ms.geometry.circle(feature);
        case "polygon":
            var shape = ms.geometry.circleCorridorPolygon(feature);
            break;
        default:
            console.warn("Invalid feature type in SIDC: " + feature.properties.sidc);
    }

    //console.log(annotations);

    /*if (feature.properties.uniqueDesignation)
        annotations.properties.text +=
        "\n" + feature.properties.uniqueDesignation;

    if (feature.properties.dtg)
        annotations.properties.text += "\n" + feature.properties.dtg;

    if (feature.properties.dtg1)
      annotations.properties.text += "\n" + feature.properties.dtg1;

    var polygon = ms.geometry.circleCorridorPolygon(feature);

    if (polygon.annotation.hasOwnProperty("geometry")) {
        annotations.geometry = polygon.annotation.geometry;
    }*/

    return { geometry: shape.geometry, annotations: annotations };
};
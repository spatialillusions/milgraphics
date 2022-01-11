var ms = require("milsymbol");
const toDistanceBearing = require("../geometry/todistancebearing");

module.exports = function(feature) {
    var annotations = [];
    var annotationText = feature.properties.name;

    var points = feature.geometry.coordinates;
    var distance = feature.properties.distance; //distance in meters
    var centerPoint = points;


    annotations.push(ms.geometry.addAnotation(centerPoint[1], ""));


    var shape = ms.geometry.corridor(feature);


    return {
        geometry: shape.geometry,
        annotations: annotations
    };

};
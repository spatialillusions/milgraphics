var ms = require("milsymbol");

module.exports = function(feature) {


    var points = feature.geometry.coordinates;
    var geometry = { type: "MultiLineString", coordinates: [] };

    var annotations = [];
    var annotationText = feature.properties.name;


    if (feature.properties.administrator)
        annotationText +=
        " " + feature.properties.administrator;
    if (feature.properties.dtg)
        annotationText += "\n\n" + feature.properties.dtg;
    if (feature.properties.dtg1)
        annotationText += "\n\n" + feature.properties.dtg1;

    geometry.coordinates = [points];
    annotations.push(ms.geometry.addAnotation(points[0], annotationText));
    annotations.push(ms.geometry.addAnotation(points.slice(-1)[0], annotationText));

    return { geometry: geometry, annotations: annotations };
};
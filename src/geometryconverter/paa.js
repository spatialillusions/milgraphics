var ms = require("milsymbol");

module.exports = function(feature) {
    var points = feature.geometry.coordinates;
    var annotations = [];
    var geometry = { type: "LineString" };


    annotations.push(ms.geometry.addAnotation(points[0], "PAA 1"));

    //annotations.push(ms.geometry.addAnotation(points[1], "PAA ZONE 2"));

    var polygon = ms.geometry.corridor(feature);


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

    return { geometry: polygon.geometry, annotations: annotations };
};
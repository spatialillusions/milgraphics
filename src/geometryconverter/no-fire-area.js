var ms = require("milsymbol");
const toDistanceBearing = require("../geometry/todistancebearing");

module.exports = function(feature) {
    
    var points = feature.geometry.coordinates;
    var annotationText = feature.properties.name;
    var distance = feature.properties.distance; //distance in meters
    var centerPoint;
    var annotations = {
        geometry: { type: "Point", coordinates: centerPoint },
        properties: { text: annotationText }
    };

    

    if (feature.geometry.type == "Point") {
        centerPoint = points;

    } else if (feature.geometry.type == "LineString") {

        centerPoint = ms.geometry.pointBetween(points[0], points[1], 0.5);
        distance = distance / 2;

    } else if (feature.geometry.type = "Polygon") {

        //Variables for northernmost, southernmost coordinates for annotations in polygon
        var maxLongitudes = Math.max.apply(null, getLatLong(points).longitudes);
        var minLongitudes = Math.min.apply(null, getLatLong(points).longitudes);
        var northernmost;
        var southernmost;

        for (var a = 0; a < points[0].length; a++) {
            if (points[0][a][1] == minLongitudes) {
                northernmost = points[0][a];
            } else if (points[0][a][1] == maxLongitudes) {
                southernmost = points[0][a];
            }
        }
        centerPoint = ms.geometry.pointBetween(southernmost, northernmost, 0.5);

        console.log(maxLongitudes, minLongitudes);
    }



    var shape = ms.geometry.circleCorridorPolygon(feature);

    return {
        geometry: shape.geometry,
        annotations: [annotations]
    };

}

function getLatLong(array) {
    var latitudes = [];
    var longitudes = [];

    for (var i = 0; i < array[0].length; i++) {
        latitudes.push(array[0][i][0]);
        longitudes.push(array[0][i][1]);
    }

    return {
        latitudes,
        longitudes
    };
};
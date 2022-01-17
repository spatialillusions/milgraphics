var ms = require("milsymbol");

module.exports = function(feature) {
    var points = feature.geometry.coordinates;
    var geometry = { type: "MultiLineString", coordinates: [] };

    var annotations = [];
    var annotationTop = "";
    var annotationUnder = "";
    var annotationTopCoordinates;


    if (feature.properties.name)
        annotationTop += feature.properties.name;
    if (feature.properties.dtg)
        annotationUnder += feature.properties.dtg;
    if (feature.properties.dtg1)
        annotationUnder += " -\n" + feature.properties.dtg1;

    geometry.coordinates = [points];
     
  if (points.length % 2 !== 0) {
    annotationTopCoordinates = points[parseInt(points.length / 2)];
  }  else {
    annotationTopCoordinates = ms.geometry.pointBetween(
      points[parseInt(points.length / 2) - 1],
      points[parseInt(points.length / 2)],
      0.5
    );
  }

    annotations.push(ms.geometry.addAnotation(annotationTopCoordinates, annotationTop));

    annotations.push(ms.geometry.addAnotation(ms.geometry.toDistanceBearing(points[0], -30, -45), annotationUnder));


    return { geometry: geometry, annotations: annotations };
};
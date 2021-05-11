// Add anotationPoint with text

function addAnotation(annotationPoint, annotationText){
    return ({
      geometry: {
        type: "Point",
        coordinates: annotationPoint
      },
      properties: {
        text: annotationText
      }
    });
  }
  
  module.exports = addAnotation;
  
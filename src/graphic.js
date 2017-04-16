var ms = require("milsymbol");

function graphic(feature) {
  this.SIDC = feature.properties.sidc;
  this.converted = false;
  this.geometry = feature.geometry;
  this.properties = this.getProperties();

  if (this.properties.graphic) {
    // If we don't have a graphics cache, create one
    if (typeof ms._graphicCache === "undefined") {
      ms._graphicCache = {};
    }

    // Letter based SIDC.
    if (!this.properties.numberSIDC) {
      if (
        !ms._graphicCache.hasOwnProperty("letter-" + this.properties.numberSIDC)
      ) {
        var sidc = {};
        ms._getLetterSIDCgraphic(sidc, this.properties.numberSIDC);
        ms._graphicCache["letter-" + this.properties.numberSIDC] = sidc;
      }
      var graphics = ms._graphicCache["letter-" + this.properties.numberSIDC];
      var genericSIDC =
        this.SIDC.substr(0, 1) +
        "-" +
        this.SIDC.substr(2, 1) +
        "-" +
        this.SIDC.substr(4, 6);
      if (graphics[genericSIDC]) {
        var graphicObject = graphics[genericSIDC].call(this, feature);
        this.geometry = graphicObject.geometry;
        this.converted = true;
      } else {
        if (this.geometry.type != "Point") {
          // Points is likely symbols, remove this when everything is implemented.
          console.log(
            "Did not find graphic converter for: " +
              this.SIDC +
              " (" +
              this.geometry.type +
              ")"
          );
        }
      }
    } else {
      // Number based SIDC
      console.log("TODO number sidc stuff");
    }
  }
}

graphic.prototype.getProperties = require("./graphic/getproperties.js");
graphic.prototype.isConverted = function() {
  return this.converted;
};

module.exports = graphic;

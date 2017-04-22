var ms = require("milsymbol");

// Draws rectangle from input feature
module.exports = function(feature) {
  // A rectangle is just a two point corridor
  return ms.geometry.corridor(feature);
};

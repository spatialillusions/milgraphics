var addSIDCgraphics = function(parts, type) {
  if (typeof parts === "function") {
    if (typeof this["_" + type + "SIDCgraphics"] === "undefined") {
      this["_" + type + "SIDCgraphics"] = [];
    }
    this["_" + type + "SIDCgraphics"] = this[
      "_" + type + "SIDCgraphics"
    ].concat(parts);
  }
  return this;
};

module.exports = addSIDCgraphics;

var geometryConverter = {};

geometryConverter[
  "AIRSPACE COORDINATION AREA"
] = require("./geometryconverter/airspace-coordination-area.js");
geometryConverter["AMBUSH"] = require("./geometryconverter/ambush.js");
geometryConverter.block = require("./geometryconverter/block.js");
geometryConverter.bypass = require("./geometryconverter/bypass.js");
geometryConverter.canalize = require("./geometryconverter/canalize.js");
//geometryConverter.circle = require("./geometryconverter/circle.js");
geometryConverter.clear = require("./geometryconverter/clear.js");
geometryConverter.corridor = require("./geometryconverter/corridor.js");
geometryConverter.cover = require("./geometryconverter/cover.js");
geometryConverter.delay = require("./geometryconverter/delay.js");
geometryConverter[
  "FIRE SUPPORT AREA"
] = require("./geometryconverter/fire-support-area.js");
geometryConverter.fix = require("./geometryconverter/fix.js");
geometryConverter[
  "FREE FIRE AREA"
] = require("./geometryconverter/free-fire-area.js");
geometryConverter.guard = require("./geometryconverter/guard.js");
geometryConverter.isolate = require("./geometryconverter/isolate.js");
geometryConverter.mainAttack = require("./geometryconverter/mainattack.js");
geometryConverter[
  "NAMED AREA OF INTEREST"
] = require("./geometryconverter/named-area-of-interest.js");
geometryConverter.occupy = require("./geometryconverter/occupy.js");
geometryConverter.searchArea = require("./geometryconverter/search-area.js");
geometryConverter.supportingAttack = require("./geometryconverter/supportingattack.js");
geometryConverter[
  "TARGETED AREA OF INTEREST"
] = require("./geometryconverter/targeted-area-of-interest.js");

module.exports = geometryConverter;

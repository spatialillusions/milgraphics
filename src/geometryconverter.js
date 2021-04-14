var geometryConverter = {};

geometryConverter["PHASELINE"] = require("./geometryconverter/phase-line.js");
geometryConverter["BOUNDARIES"] = require("./geometryconverter/boundaries.js"); //just for developer purpose - unknown sidc
geometryConverter[
  "AIRSPACE COORDINATION AREA"
] = require("./geometryconverter/airspace-coordination-area.js");
geometryConverter["AMBUSH"] = require("./geometryconverter/ambush.js");
geometryConverter[
  "ARTILLERY TARGET INTELLIGENCE ZONE"
] = require("./geometryconverter/artillery-target-intelligence-zone.js");
geometryConverter["BLOCK"] = require("./geometryconverter/block.js");
geometryConverter["BREACH"] = require("./geometryconverter/breach.js");
geometryConverter["BYPASS"] = require("./geometryconverter/bypass.js");
geometryConverter[
  "CALL FOR FIRE ZONE"
] = require("./geometryconverter/call-for-fire-zone.js");
geometryConverter["CANALIZE"] = require("./geometryconverter/canalize.js");
geometryConverter["FLOT"] = require("./geometryconverter/flot.js");
geometryConverter["LINE OF CONTACT"] = require("./geometryconverter/line-of-contact.js");
geometryConverter[
  "CENSOR ZONE"
] = require("./geometryconverter/censor-zone.js");
//geometryConverter.circle = require("./geometryconverter/circle.js");
geometryConverter["CONTAIN"] = require("./geometryconverter/contain.js");
geometryConverter["COUNTERATTACK"] = require("./geometryconverter/counterattack.js");
geometryConverter["CLEAR"] = require("./geometryconverter/clear.js");
geometryConverter.corridor = require("./geometryconverter/corridor.js");
geometryConverter.cover = require("./geometryconverter/cover.js");
geometryConverter[
  "CRITICAL FRIENDLY ZONE"
] = require("./geometryconverter/critical-friendly-zone.js");
geometryConverter[
  "DEAD SPACE AREA"
] = require("./geometryconverter/dead-space-area.js");
geometryConverter["DELAY"] = require("./geometryconverter/delay.js");
geometryConverter[
  "FIRE SUPPORT AREA"
] = require("./geometryconverter/fire-support-area.js");
geometryConverter["FIX"] = require("./geometryconverter/fix.js");
geometryConverter[
  "FREE FIRE AREA"
] = require("./geometryconverter/free-fire-area.js");
geometryConverter.guard = require("./geometryconverter/guard.js");
geometryConverter["ISOLATE"] = require("./geometryconverter/isolate.js");
geometryConverter[
  "MAIN ATTACK"
] = require("./geometryconverter/main-attack.js");
geometryConverter[
  "NAMED AREA OF INTEREST"
] = require("./geometryconverter/named-area-of-interest.js");
geometryConverter.occupy = require("./geometryconverter/occupy.js");
geometryConverter[
  "RESTRICTIVE FIRE AREA"
] = require("./geometryconverter/restrictive-fire-area.js");
geometryConverter.searchArea = require("./geometryconverter/search-area.js");
geometryConverter[
  "SENSOR ZONE"
] = require("./geometryconverter/sensor-zone.js");
geometryConverter[
  "SUPPORTING ATTACK"
] = require("./geometryconverter/supporting-attack.js");
geometryConverter[
  "TARGET BUILD-UP AREA"
] = require("./geometryconverter/target-build-up-area.js");
geometryConverter[
  "TARGET VALUE AREA"
] = require("./geometryconverter/target-value-area.js");
geometryConverter[
  "TARGETED AREA OF INTEREST"
] = require("./geometryconverter/targeted-area-of-interest.js");
geometryConverter[
  "TERMINALLY GUIDED MUNITION FOOTPRINT"
] = require("./geometryconverter/terminally-guided-munition-footprint.js");
geometryConverter[
  "ZONE OF RESPONSIBILITY"
] = require("./geometryconverter/zone-of-responsibility.js");

module.exports = geometryConverter;

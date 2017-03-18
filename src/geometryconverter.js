var geometryConverter = {};

geometryConverter.block = require('./geometryconverter/block.js');
geometryConverter.bypass = require('./geometryconverter/bypass.js');
geometryConverter.canalize = require('./geometryconverter/canalize.js');
geometryConverter.circle = require('./geometryconverter/circle.js');
geometryConverter.clear = require('./geometryconverter/clear.js');
geometryConverter.corridor = require('./geometryconverter/corridor.js');
geometryConverter.cover = require('./geometryconverter/cover.js');
geometryConverter.delay = require('./geometryconverter/delay.js');
geometryConverter.fix = require('./geometryconverter/fix.js');
geometryConverter.guard = require('./geometryconverter/guard.js');
geometryConverter.isolate = require('./geometryconverter/isolate.js');
geometryConverter.mainAttack = require('./geometryconverter/mainattack.js');
geometryConverter.occupy = require('./geometryconverter/occupy.js');
geometryConverter.searchArea = require('./geometryconverter/search-area.js');
geometryConverter.supportingAttack = require('./geometryconverter/supportingattack.js');

module.exports = geometryConverter;
var geometryConverter = {};

geometryConverter.block = require('./geometryconverter/block.js');
geometryConverter.circle = require('./geometryconverter/circle.js');
geometryConverter.corridor = require('./geometryconverter/corridor.js');
geometryConverter.delay = require('./geometryconverter/delay.js');
geometryConverter.fix = require('./geometryconverter/fix.js');
geometryConverter.mainAttack = require('./geometryconverter/mainattack.js');
geometryConverter.supportingAttack = require('./geometryconverter/supportingattack.js');

module.exports = geometryConverter;
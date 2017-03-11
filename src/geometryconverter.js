var geometryConverter = {};

geometryConverter.circle = require('./geometryconverter/circle.js');
geometryConverter.corridor = require('./geometryconverter/corridor.js');
geometryConverter.mainAttack = require('./geometryconverter/mainattack.js');
geometryConverter.supportingAttack = require('./geometryconverter/supportingattack.js');

module.exports = geometryConverter;
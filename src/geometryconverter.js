var geometryConverter = {};

geometryConverter.circle = require('./geometryconverter/circle.js');
geometryConverter.corridor = require('./geometryconverter/corridor.js');
geometryConverter.mainAttack = require('./geometryconverter/mainattack.js');

module.exports = geometryConverter;
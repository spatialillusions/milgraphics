var geometryConverter = {};

geometryConverter.circle = require('./geometryconverter/circle.js');
geometryConverter.corridor = require('./geometryconverter/corridor.js');

module.exports = geometryConverter;
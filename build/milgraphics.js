/* ***************************************************************************************
Creating the base of milgraphics by importing milsymbol
*************************************************************************************** */
var ms = require('milsymbol');

ms.format = require('../src/format.js');
ms.geometry = require('../src/geometry.js');

ms.GraphicsLayer = require('../src/graphicslayer.js');

/* ***************************************************************************************
Export ms to the world
*************************************************************************************** */
module.exports = ms;
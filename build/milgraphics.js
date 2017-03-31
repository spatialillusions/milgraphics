/* ***************************************************************************************
Creating the base of milgraphics by importing milsymbol
*************************************************************************************** */
var ms = require('milsymbol');

ms.addSIDCgraphics = require('../src/ms/addsidcgraphics.js');

ms.format = require('../src/format.js');
ms.geometry = require('../src/geometry.js');
ms.geometryConverter = require('../src/geometryconverter.js');

ms.Graphic = require('../src/graphic.js');

ms.GraphicsLayer = require('../src/graphicslayer.js');

/* ***************************************************************************************
Letter based SIDC
*************************************************************************************** */
ms._getLetterPropertiesGraphic = require('../src/letter-sidc/properties.js');

ms._getLetterSIDCgraphic = require('../src/letter-sidc/getgraphic.js');
ms.addSIDCgraphics(require('../src/letter-sidc/tactical-2525.js'), 'letter');
ms.addSIDCgraphics(require('../src/letter-sidc/tactical-app6.js'), 'letter');
/* ***************************************************************************************
Number based SIDC
*************************************************************************************** */
ms._getNumberPropertiesGraphic = require('../src/number-sidc/properties.js');

/* ***************************************************************************************
Export ms to the world
*************************************************************************************** */
module.exports = ms;
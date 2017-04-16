/* ***************************************************************************************
Creating the base of milgraphics by importing milsymbol
*************************************************************************************** */
var ms = require('milsymbol');

ms.addSIDCgraphics = require('./ms/addsidcgraphics.js');

ms.format = require('./format.js');
ms.geometry = require('./geometry.js');
ms.geometryConverter = require('./geometryconverter.js');

ms.Graphic = require('./graphic.js');

ms.GraphicsLayer = require('./graphicslayer.js');

/* ***************************************************************************************
Letter based SIDC
*************************************************************************************** */
ms._getLetterPropertiesGraphic = require('./letter-sidc/properties.js');

ms._getLetterSIDCgraphic = require('./letter-sidc/getgraphic.js');
ms.addSIDCgraphics(require('./letter-sidc/tactical-2525.js'), 'letter');
ms.addSIDCgraphics(require('./letter-sidc/tactical-app6.js'), 'letter');
/* ***************************************************************************************
Number based SIDC
*************************************************************************************** */
ms._getNumberPropertiesGraphic = require('./number-sidc/properties.js');

/* ***************************************************************************************
Export ms to the world
*************************************************************************************** */
module.exports = ms;
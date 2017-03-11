var ms = require('milsymbol');

module.exports = function(sidc,STD2525){
	// We modify sidc directly in the called functions so we don't need to return anything.
  // Might change this later since it adds complexity to understand the code.
	for (var i in ms._letterSIDCgraphics){
		if (!ms._letterSIDCgraphics.hasOwnProperty(i)) continue;
		ms._letterSIDCgraphics[i].call(this,sidc,STD2525);
	}
};
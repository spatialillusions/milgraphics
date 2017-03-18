var ms = require('milsymbol');

function graphic(feature) {
  //=======================================================================================
  // The SIDC for the symbol.
  this.SIDC = feature.properties.sidc;

  this.properties = {numberSIDC: false}; // TODO Properties of the current marker

  // If we don't have a graphics cache, create one
  if (typeof ms._graphicCache === 'undefined'){
    ms._graphicCache = {};
  }

  //Letter based SIDCs.
	if(!this.properties.numberSIDC){
	  if (!ms._graphicCache.hasOwnProperty('letter-' + this.properties.numberSIDC)){
	    var sidc = {};
	    ms._getLetterSIDCgraphic(sidc,this.properties.numberSIDC);
	    ms._graphicCache['letter-' + this.properties.numberSIDC] = sidc;
	  }
	  var graphics = ms._graphicCache['letter-' + this.properties.numberSIDC];
	  var genericSIDC = this.SIDC.substr(0,1)+'-'+this.SIDC.substr(2,1)+'-'+this.SIDC.substr(4,6);
    if(graphics[genericSIDC]){
      var graphicObject = graphics[genericSIDC].call(this, feature);
      this.geometry = graphicObject.geometry;
      this.converted = true;
    }else{
      //TODO check if we need to clone here;
      console.log('Failed to convert: ' + this.SIDC);
      this.geometry = feature.geometry;
      this.converted = false;
    }
	}else{
	  console.log('TODO number sidc stuff')
	
	}
};

graphic.prototype.isConverted = function() { return this.converted; };

module.exports = graphic;
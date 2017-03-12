var ms = require('milsymbol');

var Graphic = function (feature){
  //=======================================================================================
  // The SIDC for the symbol.
  this.SIDC = feature.properties.SIDC;

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
      this.geometry = graphics[genericSIDC].call(this, feature);
    }else{
      //TODO check if we need to clone here;
      console.log('Failed to convert: ' + this.SIDC);
      this.geometry = feature.geometry;
    }
	}else{
	  console.log('TODO number sidc stuff')
	
	}
};

module.exports = Graphic;
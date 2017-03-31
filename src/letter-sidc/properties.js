var ms = require('milsymbol');

module.exports = function(properties, mapping){
	this.SIDC = this.SIDC.toUpperCase();

	var codingscheme 		= this.SIDC.charAt(0)!=''?this.SIDC.charAt(0):'-';
	var affiliation 		= this.SIDC.charAt(1)!=''?this.SIDC.charAt(1):'-';
	var battledimension = this.SIDC.charAt(2)!=''?this.SIDC.charAt(2):'-';
	var status 				  = this.SIDC.charAt(3)!=''?this.SIDC.charAt(3):'-';
	var functionid 			= properties.functionid	= this.SIDC.substr(4,6)!=''?this.SIDC.substr(4,6):'------';
	var symbolmodifier11 	= this.SIDC.charAt(10)!=''?this.SIDC.charAt(10):'-';
	var symbolmodifier12 	= this.SIDC.charAt(11)!=''?this.SIDC.charAt(11):'-';
	var countrycode 		= this.SIDC.substr(12,2)!=''?this.SIDC.substr(12,2):'--';
	var orderofbattle 		= this.SIDC.charAt(14)!=''?this.SIDC.charAt(14):'-';

	if(['H','S','J','K'].indexOf(affiliation) > -1)		properties.affiliation = mapping.affiliation[0];
	if(['F','A','D','M'].indexOf(affiliation) > -1)		properties.affiliation = mapping.affiliation[1];
	if(['N','L'].indexOf(affiliation) > -1)			properties.affiliation = mapping.affiliation[2];
	if(['P','U','G','W','O'].indexOf(affiliation) > -1)	properties.affiliation = mapping.affiliation[3];

	if(['P','A'].indexOf(battledimension) > -1)		properties.dimension = mapping.dimension[0];
	if(['G','Z','F','X'].indexOf(battledimension) > -1)	properties.dimension = mapping.dimension[1];
	if(['S'].indexOf(battledimension) > -1)			properties.dimension = mapping.dimension[2];
	if(['U'].indexOf(battledimension) > -1)			properties.dimension = mapping.dimension[3];
	
	//Planned/Anticipated/Suspect symbols should have a dashed outline
	if(status == 'A' ) {
	  properties.notpresent = ms._dashArrays.anticipated;
	}
	if((['P','A','S','G','M'].indexOf(affiliation) > -1)){
		properties.notpresent = ms._dashArrays.pending;
	}

  if (orderofbattle == 'X') {
    properties.graphic = true;
  }

	// Army XML compability
	//sidc['CIRCLE----'] = ms.geometryConverter.circle;

	// Systematic SitaWare compatibility
	var genericSIDC = this.SIDC.substr(0,1)+'-'+this.SIDC.substr(2,1)+'-'+this.SIDC.substr(4,6);
	if (['X---C-----','X---I-----','X---A-----'].indexOf(genericSIDC) != -1) {
	  properties.graphic = true;
	}

	return properties;
};
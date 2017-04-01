var ms = require('milsymbol');

module.exports = function(properties,mapping){
	var version  			= this.SIDC.substr(0,2);
	var standardIdentity1 	= this.SIDC.substr(2,1);
	var standardIdentity2 	= this.SIDC.substr(3,1);
	var symbolSet 			= this.SIDC.substr(4,2);
	var status 				= this.SIDC.substr(6,1);
	var headquartersTaskForceDummy = this.SIDC.substr(7,1);
	var echelonMobility 	= this.SIDC.substr(8,2);

	var affiliationMapping = {
		'0':'Unknown',
		'1':'Unknown',
		'2':'Friend',
		'3':'Friend',
		'4':'Neutral',
		'5':'Hostile',
		'6':'Hostile'};

	var dimensionMapping = {
		'00':'Sea',
		'01':'Air',
		'02':'Air',
		'05':'Air',
		'06':'Air',
		'10':'Ground',
		'11':'Ground',
		'12':'Ground',
		'15':'Ground',
		'20':'Ground',
		'30':'Sea',
		'35':'Subsurface',
		'36':'Subsurface',
		'39':'Subsurface',
		'40':'Ground',
		'50':'Air',
		'51':'Air',
		'52':'Ground',
		'53':'Sea',
		'54':'Subsurface',
		'60':'Ground'};

	var functionid = properties.functionid = this.SIDC.substr(10,10);

	properties.context = mapping.context[parseInt(this.SIDC.substr(2,1))];
	properties.affiliation = affiliationMapping[standardIdentity2];
	properties.dimension = dimensionMapping[symbolSet];

	//Planned/Anticipated/Suspect symbols should have a dashed outline
	if(status == '1' )properties.notpresent = ms._dashArrays.anticipated;
	if(standardIdentity2 == '0' || standardIdentity2 == '2' || standardIdentity2 == '5')properties.notpresent = ms._dashArrays.pending;

	if(echelonMobility >= 70 && echelonMobility < 80){
		properties.leadership = mapping.echelonMobility[echelonMobility];
	}

	return properties;
};
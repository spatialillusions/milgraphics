// SIDC parts for tactical points in 2525C
module.exports = function tacticalPoints(sidc,std2525){
	// Tactical Point Symbols =========================================================================
	// Systematic SitaWare compatibility
	sidc['X---I-----'] = ms.geometryConverter.circle;
	
	//2525B compatibility
	sidc['G-F-AZIC--'] = ms.geometryConverter.circle;

}
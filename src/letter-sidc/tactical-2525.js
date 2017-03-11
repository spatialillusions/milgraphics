// SIDC parts for tactical points in 2525C
module.exports = function tacticalPoints(sidc,std2525){
	// Tactical Point Symbols =========================================================================

	sidc['G-F-ACFC--'] = ms.geometryConverter.circle; //TACGRP.FSUPP.ARS.C2ARS.FFA.CIRCLR


	// Systematic SitaWare compatibility
	sidc['X---C-----'] = ms.geometryConverter.corridor;
	sidc['X---I-----'] = ms.geometryConverter.circle;

	//2525B compatibility
	sidc['G-F-AZIC--'] = ms.geometryConverter.circle;

}
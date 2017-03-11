// SIDC parts for tactical points in 2525C
module.exports = function tacticalPoints(sidc,std2525){
	// Tactical Point Symbols =========================================================================

	sidc['G-F-ACFC--'] = ms.geometryConverter.circle; //TACGRP.FSUPP.ARS.C2ARS.FFA.CIRCLR
	sidc['G-G-OLAGM-'] = ms.geometryConverter.mainAttack; //TACGRP.C2GM.OFF.LNE.AXSADV.GRD.MANATK
	sidc['G-G-OLAGS-'] = ms.geometryConverter.supportingAttack; //TACGRP.C2GM.OFF.LNE.AXSADV.GRD.MANATK

	// Systematic SitaWare compatibility
	sidc['X---C-----'] = ms.geometryConverter.corridor;
	sidc['X---I-----'] = ms.geometryConverter.circle;

	//2525B compatibility
	sidc['G-F-AZIC--'] = ms.geometryConverter.circle;

}
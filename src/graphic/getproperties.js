var ms = require('milsymbol');

module.exports = function(){
  var properties = {
//    "activity"			: false,	//Is it an Activity
    "affiliation"		: "",		//Affiliation it is shown as (Friend/Hostile...)
//    "baseAffilation"		: "",		//Affiliation it belongs to (Friend/Hostile...)
//    "baseDimension" 	: "",		//Dimension it belongs to (Air/Ground...)
//    "baseGeometry"		: {g:"",bbox:{}},		//Geometry is a combination of dimension and affiliation (AirFriend/GroundHostile...)
//    "civilian"			: false,	//Is it Civilian
//    "condition"		: "",		//What condition is it in
    "context"			: "",		//Context of the symbol (Reality/Exercise...)
    "dimension"		: "",		//Dimension it is shown as (Air/Ground...)
    "dimensionUnknown"	: false,	//Is the dimension unknown
    "echelon"			: "",		//What echelon (Platoon/Company...)
    "faker"			: false,	//Is it a Faker
    "fenintDummy"		: false,	//Is it a feint/dummy
//    "fill"				: this.fill,		//Standard says it should be filled
//    "frame"			: this.frame,		//Standard says it should be framed
    "functionid" 		: "", 		//Part of SIDC referring to the icon.
//    "headquarters"		: false,	//Is it a Headquarters
//    "installation" 		: false,	//Is it an Instalation
    "joker"			: false,	//Is it a Joker
//    "mobility"			: "",		//What mobility (Tracked/Sled)
    "notpresent"		: "",		//Is it Anticipated or Pending
    "numberSIDC"		: false,	//Is the SIDC number based
//    "space"			: false,	//Is it in Space
//    "taskForce"		: false		//Is it a task force
    "graphic" : false
  };
  var mapping = {};
  mapping.context = ["Reality","Exercise","Simulation"];
  mapping.status = ["Present","Planned","FullyCapable","Damaged","Destroyed","FullToCapacity"];
  mapping.affiliation = ["Hostile", "Friend", "Neutral", "Unknown"];
  mapping.dimension = ["Air", "Ground", "Sea", "Subsurface"];

  properties.context = mapping.context[0];

  if(this.monoColor != ''){
    properties.fill = false;
  }
  this.SIDC = String(this.SIDC).replace(/\*/g,"-").replace(/ /g,"");

  properties.numberSIDC = !isNaN(this.SIDC);
  if(properties.numberSIDC){ //This is for new number based SIDCs

    if (typeof ms._getNumberProperties === 'function') {
      properties = ms._getNumberPropertiesGraphic.call(this,properties, mapping);
    }else{
      console.warn("ms._getNumberPropertiesGraphic() is not present, you will need to load functionality for letter based SIDCs");
    }

  }else{ //This would be old letter based SIDCs

    if (typeof ms._getLetterProperties === 'function') {
      properties = ms._getLetterPropertiesGraphic.call(this,properties, mapping);
    }else{
      console.warn("ms._getLetterPropertiesGraphic() is not present, you will need to load functionality for letter based SIDCs");
    }

  }

  return properties;
};
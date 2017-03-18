// 
function block(feature){
  var direction, width;
  var points = feature.geometry.coordinates;
  
  var geometry = {"type": "MultiLineString"};

  geometry.coordinates = [];
  
  var geometry1 = [];
  geometry1.push(points[0],points[1]);
  
  var geometry2 = [];
  var midpoint = ms.geometry.pointBetween(points[0],points[1],0.5);
  geometry2.push(points[2],midpoint);
  
  geometry.coordinates = [geometry1,geometry2];
  return {geometry:geometry};
}

module.exports = block;
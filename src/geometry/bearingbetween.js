// Calculates the bearing between two points in meter
function bearingBetween(p1,p2){
  var l1 = p1[0] * (Math.PI/180);
  var l2 = p2[0] * (Math.PI/180);
  var f1 = p1[1] * (Math.PI/180);
  var f2 = p2[1] * (Math.PI/180);
  var y = Math.sin(l2-l1)*Math.cos(f2);
  var x = Math.cos(f1)*Math.sin(f2)-Math.sin(f1)*Math.cos(f2)*Math.cos(l2-l1);
  return Math.atan2(y,x)/(Math.PI/180);
}

module.exports = bearingBetween;
// Calculates the bearing between two points in meter
function toDistanceBearing(point, dist, bearing){
  var angularDist = dist/6371e3;
  var bearing = bearing * (Math.PI/180);
  var lng = point[0] * (Math.PI/180);
  var lat = point[1] * (Math.PI/180);
  var lat2 = Math.asin(Math.sin(lat)*Math.cos(angularDist)+Math.cos(lat)*Math.sin(angularDist)*Math.cos(bearing));
  var lng2 = (lng+Math.atan2(Math.sin(bearing)*Math.sin(angularDist)*Math.cos(lat),Math.cos(angularDist)-Math.sin(lat)*Math.sin(lat2)));
  lat2 = lat2/(Math.PI/180);
  lng2 = ((lng2/(Math.PI/180))+540)%360-180;
  return [lng2,lat2];
}

module.exports = toDistanceBearing;
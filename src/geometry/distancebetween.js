// Calculates the great circle distance between two points in meter
function distanceBetween(p1, p2) {
  var lng1 = p1[0];
  var lng2 = p2[0];
  var lat1 = p1[1];
  var lat2 = p2[1];

  var latRad1 = lat1 * (Math.PI / 180);
  var latRad2 = lat2 * (Math.PI / 180);
  var deltaLat = (lat2 - lat1) * (Math.PI / 180);
  var delataLng = (lng2 - lng1) * (Math.PI / 180);

  var a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(latRad1) *
      Math.cos(latRad2) *
      Math.sin(delataLng / 2) *
      Math.sin(delataLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (6371e3 * c).toFixed(1); // we don't expect more precision than this...
}

module.exports = distanceBetween;

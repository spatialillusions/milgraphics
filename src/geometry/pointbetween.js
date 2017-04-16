// Calculates a point between two other points at any fractional distance f between them
function pointBetween(p1, p2, f) {
  var lng1 = p1[0];
  var lng2 = p2[0];
  var lat1 = p1[1];
  var lat2 = p2[1];

  var lngRad1 = lng1 * (Math.PI / 180);
  var lngRad2 = lng2 * (Math.PI / 180);
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
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Angular distance

  var A = Math.sin((1 - f) * c) / Math.sin(c);
  var B = Math.sin(f * c) / Math.sin(c);

  var x =
    A * Math.cos(latRad1) * Math.cos(lngRad1) +
    B * Math.cos(latRad2) * Math.cos(lngRad2);
  var y =
    A * Math.cos(latRad1) * Math.sin(lngRad1) +
    B * Math.cos(latRad2) * Math.sin(lngRad2);
  var z = A * Math.sin(latRad1) + B * Math.sin(latRad2);

  var lng3 = Math.atan2(y, x) / (Math.PI / 180);
  var lat3 =
    (Math.atan2(z, Math.sqrt(x * x + y * y)) / (Math.PI / 180) + 540) % 360 -
    180;

  return [lng3, lat3];
}

module.exports = pointBetween;

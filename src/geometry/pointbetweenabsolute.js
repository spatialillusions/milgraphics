// Calculates a point between two points p1 and p2 at any absolute distance l from p1 in the direction of p2
// TODO find out distance units
function pointBetweenAbsolute(p1, p2, l) {
  // This can be optimized for performance by using the math directly, but this works the same and was quicker to implement

  // Calculate fraction of length
  frac = (l/ms.geometry.distanceBetween(p1,p2))

  // Designate the particular point using the fractional based function
  p3 = ms.geometry.pointBetween(p1,p2,frac)

  return p3
}

module.exports = pointBetweenAbsolute;

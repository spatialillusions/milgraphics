/**
 * Javascript function for generating hatch pattern
 * @param fill HEX color string
 * @param direction hatch direction, enum of HATCH_DIRECTION
 * @param size number value for spaces between lines
 */
function makePattern(fill, direction, size) {
  var cnv = document.createElement('canvas');
  var ctx = cnv.getContext('2d');
  cnv.width = size;
  cnv.height = size;
  ctx.fillStyle = fill;
  
  for (var i = 0; i < size; i++) {
    if (direction == 'obliqueLeft') {
      ctx.fillRect(i, i, 1, 1);
    }
    if (direction == 'obliqueRight') {
      ctx.fillRect(size - 1 - i, i, 1, 1);
    }
    if (direction == 'horizontal') {
      ctx.fillRect(i, 0, 1, 1);
    }
    if (direction == 'vertical') {
      ctx.fillRect(0, i, 1, 1);
    }
  }

  return ctx.createPattern(cnv, 'repeat');
}

module.exports = makePattern;

var ms = require("milsymbol");

/**
 * Takes a ring and return true or false whether or not the ring is clockwise or counter-clockwise.
 *
 * @name booleanClockwise
 * @param {float[]} points to be evaluated
 * @returns {boolean} true/false
 * @summary Checks curve orientation via the sign of the determinant
 **/
function isClockwise(...points) {
    let sum = 0,
        i = 1,
        prev,
        cur;

    while (i < points.length) {
        prev = cur || points[0];
        cur = points[i];
        sum += (cur[0] - prev[0]) * (cur[1] + prev[1]);
        i++;
    }
    return sum > 0;
}

module.exports = isClockwise;

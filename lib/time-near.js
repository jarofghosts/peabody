var FUZZINESS = 150 * 24 * 60 * 60 * 1000

module.exports = timeNear

function timeNear(t1, t2, _fuzz) {
  var fuzz = _fuzz || FUZZINESS

  t1 = isNaN(t1) ? Date.parse(t1) : +t1
  t2 = isNaN(t2) ? Date.parse(t2) : +t2

  return Math.abs(t1 - t2) < fuzz
}

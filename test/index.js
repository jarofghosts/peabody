var test = require('tape')

var timeNear = require('../lib/time-near')

test('returns true if time is within 150 days', function(t) {
  t.plan(2)

  t.ok(timeNear(Date.now(), Date.now() + days(149)))
  t.ok(timeNear('' + new Date(), '' + new Date(Date.now() + days(149))))
})

test('returns false if time is not within 150 days', function(t) {
  t.plan(1)

  t.ok(!timeNear(Date.now(), Date.now() + days(151)))
  t.ok(!timeNear('' + new Date(), '' + new Date(Date.now() + days(151))))
})

test('allows override of fuzziness', function(t) {
  t.plan(2)

  t.ok(timeNear(Date.now(), Date.now() + days(151), days(200)))
  t.ok(!timeNear(Date.now(), Date.now() + days(149), days(100)))
})

function days(x) {
  return x * 24 * 60 * 60 * 1000
}

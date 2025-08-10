import { test } from '@japa/runner'

// Tests for src/util/array-util.js
// Covers: getSafeArray edge cases (non-array numeric, NaN, padding), asPercentage formatting
import { getSafeArray, asPercentage } from '#src/util/array-util.js'

test.group('Array Util', () => {
  test('getSafeArray returns padded array for numeric input string', ({ assert }) => {
    // numeric string should be converted to number and padded to length 8
    const res = getSafeArray('3');
    assert.strictEqual(Array.isArray(res), true);
    assert.strictEqual(res.length, 8);
    assert.deepEqual(res, [0, 0, 0, 0, 0, 0, 0, 3]);
  });

  test('getSafeArray handles arrays with nulls and pads correctly', ({ assert }) => {
    const res = getSafeArray([1, null, 2])
    // null should be turned into 0 via padArray inside implementation
    assert.strictEqual(Array.isArray(res), true);
    assert.strictEqual(res.length, 8);
    assert.deepEqual(res, [0, 0, 0, 0, 0, 1, 0, 2]);
  });

  test('getSafeArray returns array of zeros for non-numeric non-array input', ({ assert }) => {
    const res = getSafeArray('not-a-number')
    // fallback behavior: NaN => empty subject => padded zeros
    assert.strictEqual(res.length, 8);
    assert.deepEqual(res, [0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('asPercentage formats a number as percentage string', ({ assert }) => {
    // This test asserts that asPercentage produces a percent string for 0.125 => "12.5%"
    const p = asPercentage(0.125);
    assert.ok(typeof p === "string");
    assert.strictEqual(p, "12.5%");
  });
})

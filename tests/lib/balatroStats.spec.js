import { test } from '@japa/runner'
// Tests for src/lib/balatroStats.js which re-exports overall and decksAndJokers
import balatroStats from '#src/lib/balatroStats.js';

test.group('balatroStats API', () => {
  test('balatroStats exports overall and decksAndJokers', ({ assert }) => {
    assert.ok(balatroStats.overall)
    assert.ok(balatroStats.decksAndJokers)
  });
});

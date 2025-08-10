import { test } from '@japa/runner'

import getProgress from "#src/lib/types/overall.js";

function mockPlayer(overrides = {}) {
  // A mock player object with minimal required structure for all functions
  return {
    progress: {
      discovered: {
        "of": 340,
        "tally": 262
      },
      ...overrides.progress,
    },
    joker_usage: {
      foo: { wins: [1, 2, 0, 0, 0, 0, 0, 0] },
      bar: { wins: [1, 1, 0, 0, 0, 0, 0, 0] },
      ...overrides.joker_usage,
    },
    deck_usage: {
      alpha: { wins: [1, 3, 0, 0, 0, 0, 0, 0] },
      beta: { wins: [1, 0, 0, 0, 0, 0, 0, 0] },
      ...overrides.deck_usage,
    },
    ...overrides,
  }
}

test.group('Overall API', () => {
  test('returns unlocks for Completionist', ({ assert }) => {
    const player = mockPlayer();
    const result  = getProgress(player, { key: 'Completionist' });
    assert.properties(result, ['tally', 'of']);
    assert.isNumber(result.tally);
    assert.isNumber(result.of);
    assert.deepEqual(result, player.progress.discovered);
  })

  test('returns deck win summary for CompletionistPlus', ({ assert }) => {
    const player = mockPlayer();
    const result = getProgress(player, { key: 'CompletionistPlus', variant: 'summary' });
    assert.properties(result, ['tally', 'of']);
    assert.isNumber(result.tally);
    assert.isNumber(result.of);
    assert.strictEqual(result.tally, 3);
    assert.strictEqual(result.of, 16);
  })

  test('returns joker win summary for CompletionistPlusPlus', ({ assert }) => {
    const player = mockPlayer();
    const result = getProgress(player, { key: 'CompletionistPlusPlus', variant: 'summary' });
    assert.properties(result, ['tally', 'of']);
    assert.isNumber(result.tally);
    assert.isNumber(result.of);
    assert.equal(result.tally, 0); // Must win at stake 8 to be counted
    assert.equal(result.of, 2);
  })

  test('returns detailed deck wins for CompletionistPlus with detail variant', ({ assert }) => {
    const player = mockPlayer();
    const result = getProgress(player, { key: 'CompletionistPlus', variant: 'detail' });
    assert.isObject(result);
    assert.property(result, 'alpha');
    assert.properties(result.alpha, ["detail", "unique", "highestStakeWin"]);
    assert.isArray(result.alpha.detail);
    assert.strictEqual(result.alpha.unique, 2);
    assert.strictEqual(result.alpha.highestStakeWin, 2);
  })

  test('returns array for byStake variant', ({ assert }) => {
    const player = mockPlayer();
    const result = getProgress(player, { key: 'CompletionistPlus', variant: 'byStake', n: 1 });
    assert.isArray(result);
    assert.strictEqual(result.length, 2);
    assert.properties(result[0], ["name", "highestStakeWin"]);
  })

  test('returns summary object for CompleteCompletionist', ({ assert }) => {
    const player = mockPlayer();
    const result = getProgress(player, { key: 'CompleteCompletionist' });
    assert.properties(result, [
      'Completionist',
      'CompletionistPlus',
      'CompletionistPlusPlus',
    ])
    assert.match(result.Completionist, /\d+\.?\d?\%/);
    assert.match(result.CompletionistPlus, /\d+\.?\d?\%/);
    assert.match(result.CompletionistPlusPlus, /\d+\.?\d?\%/);
  })

  test('handles empty player data gracefully', ({ assert }) => {
    const player = mockPlayer({
      progress: { discovered: [] },
      joker_usage: {},
      deck_usage: {},
    })
    assert.deepEqual(getProgress(player, { key: 'Completionist' }), [])
    const deckSummary = getProgress(player, { key: 'CompletionistPlus', variant: 'summary' })
    assert.property(deckSummary, 'tally')
    assert.property(deckSummary, 'of')
  })
})
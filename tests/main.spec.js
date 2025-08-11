import { test } from '@japa/runner'
import { createParams } from '#main.js';

test.group('Main Entrypoint', (group) => {
  test('createParams returns correct params for overall', async ({ assert }) => {
    const params = createParams(['overall']);
    assert.deepEqual(params, {
      type: 'overall',
      key: 'CompleteCompletionist',
      variant: '',
      n: 0
    })
  })

  test('createParams returns correct params for decks with overrides', async ({ assert }) => {
    const params = createParams(['decks', 'wins', 'ascending', 10]);
    assert.deepEqual(params, {
      type: 'deck',
      key: 'wins',
      variant: 'ascending',
      n: 10
    })
  })

  test('createParams throws on invalid lookup type', async ({ assert }) => {
    assert.throws(() => createParams(['invalid']), /invalid is not a valid lookup type/);
  })
})
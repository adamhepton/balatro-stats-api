import { test } from '@japa/runner'

import p from "#data/profile.json"  with { type: "json" };
import decksAndJokers from "#src/lib/types/decksAndJokers.js";

test.group('Decks and Jokers Data', () => {
  const amendedParameters = {
    "type": "joker",
    "key": "losses",
    "variant": "ascending",
    "n": 3
  }

  function filterObject(obj, cb) {
    return Object.fromEntries(Object.entries(obj).filter(([key, val]) => cb(key, val)));
  }

  test('gets correct five decks with largest number of wins', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "deck",
      "key": "wins",
      "variant": "descending",
      "n": 5
    });

    assert.deepEqual(returnedData, [
      { b_zodiac: 17 },
      { b_ghost: 10 },
      { b_abandoned: 10 },
      { b_plasma: 9 },
      { b_red: 8 }
    ]);
  });

  test('gets correct seven decks with smallest number of wins', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "deck",
      "key": "wins",
      "variant": "ascending",
      "n": 7
    });
    
    assert.deepEqual(returnedData, [
      { b_anaglyph: 1 },
      { b_blue: 1 },
      { b_green: 1 },
      { b_magic: 1 },
      { b_nebula: 1 },
      { b_painted: 2 },
      { b_black: 7 }
    ]);
  });

  test('gets correct three decks with most number of losses', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "deck",
      "key": "losses",
      "variant": "descending",
      "n": 3
    });
    
    assert.deepEqual(returnedData, [
      { b_ghost: 207 },
      { b_checkered: 132 },
      { b_zodiac: 120 }
    ]);
  });

  test('gets correct single deck with least number of losses', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "deck",
      "key": "losses",
      "variant": "ascending",
      "n": 1
    });
    
    assert.deepEqual(returnedData, [
      { b_green: 0 }
    ]);
  });

  test('gets correct three decks with highest proportion of wins', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "deck",
      "key": "winRate",
      "variant": "descending",
      "n": 3
    });

    assert.deepEqual(returnedData, [
      { b_green: { wins: 1, losses: 0, winPercentage: '100%' } },
      { b_painted: { wins: 2, losses: 1, winPercentage: '66.7%' } },
      { b_anaglyph: { wins: 1, losses: 2, winPercentage: '33.3%' } }
    ])
  });

  test('gets correct three decks with lowest proportion of wins', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "deck",
      "key": "winRate",
      "variant": "ascending",
      "n": 3
    });

    assert.deepEqual(returnedData, [
      { b_nebula: { wins: 1, losses: 26, winPercentage: '3.7%' } },
      { b_ghost: { wins: 10, losses: 207, winPercentage: '4.6%' } },
      { b_checkered: { wins: 8, losses: 132, winPercentage: '5.7%' } }
    ])
  });

  test('provides nothing for `count` when querying decks', ({ assert }) => {
    const fn = () => decksAndJokers(p, {
      "type": "deck",
      "key": "count"
    });

    assert.throws(fn, `Parameters are not in valid values.`);
  });

  test('gets correct 15 most-played jokers', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "joker",
      "key": "count",
      "variant": "descending",
      "n": 15
    });
    
    assert.deepEqual(returnedData, [
      { j_abstract: 940 },
      { j_green_joker: 907 },
      { j_egg: 867 },
      { j_fortune_teller: 832 },
      { j_hanging_chad: 830 },
      { j_gros_michel: 798 },
      { j_ride_the_bus: 782 },
      { j_constellation: 778 },
      { j_swashbuckler: 748 },
      { j_scholar: 745 },
      { j_blue_joker: 706 },
      { j_blueprint: 651 },
      { j_misprint: 618 },
      { j_half: 538 },
      { j_baseball: 499 }
    ]);
  });

  test('gets correct single least-played joker', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "joker",
      "key": "count",
      "variant": "ascending",
      "n": 1
    });
    
    assert.deepEqual(returnedData, [
      { j_ticket: 3 }
    ]);
  });

  test('gets correct four jokers with largest number of wins', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "joker",
      "key": "wins",
      "variant": "descending",
      "n": 4
    });
    
    assert.deepEqual(returnedData, [
      { j_constellation: 26 },
      { j_baseball: 21 },
      { j_abstract: 19 },
      { j_blueprint: 19 }
    ]);
  });

  test('gets correct six jokers with lowest number of wins', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "joker",
      "key": "wins",
      "variant": "ascending",
      "n": 6
    });
    
    assert.deepEqual(returnedData, [
      { j_crazy: 0 },
      { j_clever: 0 },
      { j_credit_card: 0 },
      { j_8_ball: 0 },
      { j_chaos: 0 },
      { j_flower_pot: 0 }
    ]);
  });

  test('gets correct two jokers with largest number of losses', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "joker",
      "key": "losses",
      "variant": "descending",
      "n": 2
    });

    assert.deepEqual(returnedData, [
      { j_green_joker: 99 },
      { j_fortune_teller: 79 }
    ]);
  });

  test('gets correct five jokers with lowest number of losses', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "joker",
      "key": "losses",
      "variant": "ascending",
      "n": 5
    });

    assert.deepEqual(returnedData, [
      { j_mr_bones: 0 },
      { j_glass: 2 },
      { j_luchador: 2 },
      { j_stone: 2 },
      { j_ticket: 2 }
    ]);
  });

  test('gets correct six jokers with highest proportion of wins', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "joker",
      "key": "winRate",
      "variant": "descending",
      "n": 6
    });

    assert.deepEqual(returnedData, [
      { j_mr_bones: { wins: 2, losses: 0, winPercentage: '100%' } },
      { j_stone: { wins: 3, losses: 2, winPercentage: '60%' } },
      { j_steel_joker: { wins: 3, losses: 3, winPercentage: '50%' } },
      { j_baseball: { wins: 21, losses: 22, winPercentage: '48.8%' } },
      { j_caino: { wins: 2, losses: 3, winPercentage: '40%' } },
      { j_constellation: { wins: 26, losses: 43, winPercentage: '37.7%' } }
    ])
  });

  test('gets correct five jokers with lowest proportion of wins', ({ assert }) => {
    const returnedData = decksAndJokers(p, {
      "type": "joker",
      "key": "winRate",
      "variant": "ascending",
      "n": 5
    });

    assert.deepEqual(returnedData, [
      { j_crazy: { wins: 0, losses: 21, winPercentage: '0%' } },
      { j_clever: { wins: 0, losses: 11, winPercentage: '0%' } },
      { j_credit_card: { wins: 0, losses: 11, winPercentage: '0%' } },
      { j_8_ball: { wins: 0, losses: 22, winPercentage: '0%' } },
      { j_chaos: { wins: 0, losses: 11, winPercentage: '0%' } }
    ])
  });
  
})
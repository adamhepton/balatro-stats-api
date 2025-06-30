import { test } from '@japa/runner'

import p from "#data/profile.json"  with { type: "json" };
import decksAndJokers from "#src/lib/types/decksAndJokers.js";

test.group('Decks and Jokers API', () => {
  const expectedDefaults = {
    "type": "deck",
    "key": "wins",
    "variant": "descending",
    "n": 5
  };

  const amendedParameters = {
    "type": "joker",
    "key": "losses",
    "variant": "ascending",
    "n": 3
  }

  const garbageParameters = {
    "type": "somethingThatDoesntExist",
    "key": "randomAsk",
    "variant": "random",
    "n": "aString"
  }

  function filterObject(obj, cb) {
    return Object.fromEntries(Object.entries(obj).filter(([key, val]) => cb(key, val)));
  }

  test('fully applies default parameters if no parameters passed', ({ assert }) => {
    const usingDefaultParameters = decksAndJokers(p);
    const expectedParametersCalled = decksAndJokers(p, expectedDefaults);
    assert.deepEqual(usingDefaultParameters, expectedParametersCalled);
  });

  test('fully ignores default parameters if all parameters passed', ({ assert }) => {
    const usingPartialParameters = decksAndJokers(p, amendedParameters);
    const expectedParametersCalled = decksAndJokers(p, Object.assign({}, expectedDefaults, amendedParameters));
    assert.deepEqual(usingPartialParameters, expectedParametersCalled)
  });

  test('partially applies default parameters if type is missing', ({ assert }) => {
    const partialParameters = filterObject(amendedParameters, (k, v) => k !== "type");
    const usingPartialParameters = decksAndJokers(p, partialParameters);
    const expectedParametersCalled = decksAndJokers(p, Object.assign({}, expectedDefaults, partialParameters));
    assert.deepEqual(usingPartialParameters, expectedParametersCalled)
  });

  test('partially applies default parameters if key is missing', ({ assert }) => {
    const partialParameters = filterObject(amendedParameters, (k, v) => k !== "key");
    const usingPartialParameters = decksAndJokers(p, partialParameters);
    const expectedParametersCalled = decksAndJokers(p, Object.assign({}, expectedDefaults, partialParameters));
    assert.deepEqual(usingPartialParameters, expectedParametersCalled)
  });

  test('partially applies default parameters if variant is missing', ({ assert }) => {
    const partialParameters = filterObject(amendedParameters, (k, v) => k !== "variant");
    const usingPartialParameters = decksAndJokers(p, partialParameters);
    const expectedParametersCalled = decksAndJokers(p, Object.assign({}, expectedDefaults, partialParameters));
    assert.deepEqual(usingPartialParameters, expectedParametersCalled)
  });

  test('partially applies default parameters if n is missing', ({ assert }) => {
    const partialParameters = filterObject(amendedParameters, (k, v) => k !== "n");
    const usingPartialParameters = decksAndJokers(p, partialParameters);
    const expectedParametersCalled = decksAndJokers(p, Object.assign({}, expectedDefaults, partialParameters));
    assert.deepEqual(usingPartialParameters, expectedParametersCalled)
  });

  test('partially applies default parameters if only type is passed', ({ assert }) => {
    const partialParameters = filterObject(amendedParameters, (k, v) => k === "type");
    const usingPartialParameters = decksAndJokers(p, partialParameters);
    const expectedParametersCalled = decksAndJokers(p, Object.assign({}, expectedDefaults, partialParameters));
    assert.deepEqual(usingPartialParameters, expectedParametersCalled)
  });

  test('partially applies default parameters if only key is passed', ({ assert }) => {
    const partialParameters = filterObject(amendedParameters, (k, v) => k === "key");
    const usingPartialParameters = decksAndJokers(p, partialParameters);
    const expectedParametersCalled = decksAndJokers(p, Object.assign({}, expectedDefaults, partialParameters));
    assert.deepEqual(usingPartialParameters, expectedParametersCalled)
  });

  test('partially applies default parameters if only variant is passed', ({ assert }) => {
    const partialParameters = filterObject(amendedParameters, (k, v) => k === "variant");
    const usingPartialParameters = decksAndJokers(p, partialParameters);
    const expectedParametersCalled = decksAndJokers(p, Object.assign({}, expectedDefaults, partialParameters));
    assert.deepEqual(usingPartialParameters, expectedParametersCalled)
  });

  test('partially applies default parameters if only n is passed', ({ assert }) => {
    const partialParameters = filterObject(amendedParameters, (k, v) => k === "n");
    const usingPartialParameters = decksAndJokers(p, partialParameters);
    const expectedParametersCalled = decksAndJokers(p, Object.assign({}, expectedDefaults, partialParameters));
    assert.deepEqual(usingPartialParameters, expectedParametersCalled)
  });

  test('throws an exception if non-supported type is requested', ({ assert }) => {
    const partialParameters = filterObject(garbageParameters, (k, v) => k === "type");
    const fn = () => decksAndJokers(p, partialParameters);
    assert.throws(fn, `${partialParameters.type} is not a valid type.`);
  });

  test('throws an exception if non-supported other parameter is requested', ({ assert }) => {
    const partialParameters = filterObject(garbageParameters, (k, v) => k === "key");
    const fn = () => decksAndJokers(p, partialParameters);
    assert.throws(fn, `Parameters are not in valid values.`);
  });
})
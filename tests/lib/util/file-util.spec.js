import { test } from '@japa/runner'
import * as fileUtil from '#src/util/file-util.js'
import fs from 'fs'
import Pako from 'pako'

test.group('File Util: decompress', () => {
  test('calls Pako.inflateRaw with correct args', ({ assert }) => {
    const input = new Uint8Array([120, 156, 11, 72, 44, 73, 4, 0, 9, 251, 2, 81]).buffer
    Pako.inflateRaw = (data, opts) => {
      assert.deepEqual(data, input)
      assert.deepEqual(opts, { to: "string" })
      return "decompressed"
    }
    assert.strictEqual(fileUtil.decompress(input), "decompressed")
  })
})

test.group('File Util: rawToJSON', () => {
  test('parses Lua-like string to JSON', ({ assert }) => {
    const luaLike = 'return {["foo"]=1,["bar"]=2,[3]=3,}'
    const result = fileUtil.rawToJSON(luaLike)
    assert.deepEqual(result, { foo: 1, bar: 2, NOSTRING_3: 3 })
  })
})

test.group('File Util: FixJSONArrays', () => {
  test('returns non-object as-is', ({ assert }) => {
    assert.strictEqual(fileUtil.FixJSONArrays(null), null)
    assert.strictEqual(fileUtil.FixJSONArrays(42), 42)
    assert.strictEqual(fileUtil.FixJSONArrays("str"), "str")
  })

  test('returns empty object as-is', ({ assert }) => {
    assert.deepEqual(fileUtil.FixJSONArrays({}), {})
  })

  test('recursively processes non-NOSTRING_ keys', ({ assert }) => {
    const input = { foo: { bar: 1 }, baz: 2 }
    const output = fileUtil.FixJSONArrays(input)
    assert.deepEqual(output, { foo: { bar: 1 }, baz: 2 })
  })

  test('converts NOSTRING_ keys to array (1-indexed)', ({ assert }) => {
    const input = { NOSTRING_1: "a", NOSTRING_2: "b" }
    const output = fileUtil.FixJSONArrays(input)
    assert.deepEqual(output, ["a", "b"])
  })

  test('handles nested arrays and objects', ({ assert }) => {
    const input = {
      foo: { NOSTRING_1: 1, NOSTRING_2: 2 },
      bar: { baz: { NOSTRING_1: "x", NOSTRING_2: "y" } }
    }
    const output = fileUtil.FixJSONArrays(input)
    assert.deepEqual(output, {
      foo: [1, 2],
      bar: { baz: ["x", "y"] }
    })
  })
})

test.group('File Util: read', (group) => {
  let testDataString;

  group.setup((test) => {
    testDataString = '{ "foo": "bar", "anotherKeyWithAnArray": [1, 2, 3] }';
    fs.readFileSync = () => Buffer.from(testDataString);
    Pako.inflateRaw = () => testDataString;
  })

  test('returns raw data when type is "raw"', async ({ assert }) => {
    const result = fileUtil.read('fakefile', 'raw');
    assert.strictEqual(result, testDataString);
  })

  test('returns object when type is "obj"', async ({ assert }) => {
    const result = fileUtil.read('fakefile', 'obj');
    assert.deepEqual(result, JSON.parse(testDataString));
  })

  test('returns JSON string when type is "json" or default', async ({ assert }) => {
    const result = fileUtil.read('fakefile', 'json');
    const resultDefault = fileUtil.read('fakefile');
    const checkEquality = (subject) => assert.deepEqual(subject, JSON.stringify(JSON.parse(testDataString), null, 2));
    
    checkEquality(result);
    checkEquality(resultDefault);
  })
})

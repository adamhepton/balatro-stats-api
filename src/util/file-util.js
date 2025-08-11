import Pako from "pako";
import fs from "fs";

const returnPrefix = /^return /;
const stringKeys = /\["(.*?)"\]=/g;
const numberKeys = /\[(\d+)\]=/g;
const trailingCommas = /,}/g;

function decompress(data) {
  return Pako.inflateRaw(data, { to: "string" });
}

function rawToJSON(data) {
  return JSON.parse(data
    .replace(returnPrefix, "")
    .replace(stringKeys, "\"$1\":")
    .replace(numberKeys, "\"NOSTRING_$1\":")
    .replace(trailingCommas, "}"));
}

function FixJSONArrays (json) {
  if(typeof json !== 'object' || json === null) {
    return json;
  }
  const keys = Object.keys(json);
  if(keys.length === 0) {
    return json;
  }
  if(!keys.every((key) => key.startsWith('NOSTRING_'))) {
    for(const key of keys) {
      json[key] = FixJSONArrays(json[key]);
    }
    return json;
  }
  const array = [];
  for(const key of keys) {
    // -1 cause lua is 1 indexed
    array[parseInt(key.slice(9)) - 1] = FixJSONArrays(json[key]);
  }
  return array;
}

function read(target, type) {
  const file = fs.readFileSync(target);
  const buffer = new Uint8Array(file).buffer;
  const data = decompress(buffer);
  const jsObj = FixJSONArrays(rawToJSON(data));
  const json = JSON.stringify(jsObj, null, 2);

  switch(type) {
    case "raw":
      return data;
      
    case "obj":
      return jsObj;

    case "json":
    default:
      return json;
  }
}

export {
  decompress,
  rawToJSON,
  FixJSONArrays,
  read
};

export default read;
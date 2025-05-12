import balatroStats from "#src/lib/balatroStats.js";
import p from "#data/profile.json"  with { type: "json" };

const [ type, query, direction ] = process.argv.slice(2, 5) ?? ["jokers", "count", "descending"];
console.log(balatroStats[type].call(this, p, query, direction));
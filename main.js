import balatroStats from "#src/lib/balatroStats.js";
import p from "#data/profile.json"  with { type: "json" };

const [ type, query, variant, atLeast ] = process.argv.slice(2, 6) ?? ["jokers", "count", "descending", 0];
console.log(balatroStats[type].call(this, p, query, variant, atLeast));
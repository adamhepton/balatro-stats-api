import balatroStats from "#src/lib/balatroStats.js";
import p from "#data/profile.json"  with { type: "json" };

function getFromArgvOrDefault(i) {
    const defaults = ["overall", "CompleteCompletionist", "descending", 0];
    return process.argv.at(i + 2) ?? defaults.at(i);
}

const [ type, query, variant, atLeast ] = [ getFromArgvOrDefault(0), getFromArgvOrDefault(1), getFromArgvOrDefault(2), getFromArgvOrDefault(3) ];
console.log(balatroStats[type].call(this, p, query, variant, atLeast));
import balatroStats from "#src/lib/balatroStats.js";
import p from "#data/profile.json"  with { type: "json" };

const defaultParams = {
    "overall": {
        type: "overall",
        key: "CompleteCompletionist",
        variant: "",
        n: 0
    },
    "decks": {
        type: "deck",
        key: "wins",
        variant: "descending",
        n: 5
    },
    "jokers": {
        type: "joker",
        key: "wins",
        variant: "descending",
        n: 5
    }
}

function createParams(passedArgs) {
    const keys = ["type", "key", "variant", "n"];
    const lookupType = passedArgs[0] ?? "overall";

    if(Object.keys(defaultParams).includes(lookupType) === false) {
        throw new Error(`${lookupType} is not a valid lookup type: valid lookup types are ${Object.keys(defaultParams).join(" | ")}.`);
    }
    const params = defaultParams[lookupType];
    passedArgs.shift();

    for (let i = 0; i < passedArgs.length; i++) {
        params[keys[i + 1]] = passedArgs[i];
    }

    return params;
}

try {
    const params = createParams(process.argv.slice(2, 6));
    const type = params.type !== "overall" ? "decksAndJokers" : "overall";

    console.log(balatroStats[type].call(this, p, params));
} catch(err) {
    console.error(err);
}
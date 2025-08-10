import { asPercentage, getSafeArray } from "#src/util/array-util.js";

const allowedTypes = ["overall", "deck", "joker"];
const allowedKeys = {
    "joker": [ "count", "wins", "losses", "winRate" ],
    "deck": [ "wins", "losses", "winRate" ]
}
const allowedVariants = [ "descending", "ascending" ];

function orderBy(p, type, key, variant) {
    return Object.entries(p[`${type}_usage`])
        .map(([ name, item ]) => { return { [name]: getSafeArray(item[key]).reduce( (total, v) => total + (v ?? 0), 0) } })
        .sort((a, b) => { return (Object.values(variant === "descending" ? b : a)[0] - Object.values(variant === "descending" ? a : b)[0]); });
}

function getBy(p, type, key, variant, n) {
    if(allowedTypes.includes(type) === false) {
        throw new Error(`${type} is not a valid type.`);
    }

    if(
        allowedKeys[type].includes(key) === false ||
        allowedVariants.includes(variant) === false ||
        n < 1
    ) {
        throw new Error("Parameters are not in valid values.");
    }

    if(key === "winRate") {
        let wins = orderBy(p, type, "wins", variant);
        let losses = orderBy(p, type, "losses", variant);

        let stats = wins.reduce( (ret, current) => {
            let [wKey, wNum] = Object.entries(current)[0];
            let lNum = Object.values(losses.find(loss => { let lKey = Object.keys(loss)[0]; return lKey === wKey }))[0];

            ret.push({ [wKey]: {
                wins: wNum,
                losses: lNum,
                winDecimal: (wNum / (wNum + lNum)),
                winPercentage: asPercentage(wNum / (wNum + lNum))
            }});

            return ret;
        }, []);

        return stats.sort((a, b) => {
            let first = variant === "descending" ? Object.values(b)[0].winDecimal : Object.values(a)[0].winDecimal;
            let second = variant === "descending" ? Object.values(a)[0].winDecimal : Object.values(b)[0].winDecimal;
            return first - second;
        })
        .filter( (_, i) => i < n)
        .map(item => {
            const entries = Object.entries(item);
            
            const key = entries[0][0];
            const decimalRemoved = Object.fromEntries(Object.entries(entries[0][1]).filter(([key, val]) => key !== "winDecimal"));

            return { [key]: decimalRemoved };
        })
    }
    return orderBy(p, type, key, variant).filter( (item, i) => i < n);
}

function getDecksOrJokersBy(p, { type = "deck", key = "wins", variant = "descending", n = 5 } = {}) {
    return getBy(p, type, key, variant, n);
}

export default getDecksOrJokersBy;
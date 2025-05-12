import getBy from "./generic.js"

function getDeckWinsByStake(p, stake) {
    return Object.entries(p.deck_usage).filter(([ name, stats ]) => stats.wins_by_key[stake] > 0 ?? false)
}

function getDecksBy(p, key, direction = "descending", n = 10) {
    return getBy(p, "deck", key, direction, n);
}

export default getDecksBy;
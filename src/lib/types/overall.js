import getSafeArray from "#src/util/array-util.js";

function getUnlocks(p) {
    return p.progress.discovered;
}

function getWinsBy(p, type, variant) {
    const wins = Object.entries(p[`${type}_usage`])
        .map(([ name, item ]) => { return { name, winsByStake: getSafeArray(item.wins) } })
        .reduce((allWins, winsBy) => {
            allWins[winsBy.name] = {
                detail: winsBy.winsByStake,
                unique: winsBy.winsByStake.reduce((total, wins) => total += wins >= 1 ? 1 : 0, 0)
            }
            return allWins
        }, {})

    switch(variant) {
        case "summary":
        default:
            return Object.values(wins)
                .map(deckWins => deckWins.unique)
                .reduce((total, val) => { total["wins"] += val; total["possible"] += 8; return total }, { wins: 0, possible: 0 })
        
        case "detail":
            return wins;
    }
}

function getWinsByJoker(p, variant = 0) {
    return getWinsBy(p, "joker", variant);
}

function getWinsByDeck(p, variant = 0) {
    return getWinsBy(p, "deck", variant);
}

function getProgress(p, achievement, variant = null) {
    switch(achievement) {
        case "Completionist":
            return getUnlocks(p);

        case "CompletionistPlus":
            return getWinsByDeck(p, variant);

        case "CompletionistPlusPlus":
            return getWinsByJoker(p, variant);
    }
}

export default getProgress;
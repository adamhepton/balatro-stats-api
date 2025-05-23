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
                .reduce((total, val) => { total["tally"] += val; total["of"] += 8; return total }, { tally: 0, of: 0 })
        
        case "detail":
            return wins;
    }
}

function getWinsByJoker(p, variant) {
    return getWinsBy(p, "joker", variant);
}

function getWinsByDeck(p, variant) {
    return getWinsBy(p, "deck", variant);
}

function asPercentage(n) {
    return new Intl.NumberFormat('default', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    }).format(n);
}

function summariseAchievement(achievementProgress) {
    return asPercentage(achievementProgress.tally / achievementProgress.of);
}

function getProgress(p, achievement, variant = "summary") {
    switch(achievement) {
        case "Completionist":
            return getUnlocks(p);

        case "CompletionistPlus":
            return getWinsByDeck(p, variant);

        case "CompletionistPlusPlus":
            return getWinsByJoker(p, variant);

        case "CompleteCompletionist":
            return {
                Completionist: summariseAchievement(getProgress(p, "Completionist", "summary")),
                CompletionistPlus: summariseAchievement(getProgress(p, "CompletionistPlus", "summary")),
                CompletionistPlusPlus: summariseAchievement(getProgress(p, "CompletionistPlusPlus", "summary")),
            }
    }
}

export default getProgress;
import { asPercentage, getSafeArray } from "#src/util/array-util.js";

function getUnlocks(p) {
    return p.progress.discovered;
}

function getWinsBy(p, type, variant, atLeast) {
    const wins = Object.entries(p[`${type}_usage`])
        .map(([ name, item ]) => { return { name, winsByStake: getSafeArray(item.wins) } })
        .reduce((allWins, winsBy) => {
            allWins[winsBy.name] = {
                detail: winsBy.winsByStake,
                unique: winsBy.winsByStake.reduce((total, wins) => total + (wins >= 1 ? 1 : 0), 0),
                highestStakeWin: getHighestWinningStake(winsBy.winsByStake)
            }
            return allWins
        }, {})

    switch(variant) {
        case "byStake":
            return Object.entries(wins)
                .map(([ name, item ]) => { return { name, highestStakeWin: item.highestStakeWin } })
                .sort((a, b) => b.highestStakeWin - a.highestStakeWin)
                .filter(item => item.highestStakeWin >= atLeast)
        
        case "detail": 
            return wins;

        case "summary":
        default:
            switch(type) {
                case "joker":
                    return Object.values(wins)
                        .map(deckWins => deckWins.highestStakeWin)
                        .reduce((total, val) => { total["tally"] += (val === 7); total["of"] += 1; return total }, { tally: 0, of: 0 })

                case "deck":
                default:
                    return Object.values(wins)
                        .map(deckWins => deckWins.unique)
                        .reduce((total, val) => { total["tally"] += val; total["of"] += 8; return total }, { tally: 0, of: 0 })
            }
    }
}

function getWinsByJoker(p, variant, atLeast) {
    return getWinsBy(p, "joker", variant, atLeast);
}

function getWinsByDeck(p, variant, atLeast) {
    return getWinsBy(p, "deck", variant, atLeast);
}

function getHighestWinningStake(itemDetail) {
    return itemDetail.reduce((result, current, idx) => current > 0 ? (idx + 1) : result, 0)
}

function summariseAchievement(achievementProgress) {
    return asPercentage(achievementProgress.tally / achievementProgress.of);
}

function getProgress(p, { key = "CompletionistPlus", variant = "summary", n = 0 } = {}) {
    switch(key) {
        case "Completionist":
            return getUnlocks(p);

        case "CompletionistPlus":
            return getWinsByDeck(p, variant, n);

        case "CompletionistPlusPlus":
            return getWinsByJoker(p, variant, n);

        case "CompleteCompletionist":
            return {
                Completionist: summariseAchievement(getProgress(p, { key: "Completionist", variant: "summary", n })),
                CompletionistPlus: summariseAchievement(getProgress(p, { key: "CompletionistPlus", variant: "summary", n })),
                CompletionistPlusPlus: summariseAchievement(getProgress(p, { key: "CompletionistPlusPlus", variant: "summary", n })),
            }
    }
}

export default getProgress;
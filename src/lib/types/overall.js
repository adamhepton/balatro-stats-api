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
                unique: winsBy.winsByStake.reduce((total, wins) => total += wins >= 1 ? 1 : 0, 0),
                highestStakeWin: getHighestWinningStake(winsBy.winsByStake)
            }
            return allWins
        }, {})

    switch(variant) {
        case "summary":
        default:
            switch(type) {
                case "deck":
                    return Object.values(wins)
                        .map(deckWins => deckWins.unique)
                        .reduce((total, val) => { total["tally"] += val; total["of"] += 8; return total }, { tally: 0, of: 0 })
                
                case "joker":
                    return Object.values(wins)
                        .map(deckWins => deckWins.highestStakeWin)
                        .reduce((total, val) => { total["tally"] += (val === 7); total["of"] += 1; return total }, { tally: 0, of: 0 })
            }

        case "byStake":
            return Object.entries(wins)
                .map(([ name, item ]) => { return { name, highestStakeWin: item.highestStakeWin } })
                .sort((a, b) => b.highestStakeWin - a.highestStakeWin)
                .filter(item => item.highestStakeWin >= atLeast)
        
        case "detail":
            return wins;
    }
}

function getWinsByJoker(p, variant, atLeast) {
    return getWinsBy(p, "joker", variant, atLeast);
}

function getWinsByDeck(p, variant, atLeast) {
    return getWinsBy(p, "deck", variant, atLeast);
}

function getHighestWinningStake(itemDetail) {
    return itemDetail.reduce((result, current, idx) => result = current > 0 ? (idx + 1) : result, 0)
}

function summariseAchievement(achievementProgress) {
    return asPercentage(achievementProgress.tally / achievementProgress.of);
}

function getProgress(p, achievement, variant = "summary", atLeast = 0) {
    switch(achievement) {
        case "Completionist":
            return getUnlocks(p);

        case "CompletionistPlus":
            return getWinsByDeck(p, variant, atLeast);

        case "CompletionistPlusPlus":
            return getWinsByJoker(p, variant, atLeast);

        case "CompleteCompletionist":
            return {
                Completionist: summariseAchievement(getProgress(p, "Completionist", "summary", atLeast)),
                CompletionistPlus: summariseAchievement(getProgress(p, "CompletionistPlus", "summary", atLeast)),
                CompletionistPlusPlus: summariseAchievement(getProgress(p, "CompletionistPlusPlus", "summary", atLeast)),
            }
    }
}

export default getProgress;
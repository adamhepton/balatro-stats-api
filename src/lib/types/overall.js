import getSafeArray from "#src/util/array-util.js";

function getUnlocks(p) {
    return p.progress.discovered;
}

function getWinsBy(p, type) {
    return Object.entries(p[`${type}_usage`]).map(([ name, item ]) => { return { [name]: getSafeArray(item.wins) } });
}

function getWinsByJoker(p) {
    return getWinsBy(p, "joker");
}

function getWinsByDeck(p) {
    return getWinsBy(p, "deck");
}

function getProgress(p, achievement, direction = null) {
    switch(achievement) {
        case "Completionist":
            return getUnlocks(p);

        case "CompletionistPlus":
            return getWinsByDeck(p);

        case "CompletionistPlusPlus":
            return getWinsByJoker(p);
    }
}

export default getProgress;
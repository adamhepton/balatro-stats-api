import getBy from "./generic.js"

function getDecksBy(p, { type = "deck", key = "wins", variant = "descending", n = 5 } = {}) {
    return getBy(p, type, key, variant, n);
}

export default getDecksBy;
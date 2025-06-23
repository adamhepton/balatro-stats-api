import getBy from "./generic.js"

function getDecksBy(p, key, direction = "descending", n) {
    return getBy(p, "deck", key, direction, n);
}

export default getDecksBy;
import getBy from "./generic.js"

function getJokersBy(p, key, direction = "descending", n = 10) {
    return getBy(p, "joker", key, direction, n);
}

export default getJokersBy;
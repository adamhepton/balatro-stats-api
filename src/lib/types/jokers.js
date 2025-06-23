import getBy from "./generic.js"

function getJokersBy(p, key, variant = "descending", n) {
    return getBy(p, "joker", key, variant, n);
}

export default getJokersBy;
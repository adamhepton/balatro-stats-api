import getSafeArray from "#src/util/array-util.js";

function orderBy(p, type, key, variant) {
    return Object.entries(p[`${type}_usage`])
        .map(([ name, item ]) => { return { [name]: getSafeArray(item[key]).reduce( (total, v) => total + (v ?? 0), 0) } })
        .sort((a, b) => { return (Object.values(variant === "descending" ? b : a)[0] - Object.values(variant === "descending" ? a : b)[0]); });
}

function getBy(p, type, key, variant, n = 10) {
    return orderBy(p, type, key, variant).filter( (item, i) => i < n);
}

export default getBy;
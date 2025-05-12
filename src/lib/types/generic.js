import getSafeArray from "#src/util/array-util.js";

function orderBy(p, type, key, direction) {
    return Object.entries(p[`${type}_usage`])
        .map(([ name, item ]) => { return { [name]: getSafeArray(item[key]).reduce( (total, v) => total + (v ?? 0), 0) } })
        .sort((a, b) => { return (Object.values(direction === "descending" ? b : a)[0] - Object.values(direction === "descending" ? a : b)[0]); });
}

function getBy(p, type, key, direction, n = 10) {
    return orderBy(p, type, key, direction).filter( (item, i) => i < n);
}

export default getBy;
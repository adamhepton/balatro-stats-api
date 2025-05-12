function padArray(arr, l, v) {
    return arr.map(x => x === null ? 0 : x).concat(Array(l-arr.length).fill(v))
}

function getSafeArray(input) {
    return padArray(Array.isArray(input) ? input : Number.isNaN(Number(input)) ? [] : [Number(input)], 8, 0)
}

export default getSafeArray;
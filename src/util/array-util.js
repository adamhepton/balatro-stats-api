function padArray(arr, l, v) {
    return arr.map(x => x === null ? 0 : x).concat(Array(l-arr.length).fill(v))
}

function getSafeArray(input) {
    let subject = [];
    if (Array.isArray(input)) {
        subject = input;
    } else if (Number.isNaN(Number(input)) === false) {
        subject = [Number(input)];
    }

    return padArray(subject, 8, 0);
}

function asPercentage(n) {
    return new Intl.NumberFormat('default', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    }).format(n);
}

export { getSafeArray, asPercentage }
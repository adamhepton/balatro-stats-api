function padArray(arr, l, v) {
    return Array(l-arr.length).fill(Number(v)).concat(arr.map(x => x === null ? Number(0) : Number(x)))
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
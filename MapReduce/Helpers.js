/**
 * @note These functions aren't available from the Google UI,
 *       but you can use them inside the javascript functions
 *       (including the ones passed from the UI).
 */



/**
 * @returns {Array} Concatenation of all the arrays.
 */
function concat() {
    var args = array_(arguments);
    if (args.length == 1) {
        args = args[0]
    }
    return args.reduce(function (r, v) {
        return r.concat(v)
    }, []);
}

/**
 * round the number n to precision p
 *  e.g. round(0.5456) -> 1, round(0.5456, 2) -> .55
 * @param {float} n - floating-point value
 * @param {int} p - precision
 */
function round(n, p) {
    if (!p) return Math.round(n);
    var a = n | 0, b = n - a, c = Math.pow(10, p);
    return a + (b * c | 0) / c;
}

/**
 * wrapper for parseInt which works with map
 * (parseInt doesn't work with map because map passes an index too,
 *  changing the base that parseInt is working in)
 * @param {Object} value - usually a number or string
 */
function int(value) {
    return parseInt(value);
}

// ? why are they here if you can do array.filter(f), or array.reduce(f)
function sum(array) {
    return reduce(array, function (sum, value) {
        return sum + (value || 0);
    }, 0);
}

function map(array, f) {
    return array.map(f);
}

function filter(array, f) {
    return array.filter(eval(f));
}

function unique(array) {
    var u = [];
    r = array.filter(function (v) {
        var r = u[v];
        u[v] = true;
        return r === undefined
    });
    delete u;
    return r
}

function reduce(array, f, initial) {
    var result = initial || 0;
    array.map(function (value) {
        result = f(result, value);
    });
    return result;
}

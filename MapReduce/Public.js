/**
 * Map Reduce
 * (extended jsutil from script gallery by mghunt@gmail.com)
 * execute JavaScript in a cell (inspired by js.io package management -- http://js.io/)
 *  - the last argument is a string of JavaScript
 *  - the first arguments are available in the JavaScript as $0, $1, ..., $n
 *  - all arguments are available in the JavaScript in an array called $
 * in a spreadsheet cell:
 *  =mr(1, 2, 3, "$0 + $1 + $2") -> 6
 *  =mr(1, 2, 3, "sum($)" -> 6
 *  =mr(A:A, B:B, "...", "trim") -> will enable auto trim of each parameter.
 *    That way A:A and B:B will be cleared of empty cells
 *  =mr(A1:A10, "$.join()") -> concatenates the values of cells A1-A10 in a comma-separated list
 *  =mr(A1:A15, B1:B10, C1:D10 "leftjoin($1, $2, $3)") -> for each value in A1-A15 finds an appripriate value in B1-B10
 *    and insert values from correspondin Cn-Dn.
 *    if $3 is empty - $2 will be used.
 *  =mr(A1:A10, "sum(map($, int))" -> takes string values, runs parseInt on them, and then sums them
 * @customfunction
 */
function mr() {
    var _ = {$: array_(arguments)};

    var autoTrim = _.$.slice(-1) == "trim";
    if (autoTrim) {
        _.$.pop()
    }

    _.src = block2function_(_.$.pop());

    _.$.map(function (argument, index) {
        if (autoTrim) {
            argument = argument.trim()
        }
        return _['$' + (index + 1)] = argument
    });

    try {
        return _safe_return(eval('with(_){delete _;' + _.src + '}'));
    } catch (e) {
        return e.message;
    }
}

/**
 * Matches two tables by keys and produces valuesRight.
 * Works similarly to SQL LEFT JOIN.
 *
 * @param {Array} keysLeft
 * @param {Array} keysRight
 * @param {Array} valuesRight
 * @param {Array} defaultValues Values to return if the right value is not present.
 * @returns {Array}
 *
 * @customfunction
 */
function leftjoin(keysLeft, keysRight, valuesRight, defaultValues) {
    var _ = {$: array_(arguments)};

    valuesRight = valuesRight || keysRight;
    if (keysRight.length != valuesRight.length) {
        return "keysRight and valuesRight - cannot be different length. Is auto-trim breaking something?";
    }

    // crate r=hash index for each key=k and int's position=p
    var value_map = keysRight.reduce(function (r, key, index) {
        r[key] = index;
        return r
    }, []);
    // for each keyLeft - find keyRight position and use valueRight value at such position

    return keysLeft.map(function (value, index) {
        return (value_map[value] == undefined) ? (defaultValues && defaultValues[index]) : valuesRight[value_map[value]]
    })
}

/**
 * Returns the same array, but without blank values at the end.
 *
 * @param {Array} array
 * @returns {Array}
 *
 * @customfunction
 */
function array_trim(array) {
    return array.trim();
}

// create all the vertical functions for all the horizontal ones
// for that matter the following happens:
// - array is tranposed;
// - the original function runs on top of it;
// - the result is transposed;
// - the array itself is transposed;
// @TOOD - currently it doesn't really work. Transpose creates a new array - vs changes the current one.
eval(
    ["concat", "every", "filter", "forEach", "indexOf", "join", "lastIndexOf", "length", "map", "pop",
        "push", "reduce", "reduceRight", "reverse", "shift", "slice", "some", "sort", "splice", "unshift"].reduce(function (r, v) {
        return r += "function v" + v + "(array){\
       var args=array_(arguments);\
       args.shift();\
       var t=transpose(array);\
       var r=transpose(t." + v + ".apply(t, args));\
       t=transpose(array);\
       return r;\
     };\
     function vt" + v + "(){return transpose(v" + v + ".apply(this, arguments))}\
     ";
    }, "")
);


// match str against expr and replace the entire string with sub
//  e.g. rereplace("hello world!", "(h.*?)o w(.)", "$1$2") -> "hello"
function rereplace(str, expr, sub, opts) {
    var result = String(str).match(new RegExp(expr, opts));
    if (!result) {
        return '';
    }
    var max = result.length;
    return sub.replace(new RegExp("\\$(\\d+|\\$)", "g"), function (match, index) {
        if (index == '$') {
            return '$';
        }
        index = parseInt(index);
        return !isNaN(index) && index < max && result[index] || match;
    });
}

// match str against expr and replace each match with sub
//  e.g. resub("a1 a2 a3 a4 a5", "a(\d)", "$1b") -> 1b 2b 3b 4b 5b
function resub(str, expr, sub, opts) {
    return String(str).replace(new RegExp(expr, opts || "g"), sub);
}

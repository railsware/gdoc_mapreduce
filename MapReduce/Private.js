/**
 * @note Private functions must end with and underscore.
 * @link https://developers.google.com/apps-script/guides/sheets/functions
 */



Array.prototype.transpose = function() {
    var tmp = [];
    var array = this;
    array.twodim();

    // the array is Y*X - [[1,2]] - first dimention is Y, second is x
    var ny = tnx = array.length;
    var nx = tny = array[0].length;

    if (nx == 0) {
        return array;
    }

    var max = Math.max(ny, nx);
    for (var y = 0; y < max; y++) {
        // var line=tmp[y]=[];
        // line.length=ny;
        for (var x = y + 1; x < max; x++) {
            var tx = y, ty = x;
            t = array[ty] && array[ty][tx];

            array[ty] = array[ty] || [];
            array[ty][tx] = array[y][x];

            array[y][x] = t;
        }
        array[y].length = tnx;
    }
    array.length = tny;

    return array;
};


Array.prototype.first = function () {
    return this.length == 0 ? null : this[0]
};


Array.prototype.last = function () {
    return this.length == 0 ? null : this[this.length - 1]
};


Array.prototype.twodim = function () {
    if (!is_array_(this[0])) {
        inner = this.slice();
        this.length = 1;
        this[0] = inner
    }
};


// a function that will remove all elements of a
//  one dimentional array - if it's elements are empty (undefined or "")
//  two dimentional array - if each element of the sub array is emtpy
Array.prototype.trim = function () {
    var onedim = !is_array_(this[0]);
    var nx = !onedim && this[0].length;

    var isEmpty = function (v) {
        return v === undefined || v == ""
    };

    do {
        var firstEmpty = true, lastEmpty = true;
        var first = this.first(), last = this.last();

        // check all sublements under fist and last element
        // if onedim - just check first nad last itself
        if (onedim) {
            firstEmpty = isEmpty(first);
            lastEmpty = isEmpty(last);
        }
        else {
            for (var x = 0; x < nx; x++) {
                firstEmpty = firstEmpty && isEmpty(first[x]);
                lastEmpty = lastEmpty && isEmpty(last[x]);
                if (!firstEmpty && !lastEmpty) {
                    break;
                }
            }
        }

        if (firstEmpty) {
            this.shift();
        }
        if (lastEmpty) {
            this.pop();
        }
    } while (this.length > 0 && (firstEmpty || lastEmpty));

    return this;
};


// make sure the formula is not quite broken. For ex returns > 256 columns
//  or cycle dependency which creates unlimited rows
function _safe_return(r) {
    var as = SpreadsheetApp.getActiveSheet();

    if (r.length > as.getMaxRows() * 1.66 || (r[0] && r[0].length && r[0].length > as.getMaxColumns() * 1.66)) {
        var error_message = "The size of the result of your map&reduce formula is about expand your spreadsheet more than 66%. Maybe you should use trim option? Wrong concat/leftjoin ?";
        SpreadsheetApp.getActiveSpreadsheet().toast(error_message, "Wrong concat/leftjoin ?", 5);
        return "<ERROR : " & error_message & ">";
    }
    return r;
}

// used to convert arguments to an Array
function array_(a) {
    return Array.prototype.slice.call(a);
}

function is_array_(o) {
    return Object.prototype.toString.call(o) === '[object Array]'
}

// created ability to use short tonation in methods like
//  $0.map({|v,i| return v+1}
//  vs.
//  $0.map(function(v,i){return v+1}
// also makes it easier to read
function block2function_(s) {
    return s.replace(/\{[ \t\n]*\|([^\|]+)\|/g, "function($1){")
}

// Array vertical function go through Array prototype

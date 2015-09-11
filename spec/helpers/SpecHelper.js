var fs = require('fs');
var path = require('path');

function Spreadsheet() {
}

function Sheet() {
}

Sheet.prototype.getMaxRows = function () {
    return 10
};

Sheet.prototype.getMaxColumns = function () {
    return 10
};

function SpreadsheetAppObject() {

}

SpreadsheetAppObject.prototype.getActiveSpreadsheet = function () {
    return this.activeSpreadsheet = this.activeSpreadsheet || new Spreadsheet()
};

SpreadsheetAppObject.prototype.getActiveSheet = function () {
    return this.activeSheet = this.activeSheet || new Sheet()
};

SpreadsheetApp = new SpreadsheetAppObject();

['Public', 'Private', 'Helpers'].forEach(function(name) {
    eval.call(null, fs.readFileSync(path.join(process.cwd(), 'MapReduce', name + '.js')).toString());
});

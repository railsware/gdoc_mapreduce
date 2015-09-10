function Spreadsheet() {
}

function Sheet(){  
}
Sheet.prototype.getMaxRows = function(){return 10}
Sheet.prototype.getMaxColumns = function(){return 10}

function SpreadsheetAppObject() {
  
}
SpreadsheetAppObject.prototype.getActiveSpreadsheet = function(){return self.activeSpreadsheet = self.activeSpreadsheet || new Spreadsheet() }
SpreadsheetAppObject.prototype.getActiveSheet = function(){return self.activeSheet = self.activeSheet || new Sheet()}

var SpreadsheetApp=new SpreadsheetAppObject()

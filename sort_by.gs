function EqualValue() {
  var allSheetTabs,i,L,thisSheet,thisSheetName,sheetsToExclude,value;

  sheetsToExclude = ['Filter','Summary','file_lookup_script_query','readme'];

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  allSheetTabs = ss.getSheets();

  L = allSheetTabs.length;

  for (i=0;i<L;i++) {
    thisSheet = allSheetTabs[i];
    thisSheetName = thisSheet.getName();

    //continue to loop if this sheet is one to exclude
    if (sheetsToExclude.indexOf(thisSheetName) !== -1) {continue;}
    thisSheet.sort(17,false)
  }
}
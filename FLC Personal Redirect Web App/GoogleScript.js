function doGet(request) {
    return HtmlService.createTemplateFromFile('Index')
        .evaluate();
  }
  
  function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
  }
  
  var rawData = [];
  
  function checkKey(key) {
    var urlKey = key;
    getReffSheet();
    var link = findUrl(urlKey);
    var urlKey = "";
    return link;
  }
  
  function getReffSheet() {
    var cmsSheet = DriveApp.getFileById('13vCSwGuMGX_5GnlUCl7VsAIYU_pJln5Ipizokwd6wlo');
    var activeSheet = SpreadsheetApp.openById(cmsSheet.getId());
    SpreadsheetApp.setActiveSpreadsheet(activeSheet);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var finalColumn = sheet.getLastColumn();
    var numRows = sheet.getLastRow();
    var sheetName = SpreadsheetApp.getActive().getName();
    // loop through rows  
    for (let row = 1; row <= numRows; row++) { 
      var rowData =[];
      var startingRow = row;
      //loop through columns
      for (let col = 1;col <= finalColumn; col++) {
        var currentRowData = sheet.getRange(startingRow,col).getValue().toString();
        rowData.push(currentRowData);  
      }
      rawData.push(rowData);
    }
  }
  
  function findUrl (urlKey) {
    for(let i in rawData){      
      for(let j in rawData[i]){
        if (rawData[i][j] === urlKey){
          Logger.log("key found");
          Logger.log(rawData[i]);
          var activeUrl = getUrl(rawData[i]);
          Logger.log(activeUrl);
          return activeUrl;
  
        }else {
          var activeUrl = "Incorrect Key";
        } 
      }
    }
  }
  
  function getUrl (rawData) { // returns URL based off acess key postion in array
    return rawData[15];  
  }
  
  
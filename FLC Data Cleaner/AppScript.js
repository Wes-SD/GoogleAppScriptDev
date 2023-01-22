const APP_TITLE = 'FLC Data Interpreter';

/* new version of data object
  var company = {
    employees: {
      id: {
        q1: '',
        q2: '',
        q3: '',
      },
      id: {
        q1: '',
        q2: '',
        q3: '',
      }
    },
    managers: {
      id: {
        q1: '',
        q2: '',
        q3: '',
      },
      id: {
        q1: '',
        q2: '',
        q3: '',
      }
    }
  }
*/

  
var data = [];//data object for cleanData()

function cleanEmployeeData() {
  // variables tailored to qualtics.com GoogleSheets format
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var finalColumn = sheet.getLastColumn();
  var numRows = sheet.getLastRow();
  var sheetName = SpreadsheetApp.getActive().getName();

  // var varName = SpreadsheetApp.getActiveSheet().getRange(startingRow, startingColmun, numberofRows , numberOfColumns).getValues();
  var titles = sheet.getRange(1, 1, 1 , finalColumn).getValues();

  
  const companyObjct = {company : sheetName};

  
  
  // loop through rows
  for (let row = 0; row <= numRows; row++) {
    var rowData =[];
    var startingRow = row + 1;
    
    //loop through columns
    for (let col = 5;col <= finalColumn; col++) { // omitting extra data
      
      if (col === 10){ //omitting extra data
        col = 16;
      };
      
      var currentRowData = SpreadsheetApp.getActiveSheet().getRange(startingRow,col).getValue();
      // ranking questiong data clean up for no response
      if (col === 18){
      }
      
      if (col >= 18){ 
        if (currentRowData === '7 = always true'){
          var currentRowData = '7';
        } else if (currentRowData ===''){
          var currentRowData = '-99';
        } else if (currentRowData === '1 = never true'){
          var currentRowData = '1';
        }
      }
      var questionResponses = SpreadsheetApp.getActiveSheet().getRange(startingRow, col, 1, 46).getValues();
      //put column data in row array
      Logger.log(questionResponses);
      rowData.push(currentRowData); 
    }
    // put row data in array
    data.push(rowData);
  }
  // note data values are in a 2nd demention array please enter Logger.log(data[0][6]); to confrim this
  //Logger.log(data[2]);
  
  for(x in data){
    employees.push( new employee(data[x]))
  }
  //Logger.log(employees[2])
  //putEmployeeData(rawData,sheetName);
   
}

function company (employees, managers){
  this.employees = employees;
  this.managers = managers;
}
var employees = [];
function employee(userinfo, qResponse) {
  this.progress = userinfo[1]; 
  this.duration = userinfo[2];
  this.finished = userinfo[3];
  this.recordedDate = userinfo[4];
  this.responseId = userinfo[5];
  this.distributionChannel = userinfo[6]; 
  this.userLanguage = userinfo[7];
  this.surveyId = userinfo[8];
  this.responses = qResponse;    
  }
var managers = [];
function manager(userinfo, qResponse) {
  this.progress = userinfo[1]; 
  this.duration = userinfo[2];
  this.finished = userinfo[3];
  this.recordedDate = userinfo[4];
  this.responseId = userinfo[5];
  this.distributionChannel = userinfo[6]; 
  this.userLanguage = userinfo[7];
  this.surveyId = userinfo[8];
  this.responses = qResponse;    
  }

function mainFunction(){ //Whatever code you put inside the brackets of the if(runCode) statement will be executed if the number of files under the folderID has changed.
  const folderID = 'folderID'; //provide here the ID of the folder
  const newCounter = countFiles(folderID);
  const runCode = checkProperty(folderID, newCounter);
  
  if(runCode){
   checkSheetProp();
    console.log("I am executed!");
   //
  }
}

function countFiles(folderID) { //helper functions which need to be in the same project
  const theFolder = DriveApp.getFolderById(folderID);
  const files = theFolder.getFiles();
  let count = 0;
  while (files.hasNext()) {
   let file = files.next();
   count++;
   };
  return count;
}


function checkProperty(folderID, newC){ 
  const scriptProperties = PropertiesService.getScriptProperties();
  const oldCounter = scriptProperties.getProperty(folderID);
  const newCounter = newC.toString();
  if(oldCounter){
    if(oldCounter==newCounter){
      return false;
    }
    else{
      scriptProperties.setProperty(folderID, newCounter);  
      return true;
    }
  }
  else{
     scriptProperties.setProperty(folderID, newCounter);  
     return true;
  }
}
function checkSheetProp () {
  var ss = SpreadsheetApp.getActive();
  var allSheets = ss.getSheets();
  for (var i in allSheets){
    var sheet = allSheets[i]
    var sheetName = sheet.getName();
    Logger.log(sheet.getName());
    cleanDataV2(sheet , sheetName);
  }
  
}

function cleanDataV2 (emplySheet , sheetName) {
  var sheet = emplySheet;
  var sheetN = sheetName;
  var finalColumn = sheet.getLastColumn();
  var numRows = sheet.getLastRow();

  for (let row = 0; row <= numRows; row++){
    var userinfo = [];
    var qResponse = [];
    var startingRow = row + 1;

    for(let col = 4;col<=finalColumn;col++){
      if (col <= 9){
        var currentRowData = SpreadsheetApp.getActiveSheet().getRange(startingRow,col).getValue();
        userinfo.push(currentRowData);
      }else if (col === 10){
        col = 16;
      }else if(col === 16 && col === 17 && col === 18){
        var currentRowData = SpreadsheetApp.getActiveSheet().getRange(startingRow,col).getValue();
        userinfo.push(currentRowData);
      }else if (col >= 19){
        var questionResponses = SpreadsheetApp.getActiveSheet().getRange(startingRow, col).getValue();
        if (questionResponses === ''){
          var questionResponses = 0;
          qResponse.push(questionResponses);
        }else {
          qResponse.push(questionResponses);
        }
        
      }
    }
    if (sheetN === "Employee"){
      employees.push( new employee(userinfo,qResponse));
      
    } else if (sheetN === "Manager"){
      managers.push( new manager(userinfo, qResponse));
    }
  }
} 


function putEmployeeData (rawData, sheetName){
  var data = rawData;
  var name = sheetName;

  Logger.log(data)

  const template = DriveApp.getFileById('14ruIPAstC0RAHufumqwgnXmCLb6kHq9AzIWGTykNZEY');
  const destinationFolder = DriveApp.getFolderById('1V0f4fHEdCu5S2QD8VWTBQJS9uvUtndDY');
  
  const copy = template.makeCopy(name + ' - CLEANED' , destinationFolder);
  const newSheet = SpreadsheetApp.openById(copy.getId());
  
  SpreadsheetApp.setActiveSpreadsheet(newSheet);

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  let a = 0;
  for( let j = 0; j <= data.length; j++){
    if(data[a] === ''){
      a = a+1;
    }else{
      ss.appendRow(data[a])
      a = a + 1;
    }
    
  }

  var rawData = [];
}
function putManagerData (rawData, sheetName){
  var data = rawData;
  var name = sheetName;
  Logger.log(data)

  const template = DriveApp.getFileById('1tqx0QhoK5x30k7S0Y2GERhR41vYu135fRhtCPPmBcjk');
  const destinationFolder = DriveApp.getFolderById('1V0f4fHEdCu5S2QD8VWTBQJS9uvUtndDY');
  
  const copy = template.makeCopy(name + 'Clean Data' , destinationFolder);
  const newSheet = SpreadsheetApp.openById(copy.getId());
  
  SpreadsheetApp.setActiveSpreadsheet(newSheet);

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  let a = 0;
  for( let j = 0; j <= data.length; j++){
    if(data[a] === ''){
      a = a+1;
    }else{
      ss.appendRow(data[a])
      a = a + 1;
    }
    
  }
  SpreadsheetApp.getUi().alert('Success');
  var rawData = [];
}
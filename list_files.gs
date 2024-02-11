/* Adapted from Code written by @hubgit https://gist.github.com/hubgit/3755293
Updated since DocsList is deprecated  https://ctrlq.org/code/19854-list-files-in-google-drive-folder

Bluexm: added recursion on subfolders */

// List all files and sub-folders in a folder and subfolders Google Drive
// declare the starting folder name
var foldername = '*Time Tracking';


// entry function 
function ListNamedFilesandFolders(){
  ListNamedFilesandFolders1F(foldername,'')
}


function ListNamedFilesandFolders1F(fn,rfn) {

  // declare an array to push data into the spreadsheet
  var data = [];


  // declare this sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("file_lookup_script_query");

  if (foldername==fn){
    // clear any existing content
    sheet.clear();
    // append a header row
    sheet.appendRow(["Folder","Name", "Date Last Updated", "Size", "URL", "ID", "Description", "Type"]);
    }
  // getFoldersByName = Gets a collection of all folders in the user's Drive that have the given name.
  // folders is a "Folder Iterator" but there is only one unique folder name called, so it has only one value (next)
  var folders = DriveApp.getFoldersByName(fn);
  var foldersnext = folders.next();
  Logger.log("THE FOLDER IS "+foldersnext);// DEBUG

  // list files in this folder
  // myfiles is a File Iterator
  var myfiles = foldersnext.getFiles();

  Logger.log("FILES IN THIS FOLDER"); //DEBUG

  // loop through files in this folder
  while (myfiles.hasNext()) {
    var myfile = myfiles.next();
    var fname = myfile.getName();
    var fdate = myfile.getLastUpdated(); 
    var fsize = myfile.getSize();
    var furl = myfile.getUrl();
    var fid = myfile.getId();
    var fdesc = myfile.getDescription();
    var ftype = myfile.getMimeType();
    Logger.log("File Name is "+myfile.getName()); //Logger.log("Date is "+myfile.getLastUpdated()); //Logger.log("Size is "+myfile.getSize());
    Logger.log("URL is "+myfile.getUrl()); //Logger.log("ID is "+myfile.getId()); //Logger.log("Description is "+myfile.getDescription());
    Logger.log("File Type is "+myfile.getMimeType());

    // Populate the array for this file
    data = [ 
      rfn+'/'+ foldersnext,
      fname,
      fdate,
      fsize,
      furl,
      fid,
      fdesc,
      ftype
    ];
    Logger.log("data = "+data); //DEBUG
    sheet.appendRow(data);
  } // Completes listing of the files in the named folder

  // Now get the subfolder
  // subfolders is a Folder Iterator
  var subfolders = foldersnext.getFolders();
  // Logger.log("THE SUBFOLDER(S) ARE"); //DEBUG HEADING

  // now start a loop on the SubFolder list
  while (subfolders.hasNext()) {
    var subfolderdata = [];
    var mysubfolders = subfolders.next();
    var mysubfolder = mysubfolders.getName();  
    Logger.log("Subfolder name:"+mysubfolder); //DEBUG

    ListNamedFilesandFolders1F(mysubfolder,rfn +'/'+ fn)

  }
}
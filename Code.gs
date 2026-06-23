function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  if (data.action === "delete") {
    // Logic to find and delete row based on a unique timestamp or order detail
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][1] === data.items) { // Matches order items
        sheet.deleteRow(i + 1);
        return ContentService.createTextOutput("Deleted").setMimeType(ContentService.MimeType.TEXT);
      }
    }
  } else {
    sheet.appendRow([new Date(), data.items, data.total]);
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * Your-UniVerse waitlist → Google Sheets connector
 *
 * Column headers match the website form questions exactly.
 * If your sheet already has headers in row 1, new rows map to those columns by name.
 *
 * Setup:
 * 1. Open: https://docs.google.com/spreadsheets/d/1EnrKAjnb5o8DjCYGM8w4ULIJ2j05eCKO4m5pccTsvGc/edit
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Deploy → New deployment → Web app (Execute as: Me, Access: Anyone)
 * 4. Add Web app URL to Vercel as GOOGLE_SHEETS_WEBHOOK_URL
 */

const WEBHOOK_SECRET = "";

const DEFAULT_HEADERS = [
  "Timestamp",
  "Type",
  "First Name",
  "Surname",
  "Email",
  "Organisation",
  "What grade are you in?",
  "What are you into right now?",
  "What do you want to achieve academically?",
  "Roughly where is your average?",
  "How did your last test or exam go?",
  "What grade is your child in?",
  "What matters most to you right now?",
  "What would you love them to achieve?",
  "What is your role?",
  "Roughly how many learners could use guidance?",
  "What are you most focused on?",
  "What would success look like in Year 1?",
];

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    if (WEBHOOK_SECRET && payload.secret !== WEBHOOK_SECRET) {
      return jsonOut({ success: false, error: "Unauthorized" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rowData = payload.row || {};
    var headers = getHeaders(sheet, payload.headers || DEFAULT_HEADERS);
    var values = headers.map(function (header) {
      return rowData[header] != null ? String(rowData[header]) : "";
    });

    sheet.appendRow(values);
    return jsonOut({ success: true });
  } catch (err) {
    return jsonOut({ success: false, error: String(err) });
  }
}

function getHeaders(sheet, fallbackHeaders) {
  var lastCol = sheet.getLastColumn();
  if (sheet.getLastRow() === 0 || lastCol === 0) {
    sheet.getRange(1, 1, 1, fallbackHeaders.length).setValues([fallbackHeaders]);
    return fallbackHeaders;
  }

  var existing = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var trimmed = existing.map(function (h) {
    return String(h || "").trim();
  }).filter(function (h) {
    return h.length > 0;
  });

  return trimmed.length ? trimmed : fallbackHeaders;
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

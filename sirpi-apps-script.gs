/* ============================================================
   Sirpi Aesthetics — Google Sheet web app
   Receives leads from /api/submissions (app/api/submissions/route.ts).

   Tabs (created automatically on the first lead):
     "Website Leads" — the gynecomastia lead form
       Timestamp | Source | Name | Phone | Email | City | Concern | URL | TeleCRM
     "Review Leads"  — the /review page
       Timestamp | Source | Name | Phone | Rating | Callback | Message | URL | TeleCRM

   SETUP
   1. Open the Google Sheet → Extensions → Apps Script.
   2. Replace everything in Code.gs with this file and Save.
   3. Deploy → New deployment → type "Web app"
        Execute as:     Me
        Who has access: Anyone
   4. Copy the Web app URL (ends in /exec) and set it in the site's env:
        GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
   5. After editing this script later: Deploy → Manage deployments → Edit →
      Version "New version" → Deploy (the /exec URL stays the same).
   ============================================================ */

var LEADS_TAB  = 'Website Leads';
var REVIEW_TAB = 'Review Leads';

var LEAD_HEADERS   = ['Timestamp', 'Source', 'Name', 'Phone', 'Email', 'City', 'Concern', 'URL', 'TeleCRM'];
var REVIEW_HEADERS = ['Timestamp', 'Source', 'Name', 'Phone', 'Rating', 'Callback', 'Message', 'URL', 'TeleCRM'];

// Sirpi brand colours for the header row.
var HEADER_BG   = '#6A113D';
var HEADER_TEXT = '#FFFFFF';

/* ── POST: append one lead ─────────────────────────────────────────────── */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // two leads arriving together must not share a row

    var data = parseBody_(e);
    var isReview = data.isReview === true || data.source === 'Review Page';

    var sheet = isReview
      ? getOrCreateTab_(REVIEW_TAB, REVIEW_HEADERS)
      : getOrCreateTab_(LEADS_TAB, LEAD_HEADERS);

    var row = isReview ? buildReviewRow_(data) : buildLeadRow_(data);
    sheet.appendRow(row);

    // Phone numbers as plain text, so a leading 0 / +91 is never eaten.
    sheet.getRange(sheet.getLastRow(), 4).setNumberFormat('@');

    return json_({ success: true, tab: sheet.getName(), row: sheet.getLastRow() });
  } catch (err) {
    return json_({ success: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* ── GET: health check, or read leads back ─────────────────────────────────
     /exec                      → { success, status, tabs }
     /exec?action=leads         → website leads as JSON
     /exec?action=reviews       → review leads as JSON
     /exec?action=leads&limit=20 → the newest 20                          */
function doGet(e) {
  try {
    var p = (e && e.parameter) || {};
    var action = String(p.action || '').toLowerCase();

    if (action === 'leads' || action === 'reviews') {
      var tab = action === 'leads' ? LEADS_TAB : REVIEW_TAB;
      var limit = parseInt(p.limit, 10) || 0;
      return json_({ success: true, tab: tab, rows: readTab_(tab, limit) });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    return json_({
      success: true,
      status: 'Sirpi Aesthetics API is live',
      spreadsheet: ss.getName(),
      tabs: ss.getSheets().map(function (s) {
        return { name: s.getName(), rows: Math.max(s.getLastRow() - 1, 0) };
      }),
    });
  } catch (err) {
    return json_({ success: false, error: String(err) });
  }
}

/* ── Row builders ──────────────────────────────────────────────────────── */

// The API also sends a ready-made `row` / `reviewRow`; the named fields are
// used first so the column order here is the one that counts.
function buildLeadRow_(d) {
  return [
    d.timestamp || now_(),
    d.source || 'Website',
    d.name || '',
    d.phone || '',
    d.email || '',
    d.city || '',
    d.concern || '',
    d.pageUrl || d.url || '',
    d.telecrm || '',
  ];
}

function buildReviewRow_(d) {
  return [
    d.timestamp || now_(),
    d.source || 'Review Page',
    d.name || '',
    d.phone || '',
    d.rating || '',
    d.callback || '',
    d.message || d.concern || '',
    d.pageUrl || d.url || '',
    d.telecrm || '',
  ];
}

/* ── Helpers ───────────────────────────────────────────────────────────── */

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    // Fallback for form-encoded posts.
    return (e && e.parameter) || {};
  }
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    return (e && e.parameter) || {};
  }
}

function getOrCreateTab_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);

  // Write the header row if the tab is new or its headers are out of date.
  var current = sheet.getLastRow() > 0
    ? sheet.getRange(1, 1, 1, headers.length).getValues()[0]
    : [];
  if (current.join('|') !== headers.join('|')) {
    sheet.getRange(1, 1, 1, headers.length)
      .setValues([headers])
      .setFontWeight('bold')
      .setBackground(HEADER_BG)
      .setFontColor(HEADER_TEXT);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

function readTab_(name, limit) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet || sheet.getLastRow() < 2) return [];

  var values = sheet.getDataRange().getDisplayValues();
  var headers = values.shift();
  if (limit > 0) values = values.slice(-limit);

  return values.reverse().map(function (r) { // newest first
    var o = {};
    headers.forEach(function (h, i) { o[h] = r[i]; });
    return o;
  });
}

function now_() {
  return Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd/MM/yyyy, hh:mm:ss a');
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ── Manual test: run from the editor (Run → testLead) ─────────────────── */
function testLead() {
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        source: 'Gynecomastia Lead Form',
        name: 'Test Lead',
        phone: '9876543210',
        email: 'test@example.com',
        city: 'Peelamedu, Coimbatore',
        concern: 'Excess chest fat',
        pageUrl: 'https://example.com/',
        telecrm: 'Test',
      }),
    },
  });
  Logger.log(res.getContent());
}

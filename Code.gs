// OPR SMKSI - Apps Script backend
// ---------------------------------
// SEDIA SEBELUM DEPLOY:
// 1. Tukar FOLDER_ID di bawah kepada ID folder Google Drive
//    tempat PDF OPR akan disimpan ("Rekod OPR SMKSI").
// 2. Tukar SHEET_ID kepada ID Google Sheet log rekod
//    (biarkan kosong "" untuk auto-cipta Sheet baharu semasa
//    panggilan pertama, ID akan dipaparkan dalam Log > Execution log).

const FOLDER_ID = 'MASUKKAN_ID_FOLDER_DRIVE_DI_SINI';
const SHEET_ID  = ''; // kosongkan jika belum ada, akan dicipta automatik

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Sistem OPR - SMK Sultan Ismail')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Dipanggil dari client (google.script.run) bila guru tekan "Hantar & Jana".
// dataUrl: string PNG dataURL (data:image/png;base64,....)
// meta: Object metadata borang (namaProgram, tarikh, namaGuru, dll)
// pulangkan: { url: string, fileId: string }
function simpanRekod(dataUrl, meta) {
  meta = meta || {};
  const namaFail = sanitizeFileName(meta.namaFail || meta.namaProgram || 'OPR');

  // 1) Tukar dataURL PNG -> Blob
  const pngBlob = dataUrlToBlob(dataUrl, namaFail + '.png');

  // 2) Tukar PNG -> PDF melalui Google Docs sementara
  const pdfBlob = pngToPdfViaDocs(pngBlob, namaFail);

  // 3) Simpan PDF ke folder Drive yang ditetapkan
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const pdfFile = folder.createFile(pdfBlob);
  pdfFile.setName(namaFail + '.pdf');
  // Jadikan boleh dilihat oleh sesiapa yang ada pautan (tukar jika perlu kawalan lebih ketat)
  try { pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (err) {}

  const pdfUrl = pdfFile.getUrl();

  // 4) Log ke Google Sheet
  logToSheet(meta, pdfUrl);

  return { url: pdfUrl, fileId: pdfFile.getId() };
}

// ---------------- Fungsi bantu ----------------

function dataUrlToBlob(dataUrl, filename) {
  const commaIdx = dataUrl.indexOf(',');
  const header = dataUrl.substring(0, commaIdx);
  const base64 = dataUrl.substring(commaIdx + 1);
  const contentType = header.substring(header.indexOf(':') + 1, header.indexOf(';'));
  const bytes = Utilities.base64Decode(base64);
  return Utilities.newBlob(bytes, contentType, filename);
}

function sanitizeFileName(name) {
  return String(name).replace(/[^\w\-]+/g, '_').slice(0, 80) || 'OPR';
}

// Cipta Google Doc sementara, sisipkan imej PNG dipenuhkan pada muka surat,
// eksport sebagai PDF (menggunakan penukaran native Drive), kemudian
// padam Doc sementara tersebut.
function pngToPdfViaDocs(pngBlob, namaFail) {
  const tempDoc = DocumentApp.create('TEMP_' + namaFail + '_' + new Date().getTime());
  const docId = tempDoc.getId();
  const body = tempDoc.getBody();

  // Kosongkan margin supaya imej memenuhi muka surat sepenuhnya
  body.setMarginTop(0);
  body.setMarginBottom(0);
  body.setMarginLeft(0);
  body.setMarginRight(0);

  // Sisipkan imej
  const img = body.appendImage(pngBlob);

  // Lebar muka surat Google Docs lalai (Letter) ialah 612pt.
  // Imej kita nisbah A4 (794 x 1123), jadi kekalkan nisbah tersebut.
  const pageWidthPt = body.getPageWidth() || 612;
  const ratio = 1123 / 794; // tinggi/lebar borang OPR
  img.setWidth(pageWidthPt);
  img.setHeight(Math.round(pageWidthPt * ratio));

  tempDoc.saveAndClose();

  // Tukar Google Doc -> PDF melalui eksport asli Drive
  const pdfBlob = DriveApp.getFileById(docId).getAs('application/pdf');

  // Padam fail Doc sementara (buang ke tong sampah)
  DriveApp.getFileById(docId).setTrashed(true);

  return pdfBlob;
}

function logToSheet(meta, pdfUrl) {
  const sheet = getOrCreateLogSheet();
  sheet.appendRow([
    new Date(),
    meta.namaProgram || '',
    meta.tajukKecil || '',
    meta.tarikh || '',
    meta.hari || '',
    meta.masa || '',
    meta.tempat || '',
    meta.namaGuru || '',
    meta.jawatan || '',
    pdfUrl
  ]);
}

function getOrCreateLogSheet() {
  let ss;
  if (SHEET_ID) {
    ss = SpreadsheetApp.openById(SHEET_ID);
  } else {
    // Cipta Sheet baharu automatik pada panggilan pertama.
    // Semak Log (View > Execution log) untuk dapatkan ID,
    // kemudian tampal ke pemalar SHEET_ID di atas supaya sentiasa
    // menggunakan Sheet yang sama.
    ss = SpreadsheetApp.create('Log Rekod OPR SMKSI');
    Logger.log('Sheet baharu dicipta. ID: ' + ss.getId() + ' - URL: ' + ss.getUrl());
  }

  let sheet = ss.getSheetByName('Rekod');
  if (!sheet) {
    sheet = ss.insertSheet('Rekod');
    sheet.appendRow([
      'Tarikh/Masa Hantar', 'Nama Program', 'Tajuk Kecil', 'Tarikh Program',
      'Hari', 'Masa', 'Tempat', 'Nama Guru', 'Jawatan', 'Pautan PDF'
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

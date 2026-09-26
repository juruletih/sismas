# Sistem OPR SMKSI — Panduan Setup Apps Script

## Fail dalam pakej ini
- `index.html` — templat OPR (borang + pratonton), telah diubah:
  - Default kosong (BLANK) bila dibuka — bukan lagi contoh GERAK MADANI
  - Butang baharu **"Hantar & Jana"** (hijau) yang menjana PDF & log rekod
- `Code.gs` — backend Apps Script (doGet + simpanRekod)

## Langkah Setup (sekali sahaja)

### 1. Cipta Google Apps Script Project
1. Pergi ke https://script.google.com → **Projek Baharu**
2. Namakan projek, contoh: `Sistem OPR SMKSI`
3. Padam kod lalai dalam `Code.gs`, salin-tampal kandungan `Code.gs` yang disediakan
4. Klik **+** di sebelah "Fail" → **HTML** → namakan `index` (huruf kecil, tanpa `.html`)
5. Padam kandungan lalai, salin-tampal seluruh kandungan `index.html` yang disediakan

### 2. Sediakan Folder Drive untuk simpan PDF
1. Di Google Drive, cipta folder baharu — cadangan nama: **"Rekod OPR SMKSI"**
2. Buka folder, salin ID folder daripada URL:
   `https://drive.google.com/drive/folders/`**`ID_FOLDER_DI_SINI`**
3. Dalam `Code.gs`, tukar baris:
   ```js
   const FOLDER_ID = 'MASUKKAN_ID_FOLDER_DRIVE_DI_SINI';
   ```
   kepada ID sebenar.

### 3. (Pilihan) Google Sheet log sedia ada
Jika mahu guna Sheet sedia ada, salin ID Sheet ke:
```js
const SHEET_ID = 'ID_SHEET_ANDA';
```
Jika dibiarkan kosong `''`, sistem akan **automatik mencipta** Sheet baharu
bernama "Log Rekod OPR SMKSI" pada penghantaran pertama. Semak
**Execution log** (Lihat > Log Log) untuk dapatkan ID Sheet tersebut, kemudian
tampal semula ke `SHEET_ID` supaya semua rekod seterusnya masuk ke Sheet yang sama.

### 4. Deploy sebagai Web App
1. Klik **Deploy** → **New deployment**
2. Jenis: **Web app**
3. Execute as: **Me** (akaun anda)
4. Who has access: **Anyone** (supaya semua guru boleh guna tanpa log masuk)
5. Klik **Deploy**, benarkan kebenaran (authorize) yang diminta
6. Salin **Web app URL** — inilah pautan `.../exec` untuk sistem OPR

### 5. Uji
1. Buka pautan `.../exec`
2. Isi borang ringkas, klik **Hantar & Jana**
3. Sistem akan:
   - Menjana imej pratonton (PNG) di pelayar
   - Menghantar ke server → tukar kepada PDF
   - Simpan PDF ke folder Drive yang ditetapkan
   - Log baris baharu dalam Google Sheet (nama program, tarikh, guru, pautan PDF)
   - Papar pautan "Buka PDF" terus dalam borang

## Nota Teknikal
- Penukaran PNG → PDF menggunakan helah standard: cipta Google Doc sementara,
  sisipkan imej penuh muka surat, eksport sebagai PDF melalui `getAs('application/pdf')`,
  kemudian Doc sementara dipadam (dibuang ke tong sampah Drive).
- Fungsi asal templat (Cetak/Simpan PDF, Muat Turun PNG, Simpan/Buka Draf) **kekal
  berfungsi seperti biasa** — ciri "Hantar & Jana" adalah tambahan, bukan gantian.
- Jika mahu hadkan akses (bukan "Anyone"), tukar tetapan "Who has access" semasa
  deploy kepada organisasi sekolah sahaja (jika akaun Google Workspace membenarkan).

## Untuk Repo GitHub `sismas`
Simpan `index.html` dan `Code.gs` dalam folder berasingan, contoh:
```
sismas/
  opr/
    index.html   (salinan sumber — bukan untuk deploy terus dari GitHub)
    Code.gs
    README_SETUP_OPR.md
```
GitHub hanya menyimpan **kod sumber**; Apps Script tetap perlu di-deploy
secara berasingan melalui script.google.com seperti Langkah 1-4 di atas.

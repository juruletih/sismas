# SISMAS — Sistem Sekolah

Templat sistem web app dalaman untuk sekolah, dibina dengan Google Apps Script (percuma, tiada kos hosting). Akses boleh dihadkan kepada akaun **moe-dl.edu.my** sahaja.

## Sistem

| Sistem | Fungsi |
|---|---|
| 📋 **Sistem OPR** | Isi dan jana One Page Report (OPR) program sekolah: borang, pratonton langsung, jana PDF/PNG, rekod automatik ke Google Sheet |
| 🚪 **Sistem Tempahan Bilik Khas** | Tempah bilik khas sekolah (makmal, STEM Hub, dewan dan lain-lain), dengan paparan kalendar bulanan |
| ✅ **Sistem Analisis Kehadiran** | Rekod kehadiran harian murid mengikut kelas, papan pemuka peratus kehadiran, semakan ambang 95% |

> **Nota:** Repo ini ialah **templat neutral**. Nama sekolah, JPN/PPD, lokasi dan logo diisi sendiri dalam bahagian "0. Identiti sekolah" pada borang OPR. Contoh OPR menggunakan data rekaan tanpa gambar sebenar. Pautan sistem yang digunakan di sekolah dikongsi secara dalaman sahaja.

## Struktur Repo

```
sismas/
  opr/
    index.html           # Templat borang OPR (sumber rujukan)
    Code.gs              # Backend Apps Script OPR
    README_SETUP_OPR.md  # Panduan deploy OPR
  README.md              # Fail ini
```

## Dibangunkan oleh

JURULETIH

---
*Kemas kini terakhir: November 2026*

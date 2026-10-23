# SISMAS — Sistem Sekolah SMK Sultan Ismail

Kumpulan sistem web app dalaman untuk kegunaan guru-guru SMK Sultan Ismail, Kota Bharu.
Semua sistem dibina menggunakan Google Apps Script (percuma, tiada kos hosting).
Akses dihadkan kepada akaun **moe-dl.edu.my** sahaja.

## Sistem

| Sistem | Fungsi |
|---|---|
| 📋 **Sistem OPR** | Isi & jana One Page Report (OPR) program sekolah — borang, pratonton langsung, jana PDF/PNG, rekod automatik ke Google Sheet |
| 🚪 **Sistem Tempahan Bilik Khas** | Tempah bilik khas sekolah (makmal, STEM Hub, Dewan Utama, dll) — paparan kalendar bulanan |
| ✅ **Sistem Analisis Kehadiran** | Rekod kehadiran harian pelajar mengikut kelas, dashboard peratus kehadiran, semakan ambang 95% PPD |

> **Nota:** Pautan sistem dikongsi secara dalaman kepada guru SMK Sultan Ismail sahaja.
> Log masuk dengan akaun DELIMa (moe-dl.edu.my) untuk membukanya.

## Status Pembangunan

| Sistem | Status |
|---|---|
| OPR | ✅ Live |
| Tempahan Bilik Khas | ✅ Live |
| Analisis Kehadiran | ✅ Live |

## Struktur Repo

```
sismas/
  opr/
    index.html          # Templat borang OPR (untuk rujukan/salinan sumber)
    Code.gs              # Backend Apps Script OPR
    README_SETUP_OPR.md  # Panduan deploy OPR
  README.md              # Fail ini
```

## Dibangunkan oleh

Wan Mohd Aizuddin bin Che Mat (Cg Din) — SMK Sultan Ismail, Kota Bharu, Kelantan

---
*Kemas kini terakhir: Oktober 2026*

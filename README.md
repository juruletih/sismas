# SISMAS — Sistem Sekolah SMK Sultan Ismail

Kumpulan sistem web app dalaman untuk kegunaan guru-guru SMK Sultan Ismail, Kota Bharu.
Semua sistem dibina menggunakan Google Apps Script (percuma, tiada kos hosting) dan
boleh diakses terus tanpa log masuk akaun Google.

## Sistem

| Sistem | Fungsi | Pautan |
|---|---|---|
| 📋 **Sistem OPR** | Isi & jana One Page Report (OPR) program sekolah — borang, pratonton langsung, jana PDF/PNG, rekod automatik ke Google Sheet | [Buka Sistem OPR](https://script.google.com/macros/s/AKfycbyKlPtyxeYguSiJL676SZ0lGkYL1oBAg5sasu-usGCBZuTi43a6u3wze8weBTaGfLQ/exec) |
| 🚪 **Sistem Tempahan Bilik Khas** | Tempah bilik khas sekolah (makmal, STEM Hub, Dewan Utama, dll) — paparan kalendar bulanan, tempahan tanpa login | [Buka Sistem Tempahan Bilik](https://script.google.com/macros/s/AKfycbzMGqjLHyB0b5_olG7kHtWEWNwCiAiXekDlj9CbbocbqyJzba6zJ3fzoaYHh_kFqSEQ/exec) |
| ✅ **Sistem Analisis Kehadiran** | Rekod kehadiran harian pelajar mengikut kelas, dashboard peratus kehadiran, semakan ambang 95% PPD | [Buka Sistem Kehadiran](https://script.google.com/macros/s/AKfycbzK17zyOiKDxQ3qzHEsgOxtu4XTHkCD-s9QvXwhv1etjktvxkT051aAo0wSY4V2KD8/exec) |

> **Nota:** Semua pautan di atas boleh dibuka terus tanpa log masuk. Jika pelayar
> memaparkan amaran "Google hasn't verified this app", klik **Advanced** →
> **Go to app (unsafe)** — ini normal untuk Apps Script yang belum disahkan Google,
> bukan tanda sistem tidak selamat (ia hanya digunakan dalaman sekolah).

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
*Kemas kini terakhir: September 2026*

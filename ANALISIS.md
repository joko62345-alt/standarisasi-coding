# Analisis Kasus: Tim dengan 15 Developer

## 1. Identifikasi Masalah

### Skenario

- 15 developer, semua commit langsung ke branch `main`
- Tidak ada CI/CD
- Test coverage hanya 25%
- Bug muncul di production setiap minggu

### Masalah Utama

| #   | Masalah                   | Dampak                                                         |
| --- | ------------------------- | -------------------------------------------------------------- |
| 1   | Tidak ada branch strategy | Konflik merge sering terjadi, `main` mudah rusak               |
| 2   | Tidak ada code review     | Kode berkualitas rendah dan bug logika lolos ke `main`         |
| 3   | Tidak ada CI/CD           | Build atau test yang gagal baru ketahuan setelah di production |
| 4   | Coverage hanya 25%        | Regresi tidak terdeteksi, 75% kode berjalan tanpa pengaman     |
| 5   | Tidak ada quality gate    | Tidak ada standar minimum yang harus dipenuhi sebelum merge    |

### Akar Masalah

**Tidak ada standarisasi proses integrasi kode.** Setiap developer bekerja
dengan caranya sendiri tanpa kesepakatan tentang bagaimana kode diperiksa,
diuji, dan digabungkan. Bug mingguan di production hanyalah gejala dari
masalah proses ini, bukan masalah kemampuan individu developer.

## 2. Standar yang Harus Diterapkan Pertama

Prinsipnya: **hentikan kerusakan dulu, baru tingkatkan kualitas.** Urutan
prioritas dipilih berdasarkan dampak terbesar dengan usaha terkecil.

### Prioritas 1 (Minggu 1-2): Branch Protection dan Code Review

- **Alasan:** Ini langkah paling murah tetapi paling efektif untuk menghentikan
  kerusakan. Selama semua orang masih bisa push langsung ke `main`, perbaikan
  lain tidak akan berarti.
- **Aksi:** Aktifkan branch protection pada `main`, wajibkan Pull Request dengan
  minimal 1 reviewer, dan larang push langsung.

### Prioritas 2 (Minggu 3-4): CI Sederhana

- **Alasan:** Review manusia bisa terlewat. CI memberi pengecekan otomatis yang
  konsisten untuk setiap PR.
- **Aksi:** Siapkan GitHub Actions dengan lint dan unit test. Jadikan status
  CI hijau sebagai syarat merge.

### Prioritas 3 (Minggu 5-8): Naikkan Coverage Bertahap

- **Alasan:** Melompat dari 25% ke 80% sekaligus tidak realistis dan memicu
  test asal-asalan hanya demi angka.
- **Aksi:** Naikkan sekitar 10% setiap 2 minggu. Mulai dari modul paling
  kritis dan paling sering menimbulkan bug. Wajibkan test untuk setiap fitur
  baru.

### Prioritas 4 (Minggu 9-12): Quality Gate dan CD

- **Alasan:** Setelah kebiasaan tim terbentuk, aturan bisa dibuat otomatis dan
  ketat tanpa menimbulkan penolakan.
- **Aksi:** Pasang coverage threshold di CI (build gagal jika coverage turun)
  dan deploy otomatis ke staging.

## 3. Roadmap 3 Bulan

### Bulan 1: Fondasi

- [ ] Aktifkan branch protection pada `main`
- [ ] Terapkan conventional commits
- [ ] Wajibkan PR dengan minimal 1 reviewer
- [ ] Siapkan CI dasar (lint + test)
- [ ] Sosialisasikan standar baru ke seluruh tim

### Bulan 2: Peningkatan

- [ ] Coverage naik ke 50%
- [ ] Wajibkan unit test untuk setiap fitur baru
- [ ] Pasang coverage reporting (misalnya Codecov)
- [ ] Mulai gunakan checklist code review
- [ ] Tulis test untuk 5 modul paling kritis

### Bulan 3: Otomasi Penuh

- [ ] Coverage naik ke 70%
- [ ] Aktifkan quality gate (CI gagal jika coverage turun)
- [ ] Deploy otomatis ke staging
- [ ] Lengkapi dokumentasi standar tim
- [ ] Adakan retrospektif dan ukur ulang bug production

## 4. Metrik Keberhasilan

| Metrik                          | Baseline     | Target 3 Bulan     |
| ------------------------------- | ------------ | ------------------ |
| Test coverage                   | 25%          | 70% atau lebih     |
| Bug production per minggu       | sekitar 5    | 1 atau kurang      |
| Waktu merge PR                  | belum diukur | kurang dari 1 hari |
| Kejadian `main` rusak per bulan | belum diukur | 0                  |
| Waktu code review               | belum diukur | kurang dari 4 jam  |

Catatan: metrik yang belum punya baseline diukur dulu selama bulan pertama,
lalu target dievaluasi ulang berdasarkan data nyata.

## 5. Risiko dan Mitigasi

| Risiko                                   | Mitigasi                                                 |
| ---------------------------------------- | -------------------------------------------------------- |
| Developer menolak karena merasa melambat | Jelaskan manfaatnya, mulai dari aturan sederhana         |
| Review menumpuk dan menjadi bottleneck   | Tetapkan batas waktu review dan bagi reviewer bergiliran |
| Test ditulis asal demi mengejar angka    | Review kualitas test, bukan hanya persentase coverage    |

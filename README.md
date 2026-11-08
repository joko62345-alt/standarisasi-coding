# Standarisasi Coding: Tugas Pengujian dan Integrasi

[![CI Pipeline](https://github.com/joko62345-alt/standarisasi-coding/actions/workflows/ci.yml/badge.svg)](https://github.com/joko62345-alt/standarisasi-coding/actions/workflows/ci.yml)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

## Deskripsi

Project latihan penerapan standar pengujian (struktur AAA dan prinsip FIRST)
dan integrasi kode (GitHub Actions CI) pada modul `User` dan `ShoppingCart`.

## Teknologi

- Node.js v20
- Jest (testing)
- ESLint (linting)
- Prettier (formatting)
- GitHub Actions (CI)

## Cara Menjalankan

```bash
npm install
npm test
npm run test:coverage
npm run lint
npm run format:check
```

## Coverage

| File            | Statements | Branches | Functions | Lines |
| --------------- | ---------- | -------- | --------- | ----- |
| User.js         | 100%       | 100%     | 100%      | 100%  |
| ShoppingCart.js | 100%       | 100%     | 100%      | 100%  |

Total: 27 test (9 untuk `User`, 18 untuk `ShoppingCart`), semuanya passing.

## Struktur

```text
src/        -> source code (User.js, ShoppingCart.js)
tests/      -> unit test
.github/    -> workflow CI
ANALISIS.md -> analisis kasus dan roadmap 3 bulan
```

## Author

- Nama: Joko Sutrisno
- NIM: E41250149

## Catatan

- Semua test mengikuti struktur AAA (Arrange, Act, Assert)
- Penamaan test: `should [behavior] when [condition]`
- Coverage target: 80% atau lebih (tercapai: 100%)

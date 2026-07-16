# Servis Cianjur

Sistem manajemen servis elektronik untuk Servis Cianjur. Project ini menggunakan arsitektur monorepo sederhana yang memisahkan antara frontend dan backend.

## Teknologi

- **Frontend:** Next.js (App Router), React, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express.js, Sequelize ORM, TypeScript
- **Database:** MySQL

## Struktur Folder

```text
project-root/
├── frontend/      # Aplikasi Next.js untuk user interface
├── backend/       # REST API server Express.js
├── database/      # Skema database, seeder, atau backup
├── docs/          # Dokumentasi teknis
├── README.md      # Panduan utama project
└── .gitignore     # Aturan Git
```

## Cara Menjalankan Frontend

1. Masuk ke folder frontend:
   ```bash
   cd frontend
   ```
2. Install dependensi:
   ```bash
   npm install
   ```
3. Jalankan server development:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

## Cara Menjalankan Backend

1. Masuk ke folder backend:
   ```bash
   cd backend
   ```
2. Install dependensi:
   ```bash
   npm install
   ```
3. Konfigurasi file `.env` berdasarkan contoh yang tersedia.
4. Jalankan server development:
   ```bash
   npm run dev
   ```
   Server akan berjalan di port yang telah ditentukan (biasanya 5000).

## Cara Import Database

1. Pastikan server MySQL berjalan.
2. Buat database baru (misalnya `servis_cianjur`).
3. Import schema atau biarkan sinkronisasi database Sequelize bekerja otomatis (jika `sync: true` diaktifkan di konfigurasi backend saat server dijalankan).
4. Untuk data statis, script seeder atau file `.sql` dapat ditempatkan dan diakses di dalam folder `database/`.

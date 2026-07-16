# Servis Cianjur Backend API

Ini adalah repositori backend untuk sistem ERP Servis Cianjur. Aplikasi ini dibangun dengan menggunakan arsitektur **Feature-Based Modular Architecture** di atas platform Node.js, Express, dan TypeScript.

## Persyaratan
- Node.js (v18 atau lebih baru disarankan)
- MySQL (v8.0 disarankan)
- npm (Node Package Manager)

## Instalasi
1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```
2. Instal semua dependensi:
   ```bash
   npm install
   ```

## Environment
1. Salin file konfigurasi environment:
   ```bash
   cp .env.example .env
   ```
2. Sesuaikan variabel dalam `.env` dengan konfigurasi server MySQL dan kunci JWT Anda.

## Migration & Seeder
Proyek ini menggunakan Sequelize ORM.
1. Untuk menjalankan migrasi tabel database:
   ```bash
   npm run db:migrate
   ```
2. Untuk menanamkan data awal (*seeding*):
   ```bash
   npm run db:seed
   ```

## Menjalankan Server
**Mode Development:**
```bash
npm run dev
```
Server akan menggunakan `tsx` dan `nodemon` untuk *hot-reloading*.

**Mode Production:**
```bash
npm run start
```

## Build Production
Untuk men-compile TypeScript ke JavaScript murni (di folder `/dist`):
```bash
npm run build
```

## Swagger
Dokumentasi API lengkap tersedia melalui Swagger UI.
Setelah server berjalan, Anda dapat mengakses dokumentasinya di:
[http://localhost:5000/api/docs](http://localhost:5000/api/docs)

## Struktur Folder
```
src/
├── config/        # Konfigurasi eksternal (DB, Logger, dll)
├── middleware/    # Filter proteksi, auth, rate-limit
├── modules/       # Domain entitas fungsional (Route, Controller, Service)
├── seeders/       # Data dummy (awal) untuk database
├── shared/        # Utilitas global, error format, constants
├── types/         # Typescript definitions
├── uploads/       # Direktori penyimpanan media/dokumen
├── utils/         # Helper spesifik seperti formatter, pagination
├── app.ts         # Registrasi middleware
└── server.ts      # HTTP & Koneksi Node
```

## Coding Convention
- Gunakan *strict mode* Typescript (Hindari `any`).
- Format pengembalian *response* HTTP WAJIB menggunakan fungsi dari `src/utils/response.ts` agar seragam.
- Jangan letakkan fungsi `controller` atau `route` secara global. Semuanya harus ditempatkan di dalam hirarki `modules/[nama-modul]`.

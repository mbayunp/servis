# Database Backups

Folder ini berisi *dump* SQL yang dapat Anda impor langsung ke phpMyAdmin, DBeaver, atau klien MySQL lainnya tanpa perlu repot menjalankan migrasi Node.js.

- `servis.sql`: Struktur tabel murni (Schema)
- `seed.sql`: Data master awal (Brand, Kategori, Role, Admin)

## Cara Import:
1. Buat database `servis_cianjur` di phpMyAdmin.
2. Klik tab **Import**.
3. Pilih `servis.sql` lalu klik **Go**.
4. (Opsional) Ulangi langkah 3 untuk `seed.sql` jika ingin menggunakan data dummy.

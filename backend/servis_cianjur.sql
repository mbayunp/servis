-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Jul 2026 pada 06.15
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `servis_cianjur`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `articles`
--

CREATE TABLE `articles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `content` text NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'DRAFT',
  `author` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `articles`
--

INSERT INTO `articles` (`id`, `title`, `slug`, `image`, `excerpt`, `content`, `category`, `status`, `author`, `createdAt`, `updatedAt`) VALUES
('551568cb-72dc-42a5-93e3-b85669c58f97', 'Penyebab Mesin Cuci Tidak Berputar dan Cara Mengatasinya', 'penyebab-mesin-cuci-tidak-berputar', 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80', 'Mesin cuci mendengung tapi tabung penggiling atau pengering tidak mau berputar? Ini diagnosa awal sebelum memanggil teknisi.', '\n### Kenapa Mesin Cuci Tidak Berputar?\nMasalah mesin cuci yang mendadak mogok berputar bisa disebabkan oleh beberapa faktor mekanis maupun listrik. Berikut adalah beberapa penyebab tersering:\n\n1. **V-Belt / Tali Kipas Kendur atau Putus**  \n   Tali kipas penghubung dinamo ke puli tabung bisa aus seiring pemakaian. Jika terputus, motor tetap berputar namun tabung tidak ikut bergerak.\n\n2. **Kapasitor Motor Melemah atau Rusak**  \n   Kapasitor berfungsi memberikan dorongan awal daya putar motor. Jika nilainya drop, motor hanya akan bersuara dengung (*humming*) tanpa bisa berputar.\n\n3. **Beban Pakaian Terlalu Berat**  \n   Memasukkan pakaian melebihi kapasitas maksimal dapat memicu perlindungan thermal protector pada dinamo atau membuat vanbelt slip.\n\n4. **Door Switch / Saklar Pintu Pengering Rusak**  \n   Pada bagian pengering (spin), terdapat saklar keselamatan. Jika pintu terbuka atau pengait saklar patah, arus listrik ke motor otomatis terputus.\n\n### Kapan Harus Menghubungi Teknisi?\nJika penggantian kapasitor atau penataan ulang beban belum menyelesaikan masalah, kemungkinan besar gulungan dinamo terbakar atau timer switch rusak. Tim **Servis Cianjur** siap datang langsung ke rumah Anda!\n        ', 'Panduan Perawatan', 'DRAFT', 'Rahmat Hidayat (Senior Technician)', '2026-07-20 23:09:49', '2026-07-20 23:09:49'),
('b132710b-173b-4e34-9720-0368aea2cee8', 'Ciri-Ciri Kulkas Kurang Freon & Solusi Penanganan Tepat', 'ciri-ciri-kulkas-kurang-freon', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1200&q=80', 'Kulkas tidak dingin tapi lampu menyala? Kenali gejala kebocoran freon dan proses pengisian refrigran yang benar.', '\n### Apakah Kulkas Anda Mengalami Gejala Ini?\n- Lampu dalam kulkas menyala terang, namun udara tidak dingin sama sekali.\n- Bagian freezer tidak mampu membekukan es batu.\n- Bodi samping kulkas tidak terasa hangat saat kompresor bekerja.\n- Terdengar suara desir air di pipa tanpa ada hawa dingin.\n\n### Penyebab Utama Freon Habis\nSecara teori, sistem pendingin kulkas adalah sistem tertutup (*closed loop*). Freon tidak akan pernah habis kecuali terjadi **kebocoran mikro** pada pipa evaporator alumunium atau konduktor kondensor bawah.\n\n### Solusi Terbaik dari Servis Cianjur\n1. **Flushing & Cari Titik Bocor**: Pipa dites dengan tekanan angin dan sabun untuk memastikan titik kebocoran ditambal las kawat alumunium/perak.\n2. **Vakum Sistem Pendingin**: Mengeluarkan sisa udara dan kelembapan agar saluran sirkulasi bersih.\n3. **Pengisian Freon Sesuai Spesifikasi**: Mengisi freon (R134a atau R600a) sesuai tekanan PSI standar pabrikan.\n        ', 'Edukasi Elektronik', 'DRAFT', 'Budi Santoso (Spesialis Kulkas)', '2026-07-20 23:09:49', '2026-07-20 23:09:49'),
('e1e1ee9a-b6dc-4d93-836f-7eb2b17e9c99', '5 Cara Merawat TV LED Agar Awet dan Layar Tidak Garis', '5-cara-merawat-tv-led-agar-awet', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80', 'TV LED di rumah sering mati mendadak atau bergaris? Simak tips perawatan harian terbaik dari teknisi senior Servis Cianjur.', '\n### Pendahuluan\nTV LED merupakan salah satu perangkat elektronik hiburan keluarga yang paling sering digunakan setiap hari. Namun, penggunaan yang tidak tepat dapat menyebabkan penurunan kualitas panel layar atau bahkan komponen power supply mati mendadak.\n\n### 1. Atur Tingkat Kecerahan (Brightness) yang Wajar\nMenyetel brightness di tingkat 100% secara terus-menerus dapat mempercepat kerusakan lampu backlight TV LED. Gunakan mode *Standard* atau *Eco Mode* yang nyaman di mata dan menghemat energi.\n\n### 2. Gunakan Stabilizer / Stavolt Listrik\nTegangan listrik rumah yang sering naik-turun (fluktuatif) adalah musuh utama mesin TV LED. Menggunakan stabilizer atau alat anti surge proteksi listrik sangat disarankan di area Kabupaten Cianjur.\n\n### 3. Jauhkan dari Tempat Lembab dan Sinar Matahari Langsung\nHindari menempatkan TV dekat jendela yang terpapar hujan atau sinar matahari langsung yang panas, karena dapat merusak lapisan reflektor panel LCD.\n\n### 4. Bersihkan Layar dengan Kain Microfiber Halus\nJangan pernah menyemprotkan cairan pembersih kaca langsung ke layar TV! Gunakan kain microfiber yang sedikit lembab lalu lap lembut secara searah.\n\n### 5. Istirahatkan TV Setelah Digunakan Lebih dari 5 Jam\nBerikan jeda pendinginan selama 15-30 menit jika TV sudah dinyalakan seharian untuk mencegah panas berlebih (*overheating*) pada chipset mainboard.\n        ', 'Tips & Trik', 'DRAFT', 'Tim Teknisi Servis Cianjur', '2026-07-20 23:09:49', '2026-07-20 23:09:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bookings`
--

CREATE TABLE `bookings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `booking_number` varchar(255) NOT NULL,
  `customer_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `technician_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `brand_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `device_type_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `service_category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `complaint` text NOT NULL,
  `diagnosis` text DEFAULT NULL,
  `solution` text DEFAULT NULL,
  `estimated_cost` decimal(10,2) DEFAULT NULL,
  `final_cost` decimal(10,2) DEFAULT NULL,
  `estimated_finish` datetime DEFAULT NULL,
  `priority` varchar(255) NOT NULL DEFAULT 'NORMAL',
  `status` varchar(255) NOT NULL DEFAULT 'PENDING',
  `warranty_days` int(11) DEFAULT NULL,
  `is_home_service` tinyint(1) NOT NULL DEFAULT 0,
  `address` text DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `bookings`
--

INSERT INTO `bookings` (`id`, `booking_number`, `customer_id`, `technician_id`, `brand_id`, `device_type_id`, `service_category_id`, `device_name`, `serial_number`, `complaint`, `diagnosis`, `solution`, `estimated_cost`, `final_cost`, `estimated_finish`, `priority`, `status`, `warranty_days`, `is_home_service`, `address`, `latitude`, `longitude`, `notes`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('3b083bfe-cc39-4145-9fda-897fa16ded41', 'SCJ-20260716-424', 'c5f4702a-7457-45b2-9ce5-714a57d08609', NULL, '068f3113-4a34-4951-9940-4c6f19c2c12e', 'ef1c5a79-8e7e-4d7d-9aee-099822f8c50e', 'b86f8f33-5cca-4e5a-8fde-c94a43dd422c', 'QA Test Device', NULL, 'Layar mati QA', NULL, NULL, 100000.00, NULL, NULL, 'NORMAL', 'Finished', NULL, 0, NULL, NULL, NULL, NULL, '2026-07-16 13:20:53', '2026-07-16 13:20:53', '2026-07-16 13:20:53'),
('9aed71c2-70e6-4838-9802-b9f6c87cd006', 'SCJ-20260720-710', '79e9513e-8a22-4423-adae-b556b4ad1e5d', NULL, 'f249258d-7502-4140-9dad-1825b93ec9da', '62e740f0-0e0e-4e32-baf0-814f3cfd621a', 'b2091d9f-7141-41f5-ba4c-1dd62b0e3355', 'QA Test Device', NULL, 'Layar mati QA', NULL, NULL, 100000.00, NULL, NULL, 'NORMAL', 'Finished', NULL, 0, NULL, NULL, NULL, NULL, '2026-07-20 14:35:48', '2026-07-20 14:35:48', '2026-07-20 14:35:48'),
('ad5f6fea-8ac5-49d6-8ed3-22c65143fecb', 'SCJ-20260720-711', '75ec57dd-e672-4e0d-9f49-cff0910aeed0', NULL, '34c5e102-e350-425f-80d9-1da31a1ac1cb', 'c1eb73d7-3e55-4d12-8bce-b82bb2bc918a', 'a8b1dc98-5b68-4784-ae67-0e6d0afe70c4', 'QA Test Device', NULL, 'Layar mati QA', NULL, NULL, 100000.00, NULL, NULL, 'NORMAL', 'Finished', NULL, 0, NULL, NULL, NULL, NULL, '2026-07-20 14:34:28', '2026-07-20 14:34:29', '2026-07-20 14:34:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking_afters`
--

CREATE TABLE `booking_afters` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `booking_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `photo_url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking_befores`
--

CREATE TABLE `booking_befores` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `booking_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `photo_url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `brands`
--

CREATE TABLE `brands` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ACTIVE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `brands`
--

INSERT INTO `brands` (`id`, `name`, `logo`, `description`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('03d5610f-19bc-49bc-be4b-2925dfc1f746', 'QA Brand Updated uby1uk', NULL, NULL, 'ACTIVE', '2026-07-16 13:18:16', '2026-07-16 13:18:16', '2026-07-16 13:18:16'),
('068f3113-4a34-4951-9940-4c6f19c2c12e', 'QA Brand Updated ltlbdj', NULL, NULL, 'ACTIVE', '2026-07-16 13:20:53', '2026-07-16 13:20:53', '2026-07-16 13:20:53'),
('34c5e102-e350-425f-80d9-1da31a1ac1cb', 'QA Brand Updated u9wcyo', NULL, NULL, 'ACTIVE', '2026-07-20 14:34:28', '2026-07-20 14:34:29', '2026-07-20 14:34:29'),
('6ddfdf7f-96d7-4754-94a2-528a594f2c47', 'QA Brand Updated', NULL, NULL, 'ACTIVE', '2026-07-16 13:16:52', '2026-07-16 13:16:52', '2026-07-16 13:16:52'),
('b2bdc438-975d-4658-a9ba-3a044eb1f30e', 'QA Brand Updated 3xtw7a', NULL, NULL, 'ACTIVE', '2026-07-16 13:19:43', '2026-07-16 13:19:43', '2026-07-16 13:19:43'),
('c15d086f-a50e-4795-b8c3-2094472e0d62', 'QA Brand', NULL, NULL, 'ACTIVE', '2026-07-16 13:17:40', '2026-07-16 13:17:40', '2026-07-16 13:17:40'),
('f249258d-7502-4140-9dad-1825b93ec9da', 'QA Brand Updated 48nd3o', NULL, NULL, 'ACTIVE', '2026-07-20 14:35:48', '2026-07-20 14:35:48', '2026-07-20 14:35:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`id`, `user_id`, `full_name`, `phone_number`, `address`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('1f585709-83c9-4593-bc21-fa9fb320b76a', NULL, 'z', '089663933263', 'z', '2026-07-20 14:35:23', '2026-07-20 14:35:23', NULL),
('75ec57dd-e672-4e0d-9f49-cff0910aeed0', NULL, 'QA Customer', '0812345678u9wcyo', 'QA Address', '2026-07-20 14:34:28', '2026-07-20 14:34:29', '2026-07-20 14:34:29'),
('79e9513e-8a22-4423-adae-b556b4ad1e5d', NULL, 'QA Customer', '081234567848nd3o', 'QA Address', '2026-07-20 14:35:48', '2026-07-20 14:35:48', '2026-07-20 14:35:48'),
('ad788b6d-8048-4966-b9b1-bb954dfc62f7', NULL, 'QA Customer', '0812345678', 'QA Address', '2026-07-16 13:17:40', '2026-07-16 13:17:40', '2026-07-16 13:17:40'),
('c5f4702a-7457-45b2-9ce5-714a57d08609', NULL, 'QA Customer', '0812345678ltlbdj', 'QA Address', '2026-07-16 13:20:53', '2026-07-16 13:20:53', '2026-07-16 13:20:53'),
('d36e5cb2-f629-4f13-9280-4e8d2f9b2dad', NULL, 'Test Standalone Customer', '08123456789', 'Cianjur', '2026-07-20 14:36:07', '2026-07-20 14:36:07', NULL),
('f3a45886-2fda-4c4f-8fda-ec9890e2b21c', NULL, 'QA Customer', '08123456783xtw7a', 'QA Address', '2026-07-16 13:19:43', '2026-07-16 13:19:43', '2026-07-16 13:19:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `device_types`
--

CREATE TABLE `device_types` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ACTIVE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `device_types`
--

INSERT INTO `device_types` (`id`, `name`, `icon`, `description`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('42b2a18c-8181-4024-a668-5955294f0fdd', 'QA Device', NULL, NULL, 'ACTIVE', '2026-07-16 13:16:52', '2026-07-16 13:16:52', '2026-07-16 13:16:52'),
('4ddd0a1f-abf3-4844-86b7-73c074c7812b', 'QA Device 3xtw7a', NULL, NULL, 'ACTIVE', '2026-07-16 13:19:43', '2026-07-16 13:19:43', '2026-07-16 13:19:43'),
('62e740f0-0e0e-4e32-baf0-814f3cfd621a', 'QA Device 48nd3o', NULL, NULL, 'ACTIVE', '2026-07-20 14:35:48', '2026-07-20 14:35:48', '2026-07-20 14:35:48'),
('ab3aaa8e-65b3-414b-aab9-c66f5279e691', 'QA Device uby1uk', NULL, NULL, 'ACTIVE', '2026-07-16 13:18:17', '2026-07-16 13:18:17', '2026-07-16 13:18:17'),
('c1eb73d7-3e55-4d12-8bce-b82bb2bc918a', 'QA Device u9wcyo', NULL, NULL, 'ACTIVE', '2026-07-20 14:34:28', '2026-07-20 14:34:29', '2026-07-20 14:34:29'),
('ef1c5a79-8e7e-4d7d-9aee-099822f8c50e', 'QA Device ltlbdj', NULL, NULL, 'ACTIVE', '2026-07-16 13:20:53', '2026-07-16 13:20:53', '2026-07-16 13:20:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `galleries`
--

CREATE TABLE `galleries` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `galleries`
--

INSERT INTO `galleries` (`id`, `title`, `image_url`, `category`, `description`, `createdAt`, `updatedAt`) VALUES
('06f0c49f-33db-4b24-9af3-587719e25199', 'Pembersihan (Cuci AC) & Tambah Freon AC Split Panasonic 1 PK', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80', 'Perbaikan AC', 'Layanan kunjungan home service cuci AC di daerah Karangtengah Cianjur.', '2026-07-20 23:09:49', '2026-07-20 23:09:49'),
('98a9f75a-e69d-4c5c-b1dd-4571f61b10ae', 'Dokumentasi Area Workshop & Alat Ukur Presisi Servis Cianjur', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', 'Workshop', 'Peralatan oscilloskop, blower SMD, soldering station, dan multitester digital presisi tinggi.', '2026-07-20 23:09:49', '2026-07-20 23:09:49'),
('b673e7c3-a431-4e46-abc8-4e60bba2548f', 'Tim Teknisi Lapangan Siap Layanan Kunjungan (Home Service)', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80', 'Workshop', 'Armada teknisi profesional Servis Cianjur siap dipanggil ke rumah pelanggan di seluruh Kabupaten Cianjur.', '2026-07-20 23:09:49', '2026-07-20 23:09:49'),
('c16480af-9037-4385-a0eb-9e58593f9190', 'Pengisian Freon & Penambalan Evaporator Bocor Kulkas Sharp 2 Pintu', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80', 'Perbaikan Kulkas', 'Proses penambalan titik bocor alumunium, vakum 30 menit, dan pengisian freon R134a.', '2026-07-20 23:09:49', '2026-07-20 23:09:49'),
('c8d17c8c-f9e7-4aa0-88dd-7bc14d2ad1fc', 'Servis Mesin Cuci Front Loading Samsung Error 4E', 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80', 'Perbaikan Mesin Cuci', 'Pembersihan solenoid valve inlet air & pembenahan sirkulasi pembuangan air.', '2026-07-20 23:09:49', '2026-07-20 23:09:49'),
('fb9247cd-cb3f-4bd4-aa40-29e5a65e3e3b', 'Perbaikan TV LED LG 43 Inch Layar Gelap Backlight Mati', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80', 'Perbaikan TV', 'Penggantian 1 set kancing LED backlight original LG dengan garansi perbaikan 1 bulan.', '2026-07-20 23:09:49', '2026-07-20 23:09:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `invoices`
--

CREATE TABLE `invoices` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `booking_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL DEFAULT 0.00,
  `service_cost` decimal(12,2) NOT NULL DEFAULT 0.00,
  `sparepart_cost` decimal(12,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `tax` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` varchar(255) NOT NULL DEFAULT 'Draft',
  `notes` text DEFAULT NULL,
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `updated_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `payments`
--

CREATE TABLE `payments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `invoice_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `payment_number` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `payment_date` datetime NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `proof_image` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `permissions`
--

CREATE TABLE `permissions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
('1', 'Super Admin', NULL, '2026-07-21 06:04:10', '2026-07-21 06:04:10'),
('2', 'Admin', NULL, '2026-07-21 06:04:10', '2026-07-21 06:04:10'),
('3', 'Technician', NULL, '2026-07-21 06:04:10', '2026-07-21 06:04:10'),
('4', 'Customer', NULL, '2026-07-21 06:04:10', '2026-07-21 06:04:10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `role_permissions`
--

CREATE TABLE `role_permissions` (
  `roleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `permissionId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `service_categories`
--

CREATE TABLE `service_categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `estimated_duration` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ACTIVE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `service_categories`
--

INSERT INTO `service_categories` (`id`, `name`, `description`, `estimated_duration`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('a8b1dc98-5b68-4784-ae67-0e6d0afe70c4', 'QA Service u9wcyo', 'Test Service', NULL, 'ACTIVE', '2026-07-20 14:34:28', '2026-07-20 14:34:29', '2026-07-20 14:34:29'),
('b2091d9f-7141-41f5-ba4c-1dd62b0e3355', 'QA Service 48nd3o', 'Test Service', NULL, 'ACTIVE', '2026-07-20 14:35:48', '2026-07-20 14:35:48', '2026-07-20 14:35:48'),
('b86f8f33-5cca-4e5a-8fde-c94a43dd422c', 'QA Service ltlbdj', 'Test Service', NULL, 'ACTIVE', '2026-07-16 13:20:53', '2026-07-16 13:20:53', '2026-07-16 13:20:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `settings`
--

CREATE TABLE `settings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `group` varchar(255) NOT NULL DEFAULT 'general',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `technicians`
--

CREATE TABLE `technicians` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `employee_code` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `skill` varchar(255) DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `join_date` datetime DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'AVAILABLE',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `technicians`
--

INSERT INTO `technicians` (`id`, `employee_code`, `name`, `photo`, `phone`, `email`, `address`, `skill`, `experience`, `join_date`, `status`, `is_active`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('1c55f086-3467-4400-b3c8-d207a24ff378', NULL, 'QA Tech', NULL, '08999999ltlbdj', 'qatechltlbdj@sc.com', NULL, NULL, NULL, NULL, 'AVAILABLE', 1, '2026-07-16 13:20:53', '2026-07-16 13:20:53', '2026-07-16 13:20:53'),
('3481e9d0-cb28-4d60-997e-78ccf49c39fa', NULL, 'QA Tech', NULL, '0899999948nd3o', 'qatech48nd3o@sc.com', NULL, NULL, NULL, NULL, 'AVAILABLE', 1, '2026-07-20 14:35:48', '2026-07-20 14:35:48', '2026-07-20 14:35:48'),
('429560e4-0a16-47dc-a7d0-f291744575ea', NULL, 'QA Tech', NULL, '08999999', 'qatech@sc.com', NULL, NULL, NULL, NULL, 'AVAILABLE', 1, '2026-07-16 13:17:40', '2026-07-16 13:17:40', '2026-07-16 13:17:40'),
('632f2f15-c75d-4f1f-a7b1-c9cf6729694f', NULL, 'QA Tech', NULL, '089999993xtw7a', 'qatech3xtw7a@sc.com', NULL, NULL, NULL, NULL, 'AVAILABLE', 1, '2026-07-16 13:19:43', '2026-07-16 13:19:43', '2026-07-16 13:19:43'),
('633a5392-03fd-46dd-b964-61cf9c77952a', 'TEK-4416', 'z', NULL, '089663933263', 'muhammadbayunp@gmail.com', 'z', 'z', 2, NULL, 'AVAILABLE', 1, '2026-07-20 14:31:25', '2026-07-20 14:31:25', NULL),
('a3d941d8-887f-4844-b04a-f3080c8cf263', NULL, 'QA Tech', NULL, '08999999', 'qatech@sc.com', NULL, NULL, NULL, NULL, 'AVAILABLE', 1, '2026-07-16 13:16:52', '2026-07-16 13:16:52', '2026-07-16 13:16:52'),
('e88a052c-5509-40b4-a1fe-2139582b86da', NULL, 'QA Tech', NULL, '08999999u9wcyo', 'qatechu9wcyo@sc.com', NULL, NULL, NULL, NULL, 'AVAILABLE', 1, '2026-07-20 14:34:28', '2026-07-20 14:34:29', '2026-07-20 14:34:29'),
('fb54f460-d18e-42a4-9829-bd139edf5a37', NULL, 'QA Tech', NULL, '08999999uby1uk', 'qatechuby1uk@sc.com', NULL, NULL, NULL, NULL, 'AVAILABLE', 1, '2026-07-16 13:18:17', '2026-07-16 13:18:17', '2026-07-16 13:18:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `testimonials`
--

CREATE TABLE `testimonials` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_photo` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `comment` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'APPROVED',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `testimonials`
--

INSERT INTO `testimonials` (`id`, `customer_name`, `customer_photo`, `rating`, `comment`, `status`, `createdAt`, `updatedAt`) VALUES
('0e6d2f1e-bf02-4e3c-966b-bc898594bce8', 'Bapak Budi Santoso', NULL, 5, 'Pelayanan sangat cepat dan teknisi ramah. TV LED LG 43 Inch saya yang tadinya mati total sekarang sudah nyala lagi seperti baru. Mantap Servis Cianjur!', 'APPROVED', '2026-07-20 23:13:32', '2026-07-20 23:13:32'),
('25337056-136b-4430-9ff1-cdeeba11bad2', 'Ibu Siti Aminah', NULL, 5, 'Sudah langganan servis mesin cuci di sini sejak lama. Hasil perbaikannya selalu memuaskan dan garansinya jelas. Sangat direkomendasikan untuk warga Cianjur.', 'APPROVED', '2026-07-20 23:13:32', '2026-07-20 23:13:32'),
('cf362e8d-ebda-4a82-a439-04762dcec941', 'Hj. Ratna Bojong', NULL, 5, 'Kulkas Sharp 2 pintu tidak dingin langsung normal kembali setelah diisi freon dan ditambal bocornya oleh teknisi Servis Cianjur. Terima kasih banyak!', 'APPROVED', '2026-07-20 23:13:32', '2026-07-20 23:13:32'),
('fb18be2b-4a20-4bf3-a1f4-19d5c7e71b8d', 'Andi Pratama', NULL, 5, 'Teknisi datang tepat waktu untuk home service AC, diagnosanya akurat dan biaya servis juga transparan tidak ada yang ditutup-tutupi. Sukses terus!', 'APPROVED', '2026-07-20 23:13:32', '2026-07-20 23:13:32');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tracking_histories`
--

CREATE TABLE `tracking_histories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `booking_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `tracking_histories`
--

INSERT INTO `tracking_histories` (`id`, `booking_id`, `status`, `title`, `description`, `created_by`, `createdAt`, `updatedAt`) VALUES
('12d4afd7-9abb-4374-9d5d-f83a6cebbc5a', 'ad5f6fea-8ac5-49d6-8ed3-22c65143fecb', 'CHECKING', 'Sedang Pemeriksaan', 'Teknisi sedang membongkar dan memeriksa masalah perangkat', '9f2893ef-ece9-44b3-8e22-81247a0e20ad', '2026-07-20 14:34:28', '2026-07-20 14:34:28'),
('18aa40ef-3e20-499b-93ea-dd1c60b0478c', 'ad5f6fea-8ac5-49d6-8ed3-22c65143fecb', 'PENDING', 'Booking Dibuat', 'Pemesanan perbaikan baru telah terdaftar di sistem.', '9f2893ef-ece9-44b3-8e22-81247a0e20ad', '2026-07-20 14:34:28', '2026-07-20 14:34:28'),
('33f00c24-1f14-47a6-80dd-8ef7c8fe340a', '9aed71c2-70e6-4838-9802-b9f6c87cd006', 'CHECKING', 'Sedang Pemeriksaan', 'Teknisi sedang membongkar dan memeriksa masalah perangkat', '9f2893ef-ece9-44b3-8e22-81247a0e20ad', '2026-07-20 14:35:48', '2026-07-20 14:35:48'),
('64ba4421-652c-40c3-aff3-2d15269da537', '9aed71c2-70e6-4838-9802-b9f6c87cd006', 'PENDING', 'Booking Dibuat', 'Pemesanan perbaikan baru telah terdaftar di sistem.', '9f2893ef-ece9-44b3-8e22-81247a0e20ad', '2026-07-20 14:35:48', '2026-07-20 14:35:48'),
('83447642-9045-4e5e-83a3-d0df88c36a6c', '9aed71c2-70e6-4838-9802-b9f6c87cd006', 'REPAIRING', 'Proses Perbaikan', 'Teknisi sedang melakukan perbaikan / penggantian sparepart', '9f2893ef-ece9-44b3-8e22-81247a0e20ad', '2026-07-20 14:35:48', '2026-07-20 14:35:48'),
('b84a8e96-4daa-44ab-a8ec-3a14a808a22c', '9aed71c2-70e6-4838-9802-b9f6c87cd006', 'FINISHED', 'Servis Selesai', 'Perangkat selesai diperbaiki dan siap diambil', '9f2893ef-ece9-44b3-8e22-81247a0e20ad', '2026-07-20 14:35:48', '2026-07-20 14:35:48'),
('c7c53212-ffce-4d7b-97f9-c1581de8a6da', 'ad5f6fea-8ac5-49d6-8ed3-22c65143fecb', 'REPAIRING', 'Proses Perbaikan', 'Teknisi sedang melakukan perbaikan / penggantian sparepart', '9f2893ef-ece9-44b3-8e22-81247a0e20ad', '2026-07-20 14:34:28', '2026-07-20 14:34:28'),
('c9372f19-f372-4585-aab9-ddacd8c809bb', 'ad5f6fea-8ac5-49d6-8ed3-22c65143fecb', 'FINISHED', 'Servis Selesai', 'Perangkat selesai diperbaiki dan siap diambil', '9f2893ef-ece9-44b3-8e22-81247a0e20ad', '2026-07-20 14:34:28', '2026-07-20 14:34:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ACTIVE',
  `last_login` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`, `phone`, `address`, `avatar`, `role_id`, `status`, `last_login`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('', 'MBNP Tech Admin', 'admin@serviscianjur.com', '', '$2a$12$j/37X5ngQsOzoEM/0R7IVOSHlTzfs2NZhN4iQU670bQ5v0jLkaBAu', NULL, NULL, NULL, '1', 'ACTIVE', NULL, '2026-07-21 06:04:10', '2026-07-21 06:04:10', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indeks untuk tabel `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `booking_number` (`booking_number`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `technician_id` (`technician_id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `device_type_id` (`device_type_id`),
  ADD KEY `service_category_id` (`service_category_id`);

--
-- Indeks untuk tabel `booking_afters`
--
ALTER TABLE `booking_afters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indeks untuk tabel `booking_befores`
--
ALTER TABLE `booking_befores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indeks untuk tabel `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `name_3` (`name`);

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customers_user_id_fk` (`user_id`);

--
-- Indeks untuk tabel `device_types`
--
ALTER TABLE `device_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `name_3` (`name`);

--
-- Indeks untuk tabel `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoice_number` (`invoice_number`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indeks untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payment_number` (`payment_number`),
  ADD KEY `invoice_id` (`invoice_id`);

--
-- Indeks untuk tabel `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `name_3` (`name`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `name_3` (`name`);

--
-- Indeks untuk tabel `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`roleId`,`permissionId`),
  ADD UNIQUE KEY `role_permissions_permissionId_roleId_unique` (`roleId`,`permissionId`),
  ADD KEY `permissionId` (`permissionId`);

--
-- Indeks untuk tabel `service_categories`
--
ALTER TABLE `service_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `name_3` (`name`);

--
-- Indeks untuk tabel `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key`);

--
-- Indeks untuk tabel `technicians`
--
ALTER TABLE `technicians`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_code` (`employee_code`),
  ADD UNIQUE KEY `employee_code_2` (`employee_code`),
  ADD UNIQUE KEY `employee_code_3` (`employee_code`);

--
-- Indeks untuk tabel `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tracking_histories`
--
ALTER TABLE `tracking_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD KEY `role_id` (`role_id`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`technician_id`) REFERENCES `technicians` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_4` FOREIGN KEY (`device_type_id`) REFERENCES `device_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_5` FOREIGN KEY (`service_category_id`) REFERENCES `service_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `booking_afters`
--
ALTER TABLE `booking_afters`
  ADD CONSTRAINT `booking_afters_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `booking_befores`
--
ALTER TABLE `booking_befores`
  ADD CONSTRAINT `booking_befores_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tracking_histories`
--
ALTER TABLE `tracking_histories`
  ADD CONSTRAINT `tracking_histories_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

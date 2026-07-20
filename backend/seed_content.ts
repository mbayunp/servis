import sequelize from './src/config/database.js';
import Article from './src/models/article.model.js';
import Gallery from './src/models/gallery.model.js';

async function seedContent() {
  try {
    await sequelize.sync();
    console.log('Seeding Articles & Gallery...');

    // 1. Articles
    const articlesData = [
      {
        title: '5 Cara Merawat TV LED Agar Awet dan Layar Tidak Garis',
        slug: '5-cara-merawat-tv-led-agar-awet',
        category: 'Tips & Trik',
        excerpt: 'TV LED di rumah sering mati mendadak atau bergaris? Simak tips perawatan harian terbaik dari teknisi senior Servis Cianjur.',
        content: `
### Pendahuluan
TV LED merupakan salah satu perangkat elektronik hiburan keluarga yang paling sering digunakan setiap hari. Namun, penggunaan yang tidak tepat dapat menyebabkan penurunan kualitas panel layar atau bahkan komponen power supply mati mendadak.

### 1. Atur Tingkat Kecerahan (Brightness) yang Wajar
Menyetel brightness di tingkat 100% secara terus-menerus dapat mempercepat kerusakan lampu backlight TV LED. Gunakan mode *Standard* atau *Eco Mode* yang nyaman di mata dan menghemat energi.

### 2. Gunakan Stabilizer / Stavolt Listrik
Tegangan listrik rumah yang sering naik-turun (fluktuatif) adalah musuh utama mesin TV LED. Menggunakan stabilizer atau alat anti surge proteksi listrik sangat disarankan di area Kabupaten Cianjur.

### 3. Jauhkan dari Tempat Lembab dan Sinar Matahari Langsung
Hindari menempatkan TV dekat jendela yang terpapar hujan atau sinar matahari langsung yang panas, karena dapat merusak lapisan reflektor panel LCD.

### 4. Bersihkan Layar dengan Kain Microfiber Halus
Jangan pernah menyemprotkan cairan pembersih kaca langsung ke layar TV! Gunakan kain microfiber yang sedikit lembab lalu lap lembut secara searah.

### 5. Istirahatkan TV Setelah Digunakan Lebih dari 5 Jam
Berikan jeda pendinginan selama 15-30 menit jika TV sudah dinyalakan seharian untuk mencegah panas berlebih (*overheating*) pada chipset mainboard.
        `,
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
        author: 'Tim Teknisi Servis Cianjur',
        tags: 'TV LED, Perawatan, Elektronik',
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: 'Penyebab Mesin Cuci Tidak Berputar dan Cara Mengatasinya',
        slug: 'penyebab-mesin-cuci-tidak-berputar',
        category: 'Panduan Perawatan',
        excerpt: 'Mesin cuci mendengung tapi tabung penggiling atau pengering tidak mau berputar? Ini diagnosa awal sebelum memanggil teknisi.',
        content: `
### Kenapa Mesin Cuci Tidak Berputar?
Masalah mesin cuci yang mendadak mogok berputar bisa disebabkan oleh beberapa faktor mekanis maupun listrik. Berikut adalah beberapa penyebab tersering:

1. **V-Belt / Tali Kipas Kendur atau Putus**  
   Tali kipas penghubung dinamo ke puli tabung bisa aus seiring pemakaian. Jika terputus, motor tetap berputar namun tabung tidak ikut bergerak.

2. **Kapasitor Motor Melemah atau Rusak**  
   Kapasitor berfungsi memberikan dorongan awal daya putar motor. Jika nilainya drop, motor hanya akan bersuara dengung (*humming*) tanpa bisa berputar.

3. **Beban Pakaian Terlalu Berat**  
   Memasukkan pakaian melebihi kapasitas maksimal dapat memicu perlindungan thermal protector pada dinamo atau membuat vanbelt slip.

4. **Door Switch / Saklar Pintu Pengering Rusak**  
   Pada bagian pengering (spin), terdapat saklar keselamatan. Jika pintu terbuka atau pengait saklar patah, arus listrik ke motor otomatis terputus.

### Kapan Harus Menghubungi Teknisi?
Jika penggantian kapasitor atau penataan ulang beban belum menyelesaikan masalah, kemungkinan besar gulungan dinamo terbakar atau timer switch rusak. Tim **Servis Cianjur** siap datang langsung ke rumah Anda!
        `,
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80',
        author: 'Rahmat Hidayat (Senior Technician)',
        tags: 'Mesin Cuci, Perbaikan, Home Service',
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: 'Ciri-Ciri Kulkas Kurang Freon & Solusi Penanganan Tepat',
        slug: 'ciri-ciri-kulkas-kurang-freon',
        category: 'Edukasi Elektronik',
        excerpt: 'Kulkas tidak dingin tapi lampu menyala? Kenali gejala kebocoran freon dan proses pengisian refrigran yang benar.',
        content: `
### Apakah Kulkas Anda Mengalami Gejala Ini?
- Lampu dalam kulkas menyala terang, namun udara tidak dingin sama sekali.
- Bagian freezer tidak mampu membekukan es batu.
- Bodi samping kulkas tidak terasa hangat saat kompresor bekerja.
- Terdengar suara desir air di pipa tanpa ada hawa dingin.

### Penyebab Utama Freon Habis
Secara teori, sistem pendingin kulkas adalah sistem tertutup (*closed loop*). Freon tidak akan pernah habis kecuali terjadi **kebocoran mikro** pada pipa evaporator alumunium atau konduktor kondensor bawah.

### Solusi Terbaik dari Servis Cianjur
1. **Flushing & Cari Titik Bocor**: Pipa dites dengan tekanan angin dan sabun untuk memastikan titik kebocoran ditambal las kawat alumunium/perak.
2. **Vakum Sistem Pendingin**: Mengeluarkan sisa udara dan kelembapan agar saluran sirkulasi bersih.
3. **Pengisian Freon Sesuai Spesifikasi**: Mengisi freon (R134a atau R600a) sesuai tekanan PSI standar pabrikan.
        `,
        image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1200&q=80',
        author: 'Budi Santoso (Spesialis Kulkas)',
        tags: 'Kulkas, Freon, Pendingin',
        isPublished: true,
        publishedAt: new Date()
      }
    ];

    for (const art of articlesData) {
      await Article.findOrCreate({
        where: { slug: art.slug },
        defaults: art
      });
    }
    console.log('Articles seeded.');

    // 2. Gallery
    const galleryData = [
      {
        title: 'Perbaikan TV LED LG 43 Inch Layar Gelap Backlight Mati',
        category: 'Perbaikan TV',
        imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
        description: 'Penggantian 1 set kancing LED backlight original LG dengan garansi perbaikan 1 bulan.'
      },
      {
        title: 'Servis Mesin Cuci Front Loading Samsung Error 4E',
        category: 'Perbaikan Mesin Cuci',
        imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
        description: 'Pembersihan solenoid valve inlet air & pembenahan sirkulasi pembuangan air.'
      },
      {
        title: 'Pengisian Freon & Penambalan Evaporator Bocor Kulkas Sharp 2 Pintu',
        category: 'Perbaikan Kulkas',
        imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
        description: 'Proses penambalan titik bocor alumunium, vakum 30 menit, dan pengisian freon R134a.'
      },
      {
        title: 'Pembersihan (Cuci AC) & Tambah Freon AC Split Panasonic 1 PK',
        category: 'Perbaikan AC',
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
        description: 'Layanan kunjungan home service cuci AC di daerah Karangtengah Cianjur.'
      },
      {
        title: 'Dokumentasi Area Workshop & Alat Ukur Presisi Servis Cianjur',
        category: 'Workshop',
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        description: 'Peralatan oscilloskop, blower SMD, soldering station, dan multitester digital presisi tinggi.'
      },
      {
        title: 'Tim Teknisi Lapangan Siap Layanan Kunjungan (Home Service)',
        category: 'Workshop',
        imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        description: 'Armada teknisi profesional Servis Cianjur siap dipanggil ke rumah pelanggan di seluruh Kabupaten Cianjur.'
      }
    ];

    for (const gal of galleryData) {
      await Gallery.findOrCreate({
        where: { title: gal.title },
        defaults: gal
      });
    }
    console.log('Gallery seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed content:', error);
    process.exit(1);
  }
}

seedContent();

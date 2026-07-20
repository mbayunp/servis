import sequelize from './src/config/database.js';
import Testimonial from './src/models/testimonial.model.js';

async function seedTestimonials() {
  try {
    await sequelize.sync();
    console.log('Seeding Testimonials...');

    const sampleTestimonials = [
      {
        customerName: 'Bapak Budi Santoso',
        rating: 5,
        comment: 'Pelayanan sangat cepat dan teknisi ramah. TV LED LG 43 Inch saya yang tadinya mati total sekarang sudah nyala lagi seperti baru. Mantap Servis Cianjur!',
        status: 'APPROVED'
      },
      {
        customerName: 'Ibu Siti Aminah',
        rating: 5,
        comment: 'Sudah langganan servis mesin cuci di sini sejak lama. Hasil perbaikannya selalu memuaskan dan garansinya jelas. Sangat direkomendasikan untuk warga Cianjur.',
        status: 'APPROVED'
      },
      {
        customerName: 'Andi Pratama',
        rating: 5,
        comment: 'Teknisi datang tepat waktu untuk home service AC, diagnosanya akurat dan biaya servis juga transparan tidak ada yang ditutup-tutupi. Sukses terus!',
        status: 'APPROVED'
      },
      {
        customerName: 'Hj. Ratna Bojong',
        rating: 5,
        comment: 'Kulkas Sharp 2 pintu tidak dingin langsung normal kembali setelah diisi freon dan ditambal bocornya oleh teknisi Servis Cianjur. Terima kasih banyak!',
        status: 'APPROVED'
      }
    ];

    for (const t of sampleTestimonials) {
      await Testimonial.findOrCreate({
        where: { customerName: t.customerName },
        defaults: t
      });
    }

    console.log('Testimonials seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed testimonials:', error);
    process.exit(1);
  }
}

seedTestimonials();

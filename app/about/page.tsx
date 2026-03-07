import React from 'react';
import { 
  FaCheckCircle, 
  FaQuoteLeft, 
  FaHandshake, 
  FaTools, 
  FaArrowRight 
} from 'react-icons/fa';

export const metadata = {
  title: 'Tentang Kami - Servis Cianjur',
  description: 'Profil perusahaan Servis Cianjur, penyedia jasa perbaikan elektronik terpercaya sejak 1993.',
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      
      {/* 1. HEADER SECTION (Modern Gradient) */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-24 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-red-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md">Tentang Servis Cianjur</h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto opacity-95 leading-relaxed">
            Melayani perbaikan perangkat elektronik rumah tangga dengan profesional, cepat, dan terpercaya di Kabupaten Cianjur sejak 1993.
          </p>
        </div>
      </section>

      {/* 2. PROFIL & PENGALAMAN */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-red-50 text-red-600 font-semibold px-4 py-1 rounded-full mb-4 text-sm">
              Kisah Kami
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Profil Perusahaan</h2>
            <p className="text-gray-600 mb-4 leading-relaxed text-lg">
              <strong>Servis Cianjur</strong> adalah perusahaan jasa perbaikan dan perawatan berbagai perangkat elektronik rumah tangga yang telah melayani masyarakat sejak tahun 1993. 
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed text-lg">
              Dengan pengalaman lebih dari tiga dekade, kami berkomitmen memberikan pelayanan servis yang profesional, cepat, dan terpercaya bagi pelanggan di wilayah Kabupaten Cianjur dan sekitarnya. Selama bertahun-tahun beroperasi, kami telah menangani berbagai jenis perbaikan seperti televisi, mesin cuci, kulkas, hingga AC.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-xl border-t-8 border-red-600 relative hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute -top-8 right-8 bg-red-600 text-white p-4 rounded-2xl shadow-lg">
              <FaHandshake className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 mt-2">Pengalaman & Kerja Sama</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Perjalanan Servis Cianjur tidak terlepas dari berbagai pengalaman kerja sama dengan brand elektronik ternama. Salah satu pencapaian penting dalam perjalanan kami adalah pernah dipercaya menjadi cabang servis center resmi dari <strong className="text-red-600">Polytron Authorized Service</strong> di wilayah Cianjur.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Kerja sama ini menjadi bukti otentik bahwa Servis Cianjur memiliki standar pelayanan dan kualitas teknisi yang mampu memenuhi kebutuhan servis sesuai dengan standar ketat pabrikan resmi.
            </p>
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI */}
      <section className="bg-white py-24 shadow-sm border-y border-gray-100 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Visi & Misi</h2>
            <p className="text-gray-600 mt-4 text-lg">Tujuan utama kami dalam melayani masyarakat Cianjur</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Visi */}
            <div className="bg-red-50 p-10 rounded-3xl flex flex-col justify-center relative overflow-hidden group">
              <FaQuoteLeft className="absolute -left-4 -top-4 text-9xl text-red-100 opacity-50 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative z-10">
                <h3 className="text-3xl font-extrabold text-red-800 mb-6 text-center tracking-tight">Visi</h3>
                <p className="text-gray-700 text-center text-xl italic font-medium leading-relaxed">
                  "Menjadi pusat layanan servis elektronik terpercaya di Kabupaten Cianjur yang memberikan solusi terbaik, cepat, dan berkualitas bagi masyarakat."
                </p>
              </div>
            </div>
            
            {/* Misi */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-3xl font-extrabold text-gray-800 mb-8">Misi Kami</h3>
              <ul className="space-y-5">
                {[
                  'Memberikan pelayanan servis elektronik yang cepat, jujur, dan profesional.',
                  'Menyediakan teknisi yang berpengalaman dan kompeten di bidang perbaikan elektronik.',
                  'Memberikan estimasi biaya yang transparan kepada pelanggan sebelum proses perbaikan.',
                  'Mengutamakan kepuasan dan kepercayaan pelanggan dalam setiap layanan.',
                  'Terus mengikuti perkembangan teknologi perangkat elektronik masa kini.'
                ].map((misi, index) => (
                  <li key={index} className="flex items-start group">
                    <FaCheckCircle className="text-red-500 mt-1 mr-4 text-xl flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-gray-700 leading-relaxed text-lg">{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LAYANAN & KOMITMEN */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Layanan */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-2xl">
                <FaTools />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Layanan Kami</h2>
            </div>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Setiap perangkat yang masuk akan melalui proses pemeriksaan dan diagnosa terlebih dahulu untuk memastikan kerusakan ditangani dengan tepat. Layanan kami meliputi:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Servis TV LED dan LCD', 
                'Servis Mesin Cuci', 
                'Servis Kulkas', 
                'Servis AC', 
                'Elektronik Rumah Tangga Lainnya'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-red-300 hover:shadow-md transition-all duration-300 group cursor-default">
                  <FaArrowRight className="text-red-500 group-hover:translate-x-1 transition-transform" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Komitmen */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-2xl">
                <FaHandshake />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Komitmen Pelayanan</h2>
            </div>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Kepercayaan pelanggan adalah hal yang paling kami jaga. Oleh karena itu, setiap pekerjaan selalu kami lakukan dengan penuh tanggung jawab melalui:
            </p>
            <div className="space-y-5">
              {[
                { title: 'Teknisi Berpengalaman', desc: 'Ditangani langsung oleh ahlinya yang bersertifikasi dan terlatih.' },
                { title: 'Proses Perbaikan Teliti', desc: 'Pengecekan mendetail dari sebelum hingga sesudah perbaikan.' },
                { title: 'Harga Servis Wajar', desc: 'Transparan tanpa biaya tersembunyi, diinformasikan di awal.' },
                { title: 'Komunikasi Jelas', desc: 'Pelanggan selalu diinformasikan terkait kendala perangkat.' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col border-l-4 border-red-500 pl-5 py-3 bg-white rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="font-bold text-gray-800 text-lg mb-1">{item.title}</span>
                  <span className="text-gray-600 text-sm">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
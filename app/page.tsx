import React from 'react';
import Link from 'next/link';
import { 
  FaTv, 
  FaSnowflake, 
  FaWrench, 
  FaCheckCircle, 
  FaHistory, 
  FaUserTie, 
  FaHome, 
  FaShieldAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight
} from 'react-icons/fa';
import { MdOutlineLocalLaundryService } from "react-icons/md";

export default function HomePage() {
  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      {/* 1. HERO SECTION (Dengan Gradient & Pattern modern) */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-28 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-red-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center md:text-left md:flex md:items-center">
          <div className="md:w-2/3 pr-0 md:pr-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg">
              Servis Elektronik Terpercaya di <span className="text-red-200">Cianjur</span> Sejak 1993
            </h1>
            <p className="text-lg md:text-xl font-light mb-8 opacity-95 leading-relaxed max-w-2xl">
              Telah melayani masyarakat lebih dari 30 tahun. Kami memperbaiki semua merek dengan proses cepat, teknisi ahli, biaya transparan, dan <strong>bergaransi</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/booking" className="bg-white text-red-600 font-bold py-4 px-8 rounded-full shadow-xl hover:bg-gray-50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-center flex items-center justify-center gap-2 group">
                Booking Servis <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://wa.me/62812xxxxxxx" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center gap-2 backdrop-blur-sm">
                <FaWhatsapp className="text-2xl" /> Hubungi Kami
              </a>
            </div>
          </div>
          {/* Ilustrasi/Gambar Hero */}
          <div className="hidden md:flex md:w-1/3 mt-10 md:mt-0 justify-center">
             <div className="w-72 h-72 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-500">
                <FaWrench className="text-9xl text-white opacity-80 drop-shadow-lg" />
             </div>
          </div>
        </div>
      </section>

      {/* 2. TENTANG KAMI */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 relative group">
              {/* Efek kotak di belakang gambar */}
              <div className="absolute inset-0 bg-red-600 rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 -z-10"></div>
              <div className="w-full h-96 bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg border-4 border-white">
                 <span className="text-gray-400 font-medium">Foto Toko / Workshop</span>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-block bg-red-50 text-red-600 font-semibold px-4 py-1 rounded-full mb-4 text-sm">
                Tentang Perusahaan
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-snug">Berpengalaman Lebih Dari Tiga Dekade</h2>
              <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                Berdiri sejak tahun 1993, <strong>Servis Cianjur</strong> telah menjadi tempat servis elektronik pilihan utama masyarakat di Kabupaten Cianjur dan sekitarnya. 
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Kami bangga pernah bekerja sama dengan Polytron sebagai cabang <strong>Authorized Service Center</strong>. Hal ini membuktikan bahwa standar kualitas pelayanan dan penanganan teknis kami setara dengan standar pabrikan resmi.
              </p>
              <Link href="/about" className="group inline-flex items-center text-red-600 font-bold hover:text-red-800 transition duration-300">
                Selengkapnya Tentang Kami 
                <span className="ml-2 bg-red-100 p-2 rounded-full group-hover:bg-red-200 group-hover:translate-x-1 transition-all">
                  <FaArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LAYANAN SERVIS (Dengan Efek Hover Modern) */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Layanan Servis Elektronik</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
            Kami menerima berbagai jenis kerusakan dari semua merek dengan proses diagnosa yang sangat teliti.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaTv />, title: 'Servis Televisi', desc: 'Perbaikan TV LED, LCD, & Smart TV (mati total, layar gelap, tanpa suara).' },
              { icon: <MdOutlineLocalLaundryService />, title: 'Servis Mesin Cuci', desc: 'Penanganan mesin cuci tidak berputar, air mampet, atau error modul.' },
              { icon: <FaSnowflake />, title: 'Servis Kulkas', desc: 'Solusi kulkas tidak dingin, bocor, atau mati sistem pendingin.' },
              { icon: <FaWrench />, title: 'Servis AC & Lainnya', desc: 'Perbaikan AC kurang dingin, cuci AC, dan elektronik rumah tangga lainnya.' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-default">
                <div className="w-16 h-16 mx-auto bg-red-50 text-red-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KENAPA MEMILIH KAMI */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16">Kenapa Memilih Servis Cianjur?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <FaHistory />, title: 'Pengalaman 30+ Tahun', desc: 'Jam terbang tinggi dalam menangani berbagai masalah elektronik rumit.' },
              { icon: <FaUserTie />, title: 'Teknisi Tersertifikasi', desc: 'Dikerjakan langsung oleh ahli yang berpengalaman dan terpercaya.' },
              { icon: <FaCheckCircle />, title: 'Terima Semua Merek', desc: 'Solusi untuk semua brand elektronik tanpa terkecuali.' },
              { icon: <FaHome />, title: 'Layanan ke Rumah', desc: 'Tim kami siap datang ke lokasi Anda jika perangkat sulit dibawa.' },
              { icon: <FaShieldAlt />, title: 'Garansi 1 Bulan', desc: 'Rasa aman dan nyaman dengan jaminan garansi purna-servis.' },
            ].map((item, index) => (
              <div key={index} className="flex gap-5 items-start p-4 hover:bg-gray-50 rounded-xl transition-colors duration-300">
                <div className="bg-red-100 p-4 rounded-xl text-red-600 text-2xl flex-shrink-0 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROSES SERVIS */}
      <section className="py-24 bg-red-50 border-y border-red-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-16">Proses Servis Transparan</h2>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 relative">
            {/* Garis penghubung untuk desktop */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-1 bg-red-200 z-0 rounded-full"></div>
            
            {[
              { step: '1', title: 'Konsultasi', desc: 'Bawa ke toko atau hubungi kami untuk servis ke rumah.' },
              { step: '2', title: 'Diagnosa', desc: 'Pemeriksaan detail oleh teknisi untuk mencari akar masalah.' },
              { step: '3', title: 'Estimasi Biaya', desc: 'Transparansi harga perbaikan dan sparepart sebelum eksekusi.' },
              { step: '4', title: 'Perbaikan', desc: 'Proses perbaikan dilakukan setelah Anda setuju.' },
              { step: '5', title: 'Selesai & Garansi', desc: 'Perangkat normal kembali dengan garansi 1 bulan.' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center max-w-[200px] z-10 group cursor-default">
                <div className="w-16 h-16 bg-white border-4 border-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-md group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-lg">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STATISTIK */}
      <section className="py-16 bg-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-4">
              <div className="text-5xl font-extrabold mb-2 drop-shadow-md">30+</div>
              <div className="text-red-100 font-medium">Tahun Pengalaman</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-extrabold mb-2 drop-shadow-md">5rb+</div>
              <div className="text-red-100 font-medium">Perangkat Diperbaiki</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-extrabold mb-2 drop-shadow-md">Ahli</div>
              <div className="text-red-100 font-medium">Teknisi Tersertifikasi</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-extrabold mb-2 drop-shadow-md">100%</div>
              <div className="text-red-100 font-medium">Komitmen Kepuasan</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOKASI & KONTAK */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            {/* Info Kontak */}
            <div className="md:w-1/2 p-10 md:p-14 bg-gray-50">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Hubungi Kami</h2>
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                Perangkat elektronik Anda rusak? Jangan ragu menghubungi Servis Cianjur. Kami siap memberikan solusi perbaikan terbaik.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">WhatsApp / Telepon</h4>
                    <p className="text-gray-600">08xx-xxxx-xxxx</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Email</h4>
                    <p className="text-gray-600">serviscianjur@email.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Jam Operasional</h4>
                    <p className="text-gray-600">Senin – Sabtu (08.00 – 17.00)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-1">Lokasi Servis</h4>
                    <p className="text-gray-600 leading-relaxed">Kp. Sinagar No.43 (Terusan Rawa Bango)<br/>Desa Bojong, Kec. Karang Tengah<br/>Kab. Cianjur, Jawa Barat</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Maps Placeholder */}
            <div className="md:w-1/2 relative min-h-[400px]">
              <div className="absolute inset-0 bg-gray-200 flex flex-col items-center justify-center">
                 <FaMapMarkerAlt className="text-6xl text-red-500 mb-4 drop-shadow-md" />
                 <span className="text-gray-600 font-bold text-xl">Area Google Maps</span>
                 <p className="text-gray-500 text-sm mt-2">Iframe maps akan ditempatkan di sini</p>
              </div>  
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  FaArrowRight,
  FaStar,
  FaQuoteLeft
} from 'react-icons/fa';
import { MdOutlineLocalLaundryService } from "react-icons/md";

export default function HomePage() {
  const whyChooseUs = [
    { title: "Berdiri Sejak 1990", desc: "Berpengalaman lebih dari 30 tahun melayani masyarakat Cianjur.", icon: <FaHistory /> },
    { title: "Home Service", desc: "Teknisi siap datang ke rumah pelanggan.", icon: <FaHome /> },
    { title: "Semua Merk", desc: "Melayani berbagai merk elektronik.", icon: <FaCheckCircle /> },
    { title: "Garansi 1 Bulan", desc: "Garansi servis sesuai ketentuan.", icon: <FaShieldAlt /> },
    { title: "Teknisi Berpengalaman", desc: "Dikerjakan oleh teknisi profesional.", icon: <FaUserTie /> },
    { title: "Diagnosa Cepat", desc: "Analisa kerusakan dengan cepat dan transparan.", icon: <FaWrench /> }
  ];

  const stats = [
    { label: "Tahun Berdiri", value: "1990" },
    { label: "Teknisi", value: "2" },
    { label: "Garansi", value: "1 Bulan" },
    { label: "Jenis Elektronik", value: "20+" }
  ];

  const processes = [
    { step: "1", title: "Booking", desc: "Pendaftaran via WhatsApp/Form." },
    { step: "2", title: "Konfirmasi", desc: "Penjadwalan servis." },
    { step: "3", title: "Diagnosa", desc: "Pengecekan perangkat." },
    { step: "4", title: "Perbaikan", desc: "Eksekusi teknis." },
    { step: "5", title: "Quality Check", desc: "Pengujian fungsi akhir." },
    { step: "6", title: "Selesai", desc: "Perangkat siap." }
  ];

  const testimonials = [
    { name: "Bapak Budi", role: "Pelanggan Home Service", text: "Pelayanan sangat cepat dan teknisi ramah. TV LED saya yang tadinya mati total sekarang sudah nyala lagi seperti baru. Mantap Service Cianjur!" },
    { name: "Ibu Siti", role: "Pelanggan Workshop", text: "Sudah langganan servis mesin cuci di sini sejak lama. Hasil perbaikannya selalu memuaskan dan garansinya jelas. Sangat direkomendasikan." },
    { name: "Andi Pratama", role: "Pelanggan Home Service", text: "Teknisi datang tepat waktu, diagnosanya akurat dan biaya servis juga transparan tidak ada yang ditutup-tutupi. Sukses terus!" }
  ];

  const profile = {
    heroTitle: "Service Elektronik Terpercaya di Cianjur Sejak 1990",
    heroSubtitle: "Telah melayani masyarakat lebih dari 30 tahun. Kami memperbaiki semua merek dengan proses cepat, teknisi ahli, biaya transparan, dan bergaransi.",
    phone: "0812-3456-7890",
    email: "admin@servicecianjur.com",
    operatingHours: "Senin – Sabtu (08.00 – 17.00)",
    address: "Kp. Sinagar No.43 (Terusan Rawa Bango)\nDesa Bojong, Kec. Karang Tengah\nKab. Cianjur, Jawa Barat",
    whatsappUrl: "https://wa.me/6281234567890",
    aboutTitle: "Berpengalaman Lebih Dari Tiga Dekade",
    aboutText1: "Berdiri sejak tahun 1990, Service Cianjur telah menjadi tempat servis elektronik pilihan utama masyarakat di Kabupaten Cianjur dan sekitarnya.",
    aboutText2: "Kami bangga pernah bekerja sama dengan Polytron sebagai cabang Authorized Service Center. Hal ini membuktikan bahwa standar kualitas pelayanan dan penanganan teknis kami setara dengan standar pabrikan resmi."
  };

  return (
    <div className="bg-white flex flex-col min-h-screen text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-600 to-black text-white py-28 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-400 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center md:text-left md:flex md:items-center">
          <div className="md:w-2/3 pr-0 md:pr-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg text-white">
              Service Elektronik Terpercaya di <span className="text-red-200">Cianjur</span> Sejak 1990
            </h1>
            <p className="text-lg md:text-xl font-light mb-8 text-red-50 leading-relaxed max-w-2xl">
              {profile.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/booking" className="bg-white text-red-600 font-bold py-4 px-8 rounded-full shadow-xl hover:bg-gray-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-center flex items-center justify-center gap-2 group">
                Booking Servis <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-black/30 border border-white/20 text-white font-bold py-4 px-8 rounded-full hover:bg-black/50 hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center gap-2 backdrop-blur-sm shadow-xl">
                <FaWhatsapp className="text-2xl" /> Hubungi Kami
              </a>
            </div>
          </div>
          {/* Ilustrasi/Gambar Hero */}
          <div className="hidden md:flex md:w-1/3 mt-10 md:mt-0 justify-center">
            <div className="w-72 h-72 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500 p-8">
              <Image 
                src="/logo.png" 
                alt="Service Cianjur Logo Besar" 
                width={300} 
                height={300} 
                className="w-full h-auto object-contain brightness-0 invert opacity-90 drop-shadow-lg" 
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TENTANG KAMI */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 relative group">
              <div className="absolute inset-0 bg-red-600 rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 -z-10"></div>
              <div className="w-full h-96 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg border-4 border-white">
                <span className="text-gray-400 font-medium">Foto Toko / Workshop</span>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-block bg-black/5 border border-black/10 text-red-600 font-semibold px-4 py-1 rounded-full mb-4 text-sm">
                Tentang Perusahaan
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-snug tracking-tight">
                {profile.aboutTitle}
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                {profile.aboutText1}
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                {profile.aboutText2}
              </p>
              <Link href="/about" className="group inline-flex items-center text-red-600 font-bold hover:text-black transition duration-300">
                Selengkapnya Tentang Kami
                <span className="ml-2 bg-red-50 p-2 rounded-full group-hover:bg-red-100 group-hover:translate-x-1 transition-all text-red-600">
                  <FaArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LAYANAN SERVIS */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">Layanan Servis Elektronik</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
            Kami menerima berbagai jenis kerusakan dari semua merek dengan proses diagnosa yang sangat teliti.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <FaTv />, title: 'Televisi (TV)', desc: 'Perbaikan TV LED, LCD, Plasma, dan Smart TV berbagai merek dengan masalah mati total, layar blank, atau suara hilang.' },
              { icon: <MdOutlineLocalLaundryService />, title: 'Mesin Cuci', desc: 'Servis mesin cuci top loading, front loading, dan dua tabung. Mengatasi bocor, putaran lemah, hingga mati total.' },
              { icon: <FaSnowflake />, title: 'Kulkas & Chiller', desc: 'Penanganan kulkas tidak dingin, bunga es tebal, kompresor mati, hingga kebocoran freon pada lemari es.' },
              { icon: <FaSnowflake />, title: 'Air Conditioner (AC)', desc: 'Layanan cuci AC, isi freon, perbaikan AC bocor, tidak dingin, hingga bongkar pasang AC ruangan.' },
              { icon: <FaWrench />, title: 'Elektronik Rumah Tangga', desc: 'Perbaikan blender, kipas angin, rice cooker, dispenser, microwave, dan peralatan elektronik kecil lainnya.' },
              { icon: <FaHome />, title: 'Home Service', desc: 'Layanan teknisi datang langsung ke rumah Anda. Praktis, aman, dan Anda dapat memantau proses perbaikan secara langsung.' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-default">
                <div className="w-16 h-16 mx-auto bg-red-50 text-red-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/services" className="inline-flex items-center justify-center bg-black hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Lihat Semua Layanan Kami
              <FaArrowRight className="ml-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. KENAPA MEMILIH KAMI */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-16 tracking-tight">Kenapa Memilih Service Cianjur?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="flex gap-5 items-start p-6 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all duration-300">
                <div className="bg-red-50 p-4 rounded-2xl text-red-600 text-2xl flex-shrink-0 shadow-sm border border-red-100">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROSES SERVIS */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/30 via-black to-black"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 tracking-tight text-red-500">Proses Servis Transparan</h2>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 relative">
            {/* Garis penghubung untuk desktop */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-1 bg-red-900 z-0 rounded-full"></div>

            {processes.map((item, index) => (
              <div key={index} className="flex flex-col items-center max-w-[200px] z-10 group cursor-default">
                <div className="w-16 h-16 bg-black border-4 border-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 group-hover:scale-110 transition-all duration-300">
                  {item.step}
                </div>
                <h4 className="font-bold text-white mb-2 text-lg">{item.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-red-200 transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STATISTIK */}
      <section className="py-16 bg-red-600 text-white border-y-4 border-red-800">
        <div className="container mx-auto px-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <div key={index} className="p-4">
                <div className="text-5xl font-extrabold mb-2 drop-shadow-md text-white">{item.value}</div>
                <div className="text-red-100 font-medium text-sm tracking-widest uppercase">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONI */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-16 tracking-tight">Apa Kata Pelanggan Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 relative group">
                <FaQuoteLeft className="text-4xl text-red-50 absolute top-6 right-6 group-hover:text-red-100 transition-colors" />
                <div className="flex text-amber-500 mb-6">
                  {[...Array(5)].map((_, idx) => <FaStar key={idx} />)}
                </div>
                <p className="text-gray-700 italic mb-8 leading-relaxed relative z-10">
                  "{testi.text}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{testi.name}</h4>
                    <span className="text-sm text-gray-500">{testi.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LOKASI & KONTAK */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            {/* Info Kontak */}
            <div className="md:w-1/2 p-10 md:p-14 bg-gray-50">
              <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">Hubungi Kami</h2>
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                Perangkat elektronik Anda rusak? Jangan ragu menghubungi Service Cianjur. Kami siap memberikan solusi perbaikan terbaik.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <a href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-green-50 border border-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    <FaWhatsapp />
                  </a>
                  <div>
                    <h4 className="font-bold text-black text-lg">WhatsApp / Telepon</h4>
                    <p className="text-gray-600">{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group cursor-pointer">
                  <a href={`mailto:${profile.email}`} className="w-14 h-14 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    <FaEnvelope />
                  </a>
                  <div>
                    <h4 className="font-bold text-black text-lg">Email</h4>
                    <p className="text-gray-600">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-gray-200 text-black rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-lg">Jam Operasional</h4>
                    <p className="text-gray-600">{profile.operatingHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-lg mb-1">Lokasi Servis</h4>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {profile.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Maps Placeholder */}
            <div className="md:w-1/2 relative min-h-[400px]">
              <div className="absolute inset-0 bg-gray-200 flex flex-col items-center justify-center border-l border-gray-100">
                <FaMapMarkerAlt className="text-6xl text-red-600 mb-4 drop-shadow-md" />
                <span className="text-black font-bold text-xl">Area Google Maps</span>
                <p className="text-gray-500 text-sm mt-2">Iframe maps akan ditempatkan di sini</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
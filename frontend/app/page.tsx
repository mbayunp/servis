"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  FaQuoteLeft,
  FaSearch,
  FaChevronDown,
  FaAward,
  FaPhoneAlt
} from 'react-icons/fa';
import { MdOutlineLocalLaundryService } from "react-icons/md";
import api from '../lib/axios';

interface TestimonialItem {
  id?: string;
  name?: string;
  customerName?: string;
  status?: string;
  rating?: number;
  comment?: string;
  text?: string;
  device?: string;
}

export default function HomePage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [quickTrackingNo, setQuickTrackingNo] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    api.get('/testimonials')
      .then(res => {
        if (res.data.success && Array.isArray(res.data.data)) {
          const approved = res.data.data.filter((t: TestimonialItem) => t.status === 'APPROVED' || !t.status);
          setTestimonials(approved.length > 0 ? approved : res.data.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch homepage testimonials:', err);
      });
  }, []);

  const handleQuickTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTrackingNo.trim()) return;
    router.push(`/tracking?no=${encodeURIComponent(quickTrackingNo.trim())}`);
  };

  const whyChooseUs = [
    {
      title: "Pengalaman 30+ Tahun",
      desc: "Berdiri sejak 1990 melayani perbaikan elektronik di Kabupaten Cianjur dengan reputasi terpercaya.",
      icon: <FaHistory />,
      badge: "Est. 1990"
    },
    {
      title: "Layanan Home Service",
      desc: "Teknisi berpengalaman siap datang langsung ke rumah Anda untuk pengecekan & perbaikan.",
      icon: <FaHome />,
      badge: "Kunjungan Rumah"
    },
    {
      title: "Garansi Perbaikan Resmi",
      desc: "Setiap pengerjaan dilengkapi garansi hingga 30 hari untuk menjamin ketenangan Anda.",
      icon: <FaShieldAlt />,
      badge: "Garansi 30 Hari"
    },
    {
      title: "Semua Merk & Model",
      desc: "Penanganan profesional untuk TV, Mesin Cuci, Kulkas, AC, hingga perangkat rumah tangga.",
      icon: <FaCheckCircle />,
      badge: "Multi-Brand"
    },
    {
      title: "Teknisi Sertifikasi",
      desc: "Eks Authorized Service Center Polytron dengan standar kualitas penanganan pabrikan.",
      icon: <FaUserTie />,
      badge: "Ahli & Teruji"
    },
    {
      title: "Diagnosa Transparan",
      desc: "Pemeriksaan detail, estimasi rincian biaya yang jelas di awal tanpa biaya tersembunyi.",
      icon: <FaWrench />,
      badge: "Tanpa Biaya Siluman"
    }
  ];

  const stats = [
    { label: "Tahun Beroperasi", value: "34+" },
    { label: "Unit Terperbaiki", value: "15,000+" },
    { label: "Garansi Servis", value: "30 Hari" },
    { label: "Kepuasan Pelanggan", value: "99%" }
  ];

  const processes = [
    { step: "01", title: "Registrasi Booking", desc: "Isi form online atau chat WhatsApp CS kami." },
    { step: "02", title: "Konfirmasi & Jadwal", desc: "Verifikasi jenis unit & penentuan jadwal servis." },
    { step: "03", title: "Diagnosa & Estimasi", desc: "Pemeriksaan fisik & rincian biaya transparan." },
    { step: "04", title: "Proses Perbaikan", desc: "Eksekusi teknis oleh teknisi profesional." },
    { step: "05", title: "Quality Control", desc: "Pengujian fungsi unit secara menyeluruh." },
    { step: "06", title: "Serah Terima & Nota", desc: "Unit diserahkan beserta lembar nota & garansi." }
  ];

  const faqs = [
    {
      q: "Berapa lama waktu pengerjaan servis?",
      a: "Waktu pengerjaan bergantung pada tingkat kerusakan dan ketersediaan sparepart. Untuk kerusakan ringan seperti pembersihan AC atau penggantian modul standar biasa selesai dalam 1-2 hari kerja."
    },
    {
      q: "Apakah teknisi bisa datang ke rumah (Home Service)?",
      a: "Ya! Kami menyediakan layanan Home Service untuk area Cianjur dan sekitarnya. Teknisi kami akan membawa peralatan pendukung langsung ke lokasi Anda."
    },
    {
      q: "Bagaimana cara melacak status perbaikan perangkat saya?",
      a: "Anda cukup memasukkan Nomor Booking (contoh: SCJ-20260723-123) pada kolom 'Lacak Perbaikan' di halaman website ini untuk melihat riwayat & progress pengerjaan teknisi secara real-time."
    },
    {
      q: "Berapa lama garansi yang diberikan setelah perbaikan?",
      a: "Kami memberikan garansi perbaikan resmi hingga 30 hari untuk kompor/modul/kerusakan yang sama sesuai ketentuan nota transaksi."
    }
  ];

  const profile = {
    phone: "+62 821-1341-3324",
    email: "admin@servicecianjur.com",
    operatingHours: "Senin – Sabtu (08.00 – 17.00)",
    address: "Kp. Sinagar No.43 (Terusan Rawa Bango)\nDesa Bojong, Kec. Karang Tengah\nKab. Cianjur, Jawa Barat",
    whatsappUrl: "https://wa.me/6282113413324",
    mapsUrl: "https://maps.app.goo.gl/xcHNBrLkjtR7mJ7D7"
  };

  return (
    <div className="bg-white flex flex-col min-h-screen text-slate-900 font-sans antialiased">

      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 text-white pt-28 pb-20 md:pt-36 md:pb-28 border-b-4 border-red-600 overflow-hidden">
        {/* Background Subtle Line Pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
                <FaAward className="text-red-500" /> Pusat Servis Elektronik Cianjur • Est. 1990
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Solusi Perbaikan Elektronik <span className="text-red-600 underline decoration-red-600/50 underline-offset-8">Cepat, Jujur</span> &amp; Bergaransi
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Berpengalaman lebih dari 30 tahun melayani perbaikan TV, Mesin Cuci, Kulkas, AC, dan elektronik rumah tangga. Dikerjakan oleh teknisi ahli dengan rincian biaya transparan.
              </p>

              {/* Quick Search Widget */}
              <div className="bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl shadow-2xl backdrop-blur-md max-w-xl mx-auto lg:mx-0">
                <form onSubmit={handleQuickTracking} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Masukkan No. Booking (contoh: SCJ-2026...)"
                      value={quickTrackingNo}
                      onChange={(e) => setQuickTrackingNo(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 font-mono transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    Lacak Perbaikan <FaArrowRight className="text-xs" />
                  </button>
                </form>
                <p className="text-[11px] text-slate-400 mt-2.5 text-left px-1">
                  💡 Punya nomor registrasi? Ketik kode booking di atas untuk melihat status unit Anda secara real-time.
                </p>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/booking"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center gap-2 text-sm cursor-pointer"
                >
                  Booking Servis Online <FaArrowRight className="text-xs" />
                </Link>
                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 text-sm shadow-sm"
                >
                  <FaWhatsapp className="text-green-500 text-lg" /> Konsultasi Gratis
                </a>
              </div>
            </div>

            {/* Right Visual Image Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-1.5 bg-linear-to-r from-red-600 to-black rounded-3xl blur opacity-30"></div>
                <div className="relative bg-slate-900 border-2 border-red-600/40 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/servis/workshop.png"
                    alt="Workshop Service Cianjur"
                    width={600}
                    height={450}
                    className="w-full h-72 sm:h-80 object-cover object-center"
                    priority
                  />
                  <div className="p-5 bg-slate-950/95 border-t border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-white text-sm">Workshop Service Cianjur</div>
                      <div className="text-slate-400">Kp. Sinagar No. 43, Karang Tengah</div>
                    </div>
                    <span className="px-2.5 py-1 bg-red-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider">
                      Resmi &amp; Terbuka
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS RIBBON */}
      <section className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {stats.map((item, index) => (
              <div key={index} className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none mb-1">
                  {item.value}
                </div>
                <div className="text-xs font-semibold text-red-500 uppercase tracking-widest">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TENTANG PERUSAHAAN */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-6 space-y-5">
              <div className="inline-block bg-red-50 border border-red-200 text-red-700 font-bold px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
                Profil Perusahaan
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Berpengalaman Lebih Dari Tiga Dekade di Cianjur
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Berdiri sejak tahun 1990, <strong>Service Cianjur</strong> telah dipercaya ribuan keluarga dan pelaku usaha di Kabupaten Cianjur untuk menangani berbagai masalah perangkat elektronik rumah tangga.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Kami bangga pernah dipercaya sebagai cabang <strong>Authorized Service Center Polytron</strong>. Pengalaman ini membentuk standar pengerjaan kami yang disiplin, aman, dan mengutamakan penggantian sparepart berkualitas.
              </p>
              <div className="pt-2">
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-black transition-colors">
                  Pelajari Lebih Lanjut Profil Kami <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 border-l-4 border-red-600 rounded-2xl shadow-xs space-y-2">
                  <div className="text-2xl text-red-600 font-bold">100% Transparan</div>
                  <p className="text-xs text-slate-600">Diagnosa fisik &amp; rincian estimasi biaya dikonfirmasikan sebelum perbaikan.</p>
                </div>
                <div className="p-6 bg-slate-50 border-l-4 border-red-600 rounded-2xl shadow-xs space-y-2">
                  <div className="text-2xl text-red-600 font-bold">Garansi Nota</div>
                  <p className="text-xs text-slate-600">Garansi resmi servis hingga 30 hari tercetak pada nota pengerjaan.</p>
                </div>
                <div className="p-6 bg-slate-50 border-l-4 border-slate-900 rounded-2xl shadow-xs space-y-2">
                  <div className="text-2xl text-slate-900 font-bold">Teknisi Resmi</div>
                  <p className="text-xs text-slate-600">Dikerjakan teknisi berpengalaman dengan peralatan uji digital.</p>
                </div>
                <div className="p-6 bg-slate-50 border-l-4 border-slate-900 rounded-2xl shadow-xs space-y-2">
                  <div className="text-2xl text-slate-900 font-bold">Home Service</div>
                  <p className="text-xs text-slate-600">Siap melayani perbaikan langsung ke lokasi rumah atau toko Anda.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. LAYANAN SERVIS */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Keahlian Spesialis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Layanan Servis Utama</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Kami menangani berbagai kendala teknis perangkat elektronik dengan garansi dan diagnosa teliti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FaTv />, title: 'Televisi (TV LED / LCD / Smart)', desc: 'Penanganan mati total, gambar garis-garis, suara ada gambar gelap (backlight), hingga penggantian mesin mainboard.' },
              { icon: <MdOutlineLocalLaundryService />, title: 'Mesin Cuci 1 & 2 Tabung', desc: 'Servis mesin cuci top loading, front loading, bocor air, pengering tidak berputar, bunyi bising, hingga masalah modul digital.' },
              { icon: <FaSnowflake />, title: 'Kulkas & Freezer / Chiller', desc: 'Penanganan tidak dingin, kompresor konslet, bunga es menumpuk, kebocoran freon, dan penggantian termostat.' },
              { icon: <FaSnowflake />, title: 'Air Conditioner (AC)', desc: 'Layanan cuci AC berkala, isi/tambah freon, perbaikan AC bocor air, AC tidak dingin, hingga bongkar pasang unit.' },
              { icon: <FaWrench />, title: 'Peralatan Rumah Tangga', desc: 'Perbaikan microwave, blender, dispenser panas/dingin, rice cooker digital, kipas angin, dan peralatan elektronik lainnya.' },
              { icon: <FaHome />, title: 'Home Service (Kunjungan)', desc: 'Teknisi kami siap datang langsung ke lokasi domisili Anda untuk pengecekan & perbaikan langsung di tempat.' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-red-600 transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-2xl border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
                  <span>Konsultasikan Perangkat</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-red-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all text-xs sm:text-sm cursor-pointer"
            >
              Lihat Detail Semua Layanan <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. KEUNGGULAN (BENTO GRID) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Mengapa Kami?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Alasan Pelanggan Memilih Kami</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Komitmen kami adalah memberikan rasa aman dan hasil perbaikan yang tahan lama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 hover:bg-white hover:border-red-600 hover:shadow-md transition-all duration-200 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 bg-white text-red-600 rounded-xl flex items-center justify-center text-xl shadow-xs border border-slate-200">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ALUR PERBAIKAN TRANSPARAN */}
      <section className="py-20 bg-slate-950 text-white border-t-2 border-red-600">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Standar Operasional
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Alur Perbaikan Transparan</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Proses kerja yang terstruktur agar Anda selalu mengetahui perkembangan perbaikan unit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {processes.map((item, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between hover:border-red-600 transition-colors">
                <div className="space-y-2">
                  <span className="text-2xl font-black text-red-600 font-mono block">
                    {item.step}
                  </span>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONI DINAMIS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Ulasan Pelanggan
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Apa Kata Pelanggan Kami?</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Pengalaman nyata pelanggan yang telah mempercayakan perbaikan elektroniknya kepada kami.
            </p>
          </div>

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testi: TestimonialItem, i: number) => (
                <div key={testi.id || i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex text-amber-400 text-sm space-x-1">
                        {[...Array(testi.rating || 5)].map((_, idx) => <FaStar key={idx} />)}
                      </div>
                      <FaQuoteLeft className="text-slate-200 text-2xl" />
                    </div>
                    <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                      &quot;{testi.comment || testi.text}&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100">
                    <div className="w-9 h-9 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                      {(testi.customerName || testi.name || 'P').charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{testi.customerName || testi.name}</h4>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Pelanggan Terverifikasi
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              Belum ada ulasan yang ditampilkan.
            </div>
          )}
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              FAQ &amp; Informasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Pertanyaan Sering Diajukan</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left px-6 py-4 font-bold text-sm sm:text-base text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  <FaChevronDown className={`text-xs text-red-600 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-white border-t border-slate-200 text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOKASI & KONTAK MAPS */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">

            {/* Info */}
            <div className="lg:col-span-5 p-8 sm:p-10 space-y-6">
              <div>
                <span className="text-red-600 font-bold text-xs uppercase tracking-wider block mb-1">Workshop Kunjungan</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Hubungi &amp; Kunjungi Kami</h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">WhatsApp / Telepon</div>
                    <div className="text-slate-600">{profile.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <FaEnvelope />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Email Respon</div>
                    <div className="text-slate-600">{profile.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <FaClock />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Jam Operasional</div>
                    <div className="text-slate-600">{profile.operatingHours}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Alamat Lengkap Workshop</div>
                    <div className="text-slate-600 whitespace-pre-line leading-relaxed">{profile.address}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl text-center text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FaWhatsapp className="text-base" /> Chat WhatsApp
                </a>
                <a
                  href={profile.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-center text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FaMapMarkerAlt className="text-base" /> Petunjuk Lokasi
                </a>
              </div>
            </div>

            {/* Embed Map */}
            <div className="lg:col-span-7 min-h-87.5 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3961.6845921039076!2d107.1698180758746!3d-6.808167666590678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNDgnMjkuNCJTIDEwN8KwMTAnMjAuNiJF!5e0!3m2!1sen!2sid!4v1784775604162!5m2!1sen!2sid"
                className="w-full h-full min-h-87.5 border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Lokasi Servis Cianjur"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
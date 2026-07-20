"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaTv, FaSnowflake, FaFan, FaCheckCircle, FaTimesCircle, FaArrowRight, FaWhatsapp, FaInfoCircle
} from 'react-icons/fa';
import { MdOutlineLocalLaundryService, MdSpeaker } from "react-icons/md";
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ServicesClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "Apakah bisa servis ke rumah?", a: "Ya, untuk jenis perangkat tertentu." },
    { q: "Apakah harus booking?", a: "Tidak. Anda dapat datang langsung ke lokasi." },
    { q: "Berapa lama proses servis?", a: "Bergantung pada jenis kerusakan dan ketersediaan sparepart." },
    { q: "Bagaimana mengetahui status servis?", a: "Melalui halaman Tracking Service menggunakan nomor servis atau QR Code pada nota." },
    { q: "Apakah semua elektronik diterima?", a: "Kami melayani berbagai elektronik rumah tangga. Namun, beberapa jenis perangkat mungkin memerlukan pemeriksaan terlebih dahulu untuk memastikan kelayakan perbaikan." }
  ];

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-600 to-black text-white py-24 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-400 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Layanan Service Elektronik Profesional
          </h1>
          <p className="text-lg md:text-xl font-light mb-10 text-red-50 leading-relaxed">
            Kami melayani perbaikan berbagai perangkat elektronik rumah tangga dengan teknisi berpengalaman, proses yang transparan, serta didukung garansi layanan untuk memberikan kenyamanan dan kepercayaan kepada setiap pelanggan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/booking" className="bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-red-900/50 hover:bg-red-500 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 border border-red-500">
              <span className="text-xl">🔴</span> Booking Service
            </Link>
            <Link href="/tracking" className="bg-black border border-gray-800 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-900 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
              <span className="text-xl">⚫</span> Tracking Service
            </Link>
          </div>

          {/* Statistik Singkat Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-extrabold mb-1">35+</div>
                <div className="text-red-200 text-sm font-medium uppercase tracking-wider">Tahun Pengalaman</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold mb-1">2</div>
                <div className="text-red-200 text-sm font-medium uppercase tracking-wider">Teknisi Berpengalaman</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold mb-1">1–3 <span className="text-2xl">Bulan</span></div>
                <div className="text-red-200 text-sm font-medium uppercase tracking-wider">Garansi Servis</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold mb-1">100%</div>
                <div className="text-red-200 text-sm font-medium uppercase tracking-wider">Estimasi Transparan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LAYANAN UTAMA */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">Layanan Utama Kami</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* TV */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center gap-6 mb-8 border-b border-gray-200 pb-6">
                <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  <FaTv />
                </div>
                <h3 className="text-2xl font-bold text-black">Service Televisi</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2"><FaCheckCircle /> Jenis TV</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• LED</li><li>• LCD</li><li>• Smart TV</li><li>• Android TV</li><li>• Plasma</li><li>• CRT</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2"><FaTimesCircle className="text-red-500" /> Kerusakan</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Tidak menyala</li><li>• Layar gelap</li><li>• Tidak ada suara</li><li>• Gambar bergaris</li><li>• Warna tidak normal</li><li>• Mati total</li><li>• Restart terus</li><li>• HDMI tidak berfungsi</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Kulkas */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center gap-6 mb-8 border-b border-gray-200 pb-6">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  <FaSnowflake />
                </div>
                <h3 className="text-2xl font-bold text-black">Service Kulkas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2"><FaCheckCircle /> Melayani</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 1 Pintu</li><li>• 2 Pintu</li><li>• Showcase</li><li>• Freezer</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2"><FaTimesCircle className="text-red-500" /> Kerusakan</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Tidak dingin</li><li>• Bocor</li><li>• Mesin mati</li><li>• Bunga es berlebihan</li><li>• Kompresor bermasalah</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mesin Cuci */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center gap-6 mb-8 border-b border-gray-200 pb-6">
                <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  <MdOutlineLocalLaundryService />
                </div>
                <h3 className="text-2xl font-bold text-black">Service Mesin Cuci</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2"><FaCheckCircle /> Melayani</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Top Loading</li><li>• Front Loading</li><li>• Semi Otomatis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2"><FaTimesCircle className="text-red-500" /> Kerusakan</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Tidak berputar</li><li>• Air tidak keluar</li><li>• Tidak membuang air</li><li>• Mesin mati</li><li>• Error panel</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Kipas Angin */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center gap-6 mb-8 border-b border-gray-200 pb-6">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  <FaFan />
                </div>
                <h3 className="text-2xl font-bold text-black">Service Kipas Angin</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2"><FaCheckCircle /> Melayani</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Berdiri</li><li>• Dinding</li><li>• Meja</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2"><FaTimesCircle className="text-red-500" /> Kerusakan</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Mati</li><li>• Tidak berputar</li><li>• Suara kasar</li><li>• Putaran lemah</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Peralatan Elektronik Lainnya */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-300 md:col-span-2">
              <div className="flex items-center gap-6 mb-8 border-b border-gray-200 pb-6">
                <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  <MdSpeaker />
                </div>
                <h3 className="text-2xl font-bold text-black">Peralatan Elektronik Lainnya</h3>
              </div>
              <div>
                <h4 className="font-bold text-red-600 mb-4 flex items-center gap-2"><FaCheckCircle /> Misalnya:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
                  <ul className="space-y-2"><li>• Speaker aktif</li><li>• Amplifier</li></ul>
                  <ul className="space-y-2"><li>• DVD Player</li><li>• Receiver</li></ul>
                  <ul className="space-y-2"><li>• Dispenser</li><li>• Blender</li></ul>
                  <ul className="space-y-2"><li>• Magic Com</li><li>• Setrika</li><li>• Pompa air</li></ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-4xl mx-auto bg-red-50 border border-red-100 p-6 rounded-2xl flex items-start gap-4">
            <FaInfoCircle className="text-red-600 text-2xl mt-1 flex-shrink-0" />
            <p className="text-gray-700">
              <strong>Catatan:</strong> Jenis perangkat tertentu akan diperiksa terlebih dahulu untuk memastikan ketersediaan suku cadang dan kelayakan perbaikan.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ALUR SERVICE */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">Alur Service</h2>
            <p className="text-gray-600 text-lg">Proses transparan dari awal hingga perangkat Anda kembali normal.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-10 right-10 h-1 bg-red-100 rounded-full"></div>

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
              {[
                { title: "Booking atau Datang Langsung", desc: "Pelanggan membawa perangkat atau menghubungi kami." },
                { title: "Pemeriksaan Awal", desc: "Teknisi melakukan pengecekan kondisi perangkat." },
                { title: "Estimasi Biaya", desc: "Pelanggan mendapatkan informasi biaya dan waktu pengerjaan." },
                { title: "Proses Perbaikan", desc: "Perangkat diperbaiki oleh teknisi." },
                { title: "Quality Check", desc: "Dilakukan pengujian sebelum diserahkan." },
                { title: "Selesai & Garansi", desc: "Perangkat dapat diambil dan pelanggan menerima bukti servis beserta garansi." }
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white border-4 border-red-600 text-red-600 rounded-full flex items-center justify-center text-3xl font-extrabold mb-6 shadow-xl group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-black mb-2 px-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>

                  {/* Panah bawah untuk mobile */}
                  {i < 5 && (
                    <div className="lg:hidden mt-6 mb-2 text-red-300 text-2xl">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ESTIMASI WAKTU & GARANSI */}
      <section className="py-24 bg-black text-white relative">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-red-900 via-black to-black pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Tabel Estimasi */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-8 border-b-2 border-red-600 inline-block pb-2">Estimasi Waktu</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/20 text-gray-400 text-sm uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Jenis Pengerjaan</th>
                      <th className="pb-4 font-semibold text-right">Estimasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-gray-200">
                    <tr><td className="py-4 font-medium">Pemeriksaan Awal</td><td className="py-4 text-right">15–30 menit</td></tr>
                    <tr><td className="py-4 font-medium">Kerusakan Ringan</td><td className="py-4 text-right">Hari yang sama*</td></tr>
                    <tr><td className="py-4 font-medium">Kerusakan Sedang</td><td className="py-4 text-right">1–3 hari</td></tr>
                    <tr><td className="py-4 font-medium">Menunggu Sparepart</td><td className="py-4 text-right">Menyesuaikan ketersediaan</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-sm text-gray-400 italic">
                *Estimasi dapat berubah tergantung tingkat kerusakan dan ketersediaan suku cadang.
              </p>
            </div>

            {/* Card Garansi */}
            <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-[2rem] p-8 md:p-10 shadow-2xl border border-red-500 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Garansi Layanan</h3>
              <p className="text-red-100 mb-6 text-lg">
                Kami memberikan garansi untuk setiap pekerjaan.
              </p>

              <div className="mb-6">
                <h4 className="font-bold text-white mb-3">Garansi meliputi:</h4>
                <ul className="space-y-2 text-red-50">
                  <li className="flex items-center gap-3"><FaCheckCircle /> Hasil pengerjaan</li>
                  <li className="flex items-center gap-3"><FaCheckCircle /> Komponen yang diganti (sesuai ketentuan)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-3">Garansi tidak berlaku apabila:</h4>
                <ul className="space-y-2 text-red-200 text-sm">
                  <li className="flex items-center gap-3"><FaTimesCircle /> Barang jatuh</li>
                  <li className="flex items-center gap-3"><FaTimesCircle /> Terkena air</li>
                  <li className="flex items-center gap-3"><FaTimesCircle /> Dibongkar pihak lain</li>
                  <li className="flex items-center gap-3"><FaTimesCircle /> Kerusakan berbeda</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">FAQ (Tanya Jawab)</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 transition-all duration-300">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-gray-800 hover:text-red-600 focus:outline-none"
                >
                  <span className="pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="text-red-600 flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'pb-5 max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-600 leading-relaxed border-t border-gray-200 pt-4">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA PENUTUP */}
      <section className="py-24 bg-red-50 text-center border-t border-red-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 tracking-tight">Perangkat Elektronik Bermasalah?</h2>
          <p className="text-xl text-gray-700 mb-12">
            Jangan terburu-buru mengganti dengan yang baru. Banyak kerusakan dapat diperbaiki secara efisien oleh teknisi kami.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/booking" className="bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 border border-red-500">
              <span className="text-xl">🔴</span> Booking Service
            </Link>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-800">
              <span className="text-xl">⚫</span> Hubungi WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

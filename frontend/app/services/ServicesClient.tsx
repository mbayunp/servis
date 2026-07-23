"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaTv, FaSnowflake, FaCheckCircle, FaTimesCircle, FaArrowRight, FaWhatsapp
} from 'react-icons/fa';
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { ChevronDown, Wrench, ShieldCheck, Home } from 'lucide-react';

export default function ServicesClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "Apakah bisa servis ke rumah (Home Service)?", a: "Ya, untuk jenis perangkat tertentu seperti TV LED ukuran besar, Mesin Cuci, Kulkas, dan AC." },
    { q: "Apakah harus booking online terlebih dahulu?", a: "Booking online disarankan agar jadwal penanganan teknisi langsung teralokasi, namun Anda juga dapat datang langsung ke workshop kami." },
    { q: "Berapa lama estimasi proses pengerjaan servis?", a: "Kerusakan ringan biasa selesai 1-2 hari kerja. Jika memerlukan penggantian modul khusus atau sparepart pabrikan, estimasi akan disampaikan setelah diagnosa." },
    { q: "Bagaimana cara melacak perkembangan perbaikan unit saya?", a: "Melalui halaman Cek Servis menggunakan Nomor Booking (contoh: SCJ-20260723-839) pada lembar nota transaksi." },
    { q: "Apakah ada garansi untuk perbaikan yang telah dilakukan?", a: "Ya! Setiap unit perbaikan dilengkapi garansi resmi hingga 30 hari tercetak pada nota pengerjaan." }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans antialiased">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 text-white pt-28 pb-20 md:pt-36 md:pb-24 border-b-4 border-red-600 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
            <Wrench className="h-4 w-4 text-red-500" /> SPESIALISASI PERBAIKAN ELEKTRONIK • CIANJUR
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Layanan Servis Profesional &amp; Bergaransi
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Perbaikan TV, Mesin Cuci, Kulkas, AC, dan elektronik rumah tangga lainnya. Dikerjakan dengan diagnosa presisi, estimasi biaya transparan, dan garansi resmi nota.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link 
              href="/booking" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-red-600/30 transition-all text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              Booking Servis Online <FaArrowRight className="text-xs" />
            </Link>
            <Link 
              href="/tracking" 
              className="bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all text-xs sm:text-sm shadow-sm"
            >
              Lacak Status Unit
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS SUMMARY */}
      <section className="bg-slate-900 text-white py-6 border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">34+ Tahun</div>
              <div className="text-[11px] text-red-500 font-bold uppercase tracking-wider">Pengalaman Pengerjaan</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">Garansi 30 Hari</div>
              <div className="text-[11px] text-red-500 font-bold uppercase tracking-wider">Nota Perbaikan Resmi</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">Home Service</div>
              <div className="text-[11px] text-red-500 font-bold uppercase tracking-wider">Kunjungan Rumah</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">Multi-Brand</div>
              <div className="text-[11px] text-red-500 font-bold uppercase tracking-wider">Semua Merek Perangkat</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAIL LAYANAN */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Kategori Perangkat
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Rincian Spesialisasi Perbaikan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* TV */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-5 hover:border-red-600 transition-colors">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-xs shrink-0">
                  <FaTv />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Servis Televisi (TV)</h3>
                  <span className="text-xs text-slate-500">LED, LCD, Smart TV, Android TV, Plasma, CRT</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="font-bold text-red-600 flex items-center gap-1.5">
                    <FaCheckCircle /> Masalah Utama:
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>TV Mati Total / Lampu Indikator Kedip</li>
                    <li>Ada Suara Tanpa Gambar (Backlight)</li>
                    <li>Layar Garis-Garis / Blank Putih</li>
                    <li>Gambar Gambar Dobel / Distorsi Warna</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Wrench className="h-3.5 w-3.5 text-slate-500" /> Solusi Penanganan:
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Penggantian Lampu Backlight LED Original</li>
                    <li>Perbaikan Modul Power Supply &amp; Mainboard</li>
                    <li>Perbaikan Jalur T-Con &amp; Panel Kaca</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mesin Cuci */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-5 hover:border-red-600 transition-colors">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-xs shrink-0">
                  <MdOutlineLocalLaundryService />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Servis Mesin Cuci</h3>
                  <span className="text-xs text-slate-500">1 Tabung (Top/Front Loading) &amp; 2 Tabung</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="font-bold text-red-600 flex items-center gap-1.5">
                    <FaCheckCircle /> Masalah Utama:
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Mesin Mati Total / Tidak Mau On</li>
                    <li>Pengering Tidak Berputar / Lemah</li>
                    <li>Bocor Air Pada Selang / Tabung</li>
                    <li>Error Kode Modul Digital</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Wrench className="h-3.5 w-3.5 text-slate-500" /> Solusi Penanganan:
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Penggantian Dinamo / Kapasitor</li>
                    <li>Perbaikan Modul Kontrol / PCB</li>
                    <li>Penggantian Seal, Belt &amp; Drain Valve</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Kulkas */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-5 hover:border-red-600 transition-colors">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-xs shrink-0">
                  <FaSnowflake />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Servis Kulkas &amp; Freezer</h3>
                  <span className="text-xs text-slate-500">1 Door, 2 Door, Inverter, Showcase, Chiller</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="font-bold text-red-600 flex items-center gap-1.5">
                    <FaCheckCircle /> Masalah Utama:
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Kulkas Tidak Dingin / Kurang Dingin</li>
                    <li>Bunga Es Menumpuk Tebal</li>
                    <li>Kompresor Cetak-Cetek / Panas</li>
                    <li>Kebocoran Freon Pada Pipa Evaporator</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Wrench className="h-3.5 w-3.5 text-slate-500" /> Solusi Penanganan:
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Isi / Tambah Freon R134a / R600a</li>
                    <li>Penggantian Defrost, Timer, PTC Relay</li>
                    <li>Perbaikan Kebocoran &amp; Las Pipa Tembaga</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* AC */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-5 hover:border-red-600 transition-colors">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-xs shrink-0">
                  <FaSnowflake />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Servis Air Conditioner (AC)</h3>
                  <span className="text-xs text-slate-500">Split, Inverter, Cassette, AC Ruangan</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="font-bold text-red-600 flex items-center gap-1.5">
                    <FaCheckCircle /> Masalah Utama:
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>AC Berhembus Angin Tidak Dingin</li>
                    <li>Bocor Air Menetes Di Indoor Unit</li>
                    <li>Lampu Indikator Timer Kedip Error</li>
                    <li>Outdoor Bising / Kompresor Mati</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Wrench className="h-3.5 w-3.5 text-slate-500" /> Solusi Penanganan:
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Cuci Cleaning AC Indoor &amp; Outdoor</li>
                    <li>Isi / Isi Ulang Freon R22, R32, R410a</li>
                    <li>Bongkar Pasang Unit AC Ruangan</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-14 space-y-2">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Pertanyaan Umum
            </span>
            <h2 className="text-3xl font-bold text-slate-900">FAQ Layanan Servis</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-4 font-bold text-sm text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-red-600 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 py-4 border-t border-slate-200 text-slate-600 text-xs leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-16 bg-white border-t border-slate-200 text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Punya Kendala Elektronik Lainnya?</h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Tim teknisi kami siap melakukan diagnosa cepat &amp; memberikan estimasi rincian biaya transparan.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="https://wa.me/6282113413324"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2"
            >
              <FaWhatsapp className="text-base" /> Chat WhatsApp
            </a>
            <Link
              href="/booking"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              Form Booking Online <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

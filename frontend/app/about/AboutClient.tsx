"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  HeartHandshake,
  Award,
  Clock,
  Eye,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function AboutClient() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 antialiased">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 text-white pt-28 pb-20 md:pt-36 md:pb-24 border-b-4 border-red-600 overflow-hidden">
        {/* Subtle Line Pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider mb-6">
            <Award className="h-4 w-4 text-red-500" /> TENTANG KAMI • SERVICE CIANJUR SEJAK 1990
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Dedikasi Tiga Dekade Menjaga Perangkat Elektronik Anda
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal max-w-3xl mx-auto mb-10 leading-relaxed">
            Berawal dari usaha servis sederhana pada tahun 1990 di Kp. Sinagar, Karang Tengah, Cianjur, kami telah melayani ribuan unit perbaikan dengan kejujuran dan hasil garansi tepercaya.
          </p>

          <div className="bg-slate-900 border-2 border-red-600/40 p-6 sm:p-10 rounded-2xl shadow-2xl text-left space-y-4 max-w-4xl mx-auto">
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              <strong>Service Cianjur</strong> dibangun di atas asas keahlian teknis dan integritas. Kami memahami bahwa setiap perangkat elektronik baik televisi, kulkas, maupun mesin cuci memiliki peran penting dalam menunjang kenyamanan aktivitas harian keluarga.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Pengalaman bertahun-tahun sebagai mantan mitra layanan resmi (Authorized Service Center) Polytron membentuk budaya kerja teknisi kami untuk selalu disiplin, menggunakan alat ukur presisi, dan memberikan estimasi rincian biaya yang jujur sebelum pengerjaan dimulai.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PERJALANAN KAMI (TIMELINE) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Rekam Jejak
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Perjalanan Usaha Kami</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
            
            {/* Timeline 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-red-600 bg-white text-red-600 font-bold shadow-xs shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                <Clock size={18} />
              </div>
              <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-2 hover:border-red-600 transition-colors">
                <div className="text-lg font-bold text-red-600">1990 — Awal Berdiri</div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Didirikan sebagai usaha perbaikan elektronik keluarga yang melayani perbaikan TV tabung, amplifier, dan peralatan listrik rumah tangga di Cianjur.
                </p>
              </div>
            </div>

            {/* Timeline 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-900 text-white font-bold shadow-xs shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                <Award size={18} />
              </div>
              <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-2 hover:border-slate-900 transition-colors">
                <div className="text-lg font-bold text-slate-900">Mitra Service Center Resmi</div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pernah dipercaya sebagai Authorized Service Center Polytron cabang Cianjur. Memperkuat standar teknis penanganan sparepart &amp; prosedur servis sesuai standar pabrikan.
                </p>
              </div>
            </div>

            {/* Timeline 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-red-600 bg-red-600 text-white font-bold shadow-xs shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                <Zap size={18} />
              </div>
              <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-red-50/50 border border-red-200 shadow-xs space-y-2 hover:border-red-600 transition-colors">
                <div className="text-lg font-bold text-red-600">Transformasi Digital Modern</div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Menghadirkan sistem pelacakan online, pencetakan nota otomatis dengan garansi resmi, serta layanan Home Service terintegrasi WhatsApp.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FILOSOFI UMMAT */}
      <section className="py-20 bg-slate-950 text-white border-t-2 border-red-600">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-6">
          <span className="text-red-500 font-bold text-xs uppercase tracking-wider block">Filosofi Kerja</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            &quot;Memperbaiki Perangkat, Menjaga Kepercayaan Pelanggan&quot;
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Setiap unit yang masuk ke meja workshop kami dikerjakan dengan rasa tanggung jawab tinggi. Kami tidak sekadar mengganti komponen, namun memastikan daya tahan perbaikan aman digunakan dalam jangka panjang.
          </p>
        </div>
      </section>

      {/* 4. NILAI-NILAI UTAMA */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Prinsip Layanan
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Nilai-Nilai Utama Usaha Kami</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Kejujuran Total",
                desc: "Diagnosa fisik jujur apa adanya tanpa pembengkakan biaya atau pergantian part yang tidak perlu.",
                icon: HeartHandshake
              },
              {
                title: "Profesionalitas",
                desc: "Prosedur pengerjaan teknis yang teruji menggunakan instrumen pengujian digital presisi.",
                icon: Award
              },
              {
                title: "Tanggung Jawab",
                desc: "Jaminan garansi pengerjaan resmi yang tertera jelas pada nota cetak servis.",
                icon: ShieldCheck
              },
              {
                title: "Transparansi Biaya",
                desc: "Rincian estimasi biaya diperiksakan dan disetujui pemilik sebelum perbaikan dilakukan.",
                icon: Eye
              }
            ].map((value, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-red-600 transition-colors">
                <value.icon className="h-8 w-8 text-red-600" />
                <h3 className="text-base font-bold text-slate-900">{value.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA BOOKING */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Butuh Perbaikan Perangkat Elektronik?</h2>
          <p className="text-slate-600 text-sm">
            Tim teknisi kami siap membantu perbaikan unit Anda di workshop atau datang langsung ke rumah.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/booking"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              Booking Servis Sekarang <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

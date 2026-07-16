"use client";

import React, { useState } from 'react';
import { 
  Search, Package, Monitor, Calendar, User, Phone, 
  ShieldCheck, Clock, Receipt, CheckCircle, AlertCircle, 
  Truck, SearchX, Wrench, ChevronDown, ChevronUp 
} from 'lucide-react';

// --- DUMMY DATA ---
const trackingData = [
  {
    code: "SCJ-20260001",
    customer: "Budi Santoso",
    phone: "08xxxxxxxxxx",
    device: "TV LED",
    brand: "Polytron",
    model: "PLD32",
    complaint: "Layar tidak menyala",
    technician: "Asep",
    status: "On Progress",
    estimatedCost: 350000,
    warranty: "1 Bulan",
    createdAt: "2026-07-10",
    estimatedFinish: "2026-07-16",
    timeline: [
      { title: "Booking Diterima", date: "10 Juli 2026", status: "done" },
      { title: "Perangkat Diterima", date: "10 Juli 2026", status: "done" },
      { title: "Diagnosa Kerusakan", date: "11 Juli 2026", status: "done" },
      { title: "Sedang Diperbaiki", date: "12 Juli 2026", status: "active" },
      { title: "Quality Check", date: "-", status: "pending" },
      { title: "Selesai", date: "-", status: "pending" },
      { title: "Siap Diambil", date: "-", status: "pending" }
    ]
  }
];

const faqs = [
  {
    q: "Apa itu kode servis?",
    a: "Kode servis adalah nomor unik yang diberikan saat Anda melakukan booking perbaikan. Kode ini digunakan untuk melacak status pengerjaan perangkat Anda."
  },
  {
    q: "Bagaimana jika status belum berubah?",
    a: "Proses update status bergantung pada tingkat kerumitan perbaikan. Teknisi kami akan selalu memperbarui secara berkala. Jika lebih dari 2 hari belum ada update, silakan hubungi admin."
  },
  {
    q: "Apakah estimasi biaya pasti?",
    a: "Estimasi biaya bisa berubah setelah dilakukan pembongkaran dan diagnosa lebih mendalam. Jika ada penambahan, kami pasti akan meminta persetujuan Anda terlebih dahulu."
  },
  {
    q: "Bagaimana klaim garansi?",
    a: "Klaim garansi bisa dilakukan dengan membawa kembali perangkat dan bukti nota digital ke bengkel kami dalam masa berlaku (1 bulan) untuk kerusakan di titik yang sama."
  }
];

export default function TrackingPage() {
  const [searchInput, setSearchInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<typeof trackingData[0] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setHasSearched(true);
    const found = trackingData.find((item) => item.code.toUpperCase() === searchInput.trim().toUpperCase());
    setResult(found || null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "on progress": return "bg-blue-100 text-blue-700 border-blue-200";
      case "waiting sparepart": return "bg-orange-100 text-orange-700 border-orange-200";
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* 1. HERO & SEARCH */}
      <section className="bg-white border-b border-slate-200 pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Lacak Status Servis
          </h1>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Masukkan kode servis untuk mengetahui status perbaikan perangkat elektronik Anda secara real-time.
          </p>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Contoh: SCJ-20260001"
                className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-lg shadow-sm transition-shadow"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-sm hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
            >
              Lacak Servis
            </button>
          </form>
        </div>
      </section>

      {/* 2. TRACKING RESULTS */}
      {hasSearched && (
        <section className="py-16 px-6 max-w-7xl mx-auto">
          {result ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left Column: Details & Finances */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Main Information Card */}
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200 p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-100 pb-6">
                    <div>
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Kode Servis</p>
                      <h2 className="text-2xl font-bold text-slate-900 font-mono">{result.code}</h2>
                    </div>
                    <div className={`px-4 py-2 rounded-full border font-semibold text-sm flex items-center gap-2 ${getStatusColor(result.status)}`}>
                      <Wrench className="w-4 h-4" />
                      {result.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><User className="w-5 h-5"/></div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Nama Pelanggan</p>
                        <p className="font-semibold text-slate-900">{result.customer}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Monitor className="w-5 h-5"/></div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Perangkat</p>
                        <p className="font-semibold text-slate-900">{result.brand} - {result.model}</p>
                        <p className="text-xs text-slate-500 mt-1">{result.device}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><AlertCircle className="w-5 h-5"/></div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Keluhan</p>
                        <p className="font-semibold text-slate-900">{result.complaint}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><CheckCircle className="w-5 h-5"/></div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Teknisi Bertugas</p>
                        <p className="font-semibold text-slate-900">{result.technician}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estimate & Warranty Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200 p-6 flex items-center gap-5">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
                      <Receipt className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Estimasi Biaya</p>
                      <p className="text-2xl font-bold text-slate-900">{formatRupiah(result.estimatedCost)}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200 p-6 flex items-center gap-5">
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Garansi Servis</p>
                      <p className="text-2xl font-bold text-slate-900">{result.warranty}</p>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5" />
                    Informasi Penting
                  </h4>
                  <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-blue-800/80">
                    <li>Estimasi biaya dapat berubah setelah diagnosa lebih lanjut secara menyeluruh.</li>
                    <li>Garansi servis berlaku selama {result.warranty} sesuai syarat dan ketentuan (kerusakan di titik yang sama).</li>
                    <li>Customer akan segera dihubungi oleh admin apabila terdapat perubahan rincian biaya atau kebutuhan sparepart tambahan.</li>
                  </ul>
                </div>

              </div>

              {/* Right Column: Vertical Timeline */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200 p-8 relative">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                  Timeline Perbaikan
                </h3>
                
                <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
                  {result.timeline.map((step, idx) => {
                    let indicatorClass = "bg-slate-100 border-slate-300";
                    let textClass = "text-slate-400";
                    let icon = null;

                    if (step.status === "done") {
                      indicatorClass = "bg-green-500 border-green-500 shadow-md shadow-green-200";
                      textClass = "text-slate-900 font-semibold";
                      icon = <CheckCircle className="w-4 h-4 text-white" />;
                    } else if (step.status === "active") {
                      indicatorClass = "bg-blue-600 border-blue-600 shadow-md shadow-blue-200 ring-4 ring-blue-50";
                      textClass = "text-blue-700 font-bold";
                      icon = <Truck className="w-4 h-4 text-white" />; // using truck generically for active progress
                    }

                    return (
                      <div key={idx} className="relative pl-8">
                        <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${indicatorClass}`}>
                          {icon}
                        </div>
                        <div>
                          <p className={`text-base ${textClass}`}>{step.title}</p>
                          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {step.date}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-10 pt-6 border-t border-slate-100 text-center">
                  <p className="text-sm text-slate-500">Estimasi Selesai</p>
                  <p className="font-bold text-slate-900 mt-1">{result.estimatedFinish}</p>
                </div>
              </div>

            </div>
          ) : (
            
            /* Empty State */
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchX className="w-12 h-12 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Data Servis Tidak Ditemukan</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                Pastikan kode servis yang Anda masukkan sudah benar (contoh: SCJ-20260001). 
                Jika masalah berlanjut, silakan hubungi admin Servis Cianjur.
              </p>
              <button 
                onClick={() => setSearchInput("")} 
                className="text-blue-600 font-medium hover:text-blue-700 flex items-center justify-center gap-2 mx-auto"
              >
                Coba Masukkan Kode Lain
              </button>
            </div>
            
          )}
        </section>
      )}

      {/* 3. FAQ SECTION */}
      <section className="py-20 bg-white border-t border-slate-200 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-slate-600">Temukan jawaban cepat terkait prosedur servis kami.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-200"
              >
                <button 
                  className="w-full text-left px-6 py-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-20 bg-blue-600 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Masih memiliki pertanyaan?</h2>
          <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto">
            Tim layanan pelanggan kami siap membantu menyelesaikan segala kendala dan pertanyaan Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-slate-50 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3">
              <Phone className="w-5 h-5" />
              WhatsApp Kami
            </button>
            <button className="bg-blue-700 text-white hover:bg-blue-800 font-bold py-4 px-8 rounded-xl border border-blue-500 shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-3">
              <User className="w-5 h-5" />
              Hubungi Admin
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

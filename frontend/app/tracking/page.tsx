'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Monitor, Calendar, User, ShieldCheck, 
  Clock, Receipt, CheckCircle, AlertCircle, Wrench, 
  SearchX, ChevronDown, ChevronUp, Image as ImageIcon,
  ThumbsUp, ThumbsDown, Lock, ArrowRight, DollarSign, Check, X
} from 'lucide-react';
import api from '../../lib/axios';

const faqs = [
  {
    q: 'Apa itu nomor resi / kode servis?',
    a: 'Kode servis adalah nomor unik yang diawali dengan SCJ- yang diberikan saat Anda mendaftarkan perbaikan. Kode ini digunakan untuk melacak status pengerjaan secara real-time.'
  },
  {
    q: 'Mengapa alamat & No. HP tidak tampil di pencarian publik?',
    a: 'Demi keamanan & privasi pelanggan, informasi alamat dan nomor telepon disembunyikan pada pencarian publik tanpa login.'
  },
  {
    q: 'Bagaimana cara menyetujui estimasi biaya?',
    a: 'Jika Anda telah login sebagai pelanggan, tombol "Setujui Estimasi" akan otomatis tampil ketika status perbaikan berada pada tahap Menunggu Persetujuan.'
  },
  {
    q: 'Berapa lama garansi servis yang diberikan?',
    a: 'Setiap perbaikan yang selesai mendapatkan garansi resmi dari toko Servis Cianjur selama 1 bulan untuk kerusakan di titik yang sama.'
  }
];

export default function PublicTrackingPage() {
  const [searchInput, setSearchInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Approval Loading State
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setHasSearched(true);
    setLoading(true);
    setResult(null);
    setActionMessage('');

    try {
      const res = await api.get(`/tracking/code/${searchInput.trim()}`);
      if (res.data.success) {
        setResult(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!result) return;
    setActionLoading(true);
    try {
      await api.post(`/tracking/code/${result.bookingNumber}/approve`);
      setActionMessage('Estimasi biaya disetujui! Status diperbarui menjadi Sedang Diperbaiki.');
      // Refresh
      const res = await api.get(`/tracking/code/${result.bookingNumber}`);
      setResult(res.data.data);
    } catch (e: any) {
      alert(e.response?.data?.message || 'Gagal menyetujui estimasi');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!result) return;
    if (!confirm('Apakah Anda yakin ingin membatalkan pemesanan perbaikan ini?')) return;
    setActionLoading(true);
    try {
      await api.post(`/tracking/code/${result.bookingNumber}/reject`);
      setActionMessage('Pemesanan perbaikan telah dibatalkan.');
      // Refresh
      const res = await api.get(`/tracking/code/${result.bookingNumber}`);
      setResult(res.data.data);
    } catch (e: any) {
      alert(e.response?.data?.message || 'Gagal membatalkan perbaikan');
    } finally {
      setActionLoading(false);
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase().replace(/\s+/g, '_')) {
      case 'PENDING':
      case 'RECEIVED':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CHECKING':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'WAITING_APPROVAL':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'REPAIRING':
      case 'ON_PROGRESS':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'QC':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'FINISHED':
      case 'COMPLETED':
      case 'PICKED_UP':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
            <Clock className="h-3.5 w-3.5" /> Real-time Repair Tracking
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Lacak Status Perbaikan Perangkat
          </h1>
          <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Masukkan Nomor Resi / Kode Booking Anda untuk melihat progres pengerjaan, foto dokumentasi, dan timeline perbaikan.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Contoh: SCJ-20260720-123"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 font-semibold text-white rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap cursor-pointer"
            >
              Lacak Sekarang
            </button>
          </form>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="py-12 px-6 max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : result ? (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Notification Banner */}
              {actionMessage && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  {actionMessage}
                </div>
              )}

              {/* Logged-In Customer Greeting */}
              {isLoggedIn && result.customer && (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-blue-200">Pelanggan Terautentikasi</span>
                    <h2 className="text-xl font-bold mt-0.5">Halo, {result.customer.fullName}!</h2>
                    <p className="text-xs text-blue-100 mt-1">Berikut rincian lengkap status perbaikan perangkat Anda.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs border border-white/20">
                    <span className="block text-blue-200">Status Pembayaran</span>
                    <span className="font-bold text-white text-sm">
                      {result.invoices && result.invoices.length > 0 ? result.invoices[0].status : 'Belum Ada Invoice'}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Main Overview & Progress Bar */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nomor Resi / Booking</span>
                    <h2 className="text-2xl font-bold font-mono text-slate-900">{result.bookingNumber}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusBadge(result.status)}`}>
                      {result.status}
                    </span>
                  </div>
                </div>

                {/* Progress Bar Visualizer */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>Progress Perbaikan</span>
                    <span className="text-blue-600 font-mono text-sm">{result.progressPercentage || 20}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${result.progressPercentage || 20}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400 pt-1 overflow-x-auto gap-2 min-w-0">
                    <span className="whitespace-nowrap">Diterima</span>
                    <span className="whitespace-nowrap">Pemeriksaan</span>
                    <span className="whitespace-nowrap">Persetujuan</span>
                    <span className="whitespace-nowrap">Perbaikan</span>
                    <span className="whitespace-nowrap">QC</span>
                    <span className="whitespace-nowrap">Selesai</span>
                  </div>
                </div>

                {/* Device & Technician Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <div className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1">
                      <Monitor className="h-3.5 w-3.5 text-blue-600" /> Perangkat
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      {result.brand?.name || ''} {result.deviceType?.name || ''}
                    </div>
                    <div className="text-xs text-slate-600">{result.deviceName || 'Perangkat Elektronik'}</div>
                    <div className="text-[11px] text-slate-400">SN: {result.serialNumber || '-'}</div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <div className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1">
                      <Wrench className="h-3.5 w-3.5 text-blue-600" /> Teknisi Bertugas
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      {result.technician?.name || 'Belum Ditugaskan'}
                    </div>
                    <div className="text-xs text-slate-600">
                      {result.technician?.skill ? `Keahlian: ${result.technician.skill}` : 'Spesialis Perbaikan'}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <div className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-blue-600" /> Estimasi Biaya
                    </div>
                    <div className="font-bold text-emerald-600 text-lg">
                      {result.estimatedCost ? formatRupiah(result.estimatedCost) : 'Sedang Dihitung'}
                    </div>
                    <div className="text-xs text-slate-500">
                      Estimasi Selesai: {result.estimatedFinish ? new Date(result.estimatedFinish).toLocaleDateString('id-ID') : 'Belum Ditentukan'}
                    </div>
                  </div>
                </div>

                {/* Complaint & Technician Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1">
                    <span className="text-xs font-semibold uppercase text-amber-800 block">Keluhan Masalah</span>
                    <p className="text-sm text-slate-800">{result.complaint}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
                    <span className="text-xs font-semibold uppercase text-blue-800 block">Diagnosa Teknisi</span>
                    <p className="text-sm text-slate-800">{result.diagnosis || 'Belum ada catatan diagnosa.'}</p>
                  </div>
                </div>

                {/* PRIVACY MASKING BANNER FOR PUBLIC */}
                {!isLoggedIn && (
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Lock className="h-4 w-4 text-slate-400" /> Alamat & Kontak pelanggan disembunyikan demi privasi publik.
                    </span>
                    <a href="/login" className="font-semibold text-blue-600 hover:underline flex items-center gap-0.5">
                      Login Pelanggan <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                )}

                {/* ESTIMATE APPROVAL BUTTONS (If status requires approval & Customer Logged-In) */}
                {isLoggedIn && (result.status === 'Waiting Approval' || result.status === 'WAITING_APPROVAL' || result.status === 'Checking') && (
                  <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-amber-900 text-base">Persetujuan Estimasi Biaya Perbaikan</h4>
                        <p className="text-xs text-amber-800 mt-1">
                          Teknisi telah memeriksa perangkat Anda dengan estimasi biaya <span className="font-bold text-slate-900">{formatRupiah(result.estimatedCost || 0)}</span>. Mohon berikan konfirmasi persetujuan untuk memulai perbaikan.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={handleApprove}
                        disabled={actionLoading}
                        className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Check className="h-4 w-4" /> Setujui & Lanjutkan Perbaikan
                      </button>
                      <button
                        onClick={handleReject}
                        disabled={actionLoading}
                        className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <X className="h-4 w-4" /> Batalkan Perbaikan
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Before & After Photos Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-blue-600" /> Foto Sebelum Perbaikan (Before)
                  </h3>
                  {result.beforePhotos && result.beforePhotos.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {result.beforePhotos.map((p: any) => (
                        <div key={p.id} className="h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                          <img src={p.photoUrl} alt="Before" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-xs bg-slate-50 rounded-xl">
                      Belum ada foto sebelum perbaikan.
                    </div>
                  )}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-emerald-600" /> Foto Sesudah Perbaikan (After)
                  </h3>
                  {result.afterPhotos && result.afterPhotos.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {result.afterPhotos.map((p: any) => (
                        <div key={p.id} className="h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                          <img src={p.photoUrl} alt="After" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-xs bg-slate-50 rounded-xl">
                      Belum ada foto setelah perbaikan.
                    </div>
                  )}
                </div>
              </div>

              {/* Vertical Timeline Events Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" /> Timeline & Histori Aktivitas Perbaikan
                </h3>

                {result.histories && result.histories.length > 0 ? (
                  <div className="relative border-l-2 border-slate-200 ml-4 space-y-6">
                    {result.histories.map((item: any) => (
                      <div key={item.id} className="relative pl-6">
                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white ring-4 ring-blue-100"></div>
                        <div className="space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                            <span className="text-[11px] font-mono text-slate-400">
                              {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} • {new Date(item.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    Belum ada riwayat aktivitas pengerjaan.
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center max-w-lg mx-auto">
              <SearchX className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Kode Resi Tidak Ditemukan</h3>
              <p className="text-slate-500 text-xs mb-6">
                Pastikan nomor resi / kode booking yang Anda masukkan sudah sesuai (Contoh: SCJ-20260720-123).
              </p>
              <button
                onClick={() => setSearchInput('')}
                className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg"
              >
                Coba Kode Lain
              </button>
            </div>
          )}
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-white border-t border-slate-200 px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">Pertanyaan Umum (FAQ)</h2>
            <p className="text-slate-500 text-xs mt-1">Seputar sistem tracking dan alur perbaikan perangkat Anda.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 text-left font-semibold text-slate-900 text-sm flex justify-between items-center bg-slate-50/50 hover:bg-slate-50"
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="h-4 w-4 text-blue-600" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 py-3 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

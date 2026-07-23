'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, Monitor, Clock, CheckCircle, AlertCircle, Wrench, 
  SearchX, ChevronDown, ChevronUp, Image as ImageIcon,
  Lock, ArrowRight, DollarSign, Check, X
} from 'lucide-react';
import api from '../../lib/axios';
import { getImageUrl } from '../../lib/utils';

const faqs = [
  {
    q: 'Apa itu nomor resi / kode servis?',
    a: 'Kode servis adalah nomor unik yang diawali dengan SCJ- diberikan saat Anda mendaftarkan perbaikan. Kode ini digunakan untuk melacak status pengerjaan secara real-time.'
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

interface PhotoItem {
  id?: string;
  photoUrl?: string;
  filename?: string;
  photo?: string;
  type?: string;
  category?: string;
  notes?: string;
  caption?: string;
  description?: string;
  createdAt?: string;
}

interface TrackingHistoryItem {
  id?: string;
  title?: string;
  description?: string;
  createdAt?: string;
  status?: string;
}

interface TrackingResult {
  id?: string;
  bookingNumber?: string;
  createdAt?: string;
  estimatedFinish?: string;
  status?: string;
  deviceName?: string;
  serialNumber?: string;
  complaint?: string;
  diagnosis?: string;
  estimatedCost?: number;
  brand?: { name?: string };
  deviceType?: { name?: string };
  technician?: { name?: string; skill?: string };
  beforePhotos?: PhotoItem[];
  afterPhotos?: PhotoItem[];
  photos?: PhotoItem[];
  histories?: TrackingHistoryItem[];
}

function TrackingContent() {
  const searchParams = useSearchParams();
  const codeFromUrl = searchParams.get('code') || searchParams.get('bookingNumber');

  const [searchInput, setSearchInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Approval Loading State
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const executeSearch = useCallback(async (codeToSearch: string) => {
    if (!codeToSearch.trim()) return;

    setHasSearched(true);
    setLoading(true);
    setResult(null);
    setActionMessage('');

    try {
      const res = await api.get(`/tracking/code/${codeToSearch.trim()}`);
      if (res.data.success) {
        setResult(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (codeFromUrl) {
      setSearchInput(codeFromUrl);
      executeSearch(codeFromUrl);
    }
  }, [codeFromUrl, executeSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchInput);
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
    } catch (e: unknown) {
      const errObj = e as { response?: { data?: { message?: string } } };
      alert(errObj.response?.data?.message || 'Gagal menyetujui estimasi');
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
    } catch (e: unknown) {
      const errObj = e as { response?: { data?: { message?: string } } };
      alert(errObj.response?.data?.message || 'Gagal membatalkan perbaikan');
    } finally {
      setActionLoading(false);
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toUpperCase().replace(/\s+/g, '_')) {
      case 'PENDING':
      case 'RECEIVED':
        return 'bg-slate-100 text-slate-800 border-slate-300 font-semibold';
      case 'CHECKING':
        return 'bg-slate-900 text-white border-slate-900 font-semibold';
      case 'WAITING_APPROVAL':
        return 'bg-red-50 text-red-700 border-red-200 font-bold';
      case 'REPAIRING':
      case 'ON_PROGRESS':
      case 'QC':
        return 'bg-amber-50 text-amber-700 border-amber-200 font-bold';
      case 'FINISHED':
      case 'DELIVERED':
      case 'PICKED_UP':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold';
      case 'CANCELLED':
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200 font-bold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Search Header Banner */}
      <section className="relative bg-slate-950 text-white pt-28 pb-20 md:pt-36 border-b-4 border-red-600 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-600/20 border border-red-500/40 rounded-full text-red-400 text-xs font-bold uppercase tracking-wider">
            <Wrench className="h-3.5 w-3.5 text-red-500" /> SERVIS CIANJUR LIVE TRACKING
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Lacak Status Perbaikan Perangkat
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Masukkan Nomor Booking / Kode Servis Anda (Contoh: <span className="text-white font-mono font-bold">SCJ-20260723-839</span>) untuk melihat progres perbaikan secara langsung.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Masukkan Nomor Resi / Kode Servis (SCJ-...)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 font-mono tracking-wide transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Memeriksa...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" /> Lacak Sekarang
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Action Notification Message */}
      {actionMessage && (
        <div className="max-w-4xl mx-auto px-6 pt-6 w-full">
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-sm">
            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
            {actionMessage}
          </div>
        </div>
      )}

      {/* Results Section */}
      {hasSearched && (
        <section className="py-12 px-6 max-w-4xl mx-auto w-full flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
              <p className="text-slate-500 text-sm font-medium">Mencari data servis di sistem...</p>
            </div>
          ) : result ? (
            <div className="space-y-8 animate-in fade-in zoom-in duration-200">
              
              {/* Main Booking Summary Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Nomor Booking Servis</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-wider">{result.bookingNumber}</h2>
                    <span className="text-xs text-slate-500">Terdaftar: {result.createdAt ? new Date(result.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</span>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs uppercase tracking-wider border shadow-sm ${getStatusBadge(result.status)}`}>
                      {result.status}
                    </span>
                  </div>
                </div>

                {/* Device & Customer Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1">
                      <Monitor className="h-3.5 w-3.5 text-red-600" /> Perangkat Perbaikan
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      {result.brand?.name || ''} {result.deviceType?.name || ''}
                    </div>
                    <div className="text-xs text-slate-600">{result.deviceName || 'Perangkat Elektronik'}</div>
                    <div className="text-[11px] text-slate-400 font-mono">SN: {result.serialNumber || '-'}</div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1">
                      <Wrench className="h-3.5 w-3.5 text-red-600" /> Teknisi Bertugas
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      {result.technician?.name || 'Belum Ditugaskan'}
                    </div>
                    <div className="text-xs text-slate-600">
                      {result.technician?.skill ? `Keahlian: ${result.technician.skill}` : 'Spesialis Perbaikan'}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-red-600" /> Estimasi Biaya
                    </div>
                    <div className="font-bold text-red-600 text-lg">
                      {result.estimatedCost ? formatRupiah(result.estimatedCost) : 'Sedang Dihitung'}
                    </div>
                    <div className="text-xs text-slate-500">
                      Estimasi Selesai: {result.estimatedFinish ? new Date(result.estimatedFinish).toLocaleDateString('id-ID') : 'Belum Ditentukan'}
                    </div>
                  </div>
                </div>

                {/* Complaint & Technician Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-xs font-bold uppercase text-slate-900 block tracking-wider">Keluhan Masalah</span>
                    <p className="text-sm text-slate-700 leading-relaxed">{result.complaint}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 space-y-1">
                    <span className="text-xs font-bold uppercase text-red-700 block tracking-wider">Diagnosa Teknisi</span>
                    <p className="text-sm text-slate-800 leading-relaxed">{result.diagnosis || 'Belum ada catatan diagnosa.'}</p>
                  </div>
                </div>

                {/* PRIVACY MASKING BANNER FOR PUBLIC */}
                {!isLoggedIn && (
                  <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Lock className="h-4 w-4 text-slate-500 shrink-0" /> Alamat & Kontak pelanggan disembunyikan demi privasi publik.
                    </span>
                    <a href="/login" className="font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5">
                      Login Pelanggan <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                )}

                {/* ESTIMATE APPROVAL BUTTONS (If status requires approval & Customer Logged-In) */}
                {isLoggedIn && (result.status === 'Waiting Approval' || result.status === 'WAITING_APPROVAL' || result.status === 'Checking') && (
                  <div className="p-6 rounded-2xl bg-red-50/80 border border-red-200 space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">Persetujuan Estimasi Biaya Perbaikan</h4>
                        <p className="text-xs text-slate-700 mt-1">
                          Teknisi telah memeriksa perangkat Anda dengan estimasi biaya <span className="font-bold text-slate-900">{formatRupiah(result.estimatedCost || 0)}</span>. Mohon berikan konfirmasi persetujuan untuk memulai perbaikan.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={handleApprove}
                        disabled={actionLoading}
                        className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Check className="h-4 w-4 text-red-500" /> Setujui & Lanjutkan Perbaikan
                      </button>
                      <button
                        onClick={handleReject}
                        disabled={actionLoading}
                        className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <X className="h-4 w-4" /> Batalkan Perbaikan
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Before & After Photos Section */}
              {(() => {
                const allPhotos = result.photos || [];
                const beforePhotos = (result.beforePhotos && result.beforePhotos.length > 0)
                  ? result.beforePhotos
                  : allPhotos.filter((p: PhotoItem) => p.type?.toUpperCase() === 'BEFORE' || p.category?.toUpperCase() === 'BEFORE');

                const afterPhotos = (result.afterPhotos && result.afterPhotos.length > 0)
                  ? result.afterPhotos
                  : allPhotos.filter((p: PhotoItem) => p.type?.toUpperCase() === 'AFTER' || p.category?.toUpperCase() === 'AFTER');

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-red-600" /> Foto Sebelum Perbaikan (Before)
                      </h3>
                      {beforePhotos && beforePhotos.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                          {beforePhotos.map((p: PhotoItem) => (
                            <div key={p.id || p.photoUrl} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex flex-col">
                              <div className="h-32 bg-slate-100 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={getImageUrl(p.photoUrl || p.filename || p.photo)}
                                  alt="Before"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop';
                                  }}
                                />
                              </div>
                              <div className="p-2.5 text-xs text-slate-600 bg-white border-t border-slate-100 flex-1">
                                <p className="font-medium text-slate-800 line-clamp-2">
                                  {p.notes || p.caption || p.description || 'Foto Sebelum Perbaikan'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-400 text-xs bg-slate-50 rounded-xl">
                          Belum ada foto sebelum perbaikan.
                        </div>
                      )}
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-slate-900" /> Foto Sesudah Perbaikan (After)
                      </h3>
                      {afterPhotos && afterPhotos.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                          {afterPhotos.map((p: PhotoItem) => (
                            <div key={p.id || p.photoUrl} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex flex-col">
                              <div className="h-32 bg-slate-100 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={getImageUrl(p.photoUrl || p.filename || p.photo)}
                                  alt="After"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop';
                                  }}
                                />
                              </div>
                              <div className="p-2.5 text-xs text-slate-600 bg-white border-t border-slate-100 flex-1">
                                <p className="font-medium text-slate-800 line-clamp-2">
                                  {p.notes || p.caption || p.description || 'Foto Sesudah Perbaikan'}
                                </p>
                              </div>
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
                );
              })()}

              {/* Vertical Timeline Events Section */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-600" /> Riwayat Progres Perbaikan
                </h3>

                {result.histories && result.histories.length > 0 ? (
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 font-sans before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {result.histories.map((h: TrackingHistoryItem, idx: number) => (
                      <div key={h.id || idx} className="relative group">
                        <div className="absolute -left-5.75 top-1.5 w-3.5 h-3.5 rounded-full bg-red-600 ring-4 ring-white"></div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-bold text-slate-900 text-sm">{h.title}</span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {h.createdAt ? new Date(h.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{h.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs bg-slate-50 rounded-xl">
                    Belum ada catatan riwayat perbaikan.
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-md mx-auto shadow-sm">
              <SearchX className="h-12 w-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Kode Servis Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500">
                Pastikan nomor resi / kode servis yang Anda masukkan benar (Contoh: SCJ-20260722-123).
              </p>
              <button
                onClick={() => {
                  setHasSearched(false);
                  setSearchInput('');
                }}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-black transition-all cursor-pointer"
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
                  className="w-full px-5 py-4 text-left font-semibold text-slate-900 text-sm flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 cursor-pointer"
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="h-4 w-4 text-red-600" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
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

export default function PublicTrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
            <p className="text-xs text-slate-500 font-medium">Memuat Halaman Tracking...</p>
          </div>
        </div>
      }
    >
      <TrackingContent />
    </Suspense>
  );
}

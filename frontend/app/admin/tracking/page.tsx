'use client';

import { useState } from 'react';
import { Search, Map, Clock, ArrowRight, ShieldAlert, RefreshCw, Layers } from 'lucide-react';
import api from '../../../lib/axios';

export default function AdminTrackingPage() {
  const [searchCode, setSearchCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setTrackingData(null);

    try {
      const res = await api.get(`/tracking/code/${searchCode.trim()}`);
      if (res.data.success) {
        setTrackingData(res.data.data);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Nomor resi / kode booking tidak ditemukan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Map className="h-6 w-6 text-red-600" />
            Inspeksi Tracking Servis (Admin View)
          </h1>
          <p className="text-sm text-slate-500 mt-1">Cari dan pratinjau bagaimana status tracking terlihat oleh pelanggan secara real-time.</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-xl bg-red-50/60 border border-red-100 text-slate-800 text-xs flex items-center gap-3">
        <Clock className="h-5 w-5 text-red-600 flex-shrink-0" />
        <div>
          <span className="font-bold text-slate-900">Prinsip Single Source of Truth:</span> Seluruh pembaruan status dan penugasan teknisi dilakukan dari menu <a href="/admin/booking" className="underline font-bold text-red-600 hover:text-red-700">Booking</a>. Halaman tracking ini bersifat viewer (read-only) untuk menginspeksi hasil visualisasi ke pelanggan.
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Masukkan Nomor Booking (Contoh: SCJ-20260720-123)..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all text-slate-900 placeholder-slate-400 font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 font-bold text-white text-sm rounded-lg shadow-sm shadow-red-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Inspeksi Tracking
          </button>
        </form>
      </div>

      {/* Error State */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center gap-2.5">
          <ShieldAlert className="h-5 w-5 flex-shrink-0 text-red-600" />
          {errorMsg}
        </div>
      )}

      {/* Tracking Data Viewer */}
      {trackingData && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-2">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Kode Booking</span>
              <h2 className="text-xl font-black font-mono text-slate-900">{trackingData.bookingNumber}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                {trackingData.status}
              </span>
              <a
                href="/admin/booking"
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
              >
                Kelola di Booking <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 font-semibold uppercase block tracking-wider">Pelanggan</span>
              <div className="font-bold text-slate-900">{trackingData.customer?.fullName || '-'}</div>
              <div className="text-slate-500">{trackingData.customer?.phoneNumber || '-'}</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 font-semibold uppercase block tracking-wider">Perangkat</span>
              <div className="font-bold text-slate-900">{trackingData.deviceName || 'Perangkat'}</div>
              <div className="text-slate-500">{trackingData.brand?.name} - {trackingData.deviceType?.name}</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 font-semibold uppercase block tracking-wider">Teknisi Bertugas</span>
              <div className="font-bold text-slate-900">{trackingData.technician?.name || 'Belum Ditugaskan'}</div>
              <div className="text-slate-500">{trackingData.technician?.phone || '-'}</div>
            </div>
          </div>

          {/* Timeline Events Log */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-600" /> Log Histori Tracking
            </h3>

            {trackingData.histories && trackingData.histories.length > 0 ? (
              <div className="relative border-l-2 border-slate-200 ml-4 space-y-4">
                {trackingData.histories.map((h: any) => (
                  <div key={h.id} className="relative pl-6">
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-red-600 border-2 border-white ring-2 ring-red-100"></div>
                    <div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-900">{h.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(h.createdAt).toLocaleDateString('id-ID')} • {new Date(h.createdAt).toLocaleTimeString('id-ID')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{h.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400">Belum ada data histori event.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


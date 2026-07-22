import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import api from '../../../lib/axios';

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Record<string, unknown> | null;
  onSuccess: () => void;
}

export function UpdateStatusModal({ isOpen, onClose, booking, onSuccess }: UpdateStatusModalProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  useEffect(() => {
    if (isOpen && booking) {
      setStatus(String(booking?.status || 'Pending'));
      setDiagnosis(String(booking?.diagnosis || ''));
    }
  }, [isOpen, booking]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!status || !booking?.id) return;
    
    setLoading(true);
    try {
      await api.patch(`/bookings/${booking.id}/status`, { status, diagnosis });
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Gagal mengubah status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative z-50 bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 my-8">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Ubah Status Booking</h3>
              <p className="text-xs text-slate-500">
                Booking: <span className="font-mono font-bold text-slate-800">{String(booking?.bookingNumber || '-')}</span>
              </p>
            </div>
          </div>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Status Pengerjaan
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Pending">Pending</option>
                <option value="Checking">Checking (Pemeriksaan)</option>
                <option value="Waiting Approval">Waiting Approval (Menunggu Persetujuan)</option>
                <option value="Repairing">Repairing (Proses Perbaikan)</option>
                <option value="QC">Quality Control (QC)</option>
                <option value="Finished">Finished (Servis Selesai)</option>
                <option value="Picked Up">Picked Up (Sudah Diambil)</option>
                <option value="Cancelled">Cancelled (Dibatalkan)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Catatan / Hasil Diagnosis Teknisi
              </label>
              <textarea
                rows={3}
                value={diagnosis}
                onChange={e => setDiagnosis(e.target.value)}
                placeholder="Contoh: Jalur VCC konslet, IC Power mati total, butuh penggantian part..."
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 rounded-xl shadow-md transition cursor-pointer"
            >
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

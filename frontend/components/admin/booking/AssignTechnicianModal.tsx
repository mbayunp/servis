import React, { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';
import api from '../../../lib/axios';

interface AssignTechnicianModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Record<string, unknown> | null;
  onSuccess: () => void;
}

export function AssignTechnicianModal({ isOpen, onClose, booking, onSuccess }: AssignTechnicianModalProps) {
  const [loading, setLoading] = useState(false);
  const [technicians, setTechnicians] = useState([]);
  const [technicianId, setTechnicianId] = useState('');

  useEffect(() => {
    if (isOpen) {
      api.get('/technicians').then(res => setTechnicians(res.data.data));
      if (booking) {
        setTechnicianId(String(booking?.technicianId || (booking?.technician as Record<string, unknown>)?.id || ''));
      }
    }
  }, [isOpen, booking]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!technicianId) return alert('Silakan pilih teknisi');
    
    setLoading(true);
    try {
      if (booking?.id) {
        await api.put(`/bookings/${booking.id}`, { technicianId });
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error(error);
      alert('Gagal menetapkan teknisi');
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
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-purple-100 text-purple-600 shrink-0">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Assign Teknisi</h3>
              <p className="text-xs text-slate-500">
                Booking: <span className="font-mono font-bold text-slate-800">{String(booking?.bookingNumber || '-')}</span>
              </p>
            </div>
          </div>

          <div className="py-4 space-y-3">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Pilih Teknisi Penanggung Jawab
            </label>
            <select
              value={technicianId}
              onChange={e => setTechnicianId(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
            >
              <option value="">-- Pilih Teknisi --</option>
              {technicians.map((t: { id: string | number, name: string, specialization?: string }) => (
                <option key={t.id} value={t.id}>
                  {t.name} (Spesialis: {t.specialization || '-'})
                </option>
              ))}
            </select>
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
              className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 rounded-xl shadow-md transition cursor-pointer"
            >
              {loading ? 'Menyimpan...' : 'Terapkan Teknisi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

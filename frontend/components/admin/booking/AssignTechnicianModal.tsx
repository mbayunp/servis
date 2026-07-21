import React, { useState, useEffect } from 'react';
import { X, Wrench } from 'lucide-react';
import api from '../../../lib/axios';

interface AssignTechnicianModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
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
        setTechnicianId(booking?.technicianId || '');
      }
    }
  }, [isOpen, booking]);

  if (!isOpen || !booking) return null;

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
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Wrench className="h-6 w-6 text-purple-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Assign Teknisi</h3>
                  <div className="mt-2 text-sm text-gray-500 mb-4">
                    Booking: <span className="font-semibold">{booking?.bookingNumber || '-'}</span>
                  </div>
                  
                  <div>
                    <select value={technicianId} onChange={e => setTechnicianId(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md border">
                      <option value="">-- Pilih Teknisi --</option>
                      {technicians.map((t: any) => <option key={t.id} value={t.id}>{t.name} (Ahli: {t.specialization || '-'})</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
              <button type="submit" disabled={loading} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:bg-purple-300">
                {loading ? 'Menyimpan...' : 'Terapkan Teknisi'}
              </button>
              <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

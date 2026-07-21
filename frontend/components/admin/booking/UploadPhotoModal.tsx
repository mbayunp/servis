import React, { useState } from 'react';
import { X, Camera } from 'lucide-react';
import api from '../../../lib/axios';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  onSuccess: () => void;
}

export function UploadPhotoModal({ isOpen, onClose, booking, onSuccess }: UploadPhotoModalProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('before'); // 'before' or 'after'
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen || !booking) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Silakan pilih foto terlebih dahulu');
    
    setLoading(true);
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('notes', notes);

    try {
      // Endpoint handled dynamically in booking.route.ts: POST /:id/photos/:type
      await api.post(`/bookings/${booking.id}/photos/${type}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onSuccess();
      setFile(null);
      setNotes('');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Gagal mengunggah foto');
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
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Camera className="h-6 w-6 text-teal-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Upload Foto Perangkat</h3>
                  <div className="mt-2 text-sm text-gray-500 mb-4">
                    Booking: <span className="font-semibold">{booking?.bookingNumber || '-'}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tipe Foto</label>
                      <select value={type} onChange={e => setType(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md border">
                        <option value="before">Sebelum Servis (Before)</option>
                        <option value="after">Sesudah Servis (After)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pilih File</label>
                      <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 border border-gray-300 rounded-md p-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Catatan Tambahan</label>
                      <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" placeholder="Contoh: Layar retak di bagian sudut..."></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
              <button type="submit" disabled={loading} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:bg-teal-300">
                {loading ? 'Mengunggah...' : 'Upload'}
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

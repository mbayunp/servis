import React, { useState } from 'react';
import { Camera, CheckCircle, Image as ImageIcon } from 'lucide-react';
import api from '../../../lib/axios';
import { getImageUrl } from '../../../lib/utils';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Record<string, unknown> | null;
  onSuccess: () => void;
}

export function UploadPhotoModal({ isOpen, onClose, booking, onSuccess }: UploadPhotoModalProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('before'); // 'before' or 'after'
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen || !booking) return null;

  const beforePhotos = Array.isArray(booking.beforePhotos) ? booking.beforePhotos : [];
  const afterPhotos = Array.isArray(booking.afterPhotos) ? booking.afterPhotos : [];

  const existingPhoto = type === 'before'
    ? (beforePhotos.length > 0 ? beforePhotos[0] : null)
    : (afterPhotos.length > 0 ? afterPhotos[0] : null);

  React.useEffect(() => {
    if (existingPhoto) {
      setNotes(existingPhoto.notes || existingPhoto.caption || existingPhoto.description || '');
    } else {
      setNotes('');
    }
  }, [type, booking]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative z-50 bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 my-8">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-teal-100 text-teal-600 shrink-0">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Upload Foto Perangkat</h3>
              <p className="text-xs text-slate-500">
                Booking: <span className="font-mono font-bold text-slate-800">{String(booking?.bookingNumber || '-')}</span>
              </p>
            </div>
          </div>

          <div className="space-y-4 py-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Tipe Foto
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              >
                <option value="before">Sebelum Servis (Before)</option>
                <option value="after">Sesudah Servis (After)</option>
              </select>
            </div>

            {/* Smart Photo Indicator & Preview if Photo Exists */}
            {existingPhoto && (
              <div className="p-3.5 bg-teal-50/80 border border-teal-200 rounded-xl space-y-2.5">
                <div className="flex items-start gap-3">
                  <div className="h-16 w-16 rounded-xl overflow-hidden border border-teal-300 bg-white shrink-0 shadow-sm">
                    <img
                      src={getImageUrl(existingPhoto.photoUrl || existingPhoto.filename || existingPhoto.photo)}
                      alt="Existing"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
                      <CheckCircle className="h-4 w-4 text-teal-600 shrink-0" /> Foto {type.toUpperCase()} Sudah Diunggah
                    </div>
                    <p className="text-[11px] text-teal-700 mt-1 font-medium leading-tight">
                      Pilih file baru jika ingin mengganti/memperbarui foto ini.
                    </p>
                  </div>
                </div>

                {/* Deskripsi / Catatan Foto Existing */}
                <div className="bg-white p-2.5 rounded-lg border border-teal-200/80 text-xs shadow-2xs">
                  <span className="text-[10px] font-bold uppercase text-teal-700 block mb-0.5 tracking-wider">
                    Catatan / Deskripsi Foto Saat Ini:
                  </span>
                  <p className="text-slate-800 font-medium text-xs leading-relaxed">
                    {existingPhoto.notes || existingPhoto.caption || existingPhoto.description || (
                      <span className="text-slate-400 italic">Belum ada deskripsi foto.</span>
                    )}
                  </p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Pilih File Foto
              </label>
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg, image/jfif"
                onChange={handleFileChange}
                className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 border border-slate-300 rounded-xl p-1 bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Deskripsi / Catatan Foto
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Contoh: Goresan bagian layar depan, komponen IC ganti baru..."
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
              className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 rounded-xl shadow-md transition cursor-pointer"
            >
              {loading ? 'Mengunggah...' : (existingPhoto ? 'Ganti Foto' : 'Upload Foto')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

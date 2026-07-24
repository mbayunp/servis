'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Image as ImageIcon, Edit2, Trash2, RefreshCw, X, AlertCircle, CheckCircle2, Eye, Tag, Upload } from 'lucide-react';
import api from '../../../lib/axios';
import { getImageUrl } from '../../../lib/utils';
import { GALLERY_CATEGORIES } from '../../../lib/constants';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string | null;
  category: string | null;
  description: string | null;
  createdAt: string;
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Notification Toast
  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: GALLERY_CATEGORIES[0] as string,
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Lightbox State
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Delete Dialog State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchGalleries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/gallery');
      setGalleries(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleries();
  }, [fetchGalleries]);

  const handleOpenModal = (gal?: GalleryItem) => {
    setSelectedFile(null);
    setPreviewFileUrl(null);
    if (gal) {
      setSelectedGallery(gal);
      setFormData({
        title: gal.title,
        category: gal.category || GALLERY_CATEGORIES[0],
        description: gal.description || '',
      });
    } else {
      setSelectedGallery(null);
      setFormData({
        title: '',
        category: GALLERY_CATEGORIES[0],
        description: ''
      });
    }
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    if (!selectedGallery && !selectedFile) {
      setFormError('File gambar wajib diupload untuk foto galeri baru!');
      setFormLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);

      if (selectedFile) {
        data.append('image', selectedFile);
      }

      if (selectedGallery) {
        await api.put(`/gallery/${selectedGallery.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccessNotification(`Foto "${formData.title}" berhasil diperbarui!`);
      } else {
        await api.post('/gallery', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccessNotification(`Foto "${formData.title}" berhasil ditambahkan!`);
      }

      setIsModalOpen(false);
      fetchGalleries();

      setTimeout(() => setSuccessNotification(null), 4000);
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Gagal menyimpan foto galeri');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/gallery/${deleteId}`);
      setSuccessNotification('Foto galeri berhasil dihapus.');
      setDeleteId(null);
      fetchGalleries();
      setTimeout(() => setSuccessNotification(null), 4000);
    } catch (error) {
      console.error('Failed to delete gallery item:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredGalleries = galleries.filter((gal) => {
    const matchesSearch = gal.title.toLowerCase().includes(search.toLowerCase()) ||
      (gal.description && gal.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoryFilter === '' || (gal.category && gal.category.toLowerCase() === categoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Success Notification Banner */}
      {successNotification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            {successNotification}
          </div>
          <button onClick={() => setSuccessNotification(null)} className="text-emerald-500 hover:text-emerald-700">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-xs border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-red-600" />
            Manajemen Galeri & Dokumentasi
          </h1>
          <p className="text-sm text-slate-500 mt-1">Kelola foto dokumentasi pengerjaan servis dan workshop via file upload.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-all cursor-pointer"
        >
          <Plus className="-ml-1 mr-2 h-4 w-4" />
          Tambah Foto Baru
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari foto galeri..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Semua Kategori</option>
            {GALLERY_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            onClick={fetchGalleries}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Grid Gallery Display */}
      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-xs">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : filteredGalleries.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-xl shadow-xs border border-slate-100">
          <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Tidak ada foto galeri ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGalleries.map((gal) => (
            <div key={gal.id} className="group bg-white rounded-xl shadow-xs border border-slate-100 overflow-hidden hover:shadow-md transition-all">
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={getImageUrl(gal.imageUrl)}
                  alt={gal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setSelectedImage(gal)}
                    className="p-2 bg-white/90 text-slate-800 rounded-full hover:bg-white transition-colors shadow-xs cursor-pointer"
                    title="Pratinjau"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleOpenModal(gal)}
                    className="p-2 bg-white/90 text-red-600 rounded-full hover:bg-white transition-colors shadow-xs cursor-pointer"
                    title="Edit Foto"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(gal.id)}
                    className="p-2 bg-white/90 text-red-600 rounded-full hover:bg-white transition-colors shadow-xs cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-red-600 mb-1">
                  <Tag className="h-3 w-3" />
                  {gal.category || 'Galeri'}
                </div>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{gal.title}</h3>
                {gal.description && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{gal.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {selectedGallery ? 'Edit Foto Galeri' : 'Tambah Foto Galeri Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Judul / Keterangan Foto *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Perbaikan Ganti Chipset VGA Laptop Asus"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Upload File Input Section */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  File Foto {selectedGallery ? '(Opsional: Kosongkan jika tidak mengganti foto)' : '*'}
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <label className="flex-1 w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-red-500 hover:bg-slate-50 cursor-pointer transition-all">
                    <Upload className="h-6 w-6 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-600">
                      {selectedFile ? selectedFile.name : 'Pilih file foto dari perangkat'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WEBP (Maks 5MB)</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  {(previewFileUrl || (selectedGallery && selectedGallery.imageUrl)) && (
                    <div className="w-24 h-24 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 shrink-0 relative group">
                      <img
                        src={previewFileUrl || getImageUrl(selectedGallery?.imageUrl)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-white font-bold transition-opacity">
                        Preview
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Deskripsi Tambahan</label>
                <textarea
                  rows={3}
                  placeholder="Keterangan rincian pengerjaan..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {formLoading ? 'Menyimpan...' : selectedGallery ? 'Perbarui Foto' : 'Simpan Foto Baru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-black/40 rounded-full cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="max-h-[70vh] flex items-center justify-center bg-black">
              <img src={getImageUrl(selectedImage.imageUrl)} alt={selectedImage.title} className="max-h-[70vh] w-auto object-contain" />
            </div>
            <div className="p-6 bg-slate-900 text-white">
              <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">
                {selectedImage.category}
              </div>
              <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-sm text-slate-300 mt-2">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <Trash2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Hapus Foto Galeri?</h3>
              <p className="text-sm text-slate-500 mt-1">Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {deleteLoading ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

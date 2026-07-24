'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Image as ImageIcon, Edit2, Trash2, RefreshCw, X, AlertCircle, Eye, Tag, Upload } from 'lucide-react';
import api from '../../../lib/axios';
import { getImageUrl } from '../../../lib/utils';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string | null;
  description: string | null;
  createdAt: string;
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    category: 'Hasil Servis',
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
        imageUrl: gal.imageUrl,
        category: gal.category || 'Hasil Servis',
        description: gal.description || '',
      });
    } else {
      setSelectedGallery(null);
      setFormData({
        title: '',
        imageUrl: '',
        category: 'Hasil Servis',
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

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);

      if (selectedFile) {
        data.append('image', selectedFile);
      } else if (formData.imageUrl && formData.imageUrl.trim()) {
        data.append('imageUrl', formData.imageUrl.trim());
      }

      if (selectedGallery) {
        await api.put(`/gallery/${selectedGallery.id}`, data);
      } else {
        await api.post('/gallery', data);
      }
      setIsModalOpen(false);
      fetchGalleries();
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
      setDeleteId(null);
      fetchGalleries();
    } catch (error) {
      console.error('Failed to delete gallery item:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredGalleries = galleries.filter((gal) => {
    const matchesSearch = gal.title.toLowerCase().includes(search.toLowerCase()) ||
      (gal.description && gal.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoryFilter === '' || gal.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-xs border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-red-600" />
            Manajemen Galeri & Dokumentasi
          </h1>
          <p className="text-sm text-slate-500 mt-1">Kelola galeri foto pengerjaan servis, perbaikan perangkat, dan dokumentasi toko.</p>
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
            <option value="Hasil Servis">Hasil Servis</option>
            <option value="Toko & Workshop">Toko & Workshop</option>
            <option value="Proses Perbaikan">Proses Perbaikan</option>
          </select>

          <button
            onClick={fetchGalleries}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
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
                    className="p-2 bg-white/90 text-slate-800 rounded-full hover:bg-white transition-colors shadow-xs"
                    title="Pratinjau"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleOpenModal(gal)}
                    className="p-2 bg-white/90 text-red-600 rounded-full hover:bg-white transition-colors shadow-xs"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(gal.id)}
                    className="p-2 bg-white/90 text-red-600 rounded-full hover:bg-white transition-colors shadow-xs"
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
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Upload File Foto</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <label className="flex-1 w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-red-500 hover:bg-slate-50 cursor-pointer transition-all">
                    <Upload className="h-6 w-6 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-600">Klik untuk upload file foto</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WEBP (Maks 5MB)</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  {(previewFileUrl || formData.imageUrl) && (
                    <div className="w-24 h-24 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 shrink-0 relative group">
                      <img
                        src={previewFileUrl || getImageUrl(formData.imageUrl)}
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
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Atau Gunakan URL Gambar</label>
                <input
                  type="url"
                  placeholder="https://example.com/foto.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Hasil Servis">Hasil Servis</option>
                  <option value="Toko & Workshop">Toko & Workshop</option>
                  <option value="Proses Perbaikan">Proses Perbaikan</option>
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
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {formLoading ? 'Menyimpan...' : 'Simpan Foto'}
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
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs disabled:opacity-50"
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

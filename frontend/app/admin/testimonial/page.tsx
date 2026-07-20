'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, MessageSquare, Edit2, Trash2, RefreshCw, X, AlertCircle, Star, CheckCircle2 } from 'lucide-react';
import api from '../../../lib/axios';

interface TestimonialItem {
  id: string;
  customerName: string;
  customerPhoto: string | null;
  rating: number;
  comment: string;
  status: 'APPROVED' | 'PENDING';
  createdAt: string;
}

export default function TestimonialPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialItem | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhoto: '',
    rating: 5,
    comment: '',
    status: 'APPROVED'
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete Dialog State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleOpenModal = (t?: TestimonialItem) => {
    if (t) {
      setSelectedTestimonial(t);
      setFormData({
        customerName: t.customerName,
        customerPhoto: t.customerPhoto || '',
        rating: t.rating || 5,
        comment: t.comment,
        status: t.status as any,
      });
    } else {
      setSelectedTestimonial(null);
      setFormData({
        customerName: '',
        customerPhoto: '',
        rating: 5,
        comment: '',
        status: 'APPROVED'
      });
    }
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      if (selectedTestimonial) {
        await api.put(`/testimonials/${selectedTestimonial.id}`, formData);
      } else {
        await api.post('/testimonials', formData);
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Gagal menyimpan testimonial');
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (item: TestimonialItem) => {
    const newStatus = item.status === 'APPROVED' ? 'PENDING' : 'APPROVED';
    try {
      await api.put(`/testimonials/${item.id}`, { status: newStatus });
      fetchTestimonials();
    } catch (e) {
      console.error('Failed to toggle status:', e);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/testimonials/${deleteId}`);
      setDeleteId(null);
      fetchTestimonials();
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'fill-amber-400' : 'text-slate-200'}`}
          />
        ))}
      </div>
    );
  };

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesSearch = t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.comment.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === '' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            Manajemen Testimonial & Ulasan
          </h1>
          <p className="text-sm text-slate-500 mt-1">Kelola ulasan dan kepuasan pelanggan yang ditampilkan di halaman depan.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="-ml-1 mr-2 h-4 w-4" />
          Tambah Ulasan Baru
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama atau ulasan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            <option value="APPROVED">Disetujui (Approved)</option>
            <option value="PENDING">Menunggu (Pending)</option>
          </select>

          <button
            onClick={fetchTestimonials}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            title="Refresh Data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Testimonial Cards Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-xl shadow-sm border border-slate-100">
          <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Tidak ada ulasan ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      {t.customerPhoto ? (
                        <img src={t.customerPhoto} alt={t.customerName} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        t.customerName.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.customerName}</h4>
                      <div className="mt-0.5">{renderStars(t.rating)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenModal(t)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(t.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-slate-700 text-sm italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleToggleStatus(t)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                    t.status === 'APPROVED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {t.status === 'APPROVED' ? 'Disetujui' : 'Menunggu Persetujuan'}
                </button>
                <span className="text-slate-400">
                  {new Date(t.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {selectedTestimonial ? 'Edit Ulasan' : 'Tambah Ulasan Baru'}
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
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nama Pelanggan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Hidayat"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Foto Pelanggan URL (Opsional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.customerPhoto}
                  onChange={(e) => setFormData({ ...formData, customerPhoto: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Rating Bintang (1 - 5)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang - Sangat Puas)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Bintang - Bagus)</option>
                  <option value={3}>⭐⭐⭐ (3 Bintang - Cukup)</option>
                  <option value={2}>⭐⭐ (2 Bintang - Kurang)</option>
                  <option value={1}>⭐ (1 Bintang - Buruk)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Komentar / Ulasan *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Pengalaman pelanggan tentang layanan servis..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Status Persetujuan</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="APPROVED">Disetujui (Approved)</option>
                  <option value="PENDING">Menunggu (Pending)</option>
                </select>
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
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm disabled:opacity-50"
                >
                  {formLoading ? 'Menyimpan...' : 'Simpan Ulasan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <Trash2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Hapus Ulasan?</h3>
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
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm disabled:opacity-50"
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

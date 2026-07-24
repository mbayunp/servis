'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, FileText, Edit2, Trash2, RefreshCw, X, AlertCircle, CheckCircle2, Eye, Upload } from 'lucide-react';
import api from '../../../lib/axios';
import { getImageUrl } from '../../../lib/utils';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  image: string | null;
  excerpt: string | null;
  content: string;
  category: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  author: string | null;
  createdAt: string;
}

export default function ArticlePage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Notification Toast
  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Edukasi Servis',
    status: 'PUBLISHED',
    author: 'Admin'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Preview Drawer
  const [previewArticle, setPreviewArticle] = useState<ArticleItem | null>(null);

  // Delete Dialog State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/articles');
      setArticles(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleOpenModal = (art?: ArticleItem) => {
    setSelectedFile(null);
    setPreviewFileUrl(null);
    if (art) {
      setSelectedArticle(art);
      setFormData({
        title: art.title,
        excerpt: art.excerpt || '',
        content: art.content,
        category: art.category || 'Edukasi Servis',
        status: art.status as any,
        author: art.author || 'Admin',
      });
    } else {
      setSelectedArticle(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'Edukasi Servis',
        status: 'PUBLISHED',
        author: 'Admin'
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

    if (!selectedArticle && !selectedFile) {
      setFormError('File gambar sampul wajib diupload untuk artikel baru!');
      setFormLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('excerpt', formData.excerpt);
      data.append('content', formData.content);
      data.append('category', formData.category);
      data.append('status', formData.status);
      data.append('author', formData.author);

      if (selectedFile) {
        data.append('image', selectedFile);
      }

      if (selectedArticle) {
        await api.put(`/articles/${selectedArticle.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccessNotification(`Artikel "${formData.title}" berhasil diperbarui!`);
      } else {
        await api.post('/articles', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccessNotification(`Artikel "${formData.title}" berhasil diterbitkan!`);
      }

      setIsModalOpen(false);
      fetchArticles();

      setTimeout(() => setSuccessNotification(null), 4000);
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Gagal menyimpan artikel');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/articles/${deleteId}`);
      setSuccessNotification('Artikel berhasil dihapus.');
      setDeleteId(null);
      fetchArticles();
      setTimeout(() => setSuccessNotification(null), 4000);
    } catch (error) {
      console.error('Failed to delete article:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) ||
      (art.excerpt && art.excerpt.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === '' || art.status === statusFilter;
    return matchesSearch && matchesStatus;
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
            <FileText className="h-6 w-6 text-red-600" />
            Manajemen Artikel & Tips
          </h1>
          <p className="text-sm text-slate-500 mt-1">Kelola konten edukasi, artikel tips perbaikan, dan gambar sampul via file upload.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-all cursor-pointer"
        >
          <Plus className="-ml-1 mr-2 h-4 w-4" />
          Tulis Artikel Baru
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Semua Status</option>
            <option value="PUBLISHED">Terbit (Published)</option>
            <option value="DRAFT">Draft</option>
          </select>

          <button
            onClick={fetchArticles}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16 px-4">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">Tidak ada artikel ditemukan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Artikel</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Penulis</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Tanggal Terbit</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400 overflow-hidden flex-shrink-0">
                          {art.image ? (
                            <img src={getImageUrl(art.image)} alt={art.title} className="w-full h-full object-cover" />
                          ) : (
                            <FileText className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 line-clamp-1">{art.title}</div>
                          <div className="text-xs text-slate-400 line-clamp-1">{art.excerpt || 'Tidak ada ringkasan'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 text-xs font-medium">
                      {art.category || 'Umum'}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {art.author || 'Admin'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        art.status === 'PUBLISHED' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {art.status === 'PUBLISHED' ? 'Terbit' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(art.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setPreviewArticle(art)}
                          className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal(art)}
                          className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Edit Artikel"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(art.id)}
                          className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {selectedArticle ? 'Edit Artikel' : 'Tulis Artikel Baru'}
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
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tips Merawat Baterai Laptop Agar Awet"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Kategori</label>
                  <input
                    type="text"
                    placeholder="Edukasi, Tips, News"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Status Terbit</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="PUBLISHED">Terbit (Published)</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
              </div>

              {/* Upload Cover File Section */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Gambar Sampul Artikel {selectedArticle ? '(Opsional: Kosongkan jika tidak mengganti sampul)' : '*'}
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <label className="flex-1 w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-red-500 hover:bg-slate-50 cursor-pointer transition-all">
                    <Upload className="h-6 w-6 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-600">
                      {selectedFile ? selectedFile.name : 'Pilih file gambar sampul dari perangkat'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WEBP (Maks 5MB)</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  {(previewFileUrl || (selectedArticle && selectedArticle.image)) && (
                    <div className="w-24 h-24 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 shrink-0 relative group">
                      <img
                        src={previewFileUrl || getImageUrl(selectedArticle?.image)}
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
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Ringkasan (Excerpt)</label>
                <textarea
                  rows={2}
                  placeholder="Ringkasan singkat tentang isi artikel..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Isi Artikel Lengkap *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Tulis konten artikel di sini..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
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
                  {formLoading ? 'Menyimpan...' : selectedArticle ? 'Perbarui Artikel' : 'Simpan Artikel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-100 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700">
                {previewArticle.category || 'Edukasi'}
              </span>
              <button onClick={() => setPreviewArticle(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {previewArticle.image && (
              <img src={getImageUrl(previewArticle.image)} alt={previewArticle.title} className="w-full h-48 object-cover rounded-xl" />
            )}

            <h2 className="text-xl font-bold text-slate-900">{previewArticle.title}</h2>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>Oleh: {previewArticle.author || 'Admin'}</span>
              <span>•</span>
              <span>{new Date(previewArticle.createdAt).toLocaleDateString('id-ID')}</span>
            </div>

            <div className="prose prose-slate max-w-none text-slate-700 text-sm whitespace-pre-line leading-relaxed">
              {previewArticle.content}
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
              <h3 className="text-lg font-bold text-slate-900">Hapus Artikel?</h3>
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

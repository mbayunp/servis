'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Wrench, Edit2, Trash2, RefreshCw, X, AlertCircle, Phone, Mail, Award, CheckCircle2, Clock, UserX } from 'lucide-react';
import api from '../../../lib/axios';

interface Technician {
  id: string;
  employeeCode: string | null;
  name: string;
  photo: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  skill: string | null;
  experience: number | null;
  status: 'AVAILABLE' | 'ON_DUTY' | 'OFF';
  isActive: boolean;
  createdAt: string;
}

export default function TechnicianPage() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  const [formData, setFormData] = useState({
    employeeCode: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    skill: '',
    experience: '',
    status: 'AVAILABLE'
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete Dialog State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTechnicians = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/technicians');
      setTechnicians(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch technicians:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTechnicians();
  }, [fetchTechnicians]);

  const handleOpenModal = (tech?: Technician) => {
    if (tech) {
      setSelectedTech(tech);
      setFormData({
        employeeCode: tech.employeeCode || '',
        name: tech.name,
        phone: tech.phone || '',
        email: tech.email || '',
        address: tech.address || '',
        skill: tech.skill || '',
        experience: tech.experience ? String(tech.experience) : '',
        status: tech.status,
      });
    } else {
      setSelectedTech(null);
      setFormData({
        employeeCode: `TEK-${Math.floor(1000 + Math.random() * 9000)}`,
        name: '',
        phone: '',
        email: '',
        address: '',
        skill: '',
        experience: '',
        status: 'AVAILABLE'
      });
    }
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    const payload = {
      employeeCode: formData.employeeCode,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      skill: formData.skill,
      experience: formData.experience ? parseInt(formData.experience) : 0,
      status: formData.status
    };

    try {
      if (selectedTech) {
        await api.put(`/technicians/${selectedTech.id}`, payload);
      } else {
        await api.post('/technicians', payload);
      }
      setIsModalOpen(false);
      fetchTechnicians();
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Gagal menyimpan data teknisi');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/technicians/${deleteId}`);
      setDeleteId(null);
      fetchTechnicians();
    } catch (error) {
      console.error('Failed to delete technician:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return { label: 'Tersedia (Ready)', class: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' };
      case 'ON_DUTY':
        return { label: 'Sedang Bertugas', class: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' };
      case 'OFF':
        return { label: 'Libur / Off', class: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' };
      default:
        return { label: status, class: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' };
    }
  };

  const stats = {
    total: technicians.length,
    available: technicians.filter(t => t.status === 'AVAILABLE').length,
    onDuty: technicians.filter(t => t.status === 'ON_DUTY').length,
    off: technicians.filter(t => t.status === 'OFF').length,
  };

  const filteredTechnicians = technicians.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.employeeCode && t.employeeCode.toLowerCase().includes(search.toLowerCase())) ||
      (t.skill && t.skill.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === '' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="h-6 w-6 text-blue-600" />
            Manajemen Teknisi
          </h1>
          <p className="text-sm text-slate-500 mt-1">Kelola data teknisi perbaikan, status ketersediaan, dan keahlian.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all duration-200 cursor-pointer"
        >
          <Plus className="-ml-1 mr-2 h-4 w-4" />
          Tambah Teknisi Baru
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Wrench className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Total Teknisi</div>
            <div className="text-xl font-bold text-slate-900">{stats.total}</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Ketersediaan (Ready)</div>
            <div className="text-xl font-bold text-emerald-600">{stats.available}</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Sedang Bertugas</div>
            <div className="text-xl font-bold text-amber-600">{stats.onDuty}</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-slate-100 text-slate-500 rounded-lg">
            <UserX className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Libur / Off</div>
            <div className="text-xl font-bold text-slate-600">{stats.off}</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, kode, keahlian..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            <option value="AVAILABLE">Tersedia (Ready)</option>
            <option value="ON_DUTY">Sedang Bertugas</option>
            <option value="OFF">Libur / Off</option>
          </select>

          <button
            onClick={fetchTechnicians}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredTechnicians.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Wrench className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">Tidak ada data teknisi ditemukan</p>
            <p className="text-sm text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau tambah teknisi baru.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Teknisi</th>
                  <th className="px-6 py-4">Kontak</th>
                  <th className="px-6 py-4">Keahlian (Skill)</th>
                  <th className="px-6 py-4">Pengalaman</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTechnicians.map((tech) => {
                  const badge = getStatusBadge(tech.status);
                  return (
                    <tr key={tech.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                            {tech.photo ? (
                              <img src={tech.photo} alt={tech.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              tech.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{tech.name}</div>
                            <div className="text-xs text-slate-400">{tech.employeeCode || 'TEK-00'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-xs">
                          {tech.phone && (
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Phone className="h-3 w-3 text-slate-400" />
                              {tech.phone}
                            </div>
                          )}
                          {tech.email && (
                            <div className="flex items-center gap-1.5 text-slate-500">
                              <Mail className="h-3 w-3 text-slate-400" />
                              {tech.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-xs text-slate-700">
                          <Award className="h-3.5 w-3.5 text-blue-500" />
                          {tech.skill || 'Umum'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-xs">
                        {tech.experience ? `${tech.experience} Tahun` : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.class}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(tech)}
                            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(tech.id)}
                            className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {selectedTech ? 'Edit Data Teknisi' : 'Tambah Teknisi Baru'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Kode Karyawan *</label>
                  <input
                    type="text"
                    required
                    placeholder="TEK-1001"
                    value={formData.employeeCode}
                    onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Doni Setiawan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">No. HP / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="08123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="teknisi@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Keahlian (Skill Spesialisasi)</label>
                  <input
                    type="text"
                    placeholder="Laptop, Micro-Soldering, Printer"
                    value={formData.skill}
                    onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Pengalaman (Tahun)</label>
                  <input
                    type="number"
                    placeholder="3"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Alamat</label>
                <textarea
                  rows={2}
                  placeholder="Alamat domisili..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Status Ketersediaan</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="AVAILABLE">Tersedia (Ready)</option>
                  <option value="ON_DUTY">Sedang Bertugas</option>
                  <option value="OFF">Libur / Off</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all disabled:opacity-50"
                >
                  {formLoading ? 'Menyimpan...' : 'Simpan'}
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
              <h3 className="text-lg font-bold text-slate-900">Hapus Data Teknisi?</h3>
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

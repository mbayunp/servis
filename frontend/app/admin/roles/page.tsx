'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, ShieldCheck, Edit2, Trash2, RefreshCw, X, AlertCircle, Key } from 'lucide-react';
import api from '../../../lib/axios';

interface Permission {
  id: string;
  name: string;
  description: string | null;
  module: string;
}

interface RoleItem {
  id: string;
  name: string;
  description: string | null;
  permissions?: Permission[];
  createdAt?: string;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    selectedPermissionIds: [] as string[]
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete Dialog State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [rolesRes, permRes] = await Promise.all([
        api.get('/roles'),
        api.get('/permissions').catch(() => ({ data: { data: [] } }))
      ]);
      setRoles(rolesRes.data.data || []);
      setPermissions(permRes.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch roles or permissions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = (role?: RoleItem) => {
    if (role) {
      setSelectedRole(role);
      setFormData({
        name: role.name,
        description: role.description || '',
        selectedPermissionIds: role.permissions ? role.permissions.map(p => p.id) : []
      });
    } else {
      setSelectedRole(null);
      setFormData({
        name: '',
        description: '',
        selectedPermissionIds: []
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
      if (selectedRole) {
        await api.put(`/roles/${selectedRole.id}`, formData);
      } else {
        await api.post('/roles', formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Gagal menyimpan data role');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/roles/${deleteId}`);
      setDeleteId(null);
      fetchData();
    } catch (error) {
      console.error('Failed to delete role:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const togglePermission = (permId: string) => {
    setFormData(prev => {
      const exists = prev.selectedPermissionIds.includes(permId);
      return {
        ...prev,
        selectedPermissionIds: exists
          ? prev.selectedPermissionIds.filter(id => id !== permId)
          : [...prev.selectedPermissionIds, permId]
      };
    });
  };

  const filteredRoles = roles.filter((r) => {
    return r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            Manajemen Role & Hak Akses (Permissions)
          </h1>
          <p className="text-sm text-slate-500 mt-1">Atur peran pengguna (SUPER_ADMIN, OWNER, ADMIN, TEKNISI, CUSTOMER) dan izin aksesnya.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all duration-200 cursor-pointer"
        >
          <Plus className="-ml-1 mr-2 h-4 w-4" />
          Tambah Role Baru
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama atau deskripsi role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        <button
          onClick={fetchData}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Refresh Data"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Role Cards Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredRoles.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-xl shadow-sm border border-slate-100">
          <ShieldCheck className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Tidak ada data role ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <div key={role.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {role.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenModal(role)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(role.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-4">
                  {role.description || 'Tidak ada deskripsi.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Key className="h-3.5 w-3.5 text-slate-400" />
                  {role.permissions?.length || 0} Permissions
                </span>
                <button
                  onClick={() => handleOpenModal(role)}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Kelola Akses
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {selectedRole ? 'Edit Role & Akses' : 'Tambah Role Baru'}
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
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nama Role *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: TEKNISI, MANAGER, KASIR"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Deskripsi</label>
                <textarea
                  rows={2}
                  placeholder="Deskripsi singkat fungsi dan wewenang role..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {permissions.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Hak Akses (Permissions)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-slate-200 p-3 rounded-lg max-h-48 overflow-y-auto">
                    {permissions.map((p) => {
                      const isChecked = formData.selectedPermissionIds.includes(p.id);
                      return (
                        <label key={p.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => togglePermission(p.id)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <div className="font-semibold">{p.name}</div>
                            <div className="text-[10px] text-slate-400">{p.module}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

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
              <h3 className="text-lg font-bold text-slate-900">Hapus Role?</h3>
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

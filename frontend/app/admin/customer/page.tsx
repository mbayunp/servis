'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Users, Edit2, Trash2, RefreshCw, X, AlertCircle, Eye, Phone, MapPin, Calendar, Clock, ShoppingBag } from 'lucide-react';
import api from '../../../lib/axios';

interface Customer {
  id: string;
  userId?: string;
  fullName: string;
  phoneNumber: string;
  address: string | null;
  createdAt: string;
  bookingsCount?: number;
  bookings?: any[];
}

export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({ fullName: '', phoneNumber: '', address: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Detail Drawer State
  const [detailCustomer, setDetailCustomer] = useState<Customer | null>(null);
  const [customerBookings, setCustomerBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Delete Dialog State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/customers');
      setCustomers(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleOpenModal = (customer?: Customer) => {
    if (customer) {
      setSelectedCustomer(customer);
      setFormData({
        fullName: customer.fullName,
        phoneNumber: customer.phoneNumber,
        address: customer.address || '',
      });
    } else {
      setSelectedCustomer(null);
      setFormData({ fullName: '', phoneNumber: '', address: '' });
    }
    setFormError('');
    setIsModalOpen(true);
  };

  const handleViewDetail = async (customer: Customer) => {
    setDetailCustomer(customer);
    setLoadingBookings(true);
    try {
      const res = await api.get('/bookings', { params: { customerId: customer.id } });
      setCustomerBookings(res.data.data || []);
    } catch (e) {
      setCustomerBookings(customer.bookings || []);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      if (selectedCustomer) {
        await api.put(`/customers/${selectedCustomer.id}`, formData);
      } else {
        await api.post('/customers', formData);
      }
      setIsModalOpen(false);
      fetchCustomers();
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Gagal menyimpan data pelanggan');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/customers/${deleteId}`);
      setDeleteId(null);
      fetchCustomers();
    } catch (error) {
      console.error('Failed to delete customer:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredCustomers = customers.filter((c) => {
    return (
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.phoneNumber.includes(search) ||
      (c.address && c.address.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-red-600" />
            Manajemen Pelanggan (Customer)
          </h1>
          <p className="text-sm text-slate-500 mt-1">Daftar pelanggan, riwayat servis, dan informasi kontak pelanggan.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all duration-200 cursor-pointer"
        >
          <Plus className="-ml-1 mr-2 h-4 w-4" />
          Tambah Pelanggan
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, no HP, alamat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        <button
          onClick={fetchCustomers}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Refresh Data"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Users className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">Tidak ada data pelanggan ditemukan</p>
            <p className="text-sm text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau tambah pelanggan baru.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Pelanggan</th>
                  <th className="px-6 py-4">No. HP / WhatsApp</th>
                  <th className="px-6 py-4">Alamat</th>
                  <th className="px-6 py-4">Jumlah Servis</th>
                  <th className="px-6 py-4">Tanggal Terdaftar</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                          {c.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{c.fullName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {c.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                      {c.address || '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-semibold text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold">
                        {c.bookings?.length || c.bookingsCount || 0} Booking
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(c.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleViewDetail(c)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Lihat Detail & Riwayat"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal(c)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(c.id)}
                          className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {selectedCustomer ? 'Edit Data Pelanggan' : 'Tambah Pelanggan Baru'}
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
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ahmad Subagyo"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">No. HP / WhatsApp *</label>
                <input
                  type="text"
                  required
                  placeholder="08123456789"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Alamat Lengkap</label>
                <textarea
                  rows={3}
                  placeholder="Alamat domisili pelanggan..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
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

      {/* Customer Detail Drawer */}
      {detailCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Detail Pelanggan
                </h3>
                <button onClick={() => setDetailCustomer(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="py-6 border-b border-slate-100 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                  {detailCustomer.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{detailCustomer.fullName}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Phone className="h-3 w-3" /> {detailCustomer.phoneNumber}
                  </p>
                  {detailCustomer.address && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" /> {detailCustomer.address}
                    </p>
                  )}
                </div>
              </div>

              <div className="py-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-blue-600" />
                  Riwayat Pemesanan Servis
                </h4>

                {loadingBookings ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
                  </div>
                ) : customerBookings.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 rounded-lg text-slate-500 text-xs">
                    Belum ada riwayat booking untuk pelanggan ini.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {customerBookings.map((b) => (
                      <div key={b.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs">
                        <div>
                          <span className="font-bold text-slate-900 block">{b.bookingNumber}</span>
                          <span className="text-slate-500">{b.deviceName || 'Perangkat'}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700">
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setDetailCustomer(null)}
                className="w-full py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Tutup Detail
              </button>
            </div>
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
              <h3 className="text-lg font-bold text-slate-900">Hapus Data Pelanggan?</h3>
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

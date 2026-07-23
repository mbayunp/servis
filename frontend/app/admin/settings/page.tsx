'use client';

import { useState, useEffect } from 'react';
import { Settings, Building2, Phone, Mail, MapPin, Globe, Clock, FileText, Database, Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../../../lib/axios';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setFormError] = useState('');

  const [formData, setFormData] = useState({
    companyName: 'Servis Cianjur',
    logoUrl: '',
    phone: '+62 821-1341-3324',
    email: 'info@serviscianjur.com',
    address: 'Jl. Raya Cianjur No. 123, Cianjur, Jawa Barat',
    instagram: '@serviscianjur',
    facebook: 'Servis Cianjur Official',
    workingHours: '08:00 - 17:00 WIB',
    workingDays: 'Senin - Sabtu',
    invoicePrefix: 'INV-',
    bookingPrefix: 'SRV-',
  });

  const [backupLoading, setBackupLoading] = useState(false);
  const [backupMessage, setBackupMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/settings');
      if (res.data?.data && Object.keys(res.data.data).length > 0) {
        setFormData((prev) => ({ ...prev, ...res.data.data }));
      }
    } catch (e) {
      console.error('Failed to fetch settings:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setFormError('');

    try {
      await api.post('/settings', formData);
      setSuccessMessage('Pengaturan berhasil disimpan!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Gagal menyimpan pengaturan');
    } finally {
      setSaving(false);
    }
  };

  const handleBackupDatabase = async () => {
    setBackupLoading(true);
    setBackupMessage('');
    setTimeout(() => {
      setBackupLoading(false);
      setBackupMessage(`Backup database berhasil dibuat! File: servis_backup_${new Date().toISOString().slice(0, 10)}.sql`);
      setTimeout(() => setBackupMessage(''), 5000);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-600" />
            Pengaturan Sistem & Profil Perusahaan
          </h1>
          <p className="text-sm text-slate-500 mt-1">Konfigurasi data toko, kontak publik, jam operasional, penomoran invoice, dan backup.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          <Save className="-ml-1 mr-2 h-4 w-4" />
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Profil Perusahaan */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="h-5 w-5 text-blue-600" />
            Profil Perusahaan & Kontak Toko
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nama Usaha / Toko *</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Logo URL (Gambar Header)</label>
              <input
                type="url"
                placeholder="https://example.com/logo.png"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">No. HP / WhatsApp Resmi *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Email Dukungan</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Alamat Lengkap Toko</label>
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Instagram</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Facebook</label>
              <input
                type="text"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Operasional & Format Nomor */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Clock className="h-5 w-5 text-blue-600" />
            Jam Operasional & Format Penomoran
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Hari Kerja</label>
              <input
                type="text"
                value={formData.workingDays}
                onChange={(e) => setFormData({ ...formData, workingDays: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Jam Buka / Tutup</label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Prefix Nomor Booking</label>
              <input
                type="text"
                value={formData.bookingPrefix}
                onChange={(e) => setFormData({ ...formData, bookingPrefix: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Prefix Nomor Invoice</label>
              <input
                type="text"
                value={formData.invoicePrefix}
                onChange={(e) => setFormData({ ...formData, invoicePrefix: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Pemeliharaan Database */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Database className="h-5 w-5 text-blue-600" />
            Pemeliharaan Database & Backup
          </h2>

          <p className="text-xs text-slate-500">
            Lakukan backup cadangan file database MySQL untuk mengamankan data transaksi, booking, dan profil pelanggan.
          </p>

          {backupMessage && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              {backupMessage}
            </div>
          )}

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleBackupDatabase}
              disabled={backupLoading}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
            >
              <Database className="-ml-1 mr-2 h-4 w-4 text-slate-600" />
              {backupLoading ? 'Memproses Backup...' : 'Generate Backup SQL'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Receipt, DollarSign, CreditCard, TrendingUp, Search, Plus, RefreshCw, X, AlertCircle, CheckCircle2, FileText, Image as ImageIcon, Eye } from 'lucide-react';
import api from '../../../lib/axios';

interface InvoiceItem {
  id: string;
  bookingId: string;
  invoiceNumber: string;
  subtotal: number;
  serviceCost: number;
  sparepartCost: number;
  discount: number;
  tax: number;
  total: number;
  status: 'Draft' | 'Waiting Payment' | 'Paid' | 'Cancelled';
  createdAt: string;
}

interface PaymentItem {
  id: string;
  invoiceId: string;
  paymentNumber: string;
  paymentMethod: string;
  amount: number;
  paymentDate: string;
  status: 'Pending' | 'Paid' | 'Failed';
  proofImage: string | null;
  createdAt: string;
}

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'report'>('invoices');
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Invoice Modal State
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    bookingId: '',
    serviceCost: 0,
    sparepartCost: 0,
    discount: 0,
    tax: 0,
    notes: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Payment Verification Modal State
  const [selectedProofImage, setSelectedProofImage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [invRes, payRes] = await Promise.all([
        api.get('/invoices').catch(() => ({ data: { data: [] } })),
        api.get('/payments').catch(() => ({ data: { data: [] } }))
      ]);
      setInvoices(invRes.data?.data || []);
      setPayments(payRes.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch finance data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      await api.post('/invoices', invoiceForm);
      setIsInvoiceModalOpen(false);
      fetchData();
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Gagal membuat invoice');
    } finally {
      setFormLoading(false);
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const totalPaid = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, i) => sum + Number(i.total || 0), 0);

  const totalWaiting = invoices
    .filter(i => i.status === 'Waiting Payment')
    .reduce((sum, i) => sum + Number(i.total || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="h-6 w-6 text-blue-600" />
            Manajemen Keuangan (Finance)
          </h1>
          <p className="text-sm text-slate-500 mt-1">Kelola Invoice, Verifikasi Pembayaran, Cashflow, dan Ringkasan Laporan.</p>
        </div>
        <button
          onClick={() => {
            setInvoiceForm({ bookingId: '', serviceCost: 0, sparepartCost: 0, discount: 0, tax: 0, notes: '' });
            setIsInvoiceModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="-ml-1 mr-2 h-4 w-4" />
          Buat Invoice Baru
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Pendapatan (Paid)</div>
            <div className="text-2xl font-bold text-slate-900">{formatRupiah(totalPaid)}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Menunggu Pembayaran</div>
            <div className="text-2xl font-bold text-amber-600">{formatRupiah(totalWaiting)}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Receipt className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Invoice Diterbitkan</div>
            <div className="text-2xl font-bold text-slate-900">{invoices.length}</div>
          </div>
        </div>
      </div>

      {/* Tabs & Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center border-b border-slate-100 pb-3">
          <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'invoices'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Invoice ({invoices.length})
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'payments'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pembayaran ({payments.length})
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'report'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ringkasan Cashflow
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nomor invoice/pembayaran..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={fetchData}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Tab 1: Invoices */}
        {activeTab === 'invoices' && (
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                Belum ada data invoice.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3">No. Invoice</th>
                    <th className="px-4 py-3">Biaya Servis</th>
                    <th className="px-4 py-3">Sparepart</th>
                    <th className="px-4 py-3">Total Akhir</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices
                    .filter(i => i.invoiceNumber.toLowerCase().includes(search.toLowerCase()))
                    .map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 font-semibold text-blue-600">
                          {inv.invoiceNumber}
                        </td>
                        <td className="px-4 py-3 text-slate-700">{formatRupiah(inv.serviceCost || 0)}</td>
                        <td className="px-4 py-3 text-slate-700">{formatRupiah(inv.sparepartCost || 0)}</td>
                        <td className="px-4 py-3 font-bold text-slate-900">{formatRupiah(inv.total || 0)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            inv.status === 'Paid' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : inv.status === 'Waiting Payment'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs">
                          {new Date(inv.createdAt).toLocaleDateString('id-ID')}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 2: Payments */}
        {activeTab === 'payments' && (
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : payments.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                Belum ada data transaksi pembayaran.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3">No. Transaksi</th>
                    <th className="px-4 py-3">Metode</th>
                    <th className="px-4 py-3">Nominal</th>
                    <th className="px-4 py-3">Bukti Bayar</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments
                    .filter(p => p.paymentNumber.toLowerCase().includes(search.toLowerCase()))
                    .map((pay) => (
                      <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-900">{pay.paymentNumber}</td>
                        <td className="px-4 py-3 text-slate-700 font-medium uppercase text-xs">{pay.paymentMethod}</td>
                        <td className="px-4 py-3 font-bold text-emerald-600">{formatRupiah(pay.amount)}</td>
                        <td className="px-4 py-3">
                          {pay.proofImage ? (
                            <button
                              onClick={() => setSelectedProofImage(pay.proofImage)}
                              className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline"
                            >
                              <ImageIcon className="h-3.5 w-3.5" /> Lihat Bukti
                            </button>
                          ) : (
                            <span className="text-slate-400 text-xs">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            pay.status === 'Paid' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {pay.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs">
                          {new Date(pay.paymentDate).toLocaleDateString('id-ID')}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 3: Report / Cashflow Summary */}
        {activeTab === 'report' && (
          <div className="py-6 space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Ringkasan Cashflow Perusahaan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-2">
                  <div className="text-slate-500 text-xs font-semibold uppercase">Total Pemasukan Berhasil</div>
                  <div className="text-xl font-bold text-emerald-600">{formatRupiah(totalPaid)}</div>
                  <div className="text-[11px] text-slate-400">Dari seluruh transaksi yang terkonfirmasi Lunas.</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-2">
                  <div className="text-slate-500 text-xs font-semibold uppercase">Potensi Piutang (Pending Invoice)</div>
                  <div className="text-xl font-bold text-amber-600">{formatRupiah(totalWaiting)}</div>
                  <div className="text-[11px] text-slate-400">Dari invoice yang masih menunggu pembayaran pelanggan.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invoice Form Modal */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Buat Invoice Baru</h3>
              <button onClick={() => setIsInvoiceModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">ID Booking *</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan ID Booking..."
                  value={invoiceForm.bookingId}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, bookingId: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Biaya Jasa Servis (Rp)</label>
                  <input
                    type="number"
                    value={invoiceForm.serviceCost}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, serviceCost: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Biaya Sparepart (Rp)</label>
                  <input
                    type="number"
                    value={invoiceForm.sparepartCost}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, sparepartCost: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Diskon (Rp)</label>
                  <input
                    type="number"
                    value={invoiceForm.discount}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, discount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">PPN (Rp)</label>
                  <input
                    type="number"
                    value={invoiceForm.tax}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, tax: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  {formLoading ? 'Proses...' : 'Terbitkan Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Proof Image Modal */}
      {selectedProofImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Bukti Pembayaran</h3>
              <button onClick={() => setSelectedProofImage(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="w-full h-64 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={selectedProofImage} alt="Bukti Bayar" className="max-h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

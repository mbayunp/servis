'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Receipt, DollarSign, CreditCard, TrendingUp, Search, Plus, RefreshCw, X, AlertCircle, Image as ImageIcon, ChevronDown, User, Smartphone, MessageSquare, Printer } from 'lucide-react';
import api from '../../../lib/axios';
import { RecordPaymentModal } from '../../../components/admin/finance/RecordPaymentModal';

interface BookingSummaryItem {
  id: string;
  bookingNumber: string;
  status?: string;
  deviceName?: string;
  customerName?: string;
  phoneNumber?: string;
  address?: string;
  estimatedCost?: number | string;
  customer?: {
    fullName?: string;
    name?: string;
    phoneNumber?: string;
    phone?: string;
    address?: string;
  };
  brand?: {
    name?: string;
  };
}

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
  status: 'Draft' | 'Waiting Payment' | 'Paid' | 'Cancelled' | string;
  createdAt: string;
  booking?: BookingSummaryItem;
}

interface PaymentItem {
  id: string;
  invoiceId: string;
  paymentNumber: string;
  paymentMethod: string;
  amount: number;
  paymentDate: string;
  status: string;
  proofImage: string | null;
  createdAt: string;
  invoice?: InvoiceItem;
  creator?: { fullName?: string; name?: string; username?: string; email?: string };
}

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'report'>('invoices');
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [bookingList, setBookingList] = useState<BookingSummaryItem[]>([]);
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

  // Booking Searchable Dropdown State
  const [bookingSearch, setBookingSearch] = useState('');
  const [isBookingDropdownOpen, setIsBookingDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Record Payment Modal State
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<InvoiceItem | null>(null);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);

  // Payment Verification Modal State
  const [selectedProofImage, setSelectedProofImage] = useState<string | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBookingDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [invRes, payRes, bookRes] = await Promise.all([
        api.get('/invoices').catch(() => ({ data: { data: [] } })),
        api.get('/payments').catch(() => ({ data: { data: [] } })),
        api.get('/bookings?limit=500').catch(() => ({ data: { data: [] } }))
      ]);
      setInvoices(invRes.data?.data || []);
      setPayments(payRes.data?.data || []);
      setBookingList(bookRes.data?.data || []);
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
    if (!invoiceForm.bookingId) {
      setFormError('Silakan pilih booking terlebih dahulu');
      return;
    }
    setFormLoading(true);
    setFormError('');

    try {
      await api.post('/invoices', invoiceForm);
      setIsInvoiceModalOpen(false);
      fetchData();
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      setFormError(errorObj.response?.data?.message || 'Gagal membuat invoice');
    } finally {
      setFormLoading(false);
    }
  };

  const handleSendWhatsApp = (inv: InvoiceItem) => {
    const targetBookingId = inv.bookingId || inv.booking?.id;
    const booking = inv.booking || bookingList.find(b => b.id === targetBookingId);
    const phoneRaw = booking?.customer?.phoneNumber || booking?.phoneNumber || '';
    const phone = phoneRaw.replace(/\D/g, '');
    const formattedPhone = phone.startsWith('0') ? '62' + phone.slice(1) : phone;
    const customerName = booking?.customer?.fullName || booking?.customerName || 'Pelanggan';

    const text = `Halo ${customerName}, berikut invoice tagihan servis perbaikan Anda di Servis Cianjur:\n\n` +
      `• No. Invoice: ${inv.invoiceNumber}\n` +
      `• Perangkat: ${booking?.deviceName || 'Perangkat Servis'}\n` +
      `• Biaya Jasa: ${formatRupiah(inv.serviceCost || 0)}\n` +
      `• Biaya Sparepart: ${formatRupiah(inv.sparepartCost || 0)}\n` +
      `• Total Tagihan: ${formatRupiah(inv.total || 0)}\n` +
      `• Status: ${inv.status}\n\n` +
      `Mohon lakukan konfirmasi/pembayaran. Terima kasih!`;

    if (formattedPhone) {
      window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      alert(`Nomor WhatsApp tidak ditemukan untuk booking ini. Rincian invoice:\n\n${text}`);
    }
  };

  const handlePrintInvoice = (inv: InvoiceItem) => {
    const targetBookingId = inv.bookingId || inv.booking?.id;
    if (targetBookingId) {
      window.open(`/admin/booking/${targetBookingId}/receipt`, '_blank');
    } else {
      alert('Booking ID tidak ditemukan untuk invoice ini.');
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const formatRupiahInput = (val: number | string) => {
    if (val === undefined || val === null || val === '') return '0';
    let num: number;
    if (typeof val === 'number') {
      num = Math.round(val);
    } else {
      const parsed = Number(val);
      if (!isNaN(parsed)) {
        num = Math.round(parsed);
      } else {
        const digits = val.replace(/\D/g, '');
        num = digits ? parseInt(digits, 10) : 0;
      }
    }
    if (isNaN(num) || num === 0) return '0';
    return num.toLocaleString('id-ID');
  };

  const parseRupiahInput = (str: string): number => {
    const digits = str.replace(/\D/g, '');
    return digits ? parseInt(digits, 10) : 0;
  };

  const getStatusBadgeClass = (status: string) => {
    const s = (status || '').toUpperCase();
    if (s === 'PAID') return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    if (s === 'WAITING PAYMENT' || s === 'WAITING_PAYMENT' || s === 'UNPAID') return 'bg-amber-100 text-amber-700 border border-amber-200';
    if (s === 'DRAFT') return 'bg-slate-100 text-slate-700 border border-slate-200';
    if (s === 'CANCELLED' || s === 'REJECTED') return 'bg-red-100 text-red-700 border border-red-200';
    return 'bg-slate-100 text-slate-700 border border-slate-200';
  };

  const filteredBookings = bookingList.filter((b) => {
    if (!bookingSearch.trim()) return true;
    const q = bookingSearch.toLowerCase();
    const bookingNo = (b.bookingNumber || '').toLowerCase();
    const customerName = (b.customer?.fullName || b.customerName || '').toLowerCase();
    const customerPhone = (b.customer?.phoneNumber || b.phoneNumber || '').toLowerCase();
    const device = (b.deviceName || '').toLowerCase();
    const brand = (b.brand?.name || '').toLowerCase();
    const status = (b.status || '').toLowerCase();

    return (
      bookingNo.includes(q) ||
      customerName.includes(q) ||
      customerPhone.includes(q) ||
      device.includes(q) ||
      brand.includes(q) ||
      status.includes(q)
    );
  });

  const totalPaid = invoices
    .filter(i => (i.status || '').toUpperCase() === 'PAID')
    .reduce((sum, i) => sum + Number(i.total || 0), 0);

  const totalWaiting = invoices
    .filter(i => ['UNPAID', 'DRAFT', 'WAITING PAYMENT', 'WAITING_PAYMENT', 'PENDING'].includes((i.status || '').toUpperCase()))
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
          <p className="text-sm text-slate-500 mt-1">Kelola Lifecycle Invoice (Draft &rarr; Unpaid &rarr; Paid), Verifikasi Pembayaran, dan Cashflow.</p>
        </div>
        <button
          onClick={() => {
            setInvoiceForm({ bookingId: '', serviceCost: 0, sparepartCost: 0, discount: 0, tax: 0, notes: '' });
            setBookingSearch('');
            setIsBookingDropdownOpen(false);
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
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Pendapatan (PAID)</div>
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
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
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
                    <th className="px-4 py-3 text-right">AKSI</th>
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
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(inv.status)}`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs">
                          {new Date(inv.createdAt).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Catat Pembayaran button */}
                            {['DRAFT', 'UNPAID', 'WAITING PAYMENT', 'WAITING_PAYMENT', 'PENDING'].includes((inv.status || '').toUpperCase()) && (
                              <button
                                onClick={() => {
                                  setSelectedInvoiceForPayment(inv);
                                  setIsRecordPaymentOpen(true);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all cursor-pointer"
                                title="Catat Pembayaran"
                              >
                                <CreditCard className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Bayar</span>
                              </button>
                            )}

                            {/* Kirim WA button */}
                            {['DRAFT', 'UNPAID', 'WAITING PAYMENT', 'WAITING_PAYMENT', 'PENDING'].includes((inv.status || '').toUpperCase()) && (
                              <button
                                onClick={() => handleSendWhatsApp(inv)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded-lg transition-all cursor-pointer"
                                title="Kirim WA"
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Kirim WA</span>
                              </button>
                            )}

                            {/* Cetak Invoice button */}
                            <button
                              onClick={() => handlePrintInvoice(inv)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 rounded-lg transition-all cursor-pointer"
                              title="Cetak Invoice / Nota"
                            >
                              <Printer className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Cetak</span>
                            </button>
                          </div>
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
                    <th className="px-4 py-3">No. Invoice</th>
                    <th className="px-4 py-3">Tanggal Bayar</th>
                    <th className="px-4 py-3">Metode</th>
                    <th className="px-4 py-3">Nominal</th>
                    <th className="px-4 py-3">Penerima (Admin)</th>
                    <th className="px-4 py-3">Bukti Bayar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments
                    .filter(p => (p.paymentNumber || '').toLowerCase().includes(search.toLowerCase()) || (p.invoice?.invoiceNumber || '').toLowerCase().includes(search.toLowerCase()))
                    .map((pay) => (
                      <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 font-semibold text-blue-600">
                          {pay.invoice?.invoiceNumber || pay.paymentNumber}
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs">
                          {new Date(pay.paymentDate || pay.createdAt).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-4 py-3 text-slate-700 font-medium uppercase text-xs">
                          {pay.paymentMethod}
                        </td>
                        <td className="px-4 py-3 font-bold text-emerald-600">
                          {formatRupiah(pay.amount)}
                        </td>
                        <td className="px-4 py-3 text-slate-700 text-xs font-medium">
                          {pay.creator?.username || pay.creator?.email || 'Admin Workshop'}
                        </td>
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
                <AlertCircle className="h-4 w-4 shrink-0" />
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Pilih Booking *</label>
                
                {(() => {
                  const selectedBooking = bookingList.find(b => b.id === invoiceForm.bookingId);
                  
                  if (selectedBooking) {
                    return (
                      <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl relative flex flex-col gap-1">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{selectedBooking.bookingNumber}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeClass(selectedBooking.status || '')}`}>
                              {selectedBooking.status}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setInvoiceForm({ ...invoiceForm, bookingId: '' });
                              setBookingSearch('');
                              setIsBookingDropdownOpen(true);
                            }}
                            className="text-xs font-semibold text-red-600 hover:text-red-800 bg-white border border-red-200 hover:bg-red-50 px-2 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <X className="h-3.5 w-3.5" />
                            Ganti Booking
                          </button>
                        </div>

                        <div className="text-xs text-slate-600 space-y-1 mt-1">
                          <div className="flex items-center gap-1.5 font-medium text-slate-800">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            <span>{selectedBooking.customer?.fullName || selectedBooking.customerName || 'Pelanggan'}</span>
                            {selectedBooking.customer?.phoneNumber && (
                              <span className="text-slate-400">({selectedBooking.customer.phoneNumber})</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Smartphone className="h-3.5 w-3.5 text-slate-400" />
                            <span>{selectedBooking.brand?.name ? `${selectedBooking.brand.name} - ` : ''}{selectedBooking.deviceName}</span>
                          </div>
                          {selectedBooking.estimatedCost !== undefined && selectedBooking.estimatedCost !== null && (
                            <div className="text-xs text-blue-700 font-semibold pt-1 border-t border-blue-100">
                              Estimasi Biaya: {formatRupiah(Number(selectedBooking.estimatedCost))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className="relative" ref={dropdownRef}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Cari No. Booking, Customer, HP, Perangkat..."
                          value={bookingSearch}
                          onFocus={() => setIsBookingDropdownOpen(true)}
                          onChange={(e) => {
                            setBookingSearch(e.target.value);
                            setIsBookingDropdownOpen(true);
                          }}
                          className="w-full pl-9 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        />
                        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-transform duration-200 pointer-events-none ${isBookingDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>

                      {isBookingDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 z-50 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-64 flex flex-col animate-in fade-in duration-100">
                          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-500 flex justify-between items-center">
                            <span>DAFTAR BOOKING ({bookingList.length})</span>
                            <span>{filteredBookings.length} cocok</span>
                          </div>

                          <div className="overflow-y-auto divide-y divide-slate-100 max-h-56">
                            {filteredBookings.length === 0 ? (
                              <div className="p-4 text-center text-xs text-slate-500">
                                Tidak ada booking yang sesuai dengan pencarian &quot;{bookingSearch}&quot;
                              </div>
                            ) : (
                              filteredBookings.map((b) => (
                                <button
                                  key={b.id}
                                  type="button"
                                  onClick={() => {
                                    setInvoiceForm({
                                      ...invoiceForm,
                                      bookingId: b.id,
                                      serviceCost: b.estimatedCost ? Number(b.estimatedCost) : invoiceForm.serviceCost
                                    });
                                    setIsBookingDropdownOpen(false);
                                    setFormError('');
                                  }}
                                  className="w-full text-left p-3 hover:bg-blue-50/60 transition-colors flex items-start justify-between gap-2 cursor-pointer"
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-slate-900 text-xs">{b.bookingNumber}</span>
                                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${getStatusBadgeClass(b.status || '')}`}>
                                        {b.status}
                                      </span>
                                    </div>
                                    <div className="text-xs text-slate-700 font-medium">
                                      {b.customer?.fullName || b.customerName || 'Pelanggan'}
                                      {b.customer?.phoneNumber ? ` • ${b.customer.phoneNumber}` : ''}
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                      {b.brand?.name ? `${b.brand.name} - ` : ''}{b.deviceName || 'Perangkat'}
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <div className="text-xs font-semibold text-slate-900">
                                      {b.estimatedCost ? formatRupiah(Number(b.estimatedCost)) : '-'}
                                    </div>
                                  </div>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Biaya Jasa Servis</label>
                  <div className="relative flex rounded-lg border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white overflow-hidden transition-all">
                    <span className="px-3 py-2 text-xs font-bold text-slate-500 bg-slate-100 border-r border-slate-200 flex items-center select-none">
                      Rp
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatRupiahInput(invoiceForm.serviceCost)}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, serviceCost: parseRupiahInput(e.target.value) })}
                      className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none font-semibold text-slate-900 text-right"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Biaya Sparepart</label>
                  <div className="relative flex rounded-lg border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white overflow-hidden transition-all">
                    <span className="px-3 py-2 text-xs font-bold text-slate-500 bg-slate-100 border-r border-slate-200 flex items-center select-none">
                      Rp
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatRupiahInput(invoiceForm.sparepartCost)}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, sparepartCost: parseRupiahInput(e.target.value) })}
                      className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none font-semibold text-slate-900 text-right"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Diskon</label>
                  <div className="relative flex rounded-lg border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white overflow-hidden transition-all">
                    <span className="px-3 py-2 text-xs font-bold text-slate-500 bg-slate-100 border-r border-slate-200 flex items-center select-none">
                      Rp
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatRupiahInput(invoiceForm.discount)}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, discount: parseRupiahInput(e.target.value) })}
                      className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none font-semibold text-slate-900 text-right"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">PPN</label>
                  <div className="relative flex rounded-lg border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white overflow-hidden transition-all">
                    <span className="px-3 py-2 text-xs font-bold text-slate-500 bg-slate-100 border-r border-slate-200 flex items-center select-none">
                      Rp
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatRupiahInput(invoiceForm.tax)}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, tax: parseRupiahInput(e.target.value) })}
                      className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none font-semibold text-slate-900 text-right"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Total Calculation Breakdown */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal (Jasa + Sparepart):</span>
                  <span className="font-semibold text-slate-800">{formatRupiah(invoiceForm.serviceCost + invoiceForm.sparepartCost)}</span>
                </div>
                {invoiceForm.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Potongan Diskon:</span>
                    <span className="font-semibold">-{formatRupiah(invoiceForm.discount)}</span>
                  </div>
                )}
                {invoiceForm.tax > 0 && (
                  <div className="flex justify-between text-amber-600 font-medium">
                    <span>PPN Tambahan:</span>
                    <span className="font-semibold">+{formatRupiah(invoiceForm.tax)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-bold pt-2 border-t border-slate-200 text-sm">
                  <span>Total Tagihan Invoice:</span>
                  <span className="text-blue-600 text-base">{formatRupiah(Math.max(0, invoiceForm.serviceCost + invoiceForm.sparepartCost - invoiceForm.discount + invoiceForm.tax))}</span>
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

      {/* Record Payment Modal */}
      <RecordPaymentModal
        isOpen={isRecordPaymentOpen}
        onClose={() => {
          setIsRecordPaymentOpen(false);
          setSelectedInvoiceForPayment(null);
        }}
        invoice={selectedInvoiceForPayment}
        onSuccess={() => {
          fetchData();
        }}
      />

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedProofImage} alt="Bukti Bayar" className="max-h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

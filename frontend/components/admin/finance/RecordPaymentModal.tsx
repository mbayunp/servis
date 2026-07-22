import React, { useState, useEffect } from 'react';
import { X, CreditCard, DollarSign, Calendar, FileText, AlertCircle } from 'lucide-react';
import api from '../../../lib/axios';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: {
    id: string;
    invoiceNumber: string;
    total: number;
    bookingId?: string;
  } | null;
  onSuccess: () => void;
}

export function RecordPaymentModal({ isOpen, onClose, invoice, onSuccess }: RecordPaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Transfer Bank BCA' | 'QRIS'>('Cash');
  const [amount, setAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (invoice) {
      setAmount(Number(invoice.total) || 0);
      const today = new Date().toISOString().split('T')[0];
      setPaymentDate(today);
      setPaymentMethod('Cash');
      setNotes('');
      setError('');
    }
  }, [invoice]);

  if (!isOpen || !invoice) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setError('Nominal pembayaran harus lebih dari 0');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post(`/invoices/${invoice.id}/payments`, {
        paymentMethod,
        amount: Number(amount),
        paymentDate,
        notes
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Failed to record payment:', err);
      setError(err.response?.data?.message || 'Gagal mencatat pembayaran');
    } finally {
      setLoading(false);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-150">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Catat Pembayaran</h3>
              <p className="text-xs text-slate-500">Invoice: <span className="font-semibold text-blue-600">{invoice.invoiceNumber}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Tagihan Total Info Box */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium">Total Tagihan:</span>
            <span className="text-lg font-extrabold text-slate-900">{formatRupiah(invoice.total || 0)}</span>
          </div>

          {/* Metode Pembayaran */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Metode Pembayaran *</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Cash', label: 'Cash' },
                { id: 'Transfer Bank BCA', label: 'BCA' },
                { id: 'QRIS', label: 'QRIS' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    paymentMethod === m.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nominal Pembayaran */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Nominal Diterima *
            </label>
            <div className="relative flex rounded-lg border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white overflow-hidden transition-all">
              <span className="px-3 py-2 text-xs font-bold text-slate-500 bg-slate-100 border-r border-slate-200 flex items-center select-none">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                required
                value={formatRupiahInput(amount)}
                onChange={(e) => setAmount(parseRupiahInput(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none font-semibold text-slate-900 text-right"
                placeholder="0"
              />
            </div>
          </div>

          {/* Tanggal Bayar */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Tanggal Pembayaran *
            </label>
            <input
              type="date"
              required
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Catatan / Nomor Referensi */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Catatan / Ref Transaksi (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Ref BCA 883921 / Lunas tunai"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 rounded-lg shadow-sm transition-all inline-flex items-center gap-1.5"
            >
              <DollarSign className="h-4 w-4" />
              {loading ? 'Menyimpan...' : 'Simpan Pembayaran'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

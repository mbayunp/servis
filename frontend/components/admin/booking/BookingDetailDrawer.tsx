'use client';

import React from 'react';
import { X, Printer, User, Wrench, Monitor, DollarSign, FileText } from 'lucide-react';
import { getImageUrl } from '../../../lib/utils';

interface PhotoData {
  id?: string;
  photoUrl?: string;
  filename?: string;
  photo?: string;
  type?: string;
  category?: string;
  notes?: string;
  caption?: string;
  description?: string;
}

interface InvoiceData {
  id?: string;
  invoiceNumber?: string;
  serviceCost?: number | string;
  sparepartCost?: number | string;
  total?: number | string;
  totalAmount?: number | string;
  amount?: number | string;
  status?: string;
}

interface BookingDetailData {
  id?: string;
  bookingNumber?: string;
  createdAt?: string;
  status?: string;
  deviceName?: string;
  serialNumber?: string;
  accessories?: string;
  complaint?: string;
  diagnosis?: string;
  address?: string;
  serviceFee?: number | string;
  serviceCost?: number | string;
  sparepartFee?: number | string;
  sparepartCost?: number | string;
  finalCost?: number | string;
  estimatedCost?: number | string;
  customer?: {
    fullName?: string;
    name?: string;
    phoneNumber?: string;
    phone?: string;
    address?: string;
  };
  deviceType?: { name?: string };
  serviceCategory?: { name?: string };
  brand?: { name?: string };
  technician?: { name?: string };
  invoice?: InvoiceData | null;
  invoices?: InvoiceData[];
  photos?: PhotoData[];
  beforePhotos?: PhotoData[];
  afterPhotos?: PhotoData[];
}

interface BookingDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingDetailData | null;
}

export function BookingDetailDrawer({ isOpen, onClose, booking }: BookingDetailDrawerProps) {
  if (!isOpen || !booking) return null;

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toUpperCase().replace(/\s+/g, '_')) {
      case 'PENDING':
      case 'RECEIVED':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'CHECKING':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'WAITING_APPROVAL':
        return 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
      case 'REPAIRING':
      case 'QC':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'FINISHED':
      case 'DELIVERED':
      case 'PICKED_UP':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
      case 'CANCELLED':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const invoice = booking.invoice || (booking.invoices && booking.invoices[0]) || null;
  const serviceFee = Number(invoice?.serviceCost ?? booking.serviceFee ?? booking.serviceCost ?? 0);
  const sparepartFee = Number(invoice?.sparepartCost ?? booking.sparepartFee ?? booking.sparepartCost ?? 0);
  const actualTotal = serviceFee + sparepartFee;

  let displayTotal = 0;
  if (invoice && (invoice.total !== undefined || invoice.totalAmount !== undefined || invoice.amount !== undefined)) {
    displayTotal = Number(invoice.total ?? invoice.totalAmount ?? invoice.amount ?? 0);
  } else if (actualTotal > 0) {
    displayTotal = actualTotal;
  } else if (booking.finalCost !== undefined && booking.finalCost !== null && Number(booking.finalCost) > 0) {
    displayTotal = Number(booking.finalCost);
  } else {
    displayTotal = Number(booking.estimatedCost || 0);
  }

  const allPhotos = booking.photos || [];
  const beforePhotos = (booking.beforePhotos && booking.beforePhotos.length > 0)
    ? booking.beforePhotos
    : allPhotos.filter((p: PhotoData) => p.type?.toUpperCase() === 'BEFORE' || p.category?.toUpperCase() === 'BEFORE');

  const afterPhotos = (booking.afterPhotos && booking.afterPhotos.length > 0)
    ? booking.afterPhotos
    : allPhotos.filter((p: PhotoData) => p.type?.toUpperCase() === 'AFTER' || p.category?.toUpperCase() === 'AFTER');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Dialog Content Box */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-100 my-auto overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* STICKY HEADER */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/30 border border-indigo-500/40 rounded-xl">
              <FileText className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-wide font-mono text-white">
                  {booking.bookingNumber}
                </h2>
                <span className={`px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full border ${getStatusBadge(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Terdaftar: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* MODAL BODY (SCROLLABLE 2 COLUMNS) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* LEFT COLUMN: Customer Info & Device Info */}
            <div className="space-y-6">
              
              {/* Customer Info Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <User className="h-4 w-4 text-indigo-600" /> Informasi Kustomer
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Nama Lengkap</span>
                    <span className="font-bold text-slate-900">{booking.customer?.fullName || booking.customer?.name || '-'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">No. HP / Telepon</span>
                    <span className="font-semibold text-slate-800">{booking.customer?.phoneNumber || booking.customer?.phone || '-'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Alamat</span>
                    <span className="text-slate-700 leading-relaxed">{booking.customer?.address || booking.address || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Device Details Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Monitor className="h-4 w-4 text-indigo-600" /> Detail Perangkat &amp; Keluhan
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block font-medium">Tipe / Kategori</span>
                      <span className="font-semibold text-slate-900">{booking.deviceType?.name || booking.serviceCategory?.name || '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Merk / Brand</span>
                      <span className="font-semibold text-slate-900">{booking.brand?.name || '-'}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block font-medium">Nama Unit / Model</span>
                      <span className="font-semibold text-slate-900">{booking.deviceName || '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">No. Seri (SN)</span>
                      <span className="font-mono text-slate-700">{booking.serialNumber || '-'}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Kelengkapan</span>
                    <span className="text-slate-700">{booking.accessories || '-'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Keluhan Masalah</span>
                    <span className="text-slate-900 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200 block mt-1">
                      {booking.complaint || '-'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Progress/Fees, Technician, Photos */}
            <div className="space-y-6">
              
              {/* Technician & Diagnosis Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Wrench className="h-4 w-4 text-indigo-600" /> Teknisi &amp; Hasil Diagnosa
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Teknisi Penanggung Jawab</span>
                    <span className="font-bold text-slate-900">
                      {booking.technician?.name || <span className="text-amber-600 font-medium italic">Belum Ditugaskan</span>}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Hasil Diagnosa Teknisi</span>
                    <span className="text-slate-800 leading-relaxed bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60 block mt-1">
                      {booking.diagnosis || 'Belum ada catatan diagnosa.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial & Cost Summary Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <DollarSign className="h-4 w-4 text-indigo-600" /> Rincian Biaya &amp; Estimasi
                </h3>
                <div className="space-y-1.5 text-xs">
                  {serviceFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Biaya Jasa</span>
                      <span className="font-semibold text-slate-900">{formatRupiah(serviceFee)}</span>
                    </div>
                  )}
                  {sparepartFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Biaya Sparepart</span>
                      <span className="font-semibold text-slate-900">{formatRupiah(sparepartFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm">
                    <span className="font-bold text-slate-900">Total Biaya</span>
                    <span className="font-black text-indigo-600 text-base">{formatRupiah(displayTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Repair Photos Gallery */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                  Dokumentasi Foto Perbaikan
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Foto Sebelum (Before)</span>
                    {beforePhotos.length > 0 ? (
                      <div className="grid grid-cols-1 gap-2.5">
                        {beforePhotos.map((p: PhotoData) => (
                          <div key={p.id || p.photoUrl} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex flex-col">
                            <div className="h-28 bg-slate-100 overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={getImageUrl(p.photoUrl || p.filename || p.photo)}
                                alt="Before"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop';
                                }}
                              />
                            </div>
                            <div className="p-2 text-xs bg-white border-t border-slate-100">
                              <span className="text-[9px] font-bold uppercase text-slate-400 block tracking-wider">Catatan:</span>
                              <p className="text-[11px] font-medium text-slate-800 leading-snug">
                                {p.notes || p.caption || p.description || 'Kondisi awal perangkat.'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">Belum ada foto</p>
                    )}
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Foto Sesudah (After)</span>
                    {afterPhotos.length > 0 ? (
                      <div className="grid grid-cols-1 gap-2.5">
                        {afterPhotos.map((p: PhotoData) => (
                          <div key={p.id || p.photoUrl} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex flex-col">
                            <div className="h-28 bg-slate-100 overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={getImageUrl(p.photoUrl || p.filename || p.photo)}
                                alt="After"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop';
                                }}
                              />
                            </div>
                            <div className="p-2 text-xs bg-white border-t border-slate-100">
                              <span className="text-[9px] font-bold uppercase text-slate-400 block tracking-wider">Catatan:</span>
                              <p className="text-[11px] font-medium text-slate-800 leading-snug">
                                {p.notes || p.caption || p.description || 'Hasil setelah perbaikan.'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">Belum ada foto</p>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* PRIMARY ACTIONS FOOTER */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
          >
            Tutup
          </button>

          <a
            href={`/admin/booking/${booking.id}/receipt`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            Cetak Nota Servis
          </a>
        </div>

      </div>
    </div>
  );
}

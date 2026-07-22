'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, ArrowLeft, RefreshCw, AlertCircle, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import api from '../../../../../lib/axios';

interface InvoiceData {
  id?: string;
  invoiceNumber?: string;
  subtotal?: number | string;
  serviceCost?: number | string;
  sparepartCost?: number | string;
  discount?: number | string;
  tax?: number | string;
  total?: number | string;
  totalAmount?: number | string;
  amount?: number | string;
  status?: string;
}

interface BookingData {
  id?: string;
  bookingNumber?: string;
  createdAt?: string;
  estimatedFinish?: string;
  customer?: {
    fullName?: string;
    name?: string;
    phoneNumber?: string;
    phone?: string;
    address?: string;
  };
  address?: string;
  deviceType?: { name?: string };
  serviceCategory?: { name?: string };
  brand?: { name?: string };
  deviceName?: string;
  serialNumber?: string;
  accessories?: string;
  complaint?: string;
  diagnosis?: string;
  status?: string;
  paymentStatus?: string;
  estimatedCost?: number | string;
  finalCost?: number | string;
  serviceFee?: number | string;
  serviceCost?: number | string;
  sparepartFee?: number | string;
  sparepartCost?: number | string;
  warrantyDays?: number | string;
  invoice?: InvoiceData | null;
  invoices?: InvoiceData[];
}

export default function ServiceReceiptPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;
  const receiptRef = useRef<HTMLDivElement>(null);

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchBookingDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/bookings/${bookingId}`);
        setBooking(res.data.data);
      } catch (err: unknown) {
        console.error('Failed to fetch booking:', err);
        const errorObj = err as { response?: { data?: { message?: string } } };
        setError(errorObj.response?.data?.message || 'Gagal memuat data nota servis.');
      } finally {
        setLoading(false);
      }
    };

    if (!bookingId) return;
    fetchBookingDetail();
  }, [bookingId]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const formatCurrency = (val?: number | string | null) => {
    if (!val || Number(val) === 0) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(Number(val));
  };

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      if (window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host)) {
        router.back();
      } else {
        router.push('/admin/booking');
      }
    } else {
      router.push('/admin/booking');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(receiptRef.current, { cacheBust: true, quality: 0.95 });
      const link = document.createElement('a');
      link.download = `Nota-${booking?.bookingNumber || 'Servis'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export receipt to image:', err);
      alert('Gagal mengunduh gambar nota. Silakan coba lagi.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
        <RefreshCw className="h-8 w-8 text-red-600 animate-spin mb-2" />
        <p className="text-sm font-medium text-slate-600">Menyiapkan Nota Servis...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 text-center max-w-sm w-full">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900">Nota Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">{error || 'Data servis tidak dapat dimuat.'}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg cursor-pointer"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const customerName = booking.customer?.fullName || booking.customer?.name || '-';
  const customerPhone = booking.customer?.phoneNumber || booking.customer?.phone || '-';
  const customerAddress = booking.customer?.address || booking.address || '-';

  const itemType = booking.deviceType?.name || booking.serviceCategory?.name || 'Elektronik';
  const brandModel = `${booking.brand?.name || ''} ${booking.deviceName || ''}`.trim() || '-';
  const serialNumber = booking.serialNumber || '-';
  const accessories = booking.accessories || '-';
  const complaint = booking.complaint || '-';
  
  const diagnosis = booking.diagnosis || 'Pengecekan Awal';
  const status = booking.status || 'PENDING';
  const warrantyDays = booking.warrantyDays || 30;

  // Invoice & Costs Synchronization Logic
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

  const isPaid = (
    booking.paymentStatus?.toUpperCase() === 'PAID' ||
    invoice?.status?.toUpperCase() === 'PAID'
  );

  const trackingUrl = `https://servicecianjur.id/tracking/${booking.id || booking.bookingNumber}`;

  return (
    <div className="w-full flex flex-col justify-center items-center py-8 bg-slate-100 min-h-screen print:p-0 print:bg-white select-none">
      <style>{`
        @media print {
          @page { 
            size: A4 landscape; 
            margin: 0; 
          }
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
            background: white !important;
          }
          .print\\:hidden { 
            display: none !important; 
          }
        }
      `}</style>
      
      {/* Top Action Navigation Bar (Hidden on Print) */}
      <div className="w-full max-w-[297mm] mb-4 flex flex-wrap justify-between items-center gap-3 print:hidden">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
          >
            <Download className="h-4 w-4 text-blue-600" />
            {downloading ? 'Mengunduh...' : 'Unduh Gambar (PNG)'}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            Cetak Nota (Print)
          </button>
        </div>
      </div>

      {/* Printable Receipt Paper Sheet (A4 Landscape 2-Column Layout) */}
      <div
        ref={receiptRef}
        id="receipt-paper"
        className="w-[297mm] min-h-[210mm] max-w-full mx-auto bg-white p-8 border border-slate-300 shadow-xl print:shadow-none print:border-none font-mono text-slate-900 text-xs leading-relaxed overflow-hidden"
      >
        <div className="grid grid-cols-12 gap-8 h-full">
          
          {/* LEFT SIDE (Col Span 7 - Detail Nota) */}
          <div className="col-span-7 space-y-3 flex flex-col justify-between border-r border-slate-200 pr-6">
            
            {/* Header Section */}
            <div className="space-y-0.5 border-b border-slate-300 pb-2">
              <div className="text-xl font-black text-black tracking-wide">SERVIS CIANJUR</div>
              <div className="text-[11px] font-semibold text-slate-700">Spesialis Service TV, Laptop, HP &amp; Elektronik</div>
              <div className="text-[10px] text-slate-600">Kp. Sinagar No.43, Karang Tengah | WA: 0812-3456-7890</div>
            </div>

            {/* Metadata Section */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 py-1 border-b border-dashed border-slate-300 text-[11px]">
              <div><span className="font-bold">No. Service</span>: <strong className="text-black font-extrabold">{booking.bookingNumber}</strong></div>
              {invoice?.invoiceNumber && (
                <div><span className="font-bold">No. Invoice</span>: <strong className="text-blue-900 font-extrabold">{invoice.invoiceNumber}</strong></div>
              )}
              <div><span>Tanggal Terima</span>: {formatDate(booking.createdAt)}</div>
              <div><span>Estimasi Selesai</span>: {formatDate(booking.estimatedFinish)}</div>
            </div>

            {/* Customer Info */}
            <div className="space-y-0.5 border-b border-dashed border-slate-300 pb-2 text-[11px]">
              <div className="font-bold underline uppercase tracking-wider text-[10px] text-slate-700">INFORMASI PELANGGAN</div>
              <div className="flex justify-between">
                <span className="w-24 shrink-0 text-slate-600">Nama</span>
                <span className="flex-1 font-semibold">: {customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-24 shrink-0 text-slate-600">No. HP</span>
                <span className="flex-1">: {customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-24 shrink-0 text-slate-600">Alamat</span>
                <span className="flex-1 truncate">: {customerAddress}</span>
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-0.5 border-b border-dashed border-slate-300 pb-2 text-[11px]">
              <div className="font-bold underline uppercase tracking-wider text-[10px] text-slate-700">DETAIL BARANG &amp; KELUHAN</div>
              <div className="flex justify-between">
                <span className="w-24 shrink-0 text-slate-600">Barang</span>
                <span className="flex-1 font-semibold">: {itemType}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-24 shrink-0 text-slate-600">Merk/Model</span>
                <span className="flex-1">: {brandModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-24 shrink-0 text-slate-600">No. Seri (SN)</span>
                <span className="flex-1">: {serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-24 shrink-0 text-slate-600">Kelengkapan</span>
                <span className="flex-1">: {accessories}</span>
              </div>
              <div className="flex justify-between">
                <span className="w-24 shrink-0 text-slate-600">Keluhan</span>
                <span className="flex-1 font-medium text-slate-900">: {complaint}</span>
              </div>
            </div>

            {/* Status & Financial Breakdown */}
            <div className="space-y-1 border-b border-dashed border-slate-300 pb-2 text-[11px]">
              <div className="font-bold underline uppercase tracking-wider text-[10px] text-slate-700">STATUS &amp; RINCIAN BIAYA</div>
              <div className="flex justify-between">
                <span className="w-24 shrink-0 text-slate-600">Diagnosa</span>
                <span className="flex-1">: {diagnosis}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="w-24 shrink-0 text-slate-600">Status Unit</span>
                <span className="flex-1 font-bold uppercase flex items-center gap-2">
                  : {status}
                  {isPaid && (
                    <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-black text-white rounded border border-black uppercase tracking-wider">
                      [ LUNAS ]
                    </span>
                  )}
                </span>
              </div>

              {serviceFee > 0 && (
                <div className="flex justify-between">
                  <span className="w-24 shrink-0 text-slate-600">Biaya Jasa</span>
                  <span className="flex-1">: {formatCurrency(serviceFee)}</span>
                </div>
              )}
              {sparepartFee > 0 && (
                <div className="flex justify-between">
                  <span className="w-24 shrink-0 text-slate-600">Sparepart</span>
                  <span className="flex-1">: {formatCurrency(sparepartFee)}</span>
                </div>
              )}

              <div className="flex justify-between pt-1 border-t border-slate-300">
                <span className="w-24 shrink-0 font-extrabold">Total Biaya</span>
                <span className="flex-1 font-black text-black text-sm">: {formatCurrency(displayTotal)}</span>
              </div>

              {isPaid ? (
                <div className="mt-1 py-1 px-2 bg-slate-100 border border-slate-400 text-center rounded text-[10px] font-black tracking-widest uppercase">
                  === PEMBAYARAN TELAH LUNAS ===
                </div>
              ) : (
                <div className="text-[9px] italic text-slate-500 mt-0.5">
                  *Biaya akhir disesuaikan dengan tindakan servis &amp; replacement sparepart.
                </div>
              )}
            </div>

            {/* Warranty & TOS Terms */}
            <div className="text-[10px] space-y-0.5 text-slate-700 border-b border-dashed border-slate-300 pb-2">
              <div className="font-bold underline uppercase text-[9px]">GARANSI &amp; KETENTUAN</div>
              <div>• Masa Garansi: <strong>{warrantyDays} Hari</strong> (Hanya untuk kerusakan &amp; komponen sama).</div>
              <div>• Syarat Klaim: Segel utuh, nota dibawa, unit tidak terkena air/jatuh/terbakar.</div>
              <div>• Barang tidak diambil dalam 30 hari di luar tanggung jawab pihak workshop.</div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-4 text-center text-[10px] pt-1">
              <div className="flex flex-col justify-between h-16">
                <div>Pelanggan,</div>
                <div className="font-bold underline">( {customerName} )</div>
              </div>
              <div className="flex flex-col justify-between h-16">
                <div>Penerima / Admin,</div>
                <div className="font-bold underline">( Servis Cianjur )</div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE (Col Span 5 - Tracking Status Online) */}
          <div className="col-span-5 flex flex-col justify-between items-center text-center p-6 bg-slate-50/70 border-2 border-slate-900 rounded-2xl space-y-4">
            
            <div>
              <div className="text-base font-black uppercase text-slate-900 tracking-wider underline">
                TRACKING STATUS ONLINE
              </div>
              <p className="text-[11px] text-slate-600 mt-2 leading-snug">
                Scan QR Code di bawah untuk memantau progres perbaikan unit Anda secara real-time dari HP:
              </p>
            </div>

            {/* Large QR Code */}
            <div className="p-4 bg-white border-2 border-black rounded-2xl shadow-md inline-block my-2">
              <QRCodeSVG
                value={trackingUrl}
                size={180}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="M"
              />
            </div>

            {/* URL Link */}
            <div className="space-y-1">
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">URL Tracking Resmi:</div>
              <div className="text-xs font-bold text-blue-900 underline break-all bg-white px-3 py-1.5 rounded-lg border border-slate-300">
                servicecianjur.id/tracking/{booking.bookingNumber}
              </div>
            </div>

            {/* Info Box */}
            <div className="w-full text-left p-3 bg-white border border-slate-300 rounded-xl space-y-1 text-[10px] text-slate-600">
              <div className="font-bold text-slate-900 flex items-center gap-1">
                <span>💡 Petunjuk Penggunaan QR Code:</span>
              </div>
              <div>1. Buka aplikasi Kamera HP atau Scanner QR.</div>
              <div>2. Arahkan kamera ke gambar QR Code di atas.</div>
              <div>3. Klik link yang muncul untuk melihat status perbaikan &amp; rincian foto.</div>
            </div>

            {/* Small Footer Branding */}
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
              • SERVIS CIANJUR OFFICIAL RECEIPT •
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

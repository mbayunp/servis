'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import api from '../../../../../lib/axios';

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
  estimatedCost?: number | string;
  warrantyDays?: number | string;
}

export default function ServiceReceiptPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handlePrint = () => {
    window.print();
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
            onClick={() => router.back()}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg"
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
  const estimatedCost = booking.estimatedCost;
  const warrantyDays = booking.warrantyDays || 30;

  const trackingUrl = `https://servicecianjur.id/track/${booking.id || booking.bookingNumber}`;

  return (
    <div className="min-h-screen bg-slate-200 print:bg-white p-4 sm:p-8 flex flex-col items-center justify-start select-none">
      <style>{`
        @media print {
          @page { 
            size: A4 portrait; 
            margin: 10mm; 
          }
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
          }
        }
      `}</style>
      {/* Top Action Navigation Bar (Hidden on Print) */}
      <div className="w-full max-w-lg mb-4 flex justify-between items-center print:hidden">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Printer className="h-4 w-4" />
          Cetak Nota (Print)
        </button>
      </div>

      {/* Printable Receipt Paper Sheet */}
      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-none sm:rounded-2xl shadow-xl print:shadow-none border border-slate-300 print:border-none font-mono text-slate-900 text-xs leading-relaxed">
        
        {/* HEADER SECTION */}
        <div className="text-center font-semibold uppercase tracking-wider space-y-0.5 pb-2">
          <div className="text-base font-extrabold text-slate-900 tracking-widest">
            ======================================================
          </div>
          <div className="text-lg font-black text-black">SERVIS CIANJUR</div>
          <div className="text-[11px] font-medium text-slate-700">Spesialis Service TV & Elektronik</div>
          <div className="text-[10px] text-slate-600">Kp. Sinagar No.43, Karang Tengah</div>
          <div className="text-[10px] text-slate-600">WA : 0812-3456-7890</div>
          <div className="text-base font-extrabold text-slate-900 tracking-widest">
            ======================================================
          </div>
        </div>

        {/* METADATA SECTION */}
        <div className="py-2 border-b border-dashed border-slate-400 space-y-1">
          <div className="flex justify-between">
            <span className="font-bold">No Service</span>
            <span>: <strong className="font-black text-black">{booking.bookingNumber}</strong></span>
          </div>
          <div className="flex justify-between">
            <span>Tanggal Terima</span>
            <span>: {formatDate(booking.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimasi Selesai</span>
            <span>: {formatDate(booking.estimatedFinish)}</span>
          </div>
        </div>

        {/* INFORMASI PELANGGAN */}
        <div className="py-2 border-b border-dashed border-slate-400 space-y-1">
          <div className="font-bold text-center underline uppercase tracking-wider mb-1.5">INFORMASI PELANGGAN</div>
          <div className="flex justify-between">
            <span className="w-24 shrink-0">Nama</span>
            <span className="flex-1 font-semibold">: {customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-24 shrink-0">No HP</span>
            <span className="flex-1">: {customerPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-24 shrink-0">Alamat</span>
            <span className="flex-1">: {customerAddress}</span>
          </div>
        </div>

        {/* DETAIL BARANG */}
        <div className="py-2 border-b border-dashed border-slate-400 space-y-1">
          <div className="font-bold text-center underline uppercase tracking-wider mb-1.5">DETAIL BARANG</div>
          <div className="flex justify-between">
            <span className="w-28 shrink-0">Barang</span>
            <span className="flex-1 font-semibold">: {itemType}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-28 shrink-0">Merk / Model</span>
            <span className="flex-1">: {brandModel}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-28 shrink-0">No. Seri (SN)</span>
            <span className="flex-1">: {serialNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-28 shrink-0">Kelengkapan</span>
            <span className="flex-1">: {accessories}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-28 shrink-0">Keluhan</span>
            <span className="flex-1">: {complaint}</span>
          </div>
        </div>

        {/* STATUS & ESTIMASI BIAYA */}
        <div className="py-2 border-b border-dashed border-slate-400 space-y-1">
          <div className="font-bold text-center underline uppercase tracking-wider mb-1.5">STATUS & ESTIMASI BIAYA</div>
          <div className="flex justify-between">
            <span className="w-28 shrink-0">Diagnosa Awal</span>
            <span className="flex-1">: {diagnosis}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-28 shrink-0">Status Saat Ini</span>
            <span className="flex-1 uppercase font-bold">: {status}</span>
          </div>
          <div className="flex justify-between">
            <span className="w-28 shrink-0">Estimasi Biaya</span>
            <span className="flex-1 font-black text-black">: {formatCurrency(estimatedCost)}</span>
          </div>
          <div className="text-[10px] italic text-slate-600 mt-1">
            *Biaya bisa berubah setelah pengecekan mendalam.
          </div>
        </div>

        {/* GARANSI & KETENTUAN LENGKAP */}
        <div className="py-2 border-b border-dashed border-slate-400 space-y-1 text-[11px]">
          <div className="font-bold text-center underline uppercase tracking-wider mb-1.5">GARANSI & KETENTUAN LENGKAP</div>
          <div>Masa Garansi : <strong>{warrantyDays} Hari</strong></div>
          <div>Syarat Klaim: Segel utuh, tidak kena air/jatuh, hanya untuk kerusakan yang sama.</div>
          <div>Ketentuan: Barang tidak diambil dalam 30 hari di luar tanggung jawab kami.</div>
        </div>

        {/* TRACKING STATUS ONLINE */}
        <div className="py-3 border-b border-dashed border-slate-400 text-center space-y-2">
          <div className="font-bold underline uppercase tracking-wider">TRACKING STATUS ONLINE</div>
          <div className="text-[10px] text-slate-600">Scan QR Code di bawah untuk memantau status secara real-time:</div>
          
          <div className="flex justify-center py-1">
            <div className="p-2 bg-white border-2 border-black rounded-lg inline-block">
              <QRCodeSVG
                value={trackingUrl}
                size={110}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="M"
              />
            </div>
          </div>

          <div className="text-[10px] font-semibold">
            Atau kunjungi: <span className="underline">servicecianjur.id/track/{booking.bookingNumber}</span>
          </div>
        </div>

        {/* SIGNATURE SECTION */}
        <div className="pt-6 pb-2 grid grid-cols-2 gap-4 text-center text-[11px]">
          <div className="flex flex-col justify-between h-24">
            <div>Pelanggan,</div>
            <div className="font-bold underline">( {customerName} )</div>
          </div>

          <div className="flex flex-col justify-between h-24">
            <div>Penerima / Admin,</div>
            <div className="font-bold underline">( Servis Cianjur )</div>
          </div>
        </div>

        {/* FOOTER BORDER */}
        <div className="text-center font-extrabold text-slate-900 tracking-widest pt-2">
          ======================================================
        </div>
      </div>
    </div>
  );
}

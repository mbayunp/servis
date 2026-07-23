import React from 'react';
import { Edit, Eye, Trash2, Camera, UserCheck, Activity, Printer } from 'lucide-react';

export interface BookingItem {
  [key: string]: unknown;
  id: string;
  bookingNumber: string;
  createdAt: string;
  status: string;
  deviceName?: string;
  complaint?: string;
  estimatedCost?: number;
  customer?: {
    fullName?: string;
    name?: string;
    phoneNumber?: string;
    phone?: string;
  };
  brand?: {
    name?: string;
  };
  technician?: {
    name?: string;
  };
}

interface BookingTableProps {
  bookings: BookingItem[];
  loading: boolean;
  onView: (id: string) => void;
  onEdit: (booking: BookingItem) => void;
  onDelete: (id: string) => void;
  onAssignTechnician: (booking: BookingItem) => void;
  onUpdateStatus: (booking: BookingItem) => void;
  onUploadPhoto: (booking: BookingItem) => void;
}

export function BookingTable({
  bookings,
  loading,
  onView,
  onEdit,
  onDelete,
  onAssignTechnician,
  onUpdateStatus,
  onUploadPhoto,
}: BookingTableProps) {
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  const getBookingCost = (booking: BookingItem) => {
    const invoice = (booking.invoice as Record<string, unknown>) || (Array.isArray(booking.invoices) && (booking.invoices[0] as Record<string, unknown>)) || null;
    const serviceFee = Number(invoice?.serviceCost ?? booking.serviceFee ?? booking.serviceCost ?? 0);
    const sparepartFee = Number(invoice?.sparepartCost ?? booking.sparepartFee ?? booking.sparepartCost ?? 0);
    const actualTotal = serviceFee + sparepartFee;

    if (invoice && (invoice.total !== undefined || invoice.totalAmount !== undefined || invoice.amount !== undefined)) {
      const val = Number(invoice.total ?? invoice.totalAmount ?? invoice.amount ?? 0);
      if (val > 0) return val;
    }
    if (actualTotal > 0) return actualTotal;
    if (booking.finalCost !== undefined && booking.finalCost !== null && Number(booking.finalCost) > 0) {
      return Number(booking.finalCost);
    }
    if (booking.estimatedCost !== undefined && booking.estimatedCost !== null && Number(booking.estimatedCost) > 0) {
      return Number(booking.estimatedCost);
    }
    return 0;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">Pending</span>;
      case 'Checking':
        return <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Checking</span>;
      case 'Repairing':
        return <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Repairing</span>;
      case 'Finished':
        return <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Finished</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>;
      default:
        return <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-xl border border-gray-100 p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-xl border border-gray-100 p-12 text-center">
        <p className="text-gray-500 font-medium">Tidak ada data booking yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Card View (Tampil di smartphone/layar kecil) */}
      <div className="block md:hidden space-y-4">
        {bookings.map((booking) => {
          const cost = getBookingCost(booking);
          const customerName = booking.customer?.fullName || booking.customer?.name || '-';
          const customerPhone = booking.customer?.phoneNumber || booking.customer?.phone || '-';

          return (
            <div key={booking.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold text-gray-900 text-base">{booking.bookingNumber}</span>
                  <p className="text-xs text-gray-500">{new Date(booking.createdAt).toLocaleDateString('id-ID')}</p>
                </div>
                <div>{getStatusBadge(booking.status)}</div>
              </div>

              <div className="border-t border-b border-gray-100 py-2.5 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Pelanggan:</span>
                  <span className="font-medium text-gray-900 text-right">{customerName} ({customerPhone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Perangkat:</span>
                  <span className="font-medium text-gray-900 text-right">{booking.brand?.name} {booking.deviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Teknisi:</span>
                  <span className="font-medium text-gray-900 text-right">{booking.technician?.name || <em className="text-gray-400">Belum di-assign</em>}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Biaya/Est.:</span>
                  <span className="font-semibold text-gray-900 text-right">
                    {cost > 0 ? formatRupiah(cost) : <span className="text-gray-400 font-normal italic">Belum diisi</span>}
                  </span>
                </div>
              </div>

              {/* Action buttons for mobile */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => onUpdateStatus(booking)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Activity className="w-3.5 h-3.5" />
                  Ubah Status
                </button>

                <div className="flex items-center gap-1">
                  <button onClick={() => onView(booking.id)} className="text-slate-600 hover:text-slate-900 p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition" title="Detail"><Eye className="w-4 h-4" /></button>
                  <a href={`/admin/booking/${booking.id}/receipt`} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 p-2 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Cetak Nota Servis"><Printer className="w-4 h-4" /></a>
                  <button onClick={() => onAssignTechnician(booking)} className="text-purple-600 hover:text-purple-800 p-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition" title="Assign Teknisi"><UserCheck className="w-4 h-4" /></button>
                  <button onClick={() => onUploadPhoto(booking)} className="text-teal-600 hover:text-teal-800 p-2 bg-teal-50 hover:bg-teal-100 rounded-lg transition" title="Upload Foto"><Camera className="w-4 h-4" /></button>
                  <button onClick={() => onEdit(booking)} className="text-blue-600 hover:text-blue-800 p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition" title="Edit"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => onDelete(booking.id)} className="text-rose-600 hover:text-rose-800 p-2 bg-rose-50 hover:bg-rose-100 rounded-lg transition" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View (Tampil di tablet/desktop) */}
      <div className="hidden md:block bg-white shadow-sm overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">No. Booking</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Perangkat</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Teknisi</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Est. Biaya</th>
              <th scope="col" className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => {
              const cost = getBookingCost(booking);
              return (
                <tr key={booking.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{booking.bookingNumber}</div>
                    <div className="text-xs text-gray-500">{new Date(booking.createdAt).toLocaleDateString('id-ID')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.customer?.fullName || booking.customer?.name || '-'}</div>
                    <div className="text-xs text-gray-500">{booking.customer?.phoneNumber || booking.customer?.phone || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.brand?.name} {booking.deviceName}</div>
                    <div className="text-xs text-gray-500 truncate max-w-36">{booking.complaint}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.technician?.name || <span className="text-gray-400 italic">Belum di-assign</span>}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {cost > 0 ? formatRupiah(cost) : <span className="text-gray-400 italic font-normal">Belum diisi</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onUpdateStatus(booking)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                        title="Ubah Status Booking"
                      >
                        <Activity className="w-3.5 h-3.5" />
                        Ubah Status
                      </button>

                      <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                        <button onClick={() => onView(booking.id)} className="text-slate-600 hover:text-slate-900 p-1.5 hover:bg-slate-100 rounded-md transition" title="Detail"><Eye className="w-4 h-4" /></button>
                        <a href={`/admin/booking/${booking.id}/receipt`} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded-md transition" title="Cetak Nota Servis"><Printer className="w-4 h-4" /></a>
                        <button onClick={() => onAssignTechnician(booking)} className="text-purple-600 hover:text-purple-800 p-1.5 hover:bg-purple-50 rounded-md transition" title="Assign Teknisi"><UserCheck className="w-4 h-4" /></button>
                        <button onClick={() => onUploadPhoto(booking)} className="text-teal-600 hover:text-teal-800 p-1.5 hover:bg-teal-50 rounded-md transition" title="Upload Foto"><Camera className="w-4 h-4" /></button>
                        <button onClick={() => onEdit(booking)} className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded-md transition" title="Edit"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => onDelete(booking.id)} className="text-rose-600 hover:text-rose-800 p-1.5 hover:bg-rose-50 rounded-md transition" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

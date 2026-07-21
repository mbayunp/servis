import React from 'react';
import { Edit, Eye, Trash2, Camera, UploadCloud, UserCheck, Activity, Printer } from 'lucide-react';

interface BookingTableProps {
  bookings: any[];
  loading: boolean;
  onView: (id: string) => void;
  onEdit: (booking: any) => void;
  onDelete: (id: string) => void;
  onAssignTechnician: (booking: any) => void;
  onUpdateStatus: (booking: any) => void;
  onUploadPhoto: (booking: any) => void;
}

export function BookingTable({
  bookings, loading, onView, onEdit, onDelete, onAssignTechnician, onUpdateStatus, onUploadPhoto
}: BookingTableProps) {

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">Pending</span>;
      case 'Checking': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Checking</span>;
      case 'Repairing': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Repairing</span>;
      case 'Finished': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Finished</span>;
      case 'Cancelled': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>;
      default: return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-100 p-6">
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
      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-100 p-12 text-center">
        <p className="text-gray-500">Tidak ada data booking yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-x-auto sm:rounded-md border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Booking</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perangkat</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teknisi</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Biaya</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{booking.bookingNumber}</div>
                <div className="text-xs text-gray-500">{new Date(booking.createdAt).toLocaleDateString('id-ID')}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{booking.customer?.fullName || booking.customer?.name || '-'}</div>
                <div className="text-xs text-gray-500">{booking.customer?.phoneNumber || booking.customer?.phone || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{booking.brand?.name} {booking.deviceName}</div>
                <div className="text-xs text-gray-500 truncate max-w-[150px]">{booking.complaint}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(booking.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{booking.technician?.name || <span className="text-gray-400 italic">Belum di-assign</span>}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {booking.estimatedCost ? formatRupiah(booking.estimatedCost) : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <button onClick={() => onView(booking.id)} className="text-blue-600 hover:text-blue-900 p-1" title="Detail"><Eye className="w-4 h-4" /></button>
                  <a href={`/admin/booking/${booking.id}/receipt`} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-900 p-1" title="Cetak Nota Servis"><Printer className="w-4 h-4" /></a>
                  <button onClick={() => onUpdateStatus(booking)} className="text-emerald-600 hover:text-emerald-900 p-1" title="Ubah Status"><Activity className="w-4 h-4" /></button>
                  <button onClick={() => onAssignTechnician(booking)} className="text-purple-600 hover:text-purple-900 p-1" title="Assign Teknisi"><UserCheck className="w-4 h-4" /></button>
                  <button onClick={() => onUploadPhoto(booking)} className="text-teal-600 hover:text-teal-900 p-1" title="Upload Foto"><Camera className="w-4 h-4" /></button>
                  <button onClick={() => onEdit(booking)} className="text-indigo-600 hover:text-indigo-900 p-1" title="Edit"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => onDelete(booking.id)} className="text-red-600 hover:text-red-900 p-1" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';
import { X, Printer } from 'lucide-react';

interface BookingDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}

export function BookingDetailDrawer({ isOpen, onClose, booking }: BookingDetailDrawerProps) {
  if (!isOpen || !booking) return null;

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-2xl transform transition-transform">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="bg-blue-600 px-4 py-6 sm:px-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white" id="slide-over-title">Detail Booking: {booking.bookingNumber}</h2>
                  <p className="mt-1 text-sm text-blue-100">Status: {booking.status}</p>
                </div>
                <button
                  type="button"
                  className="rounded-md text-blue-200 hover:text-white focus:outline-none"
                  onClick={onClose}
                >
                  <span className="sr-only">Close panel</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="relative flex-1 px-4 py-6 sm:px-6 bg-gray-50">
                
                {/* Actions */}
                <div className="mb-6 flex space-x-3">
                  <a
                    href={`/admin/booking/${booking.id}/receipt`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-red-200 shadow-sm text-sm font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    <Printer className="-ml-1 mr-2 h-5 w-5" />
                    Cetak Nota Servis
                  </a>
                </div>

                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="bg-white shadow rounded-lg border border-gray-100 p-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Informasi Kustomer</h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.customer?.fullName || booking.customer?.name || '-'}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">No. HP / Telepon</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.customer?.phoneNumber || booking.customer?.phone || '-'}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.customer?.address || '-'}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Device Info */}
                  <div className="bg-white shadow rounded-lg border border-gray-100 p-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Detail Perangkat</h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Tipe Perangkat</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.deviceType?.name || '-'}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Brand</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.brand?.name || '-'}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Nama Unit</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.deviceName || '-'}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Serial Number</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.serialNumber || '-'}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Keluhan</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.complaint || '-'}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Technician & Estimate Info */}
                  <div className="bg-white shadow rounded-lg border border-gray-100 p-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Progres & Estimasi</h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Teknisi Penanggung Jawab</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.technician?.name || 'Belum Ditentukan'}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Kategori Servis</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.serviceCategory?.name || '-'}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Diagnosis Teknisi</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.diagnosis || '-'}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Solusi</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.solution || '-'}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Estimasi Selesai</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.estimatedFinish ? new Date(booking.estimatedFinish).toLocaleString('id-ID') : '-'}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Garansi (Hari)</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.warrantyDays || 0} Hari</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Estimasi Biaya</dt>
                        <dd className="mt-1 text-lg font-bold text-gray-900">{booking.estimatedCost ? formatRupiah(booking.estimatedCost) : '-'}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Total Biaya Akhir</dt>
                        <dd className="mt-1 text-lg font-bold text-green-600">{booking.finalCost ? formatRupiah(booking.finalCost) : '-'}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Photos */}
                  <div className="bg-white shadow rounded-lg border border-gray-100 p-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Galeri Kondisi Perangkat</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Sebelum Servis (Before)</h4>
                        {booking.beforePhotos && booking.beforePhotos.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2">
                            {booking.beforePhotos.map((p: any) => (
                              <img key={p.id} src={`http://localhost:5000${p.photoUrl}`} alt="Before" className="w-full h-24 object-cover rounded shadow-sm border" />
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 italic">Tidak ada foto</p>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Sesudah Servis (After)</h4>
                        {booking.afterPhotos && booking.afterPhotos.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2">
                            {booking.afterPhotos.map((p: any) => (
                              <img key={p.id} src={`http://localhost:5000${p.photoUrl}`} alt="After" className="w-full h-24 object-cover rounded shadow-sm border" />
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 italic">Tidak ada foto</p>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

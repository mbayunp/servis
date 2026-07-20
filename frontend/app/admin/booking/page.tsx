'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Filter, RefreshCw } from 'lucide-react';
import api from '../../../lib/axios';
import { BookingTable } from '../../../components/admin/booking/BookingTable';
import { BookingDetailDrawer } from '../../../components/admin/booking/BookingDetailDrawer';
import { BookingFormModal } from '../../../components/admin/booking/BookingFormModal';
import { AssignTechnicianModal } from '../../../components/admin/booking/AssignTechnicianModal';
import { UpdateStatusModal } from '../../../components/admin/booking/UpdateStatusModal';
import { UploadPhotoModal } from '../../../components/admin/booking/UploadPhotoModal';

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [technicianFilter, setTechnicianFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [technicians, setTechnicians] = useState([]);
  
  // Modals state
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings', {
        params: { page, limit, search, status: statusFilter, technicianId: technicianFilter, startDate, endDate }
      });
      setBookings(res.data.data);
      setTotalPages(res.data.meta?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, statusFilter, technicianFilter, startDate, endDate]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    api.get('/technicians').then(res => setTechnicians(res.data.data)).catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page
    fetchBookings();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus booking ini?')) {
      try {
        await api.delete(`/bookings/${id}`);
        fetchBookings();
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const handleView = async (id: string) => {
    try {
      const res = await api.get(`/bookings/${id}`);
      setSelectedBooking(res.data.data);
      setIsDetailOpen(true);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Booking</h1>
        <button 
          onClick={() => { setSelectedBooking(null); setIsFormOpen(true); }}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer transition-all"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Tambah Booking
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex flex-col sm:flex-row gap-4 items-end flex-wrap">
        <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Pencarian</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
              placeholder="Cari No. Booking atau Perangkat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        
        <div className="w-full sm:w-48">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="">Semua Status</option>
            <option value="Pending">Pending</option>
            <option value="Checking">Checking</option>
            <option value="Repairing">Repairing</option>
            <option value="Finished">Finished</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="w-full sm:w-48">
          <label htmlFor="technician" className="block text-sm font-medium text-gray-700 mb-1">Teknisi</label>
          <select
            id="technician"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
            value={technicianFilter}
            onChange={(e) => { setTechnicianFilter(e.target.value); setPage(1); }}
          >
            <option value="">Semua Teknisi</option>
            {technicians.map((t: any) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-36">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
          <input
            type="date"
            id="startDate"
            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
          />
        </div>

        <div className="w-full sm:w-36">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
          <input
            type="date"
            id="endDate"
            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
          />
        </div>

        <button 
          type="button"
          onClick={fetchBookings}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      <BookingTable 
        bookings={bookings}
        loading={loading}
        onView={handleView}
        onEdit={(b) => { setSelectedBooking(b); setIsFormOpen(true); }}
        onDelete={handleDelete}
        onAssignTechnician={(b) => { setSelectedBooking(b); setIsAssignOpen(true); }}
        onUpdateStatus={(b) => { setSelectedBooking(b); setIsStatusOpen(true); }}
        onUploadPhoto={(b) => { setSelectedBooking(b); setIsUploadOpen(true); }}
      />

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 sm:px-6 rounded-md">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Halaman <span className="font-medium">{page}</span> dari <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Modals & Drawers */}
      <BookingDetailDrawer isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} booking={selectedBooking} />
      <BookingFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} booking={selectedBooking} onSuccess={fetchBookings} />
      <AssignTechnicianModal isOpen={isAssignOpen} onClose={() => setIsAssignOpen(false)} booking={selectedBooking} onSuccess={fetchBookings} />
      <UpdateStatusModal isOpen={isStatusOpen} onClose={() => setIsStatusOpen(false)} booking={selectedBooking} onSuccess={fetchBookings} />
      <UploadPhotoModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} booking={selectedBooking} onSuccess={fetchBookings} />
    </div>
  );
}

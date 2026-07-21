import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../../../lib/axios';

interface MasterData {
  id: string | number;
  name?: string;
  fullName?: string;
  phone?: string;
  phoneNumber?: string;
}

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: Record<string, unknown> | null;
  onSuccess: () => void;
}

export function BookingFormModal({ isOpen, onClose, booking, onSuccess }: BookingFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<MasterData[]>([]);
  const [brands, setBrands] = useState<MasterData[]>([]);
  const [deviceTypes, setDeviceTypes] = useState<MasterData[]>([]);
  const [serviceCategories, setServiceCategories] = useState<MasterData[]>([]);

  const defaultFormData = {
    customerId: '',
    brandId: '',
    deviceTypeId: '',
    serviceCategoryId: '',
    deviceName: '',
    serialNumber: '',
    accessories: '',
    complaint: '',
    isHomeService: false,
    priority: 'NORMAL'
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (isOpen) {
      // Fetch Master Data safely with optional chaining
      api.get('/customers').then(res => setCustomers(Array.isArray(res?.data?.data) ? res.data.data : [])).catch(() => setCustomers([]));
      api.get('/brands').then(res => setBrands(Array.isArray(res?.data?.data) ? res.data.data : [])).catch(() => setBrands([]));
      api.get('/device-types').then(res => setDeviceTypes(Array.isArray(res?.data?.data) ? res.data.data : [])).catch(() => setDeviceTypes([]));
      api.get('/service-categories').then(res => setServiceCategories(Array.isArray(res?.data?.data) ? res.data.data : [])).catch(() => setServiceCategories([]));

      if (booking?.id) {
        setFormData({
          customerId: typeof booking.customerId === 'string' ? booking.customerId : '',
          brandId: typeof booking.brandId === 'string' ? booking.brandId : '',
          deviceTypeId: typeof booking.deviceTypeId === 'string' ? booking.deviceTypeId : '',
          serviceCategoryId: typeof booking.serviceCategoryId === 'string' ? booking.serviceCategoryId : '',
          deviceName: typeof booking.deviceName === 'string' ? booking.deviceName : '',
          serialNumber: typeof booking.serialNumber === 'string' ? booking.serialNumber : '',
          accessories: typeof booking.accessories === 'string' ? booking.accessories : '',
          complaint: typeof booking.complaint === 'string' ? booking.complaint : '',
          isHomeService: Boolean(booking.isHomeService),
          priority: typeof booking.priority === 'string' ? booking.priority : 'NORMAL'
        });
      } else {
        setFormData(defaultFormData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, booking]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (booking?.id) {
        await api.put(`/bookings/${booking.id}`, formData);
      } else {
        await api.post('/bookings', formData);
      }
      onSuccess();
      onClose();
    } catch (error: unknown) {
      console.error(error);
      const errObj = error as { response?: { data?: { message?: string } } };
      alert(errObj.response?.data?.message || 'Gagal menyimpan booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {booking?.id ? 'Edit Booking' : 'Tambah Booking Baru'}
                </h3>
                <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Customer <span className="text-red-500">*</span></label>
                  <select required value={formData.customerId} onChange={e => setFormData({...formData, customerId: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border">
                    <option value="">Pilih Customer...</option>
                    {Array.isArray(customers) && customers.map((c: MasterData) => (
                      <option key={c.id} value={c.id}>
                        {c?.fullName || c?.name || 'Pelanggan'} ({c?.phoneNumber || c?.phone || '-'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Kategori Servis</label>
                  <select value={formData.serviceCategoryId} onChange={e => setFormData({...formData, serviceCategoryId: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border">
                    <option value="">Pilih Kategori...</option>
                    {Array.isArray(serviceCategories) && serviceCategories.map((sc: MasterData) => (
                      <option key={sc.id} value={sc.id}>{sc?.name || 'Kategori'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipe Perangkat</label>
                  <select value={formData.deviceTypeId} onChange={e => setFormData({...formData, deviceTypeId: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border">
                    <option value="">Pilih Tipe...</option>
                    {Array.isArray(deviceTypes) && deviceTypes.map((dt: MasterData) => (
                      <option key={dt.id} value={dt.id}>{dt?.name || 'Tipe'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Brand</label>
                  <select value={formData.brandId} onChange={e => setFormData({...formData, brandId: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border">
                    <option value="">Pilih Brand...</option>
                    {Array.isArray(brands) && brands.map((b: MasterData) => (
                      <option key={b.id} value={b.id}>{b?.name || 'Brand'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Unit / Model <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.deviceName} onChange={e => setFormData({...formData, deviceName: e.target.value})} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" placeholder="Contoh: LED TV 43 Inch / Laptop ASUS" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">No. Seri (SN)</label>
                  <input type="text" value={formData.serialNumber} onChange={e => setFormData({...formData, serialNumber: e.target.value})} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" placeholder="Contoh: SN-123456789" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Kelengkapan (Kelengkapan Unit)</label>
                  <input type="text" value={formData.accessories} onChange={e => setFormData({...formData, accessories: e.target.value})} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" placeholder="Contoh: Remote, Kabel Power, Adaptor, Dus..." />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Keluhan <span className="text-red-500">*</span></label>
                  <textarea required rows={3} value={formData.complaint} onChange={e => setFormData({...formData, complaint: e.target.value})} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" placeholder="Jelaskan kendala perangkat secara detail..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Prioritas</label>
                  <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border">
                    <option value="LOW">Low</option>
                    <option value="NORMAL">Normal</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <div className="flex items-center mt-6">
                  <input id="homeService" type="checkbox" checked={formData.isHomeService} onChange={e => setFormData({...formData, isHomeService: e.target.checked})} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="homeService" className="ml-2 block text-sm text-gray-900">Home Service (Kunjungan)</label>
                </div>
              </div>

            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
              <button type="submit" disabled={loading} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:bg-blue-300 cursor-pointer">
                {loading ? 'Menyimpan...' : 'Simpan Booking'}
              </button>
              <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

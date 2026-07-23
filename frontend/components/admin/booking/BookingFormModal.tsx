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
    diagnosis: '',
    estimatedCost: '',
    isHomeService: false,
    priority: 'NORMAL'
  };

  const [formData, setFormData] = useState(defaultFormData);

  const [isCreatingNewCustomer, setIsCreatingNewCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ fullName: '', phoneNumber: '', address: '' });

  useEffect(() => {
    if (isOpen) {
      setIsCreatingNewCustomer(false);
      setNewCustomer({ fullName: '', phoneNumber: '', address: '' });
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
          diagnosis: typeof booking.diagnosis === 'string' ? booking.diagnosis : '',
          estimatedCost: typeof booking.estimatedCost === 'number' || typeof booking.estimatedCost === 'string' ? String(booking.estimatedCost) : '',
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
      let activeCustomerId = formData.customerId;

      if (!booking?.id && isCreatingNewCustomer) {
        if (!newCustomer.fullName.trim() || !newCustomer.phoneNumber.trim()) {
          alert('Silakan isi Nama Lengkap & No. HP untuk customer baru');
          setLoading(false);
          return;
        }
        const custRes = await api.post('/customers', newCustomer);
        if (custRes.data?.data?.id) {
          activeCustomerId = custRes.data.data.id;
        }
      }

      const payload = { ...formData, customerId: activeCustomerId };

      if (booking?.id) {
        await api.put(`/bookings/${booking.id}`, payload);
      } else {
        await api.post('/bookings', payload);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose}></div>
      
      <div className="relative z-50 bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 my-8">
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
                <div className="sm:col-span-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">Customer <span className="text-red-500">*</span></label>
                    {!booking?.id && (
                      <button
                        type="button"
                        onClick={() => setIsCreatingNewCustomer(!isCreatingNewCustomer)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {isCreatingNewCustomer ? '← Pilih Customer Terdaftar' : '+ Tambah Customer Baru'}
                      </button>
                    )}
                  </div>

                  {!isCreatingNewCustomer ? (
                    <select required value={formData.customerId} onChange={e => setFormData({...formData, customerId: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border">
                      <option value="">Pilih Customer...</option>
                      {Array.isArray(customers) && customers.map((c: MasterData) => (
                        <option key={c.id} value={c.id}>
                          {c?.fullName || c?.name || 'Pelanggan'} ({c?.phoneNumber || c?.phone || '-'})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700">Nama Lengkap Customer *</label>
                        <input
                          type="text"
                          required
                          value={newCustomer.fullName}
                          onChange={e => setNewCustomer({ ...newCustomer, fullName: e.target.value })}
                          className="mt-1 block w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Contoh: Budi Santoso"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700">No. HP / WhatsApp *</label>
                        <input
                          type="text"
                          required
                          value={newCustomer.phoneNumber}
                          onChange={e => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
                          className="mt-1 block w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Contoh: 081234567890"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700">Alamat Customer (Opsional)</label>
                        <input
                          type="text"
                          value={newCustomer.address}
                          onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })}
                          className="mt-1 block w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Alamat domisili..."
                        />
                      </div>
                    </div>
                  )}
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

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Catatan / Hasil Diagnosis Teknisi</label>
                  <textarea rows={2} value={formData.diagnosis} onChange={e => setFormData({...formData, diagnosis: e.target.value})} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" placeholder="Catatan hasil pemeriksaan teknisi, sparepart yang perlu diganti..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Estimasi Biaya (Rp)</label>
                  <input type="number" value={formData.estimatedCost} onChange={e => setFormData({...formData, estimatedCost: e.target.value})} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border font-mono" placeholder="Contoh: 150000" />
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
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { 
  Wrench, CheckCircle, Clock, MapPin, Phone, Mail, 
  ChevronDown, ChevronUp, ShieldCheck, 
  ThumbsUp, Truck, PenTool, Zap, User, HelpCircle, Loader2, Search
} from 'lucide-react';
import api from '../../lib/axios';
import Link from 'next/link';

const FAQS = [
  { q: "Bagaimana proses booking?", a: "Pilih layanan dan isi formulir booking. Admin kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi biaya estimasi dan jadwal kedatangan." },
  { q: "Berapa lama teknisi datang?", a: "Untuk layanan Home Service, teknisi biasanya datang dalam waktu 1-3 jam setelah konfirmasi jika Anda booking pada jam operasional." },
  { q: "Apakah semua merk diterima?", a: "Ya, kami melayani perbaikan untuk hampir semua merek elektronik yang beredar di Indonesia." },
  { q: "Apakah ada garansi?", a: "Tentu. Setiap perbaikan mendapatkan garansi servis selama 1 Bulan untuk titik kerusakan yang sama." },
  { q: "Bagaimana jika ingin reschedule?", a: "Silakan hubungi Admin kami melalui WhatsApp maksimal 2 jam sebelum jadwal yang telah ditentukan." }
];

export default function BookingPage() {
  const [brands, setBrands] = useState<Array<{ id: string | number, name: string }>>([]);
  const [deviceTypes, setDeviceTypes] = useState<Array<{ id: string | number, name: string }>>([]);
  const [serviceCategories, setServiceCategories] = useState<Array<{ id: string | number, name: string }>>([]);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const res = await api.get('/public/master-data');
        setBrands(res.data.data.brands || []);
        setDeviceTypes(res.data.data.deviceTypes || []);
        setServiceCategories(res.data.data.serviceCategories || []);
      } catch (err) {
        console.error('Failed to fetch master data', err);
      }
    };
    fetchMasterData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    address: "",
    serviceType: "Datang ke Workshop",
    date: "",
    time: "",
    deviceTypeId: "",
    brandId: "",
    serviceCategoryId: "",
    deviceName: "",
    serialNumber: "",
    accessories: "",
    complaint: "",
    tnc: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<{bookingNumber: string, trackingId: string} | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nama Lengkap wajib diisi";
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "Nomor WhatsApp wajib diisi";
    if (!formData.address.trim()) newErrors.address = "Alamat wajib diisi";
    if (!formData.deviceTypeId) newErrors.deviceTypeId = "Jenis Perangkat wajib dipilih";
    if (!formData.brandId) newErrors.brandId = "Merk wajib dipilih";
    if (!formData.complaint.trim()) newErrors.complaint = "Keluhan wajib diisi";
    if (!formData.tnc) newErrors.tnc = "Anda harus menyetujui syarat & ketentuan";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setSubmitError('');
      try {
        const res = await api.post('/public/booking', formData);
        setShowSuccess(true);
        setTrackingInfo(res.data.data);
        setFormData({
          name: "", whatsapp: "", email: "", address: "",
          serviceType: "Datang ke Workshop", date: "", time: "",
          deviceTypeId: "", brandId: "", serviceCategoryId: "", deviceName: "", serialNumber: "", accessories: "", complaint: "", tnc: false
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err: unknown) {
        const errorObj = err as { response?: { data?: { message?: string } } };
        setSubmitError(errorObj.response?.data?.message || 'Gagal mengirim booking. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-200 selection:text-red-900">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-gray-200 pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Booking Servis Elektronik
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Isi formulir berikut untuk melakukan pemesanan servis. Tim Servis Cianjur akan segera menghubungi Anda untuk konfirmasi jadwal dan biaya.
          </p>
        </div>
      </section>

      {/* 2. FORM & SIDEBAR SECTION */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Main Form */}
          <div className="lg:col-span-2">
            
            {showSuccess && trackingInfo && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CheckCircle className="w-8 h-8 text-green-500 shrink-0 mt-1" />
                <div className="w-full">
                  <h3 className="text-xl font-bold text-green-900 mb-2">Booking Berhasil Dikirim!</h3>
                  <p className="text-green-800 mb-4">
                    Tim Servis Cianjur telah menerima permintaan Anda. Nomor WhatsApp Anda akan segera dihubungi oleh Admin kami.
                  </p>
                  
                  <div className="bg-white/60 p-4 rounded-xl border border-green-200 mb-4">
                    <p className="text-sm text-green-700 mb-1 font-semibold">Nomor Booking Anda:</p>
                    <p className="text-2xl font-black text-green-900 tracking-wider font-mono">{trackingInfo.bookingNumber}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={`/track/${trackingInfo.bookingNumber}`} className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2">
                      <Search className="w-4 h-4" />
                      Lacak Status Servis
                    </Link>
                    <button 
                      onClick={() => { setShowSuccess(false); setTrackingInfo(null); }}
                      className="px-4 py-2 bg-white text-green-700 border border-green-300 font-medium rounded-lg hover:bg-green-50 transition-colors inline-flex items-center justify-center"
                    >
                      Booking Baru
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 p-8">
              
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                  {submitError}
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <User className="w-5 h-5 text-red-600" />
                Informasi Pelanggan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-600 transition-all`} placeholder="Masukkan nama" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor WhatsApp *</label>
                  <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.whatsapp ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-600 transition-all`} placeholder="08xxxxxxxxxx" />
                  {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Opsional)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all" placeholder="email@example.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Lengkap *</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-600 transition-all`} placeholder="Detail alamat tempat tinggal"></textarea>
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Clock className="w-5 h-5 text-red-600" />
                Jadwal Servis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Jenis Layanan *</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className={`flex-1 flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${formData.serviceType === 'Datang ke Workshop' ? 'border-red-600 bg-red-50 text-red-700 ring-1 ring-red-600' : 'border-gray-300 hover:bg-gray-50'}`}>
                      <input type="radio" name="serviceType" value="Datang ke Workshop" checked={formData.serviceType === 'Datang ke Workshop'} onChange={handleChange} className="sr-only" />
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="font-medium">Datang ke Workshop</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${formData.serviceType === 'Home Service' ? 'border-red-600 bg-red-50 text-red-700 ring-1 ring-red-600' : 'border-gray-300 hover:bg-gray-50'}`}>
                      <input type="radio" name="serviceType" value="Home Service" checked={formData.serviceType === 'Home Service'} onChange={handleChange} className="sr-only" />
                      <Truck className="w-5 h-5 mr-2" />
                      <span className="font-medium">Home Service</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal (Opsional)</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all`} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Jam (Opsional)</label>
                  <input type="time" name="time" value={formData.time} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all`} />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Wrench className="w-5 h-5 text-red-600" />
                Detail Perangkat
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori Servis (Opsional)</label>
                  <select name="serviceCategoryId" value={formData.serviceCategoryId} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all bg-white`}>
                    <option value="">Pilih Kategori...</option>
                    {serviceCategories.map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Perangkat *</label>
                  <select name="deviceTypeId" value={formData.deviceTypeId} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.deviceTypeId ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-600 transition-all bg-white`}>
                    <option value="">Pilih perangkat...</option>
                    {deviceTypes.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                  {errors.deviceTypeId && <p className="text-red-500 text-xs mt-1">{errors.deviceTypeId}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Merk *</label>
                  <select name="brandId" value={formData.brandId} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border ${errors.brandId ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-600 transition-all bg-white`}>
                    <option value="">Pilih merk...</option>
                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                  {errors.brandId && <p className="text-red-500 text-xs mt-1">{errors.brandId}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Model / Nama Unit (Opsional)</label>
                  <input type="text" name="deviceName" value={formData.deviceName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all" placeholder="Contoh: PLD32" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">No Seri (Opsional)</label>
                  <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all" placeholder="SN123456" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kelengkapan Tambahan (Opsional)</label>
                  <input type="text" name="accessories" value={formData.accessories} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all" placeholder="Remote, Kabel Power, dll" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Keluhan / Kerusakan *</label>
                  <textarea name="complaint" value={formData.complaint} onChange={handleChange} rows={4} className={`w-full px-4 py-3 rounded-xl border ${errors.complaint ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-600 transition-all`} placeholder="Deskripsikan masalah yang terjadi pada perangkat Anda"></textarea>
                  {errors.complaint && <p className="text-red-500 text-xs mt-1">{errors.complaint}</p>}
                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="tnc" checked={formData.tnc} onChange={handleChange} className="mt-1 w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    Saya menyetujui bahwa estimasi biaya yang diberikan nantinya dapat berubah setelah dilakukan diagnosa langsung oleh teknisi. Saya juga menyetujui syarat & ketentuan layanan yang berlaku.
                  </span>
                </label>
                {errors.tnc && <p className="text-red-500 text-xs mt-2 ml-8">{errors.tnc}</p>}
              </div>

              <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-4 px-8 rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 text-lg active:scale-[0.98]">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                {loading ? 'Mengirim Booking...' : 'Ajukan Booking'}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Why Choose Us */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <ThumbsUp className="w-5 h-5 text-red-600" />
                Mengapa Memilih Kami?
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: <Clock className="w-5 h-5"/>, text: "Berdiri sejak 1993" },
                  { icon: <Truck className="w-5 h-5"/>, text: "Melayani Home Service" },
                  { icon: <CheckCircle className="w-5 h-5"/>, text: "Semua Merk Elektronik" },
                  { icon: <ShieldCheck className="w-5 h-5"/>, text: "Garansi Servis 1 Bulan" },
                  { icon: <PenTool className="w-5 h-5"/>, text: "Teknisi Berpengalaman" },
                  { icon: <Zap className="w-5 h-5"/>, text: "Estimasi Cepat & Akurat" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="text-red-600 bg-red-50 p-2 rounded-lg">{item.icon}</div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <MapPin className="w-5 h-5 text-red-600" />
                Informasi Kontak
              </h3>
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                  <p className="text-sm text-gray-600">
                    <strong className="block text-gray-900 mb-1">Workshop</strong>
                    Kp. Sinagar No.43<br/>Terusan Rawa Bango<br/>Desa Bojong, Karang Tengah<br/>Kabupaten Cianjur
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                  <p className="text-sm text-gray-600">
                    <strong className="block text-gray-900">WhatsApp</strong>
                    08xxxxxxxxxx
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                  <p className="text-sm text-gray-600">
                    <strong className="block text-gray-900">Email</strong>
                    <a href="mailto:admin@serviscianjur.com" className="text-red-600 hover:underline">admin@serviscianjur.com</a>
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                  <p className="text-sm text-gray-600">
                    <strong className="block text-gray-900">Jam Operasional</strong>
                    Senin–Sabtu, 08.00–17.00 WIB
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="py-20 bg-gray-50 border-t border-gray-200 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <HelpCircle className="w-8 h-8 text-red-600" />
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600 text-lg">Jawaban cepat seputar proses booking servis kami.</p>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-200 bg-white shadow-sm">
                <button 
                  type="button"
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-red-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-20 bg-red-700 text-white px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Masih Bingung?</h2>
          <p className="text-red-100 mb-10 text-lg max-w-2xl mx-auto">
            Hubungi customer service kami jika Anda butuh bantuan atau konsultasi awal tentang kerusakan perangkat Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-red-700 hover:bg-gray-50 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3">
              <Phone className="w-5 h-5" />
              WhatsApp Kami
            </button>
            <button className="bg-red-800 text-white hover:bg-red-900 font-bold py-4 px-8 rounded-xl border border-red-500 shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-3">
              <Phone className="w-5 h-5" />
              Telepon Sekarang
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

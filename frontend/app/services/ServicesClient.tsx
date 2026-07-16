"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
  FaTv,
  FaSnowflake,
  FaWrench,
  FaCheckCircle,
  FaTruck,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaClipboardList,
  FaArrowRight
} from 'react-icons/fa';
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { getIconComponent } from '@/components/IconHelper';

interface ServiceDetail {
  title: string;
  icon: string;
  description: string;
  items: string[];
}

interface ProcessItem {
  num?: string;
  step?: string;
  title: string;
  desc: string;
}

interface AdvantageItem {
  title: string;
  desc: string;
}

interface ProfileData {
  phone?: string;
  whatsappUrl?: string;
  email?: string;
  operatingHours?: string;
}

export default function ServicesClient() {
  const [services, setServices] = useState<ServiceDetail[]>([]);
  const [processes, setProcesses] = useState<ProcessItem[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [advantages, setAdvantages] = useState<AdvantageItem[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [servicesRes, processesRes, areasRes, advantagesRes, profileRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/service-details`).catch((error: any) => {
            console.warn("⚠️ Failed to fetch /service-details:", error.message);
            return { data: [] };
          }),
          axios.get(`${API_BASE_URL}/processes`).catch((error: any) => {
            console.warn("⚠️ Failed to fetch /processes:", error.message);
            return { data: [] };
          }),
          axios.get(`${API_BASE_URL}/service-areas`).catch((error: any) => {
            console.warn("⚠️ Failed to fetch /service-areas:", error.message);
            return { data: [] };
          }),
          axios.get(`${API_BASE_URL}/advantages`).catch((error: any) => {
            console.warn("⚠️ Failed to fetch /advantages:", error.message);
            return { data: [] };
          }),
          axios.get(`${API_BASE_URL}/company-profile`).catch((error: any) => {
            console.warn("⚠️ Failed to fetch /company-profile:", error.message);
            return { data: null };
          })
        ]);

        setServices(servicesRes.data || []);
        setProcesses(processesRes.data || []);
        setAreas(areasRes.data || []);
        setAdvantages(advantagesRes.data || []);
        setProfile(profileRes.data || null);
      } catch (err: any) {
        console.error('Error fetching services page data:', err);
        setError('Gagal memuat data layanan.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      {/* 1. HEADER SECTION */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-24 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-red-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md">Layanan Servis Elektronik</h1>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto opacity-95 leading-relaxed">
            Menyediakan layanan perbaikan berbagai perangkat elektronik rumah tangga dengan dukungan teknisi berpengalaman sejak tahun 1993.
          </p>
        </div>
      </section>

      {/* Error Alert */}
      {error && (
        <div className="container mx-auto px-6 mt-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-800">
            <p className="font-bold">Perhatian</p>
            <p>{error} Menggunakan data lokal cadangan.</p>
          </div>
        </div>
      )}

      {/* 2. INTRO LAYANAN */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Kami melayani perbaikan perangkat elektronik dengan proses diagnosa yang teliti sehingga kerusakan dapat diketahui dengan lebih akurat sebelum proses perbaikan dilakukan.
          </p>
          <div className="inline-flex items-center justify-center bg-red-50 text-red-700 px-8 py-4 rounded-full font-bold shadow-sm hover:bg-red-100 hover:shadow-md transition-all duration-300 cursor-default">
            <FaTruck className="mr-3 text-2xl" />
            Tersedia Layanan Servis ke Rumah (Home Service)
          </div>
        </div>
      </section>

      {/* 3. DETAIL JENIS LAYANAN */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Jenis Layanan Servis</h2>
          <p className="text-gray-600 mt-4 text-lg">Solusi tepat untuk berbagai kerusakan perangkat Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {loading ? (
            <p className="col-span-full text-center text-gray-500 py-10">Loading...</p>
          ) : services.length === 0 ? (
            <p className="col-span-full text-center text-gray-400 py-10">Tidak ada data jenis layanan.</p>
          ) : (
            services.map((service, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="bg-red-50 p-4 rounded-2xl text-red-600 mr-5 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    {getIconComponent(service.icon)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{service.description}</p>
                <ul className="space-y-3">
                  {service.items?.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <FaCheckCircle className="text-red-500 mt-1.5 mr-3 flex-shrink-0 text-lg group-hover:scale-110 transition-transform" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. LAYANAN PANGGILAN (HOME SERVICE) */}
      <section className="py-20 bg-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
              <FaTruck className="mr-5 text-red-300" /> Layanan Servis ke Rumah
            </h2>
            <p className="text-red-100 text-xl leading-relaxed mb-4">
              Punya perangkat elektronik berukuran besar yang sulit dipindahkan seperti <strong>TV besar, Kulkas, Mesin Cuci, atau AC</strong>?
            </p>
            <p className="text-red-100 text-lg">
              Tidak perlu repot! Teknisi kami akan datang langsung ke lokasi Anda untuk melakukan pemeriksaan dan perbaikan perangkat elektronik di tempat.
            </p>
          </div>
          <div className="md:w-1/3 text-center md:text-right">
            <Link href="/booking" className="inline-flex items-center justify-center bg-white text-red-700 font-bold py-4 px-8 rounded-full shadow-xl hover:bg-gray-50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
              Pesan Layanan ke Rumah <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PROSES SERVIS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-16">Proses Layanan Servis</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Garis penghubung untuk desktop */}
            {!loading && processes.length > 0 && (
              <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-1 bg-red-100 z-0 rounded-full"></div>
            )}

            {loading ? (
              <p className="col-span-full text-center text-gray-500 py-10">Loading...</p>
            ) : processes.length === 0 ? (
              <p className="col-span-full text-center text-gray-400 py-10">Tidak ada data proses.</p>
            ) : (
              processes.map((step, index) => (
                <div key={index} className="flex flex-col items-center group cursor-default z-10">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-red-100 text-red-600 flex items-center justify-center text-3xl font-extrabold mb-6 shadow-md group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300">
                    {step.num || step.step || (index + 1)}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-3 text-lg">{step.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 6. AREA & KEUNGGULAN */}
      <section className="py-24 bg-red-50 border-t border-red-100">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Area Layanan */}
          <div>
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mr-4 shadow-sm flex-shrink-0">
                <FaMapMarkerAlt />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Area Layanan</h2>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Servis Cianjur melayani pelanggan yang berada di wilayah:</p>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : areas.length === 0 ? (
              <p className="text-gray-400">Tidak ada data area.</p>
            ) : (
              <ul className="space-y-4 mb-6">
                {areas.map((area, i) => (
                  <li key={i} className="flex items-center text-gray-700 bg-white p-4 rounded-xl border border-red-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-4 shadow-sm"></div>
                    <span className="font-medium text-lg">{area}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Keunggulan */}
          <div>
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mr-4 shadow-sm flex-shrink-0">
                <FaClipboardList />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Keunggulan Layanan</h2>
            </div>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : advantages.length === 0 ? (
              <p className="text-gray-400">Tidak ada data keunggulan.</p>
            ) : (
              <div className="space-y-5">
                {advantages.map((item, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. CTA / KONTAK */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Butuh Layanan Servis Sekarang?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Jika perangkat elektronik Anda mengalami kerusakan, jangan ragu untuk menghubungi Servis Cianjur. Tim teknisi kami siap memberikan solusi terbaik.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href={profile?.whatsappUrl || "https://wa.me/62812xxxxxxx"} target="_blank" rel="noopener noreferrer" className="flex items-center bg-green-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-green-600 hover:-translate-y-1 transition-all duration-300">
              <FaWhatsapp className="text-3xl mr-3" /> Hubungi via WhatsApp
            </a>
            <div className="flex items-center bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-semibold border border-gray-200">
              <FaClock className="text-2xl text-orange-500 mr-3" /> {profile?.operatingHours || 'Senin – Sabtu (08.00 – 17.00)'}
            </div>
            <a href={`mailto:${profile?.email || 'serviscianjur@email.com'}`} className="flex items-center bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-semibold border border-gray-200 hover:bg-gray-100 transition-colors">
              <FaEnvelope className="text-2xl text-red-500 mr-3" /> Email Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, X, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import api from '../../lib/axios';

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeModalItem, setActiveModalItem] = useState<any>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await api.get('/gallery');
      if (res.data.success) {
        setItems(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Semua', 'Perbaikan TV', 'Perbaikan Mesin Cuci', 'Perbaikan Kulkas', 'Perbaikan AC', 'Workshop'];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'Semua') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30 mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Dokumentasi Pengerjaan & Workshop
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Galeri Portofolio & Aktivitas Servis
          </h1>
          <p className="text-slate-400 text-base md:text-lg mb-4 max-w-2xl mx-auto">
            Dokumentasi nyata hasil perbaikan perangkat pelanggan, peralatan alat ukur presisi, serta aktivitas tim teknisi lapangan Servis Cianjur.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 px-6 max-w-7xl mx-auto space-y-8">
        
        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl || item.photoUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 bg-white/90 rounded-full text-slate-900 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Maximize2 className="h-5 w-5 text-red-600" />
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                    {item.category || 'Dokumentasi'}
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-red-600 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-md mx-auto space-y-3">
            <ImageIcon className="h-12 w-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Belum Ada Galeri</h3>
            <p className="text-slate-500 text-xs">
              Belum ada foto dalam kategori &quot;{selectedCategory}&quot;.
            </p>
          </div>
        )}
      </section>

      {/* Lightbox Preview Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl border border-slate-100">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                  {activeModalItem.category || 'Galeri'}
                </span>
                <h3 className="font-bold text-slate-900 text-sm md:text-base line-clamp-1">
                  {activeModalItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="max-h-[60vh] w-full bg-slate-900 flex justify-center items-center overflow-hidden">
              <img
                src={activeModalItem.imageUrl || activeModalItem.photoUrl}
                alt={activeModalItem.title}
                className="max-h-[60vh] w-full object-contain"
              />
            </div>

            {/* Modal Body */}
            {activeModalItem.description && (
              <div className="p-6 bg-white space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Deskripsi Pengerjaan</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{activeModalItem.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

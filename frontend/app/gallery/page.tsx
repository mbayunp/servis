'use client';

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import api from '../../lib/axios';
import { getImageUrl } from '../../lib/utils';
import { GALLERY_CATEGORIES } from '../../lib/constants';

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

  const categories = [
    'Semua',
    ...Array.from(
      new Set([...GALLERY_CATEGORIES, ...items.map((g) => g.category).filter(Boolean)])
    )
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'Semua') return true;
    return item.category && item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white pt-28 pb-20 md:pt-36 border-b-4 border-red-600 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-red-600/20 text-red-400 border border-red-500/40 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-red-500" /> PORTOFOLIO &amp; WORKSHOP
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Galeri Dokumentasi &amp; Aktivitas Servis
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Dokumentasi perbaikan unit pelanggan, peralatan pengujian digital presisi, serta aktivitas tim teknisi lapangan Service Cianjur.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        
        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
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
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-slate-200 hover:border-red-600 cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={getImageUrl(item.imageUrl || item.photoUrl)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 bg-white rounded-full text-slate-900 shadow-md">
                      <Maximize2 className="h-5 w-5 text-red-600" />
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {item.category || 'Dokumentasi'}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-red-600 transition-colors text-sm line-clamp-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-slate-600 text-xs mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Terverifikasi Workshop
                    </span>
                    <span>{new Date(item.createdAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3 shadow-xs">
            <ImageIcon className="h-12 w-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Foto Belum Tersedia</h3>
            <p className="text-slate-500 text-xs">
              Belum ada foto galeri untuk kategori &quot;{selectedCategory}&quot;.
            </p>
          </div>
        )}
      </section>

      {/* Modal Preview Image */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 sm:h-96 w-full bg-slate-950">
              <img
                src={getImageUrl(activeModalItem.imageUrl || activeModalItem.photoUrl)}
                alt={activeModalItem.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950/70 hover:bg-slate-950 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-2">
              <div className="inline-block px-2.5 py-0.5 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-200 uppercase tracking-wider">
                {activeModalItem.category || 'Dokumentasi'}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{activeModalItem.title}</h3>
              {activeModalItem.description && (
                <p className="text-slate-600 text-sm leading-relaxed">{activeModalItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

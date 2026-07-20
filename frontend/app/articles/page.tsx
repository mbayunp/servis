'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, ArrowRight, BookOpen, Tag, Sparkles } from 'lucide-react';
import api from '../../lib/axios';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await api.get('/articles');
      if (res.data.success) {
        setArticles(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Semua', 'Tips & Trik', 'Panduan Perawatan', 'Edukasi Elektronik'];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch =
      art.title?.toLowerCase().includes(search.toLowerCase()) ||
      art.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      art.tags?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30 mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Edukasi & Informasi Servis
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Artikel & Tips Perawatan Elektronik
          </h1>
          <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Pelajari panduan praktis, tips perawatan harian TV, Kulkas, AC, Mesin Cuci, dan informasi terkini dari teknisi profesional Servis Cianjur.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari artikel (contoh: TV LED, Freon, Mesin Cuci)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 px-6 max-w-7xl mx-auto space-y-8">
        {/* Category Pills */}
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
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group"
              >
                {/* Featured Image */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={article.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {article.category || 'Edukasi'}
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-red-500" />
                        {new Date(article.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        {article.author || 'Admin'}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/articles/${article.id}`}>{article.title}</Link>
                    </h2>

                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                      {article.excerpt || article.content?.substring(0, 120)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {article.tags?.split(',')[0] || 'Servis'}
                    </span>

                    <Link
                      href={`/articles/${article.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 transition-colors group/link"
                    >
                      Baca Selengkapnya{' '}
                      <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-md mx-auto space-y-3">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Artikel Tidak Ditemukan</h3>
            <p className="text-slate-500 text-xs">
              Tidak ada artikel yang cocok dengan pencarian &quot;{search}&quot;. Silakan coba kata kunci lain.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

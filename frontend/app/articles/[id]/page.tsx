'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Share2, Wrench, CheckCircle } from 'lucide-react';
import api from '../../../lib/axios';

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchArticleDetail(params.id as string);
    }
  }, [params.id]);

  const fetchArticleDetail = async (id: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/articles/${id}`);
      if (res.data.success) {
        setArticle(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch article detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Artikel Tidak Ditemukan</h2>
        <p className="text-slate-600 text-sm mb-6">Artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
        <button
          onClick={() => router.push('/articles')}
          className="px-5 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
        >
          Kembali ke Daftar Artikel
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Semua Artikel
        </Link>

        {/* Article Header */}
        <header className="space-y-4">
          <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
            {article.category || 'Tips & Edukasi'}
          </span>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-4">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="h-4 w-4 text-red-600" /> {article.author || 'Tim Servis Cianjur'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="h-4 w-4 text-slate-400" />
              {new Date(article.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {article.image && (
          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 h-[380px] w-full bg-slate-100">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Article Excerpt Card */}
        {article.excerpt && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-900 text-sm italic font-medium leading-relaxed">
            &quot;{article.excerpt}&quot;
          </div>
        )}

        {/* Article Content Body */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-6 text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
          {article.content}
        </div>

        {/* Call To Action Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-8 shadow-lg flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold">Perangkat Elektronik Anda Mengalami Kendala?</h3>
            <p className="text-slate-300 text-xs md:text-sm">
              Jangan ragu untuk berkonsultasi langsung dengan teknisi berpengalaman dari Servis Cianjur.
            </p>
          </div>
          <Link
            href="/booking"
            className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            Booking Perbaikan Sekarang
          </Link>
        </div>

      </div>
    </div>
  );
}

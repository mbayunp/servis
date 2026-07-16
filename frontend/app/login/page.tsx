'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaWrench, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import api from '../../lib/axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/login', {
        email,
        password
      });

      // Save tokens to localStorage
      if (data.data.accessToken && data.data.refreshToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        
        // Redirect to admin
        router.push('/admin');
      } else {
        setError('Login gagal. Respon token tidak valid.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-red-600 to-red-800 relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-red-400/20 blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 p-10 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 relative z-10">
        <div className="text-center">
          {/* Dummy Logo */}
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md border-2 border-red-500/10 mb-4 transition-transform hover:scale-105 duration-300">
            <FaWrench />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Servis<span className="text-red-600">Cianjur</span>
          </h2>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Portal Administrasi & Teknisi
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center border border-red-200 shadow-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1.5 ml-1">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all duration-200 text-sm"
                  placeholder="admin@serviscianjur.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1.5 ml-1">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all duration-200 text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Belum punya akun?</span>
            <Link href="/register" className="font-bold text-red-600 hover:text-red-800 transition-colors flex items-center gap-1">
              Daftar Sekarang <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg shadow-red-600/30 hover:shadow-xl hover:-translate-y-0.5 disabled:bg-red-400 disabled:translate-y-0 transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              ) : 'Masuk ke Portal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

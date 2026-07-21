'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaExclamationTriangle, FaShieldAlt, FaKey, FaHome } from 'react-icons/fa';
import api from '../../lib/axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShake(false);

    const startTime = Date.now();

    try {
      const { data } = await api.post('/auth/login', {
        email,
        password
      });

      // Berikan jeda minimum 800ms agar animasi loading terasa alami dan smooth
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 800) {
        await new Promise((resolve) => setTimeout(resolve, 800 - elapsedTime));
      }

      if (data.data.accessToken && data.data.refreshToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        router.push('/admin');
      } else {
        triggerError('Login gagal: Respon token dari server tidak valid.');
      }
    } catch (err: unknown) {
      // Jeda minimal 1200ms ketika login gagal agar pengguna sempat melihat indikator proses sebelum pesan error ditampilkan
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 1200) {
        await new Promise((resolve) => setTimeout(resolve, 1200 - elapsedTime));
      }

      const errorObj = err as { response?: { data?: { message?: string }, status?: number } };
      const serverMsg = errorObj.response?.data?.message;
      let userFriendlyMsg = serverMsg || 'Gagal masuk. Silakan periksa kembali email dan kata sandi Anda.';

      if (errorObj.response?.status === 401) {
        userFriendlyMsg = 'Email atau kata sandi yang Anda masukkan tidak cocok.';
      } else if (errorObj.response?.status === 403) {
        userFriendlyMsg = 'Akses Ditolak (403): Akun ini tidak memiliki akses ke portal administrasi.';
      } else if (!errorObj.response) {
        userFriendlyMsg = 'Koneksi gagal: Tidak dapat terhubung ke server backend (Port 5000).';
      }

      triggerError(userFriendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  const triggerError = (msg: string) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const fillQuickDemo = () => {
    setEmail('admin@serviscianjur.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Back to Home Button */}
      <Link href="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 text-slate-400 hover:text-white transition-all text-sm font-semibold bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 hover:border-slate-600">
        <FaHome className="text-sm" />
        Beranda
      </Link>

      {/* Dynamic Background Ambient Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-180 h-180 rounded-full bg-linear-to-br from-red-600/30 to-red-900/10 blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-140 h-140 rounded-full bg-linear-to-tr from-red-500/20 to-orange-500/10 blur-[100px] pointer-events-none"></div>
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none"></div>

      <div className={`max-w-md w-full space-y-8 p-8 sm:p-10 bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800/80 relative z-10 transition-all duration-300 ${shake ? 'animate-bounce border-red-500/50 shadow-red-950/50' : ''}`}>
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide uppercase">
            <FaShieldAlt className="text-xs" />
            Portal Administrasi & Teknisi
          </div>
          
          <div className="flex justify-center pt-2 transition-transform hover:scale-105 duration-300">
            <Image
              src="/logo.png"
              alt="Service Cianjur Logo"
              width={120}
              height={120}
              className="h-16 w-auto object-contain drop-shadow-[0_4px_12px_rgba(239,68,68,0.3)]"
              priority
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Servis<span className="text-red-500"> Cianjur</span>
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Masuk untuk mengelola pemesanan, data pelanggan, dan teknisi.
            </p>
          </div>
        </div>

        {/* Quick Demo Credentials Pill */}
        <div 
          onClick={fillQuickDemo}
          className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between text-xs text-slate-300 group"
          title="Klik untuk mengisi data login default admin"
        >
          <div className="flex items-center gap-2">
            <FaKey className="text-red-400 group-hover:rotate-45 transition-transform duration-300" />
            <span>Gunakan Akun Demo Admin</span>
          </div>
          <span className="text-[10px] font-semibold bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full border border-red-500/30">
            Otomatis Isi
          </span>
        </div>

        {/* Login Form */}
        <form className="mt-6 space-y-5" onSubmit={handleLogin}>
          {/* Prominent Error Box with Smooth Fade-In */}
          {error && (
            <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs shadow-lg backdrop-blur-md flex items-start gap-3 animate-in fade-in zoom-in duration-300">
              <FaExclamationTriangle className="text-red-400 text-base shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-red-300 mb-0.5">Gagal Masuk</p>
                <p className="leading-relaxed text-red-200/90">{error}</p>
              </div>
              <button 
                type="button"
                onClick={() => setError('')}
                className="text-red-400 hover:text-white transition-colors text-sm font-bold px-1"
                title="Tutup pesan"
              >
                ✕
              </button>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5 ml-1">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <FaEnvelope />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-sm"
                  placeholder="admin@serviscianjur.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5 ml-1">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <FaLock />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-10 pr-10 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-400">Belum punya akun?</span>
            <Link href="/register" className="font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
              Daftar Akun Baru <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2.5">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memvalidasi Kredensial...
                </span>
              ) : 'Masuk ke Portal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


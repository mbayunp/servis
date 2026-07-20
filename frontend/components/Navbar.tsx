"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAdminOrAuth = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register';

  // Efek untuk mendeteksi scroll agar navbar menjadi "glass" (kaca)
  useEffect(() => {
    if (isAdminOrAuth) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminOrAuth]);

  if (isAdminOrAuth) return null;

  const menuItems = [
    { title: "Beranda", path: "/" },
    { title: "Tentang Kami", path: "/about" },
    { title: "Layanan", path: "/services" },
    { title: "Artikel", path: "/articles" },
    { title: "Galeri", path: "/gallery" },
    { title: "Cek Servis", path: "/tracking" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
          : 'bg-white shadow-sm py-5'
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo Perusahaan */}
          <Link href="/" className="hover:scale-105 transition-transform duration-300 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Service Cianjur Logo"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
            <span className="text-2xl font-extrabold tracking-tight text-red-600 hidden sm:inline-block">
              Servis<span className="text-black"> Cianjur</span>
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="relative group text-black font-medium"
              >
                <span className="group-hover:text-red-600 transition-colors duration-300">
                  {item.title}
                </span>
                {/* Garis bawah animasi saat di-hover */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <Link
              href="/booking"
              className="bg-red-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-md shadow-red-600/30 hover:bg-black hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300"
            >
              Booking Servis
            </Link>
          </div>

          {/* Tombol Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-red-600 focus:outline-none transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile dengan Animasi Dropdown Halus */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="flex flex-col space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-inner">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="text-black hover:text-red-600 hover:bg-red-50 hover:pl-3 font-medium py-2 px-3 rounded-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Link
              href="/booking"
              className="bg-red-600 text-white text-center px-5 py-3 rounded-xl font-semibold mt-2 shadow-md hover:bg-black transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Booking Servis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
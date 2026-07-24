"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();
  const isAdminOrAuth = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register';

  if (isAdminOrAuth) return null;
  return (
    <footer className="bg-white text-gray-800 pt-16 pb-8 border-t-[6px] border-red-600 relative overflow-hidden shadow-inner">
      {/* Dekorasi Latar Belakang */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Kolom Info */}
          <div>
            <Link href="/" className="inline-block mb-6 hover:scale-105 transition-transform duration-300">
              <Image
                src="/servis/logo.png"
                alt="Service Cianjur Logo"
                width={180}
                height={54}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Solusi perbaikan elektronik rumah tangga terpercaya, profesional, dan bergaransi sejak 1990. Kepuasan Anda adalah prioritas kami.
            </p>
            {/* Ikon Sosial Media */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all duration-300 border border-gray-200 shadow-sm">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all duration-300 border border-gray-200 shadow-sm">
                <FaInstagram size={18} />
              </a>
              <a href="https://wa.me/6282113413324" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white hover:-translate-y-1 transition-all duration-300 border border-gray-200 shadow-sm">
                <FaWhatsapp size={18} />
              </a>
            </div>

            {/* Tombol Login Admin */}
            <div className="mt-8">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs bg-gray-100 text-gray-700 hover:text-white hover:bg-red-600 font-bold py-2.5 px-5 rounded-lg shadow-sm transition-all duration-300 border border-gray-300 hover:border-red-500"
              >
                Login Admin
              </Link>
            </div>
          </div>

          {/* Kolom Tautan */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-gray-900 border-b-2 border-red-600 pb-2 inline-block">Tautan Cepat</h4>
            <ul className="space-y-3 text-gray-600">
              {['Beranda', 'Tentang Kami', 'Layanan Servis', 'Cek Status Servis'].map((item, index) => {
                const paths = ["/", "/about", "/services", "/tracking"];
                return (
                  <li key={index} className="group">
                    <Link
                      href={paths[index]}
                      className="flex items-center hover:text-red-600 transition-colors duration-300"
                    >
                      <span className="text-red-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2">
                        ▸
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Kolom Kontak */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-gray-900 border-b-2 border-red-600 pb-2 inline-block">Kontak Kami</h4>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start hover:text-red-600 transition-colors group">
                <FaPhoneAlt className="text-red-500 mt-1 mr-4 shrink-0 group-hover:scale-110 transition-transform" />
                <a href="https://wa.me/6282113413324" target="_blank" rel="noopener noreferrer" className="hover:underline">+62 821-1341-3324</a>
              </li>
              <li className="flex items-start hover:text-red-600 transition-colors group">
                <FaMapMarkerAlt className="text-red-500 mt-1 mr-4 shrink-0 text-xl group-hover:scale-110 transition-transform" />
                <a href="https://maps.app.goo.gl/xcHNBrLkjtR7mJ7D7" target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:underline">Kp. Sinagar No.43, Desa Bojong, Karang Tengah, Cianjur</a>
              </li>
              <li className="flex items-start hover:text-red-600 transition-colors group">
                <FaClock className="text-red-500 mt-1 mr-4 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Senin - Sabtu <br />(08:00 - 17:00)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Hak Cipta */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Service Cianjur. All rights reserved.</p>
          <p className="mt-2 md:mt-0">MBNP <span className="text-red-600 font-bold"></span>Tech</p>
        </div>
      </div>
    </footer>
  );
}
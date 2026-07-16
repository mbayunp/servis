"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();
  const isAdminOrAuth = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register';

  if (isAdminOrAuth) return null;
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t-4 border-red-600 relative overflow-hidden">
      {/* Dekorasi Latar Belakang (Opsional) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Kolom Info */}
          <div>
            <h3 className="text-3xl font-extrabold text-red-500 mb-6 tracking-tight">
              Servis<span className="text-white">Cianjur</span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Solusi perbaikan elektronik rumah tangga terpercaya, profesional, dan bergaransi sejak 1993. Kepuasan Anda adalah prioritas kami.
            </p>
            {/* Ikon Sosial Media */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg">
                <FaWhatsapp size={18} />
              </a>
            </div>

            {/* Tombol Login Admin */}
            <div className="mt-6">
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-xs bg-gray-800 text-gray-300 hover:text-white hover:bg-red-600 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
              >
                Login Admin
              </Link>
            </div>
          </div>

          {/* Kolom Tautan */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2 inline-block">Tautan Cepat</h4>
            <ul className="space-y-3 text-gray-400">
              {['Beranda', 'Tentang Kami', 'Layanan Servis', 'Cek Status Servis'].map((item, index) => {
                const paths = ["/", "/about", "/services", "/tracking"];
                return (
                  <li key={index} className="group">
                    <Link 
                      href={paths[index]} 
                      className="flex items-center hover:text-red-400 transition-colors duration-300"
                    >
                      <span className="text-red-600 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2">
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
            <h4 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2 inline-block">Kontak Kami</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start hover:text-white transition-colors">
                <FaPhoneAlt className="text-red-500 mt-1 mr-4 flex-shrink-0" />
                <span>0812-XXXX-XXXX</span>
              </li>
              <li className="flex items-start hover:text-white transition-colors">
                <FaMapMarkerAlt className="text-red-500 mt-1 mr-4 flex-shrink-0 text-xl" />
                <span className="leading-relaxed">Kp. Sinagar No.43, Desa Bojong, Karang Tengah, Cianjur</span>
              </li>
              <li className="flex items-start hover:text-white transition-colors">
                <FaClock className="text-red-500 mt-1 mr-4 flex-shrink-0" />
                <span>Senin - Sabtu <br/>(08:00 - 17:00)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Hak Cipta */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Servis Cianjur. All rights reserved.</p>
          <p className="mt-2 md:mt-0">MBNP <span className="text-red-600"></span>Tech</p>
        </div>
      </div>
    </footer>
  );
}
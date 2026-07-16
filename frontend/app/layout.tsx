import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Servis Cianjur - Layanan Perbaikan Elektronik Terpercaya',
  description: 'Melayani perbaikan TV, Mesin Cuci, Kulkas, dan AC di Kabupaten Cianjur dan sekitarnya.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 text-gray-900 flex flex-col min-h-screen`}>
        <Navbar />
        
        {/* Main content area */}
        <main className="flex-grow pt-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
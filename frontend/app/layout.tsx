import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Service Cianjur - Layanan Perbaikan Elektronik Terpercaya',
  description: 'Melayani perbaikan TV, Mesin Cuci, Kulkas, dan AC di Kabupaten Cianjur dan sekitarnya.',
  icons: {
    icon: '/logo.png',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-gray-900 flex flex-col min-h-screen`} suppressHydrationWarning>
        <Navbar />
        
        {/* Main content area */}
        <main className="grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
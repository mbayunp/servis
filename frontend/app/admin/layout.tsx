'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminNavbar } from '../../components/admin/AdminNavbar';
import api from '../../lib/axios';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token found');
        }
        
        await api.get('/auth/me');
        setIsAuthenticated(true);
      } catch {
        if (!localStorage.getItem('accessToken')) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex relative overflow-x-hidden">
      {/* Sidebar for Desktop & Mobile Overlay */}
      <div className="print:hidden">
        <AdminSidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64 transition-all duration-300 print:ml-0 print:w-full">
        <div className="print:hidden">
          <AdminNavbar
            onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
        </div>
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden print:p-0 print:w-full print:block">
          {children}
        </main>
      </div>
    </div>
  );
}

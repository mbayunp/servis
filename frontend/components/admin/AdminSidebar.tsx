'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Wrench, 
  Map, 
  Receipt, 
  FileText, 
  Image, 
  MessageSquare, 
  Settings,
  LogOut,
  Tag,
  Laptop,
  Layers,
  UserCheck,
  ShieldCheck
} from 'lucide-react';
import api from '../../lib/axios';

const navSections = [
  {
    title: 'UTAMA',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Booking', href: '/admin/booking', icon: CalendarCheck },
      { name: 'Customer', href: '/admin/customer', icon: Users },
      { name: 'Technician', href: '/admin/technician', icon: Wrench },
      { name: 'Tracking', href: '/admin/tracking', icon: Map },
      { name: 'Finance', href: '/admin/finance', icon: Receipt },
    ]
  },
  {
    title: 'MASTER DATA',
    items: [
      { name: 'Brand', href: '/admin/brand', icon: Tag },
      { name: 'Tipe Perangkat', href: '/admin/device-type', icon: Laptop },
      { name: 'Kategori Servis', href: '/admin/service-category', icon: Layers },
    ]
  },
  {
    title: 'PENGGUNA & AKSES',
    items: [
      { name: 'Users', href: '/admin/users', icon: UserCheck },
      { name: 'Roles & Hak Akses', href: '/admin/roles', icon: ShieldCheck },
    ]
  },
  {
    title: 'KONTEN & PENGATURAN',
    items: [
      { name: 'Artikel', href: '/admin/article', icon: FileText },
      { name: 'Galeri', href: '/admin/gallery', icon: Image },
      { name: 'Testimonial', href: '/admin/testimonial', icon: MessageSquare },
      { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Ignore
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0">
      <div className="flex items-center justify-center h-16 border-b border-slate-800 flex-shrink-0">
        <span className="text-xl font-bold uppercase tracking-wider text-blue-400">Servis Cianjur</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-6 px-3">
          {navSections.map((section) => (
            <div key={section.title}>
              <div className="px-2 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-4 w-4 ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800 space-y-3 flex-shrink-0">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
        >
          <LogOut className="mr-3 flex-shrink-0 h-4 w-4" aria-hidden="true" />
          Logout
        </button>
        <div className="text-xs text-slate-500 text-center">
          &copy; {new Date().getFullYear()} Servis Cianjur
        </div>
      </div>
    </div>
  );
}


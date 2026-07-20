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
  ShieldCheck,
  X
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

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
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
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-950 text-white flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800/80 flex-shrink-0 bg-slate-900">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Servis Cianjur Logo"
              className="w-9 h-9 object-contain drop-shadow"
            />
            <span className="text-base font-extrabold uppercase tracking-wider text-white">
              Servis <span className="text-red-500">Cianjur</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-6 px-3">
            {navSections.map((section) => (
              <div key={section.title}>
                <div className="px-2 mb-2 text-[10px] font-bold text-red-400/90 uppercase tracking-wider">
                  {section.title}
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className={`group flex items-center px-3 py-2.5 text-xs md:text-sm font-semibold rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                            : 'text-slate-300 hover:bg-slate-900 hover:text-red-400'
                        }`}
                      >
                        <item.icon
                          className={`mr-3 flex-shrink-0 h-4 w-4 transition-colors ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-red-400'
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

        <div className="p-4 border-t border-slate-800/80 space-y-3 flex-shrink-0 bg-slate-900">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2.5 text-xs md:text-sm font-semibold rounded-xl text-slate-300 hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-xs"
          >
            <LogOut className="mr-3 flex-shrink-0 h-4 w-4" aria-hidden="true" />
            Logout
          </button>
          <div className="text-[11px] text-slate-500 text-center font-medium">
            &copy; {new Date().getFullYear()} Servis Cianjur
          </div>
        </div>
      </aside>
    </>
  );
}

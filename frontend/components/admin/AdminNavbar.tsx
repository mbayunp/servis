'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Bell, Search, User, Menu } from 'lucide-react';
import api from '../../lib/axios';
import { useEffect, useState } from 'react';

interface AdminNavbarProps {
  onToggleSidebar?: () => void;
}

export function AdminNavbar({ onToggleSidebar }: AdminNavbarProps) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('Admin');
  const [userRole, setUserRole] = useState<string>('Loading...');

  useEffect(() => {
    api.get('/auth/me')
      .then((res) => {
        setUserName(res.data.data.name || 'Admin');
        setUserRole(res.data.data.role?.name || 'Unknown Role');
      })
      .catch(() => {
        // Handled by layout
      });
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Ignore errors on logout
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push('/login');
    }
  };

  return (
    <div className="h-16 bg-white border-b-2 border-red-600 text-slate-900 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-30 shadow-sm">
      {/* Left: Mobile Toggle & Search */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Toggle Sidebar Menu"
        >
          <Menu className="h-5 w-5 text-red-600" />
        </button>

        <div className="relative w-32 sm:w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all"
            placeholder="Cari sesuatu..."
          />
        </div>
      </div>

      {/* Right: Notifications, User Profile & Logout */}
      <div className="flex items-center space-x-1.5 sm:space-x-3">
        <button className="text-slate-500 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

        {/* User Info Profile */}
        <div className="flex items-center space-x-2">
          <div className="bg-red-600 text-white p-1.5 sm:p-2 rounded-full shrink-0 shadow-sm">
            <User className="h-4 w-4 sm:h-4 sm:w-4" />
          </div>
          <div className="flex flex-col max-w-[90px] sm:max-w-[160px]">
            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-tight" title={userName}>
              {userName}
            </span>
            <span className="text-[10px] text-red-600 truncate hidden sm:block font-bold" title={userRole}>
              {userRole}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-1.5 sm:p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors rounded-xl cursor-pointer ml-1"
          title="Logout"
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Bell, Search, User } from 'lucide-react';
import api from '../../lib/axios';
import { useEffect, useState } from 'react';

export function AdminNavbar() {
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
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </span>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-gray-500">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-px bg-gray-200"></div>
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
            <User className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">{userName}</span>
            <span className="text-xs text-gray-500">{userRole}</span>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

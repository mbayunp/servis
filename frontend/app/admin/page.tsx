'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { 
  Briefcase, 
  CheckCircle, 
  Clock, 
  Users,
  Wrench,
  DollarSign,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [chartData, setChartData] = useState<number[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString('id-ID'));
    Promise.all([
      api.get('/dashboard/summary'),
      api.get('/dashboard/chart/bookings'),
      api.get('/dashboard/activity')
    ]).then(([summaryRes, chartRes, activityRes]) => {
      setSummary(summaryRes.data.data);
      setChartData(chartRes.data.data);
      setActivities(activityRes.data.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  const stats = [
    { name: 'Total Booking', value: summary?.totalBooking || 0, icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { name: 'Booking Pending', value: summary?.bookingPending || 0, icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { name: 'Dalam Proses', value: summary?.bookingProgress || 0, icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { name: 'Selesai', value: summary?.bookingSelesai || 0, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
    { name: 'Total Pelanggan', value: summary?.totalCustomer || 0, icon: Users, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
    { name: 'Total Teknisi', value: summary?.totalTechnician || 0, icon: Wrench, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { name: 'Pendapatan Hari Ini', value: formatRupiah(summary?.pendapatanHariIni || 0), icon: DollarSign, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
    { name: 'Pendapatan Bulan Ini', value: formatRupiah(summary?.pendapatanBulanIni || 0), icon: TrendingUp, color: 'text-teal-600', bgColor: 'bg-teal-100' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {lastUpdated || 'Loading...'}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 transition duration-300 hover:shadow-md">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`rounded-md p-3 ${item.bgColor}`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Tables Area (Dummy placeholder based on requirement) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Statistik Booking Bulanan ({new Date().getFullYear()})</h2>
          <div className="h-72 w-full flex items-end justify-between space-x-2 px-4 pb-4">
            {chartData.length > 0 ? chartData.map((count, i) => {
              const max = Math.max(...chartData, 10);
              const height = (count / max) * 100;
              return (
                <div key={i} className="w-full bg-blue-100 rounded-t-sm relative group h-full flex flex-col justify-end">
                  <div 
                    className="w-full bg-blue-500 rounded-t-sm transition-all duration-300"
                    style={{ height: `${height}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded z-10">
                      {count}
                    </div>
                  </div>
                </div>
              );
            }) : <div className="text-gray-400 w-full text-center py-20">Tidak ada data chart</div>}
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-4 mt-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Recent Bookings Area */}
        <div className="bg-white shadow rounded-lg border border-gray-100 p-6 flex flex-col">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Aktivitas Terkini</h2>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6">
              {activities.length > 0 ? activities.map((item) => (
                <div key={item.id} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Booking <span className="font-medium text-gray-900">{item.bookingNumber}</span> saat ini{' '}
                        <span className="font-medium text-blue-600">{item.status}</span>
                      </p>
                    </div>
                    <div className="text-right text-xs whitespace-nowrap text-gray-500">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )) : <div className="text-sm text-gray-500">Tidak ada aktivitas.</div>}
            </div>
          </div>
          <div className="mt-6">
            <a href="/admin/booking" className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition">
              View all
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

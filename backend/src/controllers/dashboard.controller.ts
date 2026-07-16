import { Request, Response } from 'express';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';
import Booking from '../models/booking.model.js';
import Customer from '../models/customer.model.js';
import Technician from '../models/technician.model.js';
import Invoice from '../models/invoice.model.js';

export const getSummary = async (_req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
      totalBooking, 
      bookingPending, 
      bookingProgress, 
      bookingSelesai, 
      totalCustomer, 
      totalTechnician,
      pendapatanHariIni,
      pendapatanBulanIni
    ] = await Promise.all([
      Booking.count(),
      Booking.count({ where: { status: 'Pending' } }),
      Booking.count({ where: { status: 'Repairing' } }),
      Booking.count({ where: { status: 'Finished' } }),
      Customer.count(),
      Technician.count(),
      Invoice.sum('total', { 
        where: { 
          status: 'PAID', 
          createdAt: { [Op.gte]: today } 
        } 
      }),
      Invoice.sum('total', { 
        where: { 
          status: 'PAID', 
          createdAt: { [Op.gte]: firstDayOfMonth } 
        } 
      })
    ]);

    res.json({
      success: true,
      data: { 
        totalBooking, 
        bookingPending,
        bookingProgress, 
        bookingSelesai, 
        totalCustomer, 
        totalTechnician,
        pendapatanHariIni: pendapatanHariIni || 0,
        pendapatanBulanIni: pendapatanBulanIni || 0
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChartBookings = async (_req: Request, res: Response) => {
  try {
    const currentYear = new Date().getFullYear();
    const chartData = await Booking.findAll({
      attributes: [
        [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: {
        createdAt: {
          [Op.gte]: new Date(currentYear, 0, 1)
        }
      },
      group: [sequelize.fn('MONTH', sequelize.col('createdAt'))]
    });

    const monthlyCounts = Array(12).fill(0);
    chartData.forEach((item: any) => {
      const m = item.get('month');
      const count = item.get('count');
      if (m >= 1 && m <= 12) {
        monthlyCounts[m - 1] = count;
      }
    });

    res.json({ success: true, data: monthlyCounts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getActivity = async (_req: Request, res: Response) => {
  try {
    const recentBookings = await Booking.findAll({
      limit: 5,
      order: [['updatedAt', 'DESC']],
      attributes: ['id', 'bookingNumber', 'status', 'updatedAt']
    });
    res.json({ success: true, data: recentBookings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

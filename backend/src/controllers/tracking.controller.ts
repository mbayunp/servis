import { Request, Response } from 'express';
import Booking from '../models/booking.model.js';
import Customer from '../models/customer.model.js';
import Technician from '../models/technician.model.js';
import Brand from '../models/brand.model.js';
import DeviceType from '../models/device-type.model.js';
import ServiceCategory from '../models/service-category.model.js';
import BookingBefore from '../models/bookingBefore.model.js';
import BookingAfter from '../models/bookingAfter.model.js';
import TrackingHistory from '../models/trackingHistory.model.js';
import Invoice from '../models/invoice.model.js';
import Payment from '../models/payment.model.js';

const computeProgress = (status: string): number => {
  switch (status.toUpperCase().replace(/\s+/g, '_')) {
    case 'PENDING': return 10;
    case 'RECEIVED': return 15;
    case 'CHECKING': return 25;
    case 'WAITING_APPROVAL': return 35;
    case 'REPAIRING':
    case 'ON_PROGRESS': return 60;
    case 'QC': return 85;
    case 'FINISHED':
    case 'COMPLETED':
    case 'PICKED_UP':
    case 'DELIVERED': return 100;
    case 'CANCELLED': return 0;
    default: return 20;
  }
};

export const getTracking = async (_req: Request, res: Response) => {
  try {
    const data = await Booking.findAll({
      include: [
        { model: Brand, as: 'brand' },
        { model: DeviceType, as: 'deviceType' },
        { model: TrackingHistory, as: 'histories' }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

export const getTrackingById = async (req: Request, res: Response) => {
  try {
    const data = await Booking.findByPk(req.params.id as string, {
      include: [
        { model: Customer, as: 'customer' },
        { model: Technician, as: 'technician' },
        { model: Brand, as: 'brand' },
        { model: DeviceType, as: 'deviceType' },
        { model: ServiceCategory, as: 'serviceCategory' },
        { model: BookingBefore, as: 'beforePhotos' },
        { model: BookingAfter, as: 'afterPhotos' },
        { model: TrackingHistory, as: 'histories' },
        { model: Invoice, as: 'invoices', include: [{ model: Payment, as: 'payments' }] }
      ]
    });
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    
    const progress = computeProgress(data.status);
    res.json({ success: true, data: { ...data.toJSON(), progressPercentage: progress } });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

export const getTrackingByCode = async (req: Request, res: Response) => {
  try {
    const data = await Booking.findOne({
      where: { bookingNumber: req.params.code },
      include: [
        { model: Customer, as: 'customer' },
        { model: Technician, as: 'technician' },
        { model: Brand, as: 'brand' },
        { model: DeviceType, as: 'deviceType' },
        { model: ServiceCategory, as: 'serviceCategory' },
        { model: BookingBefore, as: 'beforePhotos' },
        { model: BookingAfter, as: 'afterPhotos' },
        { model: TrackingHistory, as: 'histories' },
        { model: Invoice, as: 'invoices', include: [{ model: Payment, as: 'payments' }] }
      ],
      order: [[{ model: TrackingHistory, as: 'histories' }, 'createdAt', 'ASC']]
    });

    if (!data) return res.status(404).json({ success: false, message: 'Kode tracking tidak ditemukan' });

    const progress = computeProgress(data.status);
    res.json({ success: true, data: { ...data.toJSON(), progressPercentage: progress } });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

export const approveEstimate = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findOne({ where: { bookingNumber: req.params.code } });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking tidak ditemukan' });

    await booking.update({ status: 'Repairing' });

    await TrackingHistory.create({
      bookingId: booking.id,
      status: 'REPAIRING',
      title: 'Persetujuan Estimasi Diterima',
      description: 'Pelanggan telah menyetujui estimasi biaya perbaikan. Perbaikan sedang dimulai.',
      createdBy: (req as any).user?.id || null
    });

    res.json({ success: true, message: 'Estimasi biaya telah disetujui. Perbaikan dimulai.' });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

export const rejectEstimate = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findOne({ where: { bookingNumber: req.params.code } });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking tidak ditemukan' });

    await booking.update({ status: 'Cancelled' });

    await TrackingHistory.create({
      bookingId: booking.id,
      status: 'CANCELLED',
      title: 'Estimasi Biaya Ditolak',
      description: 'Pelanggan tidak menyetujui estimasi biaya dan membatalkan perbaikan.',
      createdBy: (req as any).user?.id || null
    });

    res.json({ success: true, message: 'Pemesanan perbaikan telah dibatalkan.' });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

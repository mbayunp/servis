import { Request, Response } from 'express';
import { Op } from 'sequelize';
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

const includeModels = [
  { model: Customer, as: 'customer' },
  { model: Technician, as: 'technician' },
  { model: Brand, as: 'brand' },
  { model: DeviceType, as: 'deviceType' },
  { model: ServiceCategory, as: 'serviceCategory' },
  { model: BookingBefore, as: 'beforePhotos' },
  { model: BookingAfter, as: 'afterPhotos' },
  { model: TrackingHistory, as: 'histories' },
  { model: Invoice, as: 'invoice' },
  { model: Invoice, as: 'invoices' }
];

const sanitizeBookingPayload = (body: any) => {
  const payload = { ...body };
  const fkKeys = ['customerId', 'technicianId', 'brandId', 'deviceTypeId', 'serviceCategoryId'];
  fkKeys.forEach(key => {
    if (payload[key] !== undefined && (!payload[key] || typeof payload[key] !== 'string' || payload[key].trim() === '')) {
      payload[key] = null;
    }
  });
  return payload;
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { search, status, technicianId, startDate, endDate } = req.query;

    let whereCondition: any = {};

    if (search) {
      whereCondition[Op.or] = [
        { bookingNumber: { [Op.like]: `%${search}%` } },
        { deviceName: { [Op.like]: `%${search}%` } },
        { '$customer.fullName$': { [Op.like]: `%${search}%` } },
        { '$customer.phoneNumber$': { [Op.like]: `%${search}%` } }
      ];
    }
    if (status) {
      whereCondition.status = status;
    }
    if (technicianId) {
      whereCondition.technicianId = technicianId;
    }
    if (startDate && endDate) {
      whereCondition.createdAt = {
        [Op.between]: [new Date(startDate as string), new Date(endDate as string)]
      };
    }

    const { count, rows } = await Booking.findAndCountAll({
      where: whereCondition,
      include: includeModels,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({ 
      success: true, 
      data: rows,
      meta: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      }
    });
  } catch (error: any) { 
    res.status(500).json({ success: false, message: error.message }); 
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await Booking.findByPk(req.params.id as string, {
      include: includeModels
    });
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

export const create = async (req: Request, res: Response) => {
  try {
    const bookingNumber = 'SCJ-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(100 + Math.random()*900);
    const payload = sanitizeBookingPayload(req.body);
    const data = await Booking.create({ ...payload, bookingNumber });
    
    // Automatically record tracking history
    await TrackingHistory.create({
      bookingId: data.id,
      status: 'PENDING',
      title: 'Booking Dibuat',
      description: 'Pemesanan perbaikan baru telah terdaftar di sistem.',
      createdBy: (req as any).user?.id || null
    });

    res.status(201).json({ success: true, data });
  } catch (error: any) { res.status(400).json({ success: false, message: error.message }); }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await Booking.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    
    const oldTechId = data.technicianId;
    const payload = sanitizeBookingPayload(req.body);
    await data.update(payload);

    // If technician changed, record event
    if (payload.technicianId && payload.technicianId !== oldTechId) {
      const tech = await Technician.findByPk(payload.technicianId);
      await TrackingHistory.create({
        bookingId: data.id,
        status: data.status,
        title: 'Teknisi Ditugaskan',
        description: tech ? `Perangkat telah ditugaskan kepada teknisi ${tech.name}.` : 'Teknisi baru telah ditugaskan.',
        createdBy: (req as any).user?.id || null
      });
    }

    // If diagnosis/estimatedCost was added/updated
    if (payload.diagnosis || payload.estimatedCost) {
      await TrackingHistory.create({
        bookingId: data.id,
        status: 'CHECKING',
        title: 'Diagnosa & Estimasi Disiapkan',
        description: `Hasil diagnosa: ${payload.diagnosis || 'Sudah diperiksa'}. Estimasi biaya: Rp ${Number(payload.estimatedCost || data.estimatedCost || 0).toLocaleString('id-ID')}`,
        createdBy: (req as any).user?.id || null
      });
    }

    res.json({ success: true, data });
  } catch (error: any) { res.status(400).json({ success: false, message: error.message }); }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const data = await Booking.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    
    const newStatus = req.body.status;
    const diagnosis = req.body.diagnosis || req.body.diagnosisNotes;

    const updatePayload: any = { status: newStatus };
    if (diagnosis !== undefined && diagnosis !== null) {
      updatePayload.diagnosis = diagnosis;
    }

    await data.update(updatePayload);

    // History Titles Mapping
    const titleMap: Record<string, { title: string; desc: string }> = {
      'Pending': { title: 'Booking Didaftarkan', desc: 'Menunggu penerimaan dari bengkel' },
      'Received': { title: 'Barang Diterima', desc: 'Perangkat telah diterima oleh admin di workshop' },
      'Checking': { title: 'Sedang Pemeriksaan', desc: diagnosis ? `Catatan Diagnosa: ${diagnosis}` : 'Teknisi sedang membongkar dan memeriksa masalah perangkat' },
      'Waiting Approval': { title: 'Menunggu Persetujuan Estimasi', desc: diagnosis ? `Hasil Diagnosa: ${diagnosis}` : 'Estimasi rincian biaya telah dikirimkan ke pelanggan' },
      'Repairing': { title: 'Proses Perbaikan', desc: 'Teknisi sedang melakukan perbaikan / penggantian sparepart' },
      'QC': { title: 'Quality Control (QC)', desc: 'Pengujian fungsi dan kualitas setelah perbaikan' },
      'Finished': { title: 'Servis Selesai', desc: 'Perangkat selesai diperbaiki dan siap diambil' },
      'Picked Up': { title: 'Barang Sudah Diambil', desc: 'Perangkat telah diserahkan kembali kepada pelanggan' },
      'Cancelled': { title: 'Dibatalkan', desc: 'Pemesanan perbaikan telah dibatalkan' }
    };

    const statusInfo = titleMap[newStatus] || {
      title: `Status: ${newStatus}`,
      desc: diagnosis ? `Catatan Diagnosa: ${diagnosis}` : `Status pengerjaan diperbarui menjadi ${newStatus}`
    };

    await TrackingHistory.create({
      bookingId: data.id,
      status: newStatus.toUpperCase().replace(/\s+/g, '_'),
      title: statusInfo.title,
      description: statusInfo.desc,
      createdBy: (req as any).user?.id || null
    });

    res.json({ success: true, data });
  } catch (error: any) { res.status(400).json({ success: false, message: error.message }); }
};

export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    const rawType = req.body?.type || req.params?.type || 'BEFORE';
    const type = String(rawType).toLowerCase();
    const bookingId = req.params.id as string;
    const booking = await Booking.findByPk(bookingId);
    
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (!req.file) return res.status(400).json({ success: false, message: 'File foto tidak ditemukan' });

    const photoData = {
      bookingId,
      photoUrl: `/uploads/${type}/${req.file.filename}`,
      notes: req.body?.notes || '',
      uploadedBy: (req as any).user?.id || null
    };

    let result;
    if (type === 'before') {
      result = await BookingBefore.create(photoData);
      await TrackingHistory.create({
        bookingId,
        status: 'CHECKING',
        title: 'Foto Sebelum Perbaikan Diunggah',
        description: 'Dokumentasi kondisi perangkat awal sebelum tindakan servis.',
        createdBy: (req as any).user?.id || null
      });
    } else {
      result = await BookingAfter.create(photoData);
      await TrackingHistory.create({
        bookingId,
        status: 'QC',
        title: 'Foto Sesudah Perbaikan Diunggah',
        description: 'Dokumentasi kondisi fisik perangkat setelah selesai diperbaiki.',
        createdBy: (req as any).user?.id || null
      });
    }

    res.json({ success: true, data: result, message: 'Photo uploaded successfully' });
  } catch (error: any) { 
    res.status(400).json({ success: false, message: error.message }); 
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const data = await Booking.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    await data.destroy();
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

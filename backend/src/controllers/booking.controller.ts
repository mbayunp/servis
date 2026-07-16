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

const includeModels = [
  { model: Customer, as: 'customer' },
  { model: Technician, as: 'technician' },
  { model: Brand, as: 'brand' },
  { model: DeviceType, as: 'deviceType' },
  { model: ServiceCategory, as: 'serviceCategory' },
  { model: BookingBefore, as: 'beforePhotos' },
  { model: BookingAfter, as: 'afterPhotos' }
];

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
        { deviceName: { [Op.like]: `%${search}%` } }
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
    const bookingNumber = 'SCJ-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(Math.random()*1000);
    const data = await Booking.create({ ...req.body, bookingNumber });
    res.status(201).json({ success: true, data });
  } catch (error: any) { res.status(400).json({ success: false, message: error.message }); }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await Booking.findByPk((req.params.id as string));
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    await data.update(req.body);
    res.json({ success: true, data });
  } catch (error: any) { res.status(400).json({ success: false, message: error.message }); }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const data = await Booking.findByPk((req.params.id as string));
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    
    const newStatus = req.body.status;
    const currentStatus = data.status;

    // Workflow validation
    const statusOrder = ['Pending', 'Checking', 'Repairing', 'Finished'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const newIndex = statusOrder.indexOf(newStatus);

    if (newStatus === 'Cancelled') {
      if (currentStatus === 'Finished') {
        return res.status(400).json({ success: false, message: 'Cannot cancel a finished booking' });
      }
    } else if (currentIndex !== -1 && newIndex !== -1) {
      if (newIndex < currentIndex) {
        return res.status(400).json({ success: false, message: 'Cannot move status backwards' });
      }
      if (newIndex > currentIndex + 1) {
        return res.status(400).json({ success: false, message: 'Cannot skip status workflow' });
      }
    }

    await data.update({ status: newStatus });
    res.json({ success: true, data });
  } catch (error: any) { res.status(400).json({ success: false, message: error.message }); }
};

export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    const { type } = req.body; // 'before' or 'after'
    const bookingId = req.params.id as string;
    const booking = await Booking.findByPk(bookingId);
    
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (!req.file) return res.status(400).json({ success: false, message: 'No image uploaded' });

    const photoData = {
      bookingId,
      photoUrl: `/uploads/${type}/${req.file.filename}`,
      notes: req.body.notes || '',
      uploadedBy: (req as any).user?.id || null
    };

    let result;
    if (type === 'before') {
      result = await BookingBefore.create(photoData);
    } else {
      result = await BookingAfter.create(photoData);
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

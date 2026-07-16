import { Request, Response } from 'express';
import Booking from '../models/booking.model.js';

import Customer from '../models/customer.model.js';
import Technician from '../models/technician.model.js';
import Brand from '../models/brand.model.js';
import DeviceType from '../models/device-type.model.js';
import ServiceCategory from '../models/service-category.model.js';
import BookingBefore from '../models/bookingBefore.model.js';
import BookingAfter from '../models/bookingAfter.model.js';

export const getTracking = async (_req: Request, res: Response) => {
  try {
    const data = await Booking.findAll();
    res.json({ success: true, data });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

export const getTrackingById = async (req: Request, res: Response) => {
  try {
    const data = await Booking.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
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
        { model: BookingAfter, as: 'afterPhotos' }
      ]
    });
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

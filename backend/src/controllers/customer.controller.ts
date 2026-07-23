import { Request, Response } from 'express';
import Customer from '../models/customer.model.js';
import Booking from '../models/booking.model.js';

const sanitizePayload = (body: any) => {
  const payload = { ...body };
  if (!payload.userId || typeof payload.userId !== 'string' || payload.userId.trim() === '') {
    payload.userId = null;
  }
  return payload;
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await Customer.findAll({
      include: [
        {
          model: Booking,
          as: 'bookings',
          attributes: ['id', 'bookingNumber', 'status', 'deviceName', 'createdAt']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await Customer.findByPk(req.params.id as string, {
      include: [
        {
          model: Booking,
          as: 'bookings',
          order: [['createdAt', 'DESC']]
        }
      ]
    });
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const payload = sanitizePayload(req.body);
    const data = await Customer.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await Customer.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    
    const payload = sanitizePayload(req.body);
    await data.update(payload);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const data = await Customer.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    await data.destroy();
    res.json({ success: true, message: 'Customer deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import { Request, Response } from 'express';
import Payment from '../models/payment.model.js';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await Payment.findAll();
    res.json({ success: true, data });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await Payment.findByPk((req.params.id as string));
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

export const create = async (req: Request, res: Response) => {
  try {
    const proofImage = req.file ? req.file.filename : undefined;
    const paymentNumber = 'PAY-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(Math.random()*1000);
    const data = await Payment.create({ ...req.body, proofImage, paymentNumber });
    res.status(201).json({ success: true, data });
  } catch (error: any) { res.status(400).json({ success: false, message: error.message }); }
};

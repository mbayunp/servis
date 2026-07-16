import { Request, Response } from 'express';
import Invoice from '../models/invoice.model.js';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await Invoice.findAll();
    res.json({ success: true, data });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await Invoice.findByPk((req.params.id as string));
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { serviceCost = 0, sparepartCost = 0, discount = 0, tax = 0 } = req.body;
    const subtotal = Number(serviceCost) + Number(sparepartCost);
    const total = subtotal - Number(discount) + Number(tax);
    
    const invoiceNumber = 'INV-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(Math.random()*1000);
    const data = await Invoice.create({ ...req.body, subtotal, total, invoiceNumber });
    res.status(201).json({ success: true, data });
  } catch (error: any) { res.status(400).json({ success: false, message: error.message }); }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await Invoice.findByPk((req.params.id as string));
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    
    const serviceCost = req.body.serviceCost !== undefined ? req.body.serviceCost : data.serviceCost;
    const sparepartCost = req.body.sparepartCost !== undefined ? req.body.sparepartCost : data.sparepartCost;
    const discount = req.body.discount !== undefined ? req.body.discount : data.discount;
    const tax = req.body.tax !== undefined ? req.body.tax : data.tax;

    const subtotal = Number(serviceCost) + Number(sparepartCost);
    const total = subtotal - Number(discount) + Number(tax);

    await data.update({ ...req.body, subtotal, total });
    res.json({ success: true, data });
  } catch (error: any) { res.status(400).json({ success: false, message: error.message }); }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const data = await Invoice.findByPk((req.params.id as string));
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    await data.destroy();
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) { res.status(500).json({ success: false, message: error.message }); }
};

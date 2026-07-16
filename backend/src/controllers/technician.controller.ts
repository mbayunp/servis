import { Request, Response } from 'express';
import Technician from '../models/technician.model.js';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await Technician.findAll();
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await Technician.findByPk((req.params.id as string));
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const photo = req.file ? req.file.filename : undefined;
    const data = await Technician.create({ ...req.body, photo });
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await Technician.findByPk((req.params.id as string));
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    const photo = req.file ? req.file.filename : data.photo;
    await data.update({ ...req.body, photo });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const data = await Technician.findByPk((req.params.id as string));
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    await data.destroy();
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

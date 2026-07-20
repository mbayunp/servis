import { Request, Response } from 'express';
import Setting from '../models/settings.model.js';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await Setting.findAll();
    const settingsObject: Record<string, string | null> = {};
    data.forEach(item => {
      settingsObject[item.key] = item.value;
    });
    res.json({ success: true, data: settingsObject, raw: data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBulk = async (req: Request, res: Response) => {
  try {
    const settings = req.body; // Key-value map object e.g. { companyName: 'Servis Cianjur', phone: '08123' }
    for (const [key, value] of Object.entries(settings)) {
      const existing = await Setting.findOne({ where: { key } });
      if (existing) {
        await existing.update({ value: String(value) });
      } else {
        await Setting.create({ key, value: String(value), group: 'general' });
      }
    }
    res.json({ success: true, message: 'Settings saved successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Role, as: 'role' }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await User.findByPk(req.params.id as string, {
      attributes: { exclude: ['password'] },
      include: [{ model: Role, as: 'role' }]
    });
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password || 'password123', 10);
    const data = await User.create({ ...rest, password: hashedPassword });
    const userWithoutPassword = await User.findByPk(data.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Role, as: 'role' }]
    });
    res.status(201).json({ success: true, data: userWithoutPassword });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await User.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }

    await data.update(updateData);
    const updatedUser = await User.findByPk(data.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Role, as: 'role' }]
    });
    res.json({ success: true, data: updatedUser });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const data = await User.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    await data.destroy();
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import { Request, Response } from 'express';
import Role from '../models/role.model.js';
import Permission from '../models/permission.model.js';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await Role.findAll({
      include: [{ model: Permission, as: 'permissions' }],
      order: [['createdAt', 'ASC']]
    });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await Role.findByPk(req.params.id as string, {
      include: [{ model: Permission, as: 'permissions' }]
    });
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, description, selectedPermissionIds } = req.body;
    const data = await Role.create({ name, description });

    if (selectedPermissionIds && Array.isArray(selectedPermissionIds)) {
      await (data as any).setPermissions(selectedPermissionIds);
    }

    const updatedRole = await Role.findByPk(data.id, {
      include: [{ model: Permission, as: 'permissions' }]
    });
    res.status(201).json({ success: true, data: updatedRole });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await Role.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    
    const { name, description, selectedPermissionIds } = req.body;
    await data.update({ name, description });

    if (selectedPermissionIds && Array.isArray(selectedPermissionIds)) {
      await (data as any).setPermissions(selectedPermissionIds);
    }

    const updatedRole = await Role.findByPk(data.id, {
      include: [{ model: Permission, as: 'permissions' }]
    });
    res.json({ success: true, data: updatedRole });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const data = await Role.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    await data.destroy();
    res.json({ success: true, message: 'Role deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

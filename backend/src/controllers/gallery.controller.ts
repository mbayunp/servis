import { Request, Response } from 'express';
import Gallery from '../models/gallery.model.js';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await Gallery.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await Gallery.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { title, category, description } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Judul foto wajib diisi.' });
    }

    let finalImagePath: string | null = null;

    if (req.file) {
      finalImagePath = `/uploads/gallery/${req.file.filename}`;
    } else if (typeof req.body.imageUrl === 'string' && req.body.imageUrl.trim() !== '') {
      finalImagePath = req.body.imageUrl.trim();
    } else if (Array.isArray(req.body.imageUrl) && typeof req.body.imageUrl[0] === 'string' && req.body.imageUrl[0].trim() !== '') {
      finalImagePath = req.body.imageUrl[0].trim();
    } else if (typeof req.body.image === 'string' && req.body.image.trim() !== '') {
      finalImagePath = req.body.image.trim();
    } else if (Array.isArray(req.body.image) && typeof req.body.image[0] === 'string' && req.body.image[0].trim() !== '') {
      finalImagePath = req.body.image[0].trim();
    }

    if (!finalImagePath) {
      return res.status(400).json({
        success: false,
        message: 'Gambar foto galeri wajib diunggah atau dimasukkan via URL.'
      });
    }

    const data = await Gallery.create({
      title: title.trim(),
      category: typeof category === 'string' ? category : 'Hasil Servis',
      description: typeof description === 'string' ? description : '',
      imageUrl: finalImagePath
    });

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await Gallery.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });

    const updateData: any = {};
    if (typeof req.body.title === 'string' && req.body.title.trim()) {
      updateData.title = req.body.title.trim();
    }
    if (typeof req.body.category === 'string') updateData.category = req.body.category;
    if (typeof req.body.description === 'string') updateData.description = req.body.description;

    let finalImagePath: string | null = null;

    if (req.file) {
      finalImagePath = `/uploads/gallery/${req.file.filename}`;
    } else if (typeof req.body.imageUrl === 'string' && req.body.imageUrl.trim() !== '') {
      finalImagePath = req.body.imageUrl.trim();
    } else if (Array.isArray(req.body.imageUrl) && typeof req.body.imageUrl[0] === 'string' && req.body.imageUrl[0].trim() !== '') {
      finalImagePath = req.body.imageUrl[0].trim();
    } else if (typeof req.body.image === 'string' && req.body.image.trim() !== '') {
      finalImagePath = req.body.image.trim();
    } else if (Array.isArray(req.body.image) && typeof req.body.image[0] === 'string' && req.body.image[0].trim() !== '') {
      finalImagePath = req.body.image[0].trim();
    }

    if (finalImagePath) {
      updateData.imageUrl = finalImagePath;
    }

    await data.update(updateData);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const data = await Gallery.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    await data.destroy();
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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
    const { title, category, description, imageUrl, image } = req.body;
    
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Judul foto wajib diisi.' });
    }

    let imagePath: string | null = null;
    if (req.file) {
      imagePath = `/uploads/gallery/${req.file.filename}`;
    } else if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
      imagePath = imageUrl.trim();
    } else if (image && typeof image === 'string' && image.trim()) {
      imagePath = image.trim();
    }

    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: 'Gambar foto galeri wajib diunggah atau dimasukkan via URL.'
      });
    }

    const data = await Gallery.create({
      title: title.trim(),
      category: category || 'Hasil Servis',
      description: description || '',
      imageUrl: imagePath
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
    if (req.body.title !== undefined && req.body.title.trim()) {
      updateData.title = req.body.title.trim();
    }
    if (req.body.category !== undefined) {
      updateData.category = req.body.category;
    }
    if (req.body.description !== undefined) {
      updateData.description = req.body.description;
    }

    if (req.file) {
      updateData.imageUrl = `/uploads/gallery/${req.file.filename}`;
    } else if (req.body.imageUrl && typeof req.body.imageUrl === 'string' && req.body.imageUrl.trim()) {
      updateData.imageUrl = req.body.imageUrl.trim();
    } else if (req.body.image && typeof req.body.image === 'string' && req.body.image.trim()) {
      updateData.imageUrl = req.body.image.trim();
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

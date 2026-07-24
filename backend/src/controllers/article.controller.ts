import { Request, Response } from 'express';
import Article from '../models/article.model.js';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await Article.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await Article.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, category, status, author } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Judul artikel wajib diisi.' });
    }
    if (!content || typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Isi konten artikel wajib diisi.' });
    }

    let finalImagePath: string | null = null;

    if (req.file) {
      finalImagePath = `/uploads/articles/${req.file.filename}`;
    } else if (typeof req.body.image === 'string' && req.body.image.trim() !== '') {
      finalImagePath = req.body.image.trim();
    } else if (Array.isArray(req.body.image) && typeof req.body.image[0] === 'string' && req.body.image[0].trim() !== '') {
      finalImagePath = req.body.image[0].trim();
    } else if (typeof req.body.imageUrl === 'string' && req.body.imageUrl.trim() !== '') {
      finalImagePath = req.body.imageUrl.trim();
    } else if (Array.isArray(req.body.imageUrl) && typeof req.body.imageUrl[0] === 'string' && req.body.imageUrl[0].trim() !== '') {
      finalImagePath = req.body.imageUrl[0].trim();
    }

    if (!finalImagePath) {
      return res.status(400).json({
        success: false,
        message: 'Gambar sampul artikel wajib diunggah atau dimasukkan via URL.'
      });
    }

    const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const data = await Article.create({
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: typeof excerpt === 'string' ? excerpt : null,
      category: typeof category === 'string' ? category : 'Edukasi Servis',
      status: typeof status === 'string' ? status : 'PUBLISHED',
      author: typeof author === 'string' ? author : 'Admin',
      image: finalImagePath
    });

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await Article.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });

    const updateData: any = {};
    if (typeof req.body.title === 'string' && req.body.title.trim()) {
      updateData.title = req.body.title.trim();
      updateData.slug = req.body.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (typeof req.body.excerpt === 'string') updateData.excerpt = req.body.excerpt;
    if (typeof req.body.content === 'string') updateData.content = req.body.content;
    if (typeof req.body.category === 'string') updateData.category = req.body.category;
    if (typeof req.body.status === 'string') updateData.status = req.body.status;
    if (typeof req.body.author === 'string') updateData.author = req.body.author;

    let finalImagePath: string | null = null;
    if (req.file) {
      finalImagePath = `/uploads/articles/${req.file.filename}`;
    } else if (typeof req.body.image === 'string' && req.body.image.trim() !== '') {
      finalImagePath = req.body.image.trim();
    } else if (Array.isArray(req.body.image) && typeof req.body.image[0] === 'string' && req.body.image[0].trim() !== '') {
      finalImagePath = req.body.image[0].trim();
    } else if (typeof req.body.imageUrl === 'string' && req.body.imageUrl.trim() !== '') {
      finalImagePath = req.body.imageUrl.trim();
    } else if (Array.isArray(req.body.imageUrl) && typeof req.body.imageUrl[0] === 'string' && req.body.imageUrl[0].trim() !== '') {
      finalImagePath = req.body.imageUrl[0].trim();
    }

    if (finalImagePath) {
      updateData.image = finalImagePath;
    }

    await data.update(updateData);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const data = await Article.findByPk(req.params.id as string);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    await data.destroy();
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

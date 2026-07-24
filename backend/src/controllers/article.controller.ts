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
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Judul artikel wajib diisi' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Isi artikel wajib diisi' });
    }
    let imagePath = req.body.image || null;
    if (req.file) {
      imagePath = `/uploads/articles/${req.file.filename}`;
    }
    const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `article-${Date.now()}`;
    const data = await Article.create({
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: excerpt || null,
      category: category || 'Edukasi Servis',
      status: status || 'PUBLISHED',
      author: author || 'Admin',
      image: imagePath
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
    const updateData: any = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/articles/${req.file.filename}`;
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

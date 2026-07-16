import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(`\n=== LOGIN ATTEMPT ===`);
    console.log(`req.body received:`, JSON.stringify(req.body));
    console.log(`Attempting to find user with email: ${email}`);

    // PERBAIKAN 1: Tambahkan attributes untuk memaksa menarik kolom password
    const user = await User.findOne({
      where: { email },
      attributes: { include: ['password'] },
      include: [{ model: Role, as: 'role' }]
    });

    console.log(`User query result found:`, !!user);
    if (user) {
      console.log(`User extracted password hash:`, user.password);
    }

    // PERBAIKAN 2 (Opsional tapi penting): Tambahkan log untuk debugging
    if (!user) {
      console.log("Login Gagal: Email tidak ditemukan di database.");
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log("Login Gagal: Password salah untuk email", email);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Pengecekan status
    if (user.status !== 'ACTIVE') {
      return res.status(403).json({ success: false, message: 'Account is deactivated' });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: (user as any).role?.name
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'refresh-secret', { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any });

    await user.update({ refreshToken });

    res.json({
      success: true,
      message: 'Login successful',
      data: { accessToken, refreshToken, user: payload }
    });
  } catch (error: any) {
    console.error("Error Sistem saat Login:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password', 'refreshToken'] },
      include: [{ model: Role, as: 'role' }]
    });
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    await User.update({ refreshToken: null }, { where: { id: userId } });
    res.json({ success: true, message: 'Logout successful' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ success: false, message: 'Refresh token is required' });

    const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh-secret');
    const user = await User.findByPk(decoded.id);

    if (!user || (user as any).refreshToken !== refreshToken) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    const payload = { id: user.id, email: user.email, role: decoded.role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any });
    const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'refresh-secret', { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any });

    await user.update({ refreshToken: newRefreshToken });

    res.json({
      success: true,
      data: { accessToken, refreshToken: newRefreshToken }
    });
  } catch (error: any) {
    res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
};

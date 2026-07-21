import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import Permission from '../models/permission.model.js';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    const user = await User.findByPk(decoded.id, {
      include: [
        {
          model: Role,
          as: 'role',
          include: [
            {
              model: Permission,
              as: 'permissions',
              attributes: ['name']
            }
          ]
        }
      ]
    });
    
    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' });
      return;
    }
    
    if (user.status !== 'ACTIVE') {
      res.status(401).json({ success: false, message: 'User is not active' });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const authorize = (allowedRolesOrPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user || !user.role) {
      res.status(403).json({ success: false, message: 'You do not have permission to access this resource (No role assigned)' });
      return;
    }
    
    const userRole = user.role.name || '';
    const userRoleUpper = userRole.toUpperCase().replace(/\s+/g, '_');
    
    if (userRoleUpper === 'SUPER_ADMIN' || userRoleUpper === 'SUPERADMIN') {
      return next(); 
    }

    const allowedUpper = allowedRolesOrPermissions.map(r => r.toUpperCase().replace(/\s+/g, '_'));

    if (allowedUpper.includes(userRoleUpper)) {
      return next();
    }
    
    const userPermissions = user.role.permissions?.map((p: any) => p.name?.toUpperCase().replace(/\s+/g, '_')) || [];
    const hasPermission = allowedUpper.some(p => userPermissions.includes(p));
    
    if (hasPermission) {
      return next();
    }

    res.status(403).json({ success: false, message: 'You do not have permission to access this resource' });
  };
};

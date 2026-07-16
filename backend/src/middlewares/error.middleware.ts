import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.js';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

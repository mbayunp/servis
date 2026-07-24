import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const fileFilter = (_req: any, file: any, cb: any) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and WEBP are allowed.'), false);
  }
};

const createUploader = (destPath: string) => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      cb(null, destPath);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuidv4()}${ext}`);
    }
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter
  });
};

export const profileUpload = createUploader('uploads/profile/');
export const brandUpload = createUploader('uploads/company/brands/');
export const deviceTypeUpload = createUploader('uploads/company/device-types/');
export const technicianUpload = createUploader('uploads/technician/');
export const beforeUpload = createUploader('uploads/before/');
export const afterUpload = createUploader('uploads/after/');
export const paymentUpload = createUploader('uploads/finance/payments/');
export const articleUpload = createUploader('uploads/articles/');
export const galleryUpload = createUploader('uploads/gallery/');

import { Router } from 'express';
import { getAll, getById, create, update, updateStatus, uploadPhoto, remove } from '../controllers/booking.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { beforeUpload, afterUpload } from '../middleware/upload.middleware.js';

const router = Router();
router.use(authenticate);

router.get('/', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'CUSTOMER', 'TEKNISI']), getAll);
router.get('/:id', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'CUSTOMER', 'TEKNISI']), getById);
router.post('/', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), create);
router.put('/:id', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), update);
router.patch('/:id/status', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'TEKNISI']), updateStatus);
router.delete('/:id', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), remove);

// Upload routes
router.post(
  '/:id/photos/before',
  authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'TEKNISI']),
  beforeUpload.single('photo'),
  (req, _res, next) => {
    if (req.body) req.body.type = 'before';
    next();
  },
  uploadPhoto
);

router.post(
  '/:id/photos/after',
  authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'TEKNISI']),
  afterUpload.single('photo'),
  (req, _res, next) => {
    if (req.body) req.body.type = 'after';
    next();
  },
  uploadPhoto
);

router.post(
  '/:id/photos/:type',
  authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'TEKNISI']),
  (req, res, next) => {
    const photoType = String(req.params.type || 'before').toLowerCase();
    const uploader = photoType === 'after' ? afterUpload : beforeUpload;
    uploader.single('photo')(req, res, (err) => {
      if (err) return next(err);
      if (req.body) req.body.type = photoType;
      next();
    });
  },
  uploadPhoto
);

router.post(
  '/:id/photos',
  authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'TEKNISI']),
  beforeUpload.single('photo'),
  uploadPhoto
);

export default router;


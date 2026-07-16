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
router.post('/:id/photos/before', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'TEKNISI']), (req, _res, next) => { req.body.type = 'before'; next(); }, beforeUpload.single('photo'), uploadPhoto);
router.post('/:id/photos/after', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'TEKNISI']), (req, _res, next) => { req.body.type = 'after'; next(); }, afterUpload.single('photo'), uploadPhoto);

export default router;

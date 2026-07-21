import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/technician.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { technicianUpload } from '../middleware/upload.middleware.js';

const router = Router();
router.use(authenticate);

router.get('/', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'CUSTOMER', 'TEKNISI']), getAll);
router.get('/:id', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'CUSTOMER', 'TEKNISI']), getById);
router.post('/', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), technicianUpload.single('photo'), create);
router.put('/:id', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), technicianUpload.single('photo'), update);
router.delete('/:id', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), remove);

export default router;

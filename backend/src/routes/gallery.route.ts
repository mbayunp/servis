import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/gallery.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authenticate, authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), create);
router.put('/:id', authenticate, authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), update);
router.delete('/:id', authenticate, authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), remove);

export default router;

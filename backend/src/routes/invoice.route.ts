import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/invoice.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();
router.use(authenticate);

router.get('/', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'CUSTOMER']), getAll);
router.get('/:id', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'CUSTOMER']), getById);
router.post('/', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), create);
router.put('/:id', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), update);
router.delete('/:id', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), remove);

export default router;

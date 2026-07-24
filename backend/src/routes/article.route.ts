import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/article.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { articleUpload } from '../middleware/upload.middleware.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authenticate, authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), articleUpload.single('image'), create);
router.put('/:id', authenticate, authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), articleUpload.single('image'), update);
router.delete('/:id', authenticate, authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), remove);

export default router;

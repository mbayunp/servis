import { Router } from 'express';
import { getAll, updateBulk } from '../controllers/settings.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAll);
router.post('/', authenticate, authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), updateBulk);

export default router;

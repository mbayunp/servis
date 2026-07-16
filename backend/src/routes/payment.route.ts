import { Router } from 'express';
import { getAll, getById, create } from '../controllers/payment.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { paymentUpload } from '../middleware/upload.middleware.js';

const router = Router();
router.use(authenticate);

router.get('/', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'CUSTOMER']), getAll);
router.get('/:id', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN', 'CUSTOMER']), getById);
router.post('/', authorize(['SUPER_ADMIN', 'OWNER', 'ADMIN']), paymentUpload.single('proofImage'), create);

export default router;

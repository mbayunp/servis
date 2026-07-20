import { Router } from 'express';
import { getTracking, getTrackingById, getTrackingByCode, approveEstimate, rejectEstimate } from '../controllers/tracking.controller.js';

const router = Router();

router.get('/', getTracking);
router.get('/:id', getTrackingById);
router.get('/code/:code', getTrackingByCode);
router.post('/code/:code/approve', approveEstimate);
router.post('/code/:code/reject', rejectEstimate);

export default router;

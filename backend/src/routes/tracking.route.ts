import { Router } from 'express';
import { getTracking, getTrackingById, getTrackingByCode } from '../controllers/tracking.controller.js';

const router = Router();

router.get('/', getTracking);
router.get('/:id', getTrackingById);
router.get('/code/:code', getTrackingByCode);

export default router;

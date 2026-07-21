import { Router } from 'express';
import { getMasterData, createPublicBooking } from '../controllers/public.controller.js';

const router = Router();

router.get('/master-data', getMasterData);
router.post('/booking', createPublicBooking);

export default router;

import { Router } from 'express';
import { getSummary, getChartBookings, getActivity } from '../controllers/dashboard.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();
router.use(authenticate);

const allowed = ['SUPER_ADMIN', 'OWNER', 'ADMIN', 'TEKNISI'];

router.get('/summary', authorize(allowed), getSummary);
router.get('/chart/bookings', authorize(allowed), getChartBookings);
router.get('/activity', authorize(allowed), getActivity);

export default router;

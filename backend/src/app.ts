import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import compression from 'compression';
import rateLimit from 'express-rate-limit';

// 1. Inisialisasi
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Middleware Dasar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// 3. Static Files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. Import Routes
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import roleRoute from './routes/role.route.js';
import permissionRoute from './routes/permission.route.js';
import brandRoute from './routes/brand.route.js';
import deviceTypeRoute from './routes/device-type.route.js';
import serviceCategoryRoute from './routes/service-category.route.js';
import technicianRoute from './routes/technician.route.js';
import bookingRoute from './routes/booking.route.js';
import trackingRoute from './routes/tracking.route.js';
import dashboardRoute from './routes/dashboard.route.js';
import invoiceRoute from './routes/invoice.route.js';
import paymentRoute from './routes/payment.route.js';
import customerRoute from './routes/customer.route.js';
import articleRoute from './routes/article.route.js';
import galleryRoute from './routes/gallery.route.js';
import testimonialRoute from './routes/testimonial.route.js';
import settingsRoute from './routes/settings.route.js';
import publicRoute from './routes/public.route.js';

// 5. API Routes
app.get('/api', (_req, res) => res.json({ success: true, message: 'Servis Cianjur API v2 (MVC) is running' }));
app.use('/api/public', publicRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/roles', roleRoute);
app.use('/api/permissions', permissionRoute);
app.use('/api/brands', brandRoute);
app.use('/api/device-types', deviceTypeRoute);
app.use('/api/service-categories', serviceCategoryRoute);
app.use('/api/technicians', technicianRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/tracking', trackingRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/invoices', invoiceRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/customers', customerRoute);
app.use('/api/articles', articleRoute);
app.use('/api/gallery', galleryRoute);
app.use('/api/testimonials', testimonialRoute);
app.use('/api/settings', settingsRoute);

// 6. Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

export default app;

import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';

// Module routers (to be imported later)
// import userRoutes from './modules/user/user.route.js';

const app: Express = express();

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Base Route
app.get('/api', (req, res) => {
  res.json({ success: true, message: 'Servis Cianjur API v1 (Module Architecture)' });
});

// Module Routes Integration
// app.use('/api/users', userRoutes);

// Error Handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { config } from './config.js';
import { ping } from './db.js';
import { notFoundHandler, errorHandler } from './middleware/error.js';

import authRoutes from './routes/auth.routes.js';
import professionalsRoutes from './routes/professionals.routes.js';
import jobsRoutes from './routes/jobs.routes.js';
import bidsRoutes from './routes/bids.routes.js';
import reviewsRoutes from './routes/reviews.routes.js';
import meRoutes from './routes/me.routes.js';
import adminRoutes from './routes/admin.routes.js';
import uploadsRoutes from './routes/uploads.routes.js';

const app = express();
app.set('trust proxy', 1); // behind nginx/LiteSpeed reverse proxy

// Security headers; allow cross-origin loading of uploaded images.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin / curl (no origin) and configured frontends
      if (!origin || config.corsOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: '1mb' }));
app.use(morgan(config.env === 'production' ? 'combined' : 'dev'));

// Serve uploaded images statically.
app.use('/uploads', express.static(config.uploads.dir, { maxAge: '7d' }));

// Rate-limit auth endpoints to slow brute force.
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50, standardHeaders: true, legacyHeaders: false });

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await ping();
    res.json({ ok: true, env: config.env });
  } catch {
    res.status(503).json({ ok: false, error: 'database unavailable' });
  }
});

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/professionals', professionalsRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/bids', bidsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/me', meRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/uploads', uploadsRoutes);

// 404 + error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Mjeshtri API listening on :${config.port} (${config.env})`);
});

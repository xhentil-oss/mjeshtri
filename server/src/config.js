import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Project root = server/  (one level up from src/)
const serverRoot = path.resolve(__dirname, '..');

const required = (key) => {
  const v = process.env[key];
  if (!v) throw new Error(`Missing required env var: ${key}`);
  return v;
};

const uploadDir = process.env.UPLOAD_DIR || 'uploads';

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3001),
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),

  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: required('DB_USER'),
    password: process.env.DB_PASSWORD || '',
    database: required('DB_NAME'),
  },

  jwt: {
    secret: required('JWT_SECRET'),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  uploads: {
    // Absolute path on disk
    dir: path.isAbsolute(uploadDir) ? uploadDir : path.join(serverRoot, uploadDir),
    publicUrl: process.env.UPLOAD_PUBLIC_URL || 'http://localhost:3001/uploads',
    maxBytes: Number(process.env.MAX_UPLOAD_MB || 5) * 1024 * 1024,
  },

  seed: {
    adminEmail: process.env.SEED_ADMIN_EMAIL || 'admin@demo.al',
    adminPassword: process.env.SEED_ADMIN_PASSWORD || 'demo1234',
  },

  serverRoot,
};

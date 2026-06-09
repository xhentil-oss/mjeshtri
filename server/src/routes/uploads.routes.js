import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { config } from '../config.js';
import { newId } from '../utils/ids.js';
import { authenticate } from '../middleware/auth.js';
import { badRequest } from '../utils/http.js';

const router = Router();

// Ensure the upload directory exists at startup.
fs.mkdirSync(config.uploads.dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, config.uploads.dir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `${newId('img')}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: config.uploads.maxBytes, files: 8 },
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpe?g|png|webp|gif|avif)$/.test(file.mimetype)) cb(null, true);
    else cb(badRequest('Lejohen vetëm imazhe.'));
  },
});

// POST /api/uploads (multipart field name: "files") — returns public URLs
router.post(
  '/',
  authenticate(),
  upload.array('files', 8),
  (req, res) => {
    const base = config.uploads.publicUrl.replace(/\/$/, '');
    const urls = (req.files || []).map((f) => `${base}/${f.filename}`);
    res.status(201).json({ urls });
  },
);

export default router;

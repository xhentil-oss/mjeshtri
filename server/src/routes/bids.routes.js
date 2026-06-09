import { Router } from 'express';
import { pool, query, queryOne } from '../db.js';
import { serializeBid } from '../utils/serialize.js';
import { asyncHandler, badRequest, notFound, conflict, forbidden } from '../utils/http.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { newId } from '../utils/ids.js';

const router = Router();

// GET /api/bids/mine — the current professional's bids, with job context
router.get(
  '/mine',
  authenticate(),
  requireRole('professional'),
  asyncHandler(async (req, res) => {
    const rows = await query(
      `SELECT b.*, j.title AS job_title, j.status AS job_status, j.area AS job_area, j.category AS job_category
       FROM bids b JOIN jobs j ON j.id = b.job_id
       WHERE b.pro_id = ? ORDER BY b.created_at DESC`,
      [req.user.id],
    );
    res.json(
      rows.map((r) => ({
        ...serializeBid(r),
        job: { id: r.job_id, title: r.job_title, status: r.job_status, area: r.job_area, category: r.job_category },
      })),
    );
  }),
);

// POST /api/bids — professional places an offer on a job
router.post(
  '/',
  authenticate(),
  requireRole('professional'),
  asyncHandler(async (req, res) => {
    const { jobId, price, arrival, completion, message, label } = req.body || {};
    if (!jobId) throw badRequest('Mungon puna.');
    const priceNum = Number(price);
    if (!Number.isFinite(priceNum) || priceNum <= 0) throw badRequest('Vendos një çmim të vlefshëm.');

    const job = await queryOne('SELECT id, status FROM jobs WHERE id = ?', [jobId]);
    if (!job) throw notFound('Puna nuk u gjet.');
    if (job.status !== 'Open for Bids') throw conflict('Kjo punë nuk pranon më oferta.');

    // A professional whose profile isn't approved cannot bid.
    const pro = await queryOne("SELECT status FROM professionals WHERE id = ?", [req.user.id]);
    if (!pro || pro.status !== 'approved') throw forbidden('Profili yt nuk është aprovuar ende.');

    const existing = await queryOne('SELECT id FROM bids WHERE job_id = ? AND pro_id = ?', [jobId, req.user.id]);
    if (existing) throw conflict('Ke dërguar tashmë një ofertë për këtë punë.');

    const id = newId('bid');
    await pool.execute(
      `INSERT INTO bids (id, job_id, pro_id, price, arrival, completion, label, message, status)
       VALUES (?,?,?,?,?,?,?,?, 'pending')`,
      [id, jobId, req.user.id, priceNum, arrival || null, completion || null, label || null, message || null],
    );
    const bid = await queryOne('SELECT * FROM bids WHERE id = ?', [id]);
    res.status(201).json(serializeBid(bid));
  }),
);

export default router;

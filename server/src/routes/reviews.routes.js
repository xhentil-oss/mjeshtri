import { Router } from 'express';
import { pool, query, queryOne } from '../db.js';
import { serializeReview } from '../utils/serialize.js';
import { asyncHandler, badRequest, notFound, conflict, forbidden } from '../utils/http.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { newId } from '../utils/ids.js';
import { recomputeProRating } from '../services/ratings.js';

const router = Router();

// GET /api/reviews/mine — reviews written by the current customer
router.get(
  '/mine',
  authenticate(),
  requireRole('customer'),
  asyncHandler(async (req, res) => {
    const rows = await query(
      `SELECT r.*, u.name AS pro_name, p.slug AS pro_slug
       FROM reviews r JOIN professionals p ON p.id = r.pro_id JOIN users u ON u.id = p.id
       WHERE r.customer_id = ? ORDER BY r.created_at DESC`,
      [req.user.id],
    );
    res.json(rows.map((r) => ({ ...serializeReview(r), proName: r.pro_name, proSlug: r.pro_slug })));
  }),
);

// POST /api/reviews — customer reviews a completed job's professional
router.post(
  '/',
  authenticate(),
  requireRole('customer'),
  asyncHandler(async (req, res) => {
    const { jobId, rating, text, breakdown } = req.body || {};
    const ratingNum = Number(rating);
    if (!jobId) throw badRequest('Mungon puna.');
    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      throw badRequest('Vlerësimi duhet të jetë 1–5.');
    }

    const job = await queryOne('SELECT * FROM jobs WHERE id = ?', [jobId]);
    if (!job) throw notFound('Puna nuk u gjet.');
    if (job.customer_id !== req.user.id) throw forbidden();
    if (job.status !== 'Completed') throw conflict('Mund të vlerësosh vetëm punë të përfunduara.');
    if (job.reviewed) throw conflict('Kjo punë është vlerësuar tashmë.');
    if (!job.selected_pro_id) throw conflict('Kjo punë nuk ka profesionist të zgjedhur.');

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const id = newId('rev');
      await conn.execute(
        `INSERT INTO reviews (id, pro_id, job_id, customer_id, customer_name, area, rating, text, breakdown)
         VALUES (?,?,?,?,?,?,?,?,?)`,
        [id, job.selected_pro_id, jobId, req.user.id, req.user.name, job.area, ratingNum, text || null, JSON.stringify(breakdown || {})],
      );
      await conn.execute('UPDATE jobs SET reviewed = 1 WHERE id = ?', [jobId]);
      await recomputeProRating(job.selected_pro_id, conn);
      await conn.commit();

      const review = await queryOne('SELECT * FROM reviews WHERE id = ?', [id]);
      res.status(201).json(serializeReview(review));
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }),
);

export default router;

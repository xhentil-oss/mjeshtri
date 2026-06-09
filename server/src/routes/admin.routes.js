import { Router } from 'express';
import { pool, query, queryOne } from '../db.js';
import {
  serializeProfessional, serializeJob, serializeBid, serializeReview,
} from '../utils/serialize.js';
import { asyncHandler, badRequest, notFound } from '../utils/http.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// All admin routes require an authenticated admin.
router.use(authenticate(), requireRole('admin'));

// GET /api/admin/stats — dashboard overview numbers
router.get(
  '/stats',
  asyncHandler(async (req, res) => {
    const [stats] = await query(`
      SELECT
        (SELECT COUNT(*) FROM users WHERE role = 'customer') AS customers,
        (SELECT COUNT(*) FROM professionals) AS professionals,
        (SELECT COUNT(*) FROM professionals WHERE status = 'pending') AS pendingPros,
        (SELECT COUNT(*) FROM jobs) AS jobs,
        (SELECT COUNT(*) FROM jobs WHERE status = 'Open for Bids') AS openJobs,
        (SELECT COUNT(*) FROM jobs WHERE status = 'Completed') AS completedJobs,
        (SELECT COUNT(*) FROM bids) AS bids,
        (SELECT COUNT(*) FROM reviews) AS reviews,
        (SELECT COALESCE(AVG(rating),0) FROM reviews) AS avgRating
    `);
    res.json({ ...stats, avgRating: Number(stats.avgRating) });
  }),
);

// GET /api/admin/professionals?status=pending
router.get(
  '/professionals',
  asyncHandler(async (req, res) => {
    const where = [];
    const params = [];
    if (req.query.status) { where.push('p.status = ?'); params.push(req.query.status); }
    const rows = await query(
      `SELECT p.*, u.name, u.email, u.phone, u.created_at AS user_created
       FROM professionals p JOIN users u ON u.id = p.id
       ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
       ORDER BY p.created_at DESC`,
      params,
    );
    res.json(rows.map((r) => ({ ...serializeProfessional(r), email: r.email, phone: r.phone })));
  }),
);

// PATCH /api/admin/professionals/:id { action }
router.patch(
  '/professionals/:id',
  asyncHandler(async (req, res) => {
    const { action } = req.body || {};
    const pro = await queryOne('SELECT * FROM professionals WHERE id = ?', [req.params.id]);
    if (!pro) throw notFound('Profesionisti nuk u gjet.');

    switch (action) {
      case 'approve':
        await pool.execute("UPDATE professionals SET status = 'approved', verified = 1 WHERE id = ?", [req.params.id]);
        break;
      case 'reject':
        await pool.execute("UPDATE professionals SET status = 'rejected', verified = 0 WHERE id = ?", [req.params.id]);
        break;
      case 'toggleFeature':
        await pool.execute('UPDATE professionals SET featured = NOT featured WHERE id = ?', [req.params.id]);
        break;
      case 'toggleVerify':
        await pool.execute('UPDATE professionals SET verified = NOT verified WHERE id = ?', [req.params.id]);
        break;
      default:
        throw badRequest('Veprim i panjohur.');
    }
    const updated = await queryOne(
      'SELECT p.*, u.name FROM professionals p JOIN users u ON u.id = p.id WHERE p.id = ?',
      [req.params.id],
    );
    res.json(serializeProfessional(updated));
  }),
);

// GET /api/admin/customers
router.get(
  '/customers',
  asyncHandler(async (req, res) => {
    const rows = await query(
      `SELECT u.id, u.name, u.email, u.phone, u.area, u.created_at AS joined,
              (SELECT COUNT(*) FROM jobs j WHERE j.customer_id = u.id) AS requests
       FROM users u WHERE u.role = 'customer' ORDER BY u.created_at DESC`,
    );
    res.json(rows);
  }),
);

// GET /api/admin/jobs
router.get(
  '/jobs',
  asyncHandler(async (req, res) => {
    const rows = await query(
      `SELECT j.*, (SELECT COUNT(*) FROM bids b WHERE b.job_id = j.id) AS bids_count,
              c.name AS customer_name
       FROM jobs j JOIN users c ON c.id = j.customer_id
       ORDER BY j.posted_at DESC`,
    );
    res.json(rows.map((r) => ({ ...serializeJob(r), customerName: r.customer_name })));
  }),
);

// GET /api/admin/bids
router.get(
  '/bids',
  asyncHandler(async (req, res) => {
    const rows = await query(
      `SELECT b.*, u.name AS pro_name, j.title AS job_title
       FROM bids b JOIN users u ON u.id = b.pro_id JOIN jobs j ON j.id = b.job_id
       ORDER BY b.created_at DESC`,
    );
    res.json(rows.map((r) => ({ ...serializeBid(r), proName: r.pro_name, jobTitle: r.job_title })));
  }),
);

// GET /api/admin/reviews
router.get(
  '/reviews',
  asyncHandler(async (req, res) => {
    const rows = await query(
      `SELECT r.*, u.name AS pro_name FROM reviews r JOIN users u ON u.id = r.pro_id
       ORDER BY r.created_at DESC`,
    );
    res.json(rows.map((r) => ({ ...serializeReview(r), proName: r.pro_name })));
  }),
);

// DELETE /api/admin/reviews/:id — moderation
router.delete(
  '/reviews/:id',
  asyncHandler(async (req, res) => {
    const review = await queryOne('SELECT pro_id FROM reviews WHERE id = ?', [req.params.id]);
    if (!review) throw notFound('Review nuk u gjet.');
    await pool.execute('DELETE FROM reviews WHERE id = ?', [req.params.id]);
    // recompute the pro rating after removal
    const { recomputeProRating } = await import('../services/ratings.js');
    await recomputeProRating(review.pro_id);
    res.json({ ok: true });
  }),
);

export default router;

import { Router } from 'express';
import { pool, query, queryOne } from '../db.js';
import { serializeJob, serializeBid } from '../utils/serialize.js';
import { asyncHandler, badRequest, notFound, forbidden, conflict } from '../utils/http.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { newId } from '../utils/ids.js';
import { recomputeCompletedJobs } from '../services/ratings.js';

const router = Router();

// jobs + a computed bids_count
const JOB_SELECT = `
  SELECT j.*, (SELECT COUNT(*) FROM bids b WHERE b.job_id = j.id) AS bids_count
  FROM jobs j
`;

// GET /api/jobs/available — open jobs for professionals to bid on.
// Optional ?category=&area= filters; defaults to the pro's own category.
router.get(
  '/available',
  authenticate(),
  requireRole('professional'),
  asyncHandler(async (req, res) => {
    const { category, area } = req.query;
    const where = ["j.status = 'Open for Bids'"];
    const params = [];
    if (category) { where.push('j.category = ?'); params.push(category); }
    if (area) { where.push('j.area = ?'); params.push(area); }

    const rows = await query(
      `${JOB_SELECT} WHERE ${where.join(' AND ')} ORDER BY j.posted_at DESC`,
      params,
    );
    res.json(rows.map(serializeJob));
  }),
);

// GET /api/jobs/mine — current customer's jobs
router.get(
  '/mine',
  authenticate(),
  requireRole('customer'),
  asyncHandler(async (req, res) => {
    const rows = await query(
      `${JOB_SELECT} WHERE j.customer_id = ? ORDER BY j.posted_at DESC`,
      [req.user.id],
    );
    res.json(rows.map(serializeJob));
  }),
);

// GET /api/jobs/:id — job detail. Public jobs are viewable by pros (to bid);
// the owner customer and admins always see it.
router.get(
  '/:id',
  authenticate({ required: false }),
  asyncHandler(async (req, res) => {
    const job = await queryOne(`${JOB_SELECT} WHERE j.id = ?`, [req.params.id]);
    if (!job) throw notFound('Puna nuk u gjet.');
    res.json(serializeJob(job));
  }),
);

// GET /api/jobs/:id/bids — offers on a job (with professional summary)
router.get(
  '/:id/bids',
  authenticate(),
  asyncHandler(async (req, res) => {
    const job = await queryOne('SELECT customer_id FROM jobs WHERE id = ?', [req.params.id]);
    if (!job) throw notFound('Puna nuk u gjet.');
    // Only the owning customer or an admin can see the full bid list.
    if (req.user.role !== 'admin' && job.customer_id !== req.user.id) {
      throw forbidden();
    }
    const rows = await query(
      `SELECT b.*, u.name AS pro_name, p.slug AS pro_slug, p.rating AS pro_rating,
              p.reviews_count AS pro_reviews, p.completed_jobs AS pro_completed_jobs,
              p.experience AS pro_experience, p.verified AS pro_verified
       FROM bids b
       JOIN professionals p ON p.id = b.pro_id
       JOIN users u ON u.id = p.id
       WHERE b.job_id = ?
       ORDER BY b.price ASC`,
      [req.params.id],
    );
    res.json(rows.map(serializeBid));
  }),
);

// POST /api/jobs — customer creates a request
router.post(
  '/',
  authenticate(),
  requireRole('customer'),
  asyncHandler(async (req, res) => {
    const { category, area, title, description, urgency, budget, contact, photos } = req.body || {};
    if (!category) throw badRequest('Zgjidh një kategori.');
    if (!area) throw badRequest('Zgjidh një zonë.');
    if (!description?.trim()) throw badRequest('Përshkruaj problemin.');

    const id = newId('job');
    const finalTitle = (title?.trim()) || `${category} — ${area}`;
    await pool.execute(
      `INSERT INTO jobs (id, customer_id, category, area, title, description, urgency, budget, contact, photos, status)
       VALUES (?,?,?,?,?,?,?,?,?,?, 'Open for Bids')`,
      [
        id, req.user.id, category, area, finalTitle, description.trim(),
        urgency || null, budget || null, contact || null, JSON.stringify(photos || []),
      ],
    );
    const job = await queryOne(`${JOB_SELECT} WHERE j.id = ?`, [id]);
    res.status(201).json(serializeJob(job));
  }),
);

// POST /api/jobs/:id/select-bid { bidId } — customer accepts an offer
router.post(
  '/:id/select-bid',
  authenticate(),
  requireRole('customer'),
  asyncHandler(async (req, res) => {
    const { bidId } = req.body || {};
    if (!bidId) throw badRequest('Mungon oferta e zgjedhur.');

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [[job]] = await conn.execute('SELECT * FROM jobs WHERE id = ? FOR UPDATE', [req.params.id]);
      if (!job) throw notFound('Puna nuk u gjet.');
      if (job.customer_id !== req.user.id) throw forbidden();
      if (job.status === 'Completed' || job.status === 'Cancelled') {
        throw conflict('Kjo punë është mbyllur.');
      }

      const [[bid]] = await conn.execute('SELECT * FROM bids WHERE id = ? AND job_id = ?', [bidId, job.id]);
      if (!bid) throw notFound('Oferta nuk u gjet.');

      // Accept the chosen bid, reject the rest, move the job In Progress.
      await conn.execute("UPDATE bids SET status = 'rejected' WHERE job_id = ?", [job.id]);
      await conn.execute("UPDATE bids SET status = 'accepted' WHERE id = ?", [bidId]);
      await conn.execute(
        "UPDATE jobs SET status = 'In Progress', selected_pro_id = ? WHERE id = ?",
        [bid.pro_id, job.id],
      );
      await conn.commit();

      const updated = await queryOne(`${JOB_SELECT} WHERE j.id = ?`, [job.id]);
      res.json(serializeJob(updated));
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }),
);

// PATCH /api/jobs/:id/complete — customer marks the job done
router.patch(
  '/:id/complete',
  authenticate(),
  requireRole('customer'),
  asyncHandler(async (req, res) => {
    const job = await queryOne('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
    if (!job) throw notFound('Puna nuk u gjet.');
    if (job.customer_id !== req.user.id) throw forbidden();
    if (job.status !== 'In Progress') throw conflict('Vetëm punët në progres mund të mbyllen.');

    await pool.execute(
      "UPDATE jobs SET status = 'Completed', completed_at = NOW() WHERE id = ?",
      [job.id],
    );
    if (job.selected_pro_id) await recomputeCompletedJobs(job.selected_pro_id);

    const updated = await queryOne(`${JOB_SELECT} WHERE j.id = ?`, [job.id]);
    res.json(serializeJob(updated));
  }),
);

export default router;

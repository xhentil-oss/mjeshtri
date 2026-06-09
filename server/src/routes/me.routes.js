import { Router } from 'express';
import { pool, query, queryOne } from '../db.js';
import {
  serializeProfessional, serializeReview, serializeJob, serializeUser,
} from '../utils/serialize.js';
import { asyncHandler, notFound } from '../utils/http.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// PATCH /api/me — update own basic account fields (settings page)
router.patch(
  '/',
  authenticate(),
  asyncHandler(async (req, res) => {
    const { name, phone, area } = req.body || {};
    const fields = [];
    const params = [];
    if (name !== undefined) { fields.push('name = ?'); params.push(name); }
    if (phone !== undefined) { fields.push('phone = ?'); params.push(phone); }
    if (area !== undefined) { fields.push('area = ?'); params.push(area); }
    if (fields.length) {
      params.push(req.user.id);
      await pool.execute(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, params);
    }
    const user = await queryOne('SELECT id, role, name, email, phone, area FROM users WHERE id = ?', [req.user.id]);
    res.json({ user: serializeUser(user) });
  }),
);

// GET /api/me/professional — own professional profile (any status)
router.get(
  '/professional',
  authenticate(),
  requireRole('professional'),
  asyncHandler(async (req, res) => {
    const pro = await queryOne(
      'SELECT p.*, u.name FROM professionals p JOIN users u ON u.id = p.id WHERE p.id = ?',
      [req.user.id],
    );
    if (!pro) throw notFound('Profili profesional nuk u gjet.');
    res.json(serializeProfessional(pro));
  }),
);

// PATCH /api/me/professional — update own professional profile
router.patch(
  '/professional',
  authenticate(),
  requireRole('professional'),
  asyncHandler(async (req, res) => {
    const allowed = {
      bio: 'bio', business: 'business', nipt: 'nipt',
      availability: 'availability', responseTime: 'response_time',
      avatarUrl: 'avatar_url', category: 'category',
    };
    const jsonFields = { areas: 'areas', skills: 'skills', portfolio: 'portfolio' };

    const sets = [];
    const params = [];
    for (const [key, col] of Object.entries(allowed)) {
      if (req.body[key] !== undefined) { sets.push(`${col} = ?`); params.push(req.body[key]); }
    }
    for (const [key, col] of Object.entries(jsonFields)) {
      if (req.body[key] !== undefined) { sets.push(`${col} = ?`); params.push(JSON.stringify(req.body[key])); }
    }
    if (req.body.experience !== undefined) { sets.push('experience = ?'); params.push(Number(req.body.experience) || 0); }

    if (sets.length) {
      params.push(req.user.id);
      await pool.execute(`UPDATE professionals SET ${sets.join(', ')} WHERE id = ?`, params);
    }
    const pro = await queryOne(
      'SELECT p.*, u.name FROM professionals p JOIN users u ON u.id = p.id WHERE p.id = ?',
      [req.user.id],
    );
    res.json(serializeProfessional(pro));
  }),
);

// GET /api/me/professional/reviews — reviews about the current professional
router.get(
  '/professional/reviews',
  authenticate(),
  requireRole('professional'),
  asyncHandler(async (req, res) => {
    const rows = await query('SELECT * FROM reviews WHERE pro_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json(rows.map(serializeReview));
  }),
);

// GET /api/me/professional/jobs?status=In Progress|Completed — jobs assigned to me
router.get(
  '/professional/jobs',
  authenticate(),
  requireRole('professional'),
  asyncHandler(async (req, res) => {
    const where = ['j.selected_pro_id = ?'];
    const params = [req.user.id];
    if (req.query.status) { where.push('j.status = ?'); params.push(req.query.status); }
    const rows = await query(
      `SELECT j.*, (SELECT COUNT(*) FROM bids b WHERE b.job_id = j.id) AS bids_count
       FROM jobs j WHERE ${where.join(' AND ')} ORDER BY j.posted_at DESC`,
      params,
    );
    res.json(rows.map(serializeJob));
  }),
);

export default router;

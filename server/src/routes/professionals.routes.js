import { Router } from 'express';
import { query, queryOne } from '../db.js';
import { serializeProfessional, serializeReview } from '../utils/serialize.js';
import { asyncHandler, notFound } from '../utils/http.js';

const router = Router();

// Base select joining the user name onto the professional profile.
const PRO_SELECT = `
  SELECT p.*, u.name
  FROM professionals p
  JOIN users u ON u.id = p.id
`;

// GET /api/professionals?category=&area=&q=&featured=true
// Public listing — only approved professionals are shown.
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category, area, q, featured } = req.query;
    const where = ["p.status = 'approved'"];
    const params = [];

    if (category) { where.push('p.category = ?'); params.push(category); }
    if (featured === 'true') { where.push('p.featured = 1'); }
    if (q) {
      where.push('(u.name LIKE ? OR p.business LIKE ? OR p.bio LIKE ?)');
      const like = `%${q}%`;
      params.push(like, like, like);
    }
    // area is stored as a JSON array — match with JSON_CONTAINS
    if (area) {
      where.push('JSON_CONTAINS(p.areas, ?)');
      params.push(JSON.stringify(area));
    }

    const rows = await query(
      `${PRO_SELECT} WHERE ${where.join(' AND ')} ORDER BY p.featured DESC, p.rating DESC`,
      params,
    );
    res.json(rows.map(serializeProfessional));
  }),
);

// GET /api/professionals/:slug — public profile + its reviews
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const pro = await queryOne(`${PRO_SELECT} WHERE p.slug = ?`, [req.params.slug]);
    if (!pro) throw notFound('Profesionisti nuk u gjet.');

    const reviews = await query(
      'SELECT * FROM reviews WHERE pro_id = ? ORDER BY created_at DESC',
      [pro.id],
    );
    res.json({
      ...serializeProfessional(pro),
      reviewsList: reviews.map(serializeReview),
    });
  }),
);

export default router;

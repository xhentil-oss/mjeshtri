import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { pool, queryOne } from '../db.js';
import { signToken } from '../utils/jwt.js';
import { newId, slugify } from '../utils/ids.js';
import { serializeUser } from '../utils/serialize.js';
import { asyncHandler, badRequest, unauthorized, conflict } from '../utils/http.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

const emailTaken = async (email) =>
  !!(await queryOne('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]));

const issue = (user) => ({ token: signToken(user), user: serializeUser(user) });

// POST /api/auth/register/customer
router.post(
  '/register/customer',
  asyncHandler(async (req, res) => {
    const { name, email, password, phone, area } = req.body || {};
    if (!name?.trim()) throw badRequest('Emri është i detyrueshëm.');
    if (!email?.trim()) throw badRequest('Email është i detyrueshëm.');
    if (!password || password.length < 6) throw badRequest('Fjalëkalimi duhet të ketë të paktën 6 karaktere.');
    if (await emailTaken(email)) throw conflict('Ky email është i regjistruar tashmë.');

    const id = newId('cust');
    const hash = await bcrypt.hash(password, 10);
    await pool.execute(
      'INSERT INTO users (id, role, name, email, password_hash, phone, area) VALUES (?,?,?,?,?,?,?)',
      [id, 'customer', name.trim(), email.toLowerCase().trim(), hash, phone || null, area || null],
    );
    const user = await queryOne('SELECT id, role, name, email, phone, area FROM users WHERE id = ?', [id]);
    res.status(201).json(issue(user));
  }),
);

// POST /api/auth/register/professional
router.post(
  '/register/professional',
  asyncHandler(async (req, res) => {
    const {
      name, email, password, phone, category, experience,
      bio, business, nipt, availability, areas,
    } = req.body || {};

    if (!name?.trim()) throw badRequest('Emri është i detyrueshëm.');
    if (!email?.trim()) throw badRequest('Email është i detyrueshëm.');
    if (!password || password.length < 6) throw badRequest('Fjalëkalimi duhet të ketë të paktën 6 karaktere.');
    if (!category) throw badRequest('Zgjidh një kategori.');
    if (!Array.isArray(areas) || areas.length === 0) throw badRequest('Zgjidh të paktën një zonë.');
    if (await emailTaken(email)) throw conflict('Ky email është i regjistruar tashmë.');

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const id = newId('pro');
      const hash = await bcrypt.hash(password, 10);
      // unique-ish slug: category-name-shortid
      const slug = `${slugify(category)}-${slugify(name)}-${id.slice(-6)}`;

      await conn.execute(
        'INSERT INTO users (id, role, name, email, password_hash, phone) VALUES (?,?,?,?,?,?)',
        [id, 'professional', name.trim(), email.toLowerCase().trim(), hash, phone || null],
      );
      await conn.execute(
        `INSERT INTO professionals
          (id, slug, category, areas, experience, business, nipt, bio, availability, status, verified)
         VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [
          id, slug, category, JSON.stringify(areas), Number(experience) || 0,
          business || null, nipt || null, bio || null, availability || null,
          'pending', 0,
        ],
      );
      await conn.commit();
      const user = await queryOne('SELECT id, role, name, email, phone, area FROM users WHERE id = ?', [id]);
      res.status(201).json(issue(user));
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }),
);

// POST /api/auth/login
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) throw badRequest('Email dhe fjalëkalim janë të detyrueshëm.');

    const row = await queryOne(
      'SELECT id, role, name, email, phone, area, password_hash FROM users WHERE email = ?',
      [email.toLowerCase().trim()],
    );
    if (!row) throw unauthorized('Email ose fjalëkalim i pasaktë.');

    const ok = await bcrypt.compare(password, row.password_hash);
    if (!ok) throw unauthorized('Email ose fjalëkalim i pasaktë.');

    const { password_hash, ...user } = row;
    res.json(issue(user));
  }),
);

// GET /api/auth/me — current user from token
router.get(
  '/me',
  authenticate(),
  asyncHandler(async (req, res) => {
    res.json({ user: serializeUser(req.user) });
  }),
);

export default router;

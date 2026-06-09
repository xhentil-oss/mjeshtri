// Seeds the database with the demo content. Idempotent-ish: it clears the tables
// first, then inserts. Run after applySchema (npm run db:reset does both).
import bcrypt from 'bcryptjs';
import { pool } from '../db.js';
import { config } from '../config.js';
import { customers, professionals, jobs, bids, reviews } from './seedData.js';

const DEMO_PASSWORD = 'demo1234'; // every seeded account uses this

async function main() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Wipe in FK-safe order.
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    for (const t of ['reviews', 'bids', 'jobs', 'professionals', 'users']) {
      await conn.query(`DELETE FROM ${t}`);
    }
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');

    const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
    const adminHash = await bcrypt.hash(config.seed.adminPassword, 10);

    // --- Admin ---
    await conn.query(
      `INSERT INTO users (id, role, name, email, password_hash, phone) VALUES (?,?,?,?,?,?)`,
      ['admin-1', 'admin', 'Admin Demo', config.seed.adminEmail, adminHash, '+355 69 000 0000'],
    );

    // --- Customers ---
    for (const c of customers) {
      await conn.query(
        `INSERT INTO users (id, role, name, email, password_hash, phone, area) VALUES (?,?,?,?,?,?,?)`,
        [c.id, 'customer', c.name, c.email, hash, c.phone, c.area],
      );
    }

    // --- Professionals: a user row + a professionals row ---
    for (const p of professionals) {
      await conn.query(
        `INSERT INTO users (id, role, name, email, password_hash, phone) VALUES (?,?,?,?,?,?)`,
        [p.id, 'professional', p.name, p.email, hash, p.phone],
      );
      await conn.query(
        `INSERT INTO professionals
          (id, slug, category, city, areas, experience, business, bio, skills, portfolio,
           response_time, availability, rating, reviews_count, completed_jobs, verified, featured, status)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          p.id, p.slug, p.category, p.city, JSON.stringify(p.areas), p.experience,
          p.business || null, p.bio, JSON.stringify(p.skills), JSON.stringify(p.portfolio),
          p.responseTime, p.availability, p.rating, p.reviews, p.completedJobs,
          p.verified ? 1 : 0, p.featured ? 1 : 0, p.verified ? 'approved' : 'pending',
        ],
      );
    }

    // --- Jobs ---
    for (const j of jobs) {
      await conn.query(
        `INSERT INTO jobs
          (id, customer_id, category, area, title, description, urgency, budget, contact,
           photos, status, selected_pro_id, reviewed, posted_at, completed_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          j.id, j.customerId, j.category, j.area, j.title, j.description, j.urgency || null,
          j.budget || null, j.contact || null, JSON.stringify(j.photos || []), j.status,
          j.selectedProId || null, j.reviewed ? 1 : 0, j.postedAt, j.completedAt || null,
        ],
      );
    }

    // --- Bids ---
    for (const b of bids) {
      await conn.query(
        `INSERT INTO bids (id, job_id, pro_id, price, arrival, completion, label, message, status)
         VALUES (?,?,?,?,?,?,?,?,?)`,
        [b.id, b.jobId, b.proId, b.price, b.arrival || null, b.completion || null, b.label || null, b.message || null, b.status],
      );
    }

    // --- Reviews ---
    for (const r of reviews) {
      await conn.query(
        `INSERT INTO reviews (id, pro_id, customer_name, area, rating, text, breakdown, created_at)
         VALUES (?,?,?,?,?,?,?,?)`,
        [r.id, r.proId, r.customer, r.area || null, r.rating, r.text || null, JSON.stringify(r.breakdown || {}), r.date],
      );
    }

    await conn.commit();
    console.log('✓ Seed complete:');
    console.log(`  - ${1 + customers.length + professionals.length} users (1 admin, ${customers.length} customers, ${professionals.length} professionals)`);
    console.log(`  - ${professionals.length} professional profiles, ${jobs.length} jobs, ${bids.length} bids, ${reviews.length} reviews`);
    console.log(`  - Demo password for all accounts: "${DEMO_PASSWORD}" (admin: "${config.seed.adminPassword}")`);
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});

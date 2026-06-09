import mysql from 'mysql2/promise';
import { config } from './config.js';

// Shared connection pool. mysql2 returns rows as plain objects and parses
// JSON columns automatically when the column type is JSON.
export const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  // Return DECIMAL/BIGINT as numbers where safe; keep dates as strings to
  // avoid timezone surprises across the API boundary.
  dateStrings: true,
});

// Small helpers so route code stays terse.
export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] || null;
}

export async function ping() {
  const conn = await pool.getConnection();
  try {
    await conn.ping();
  } finally {
    conn.release();
  }
}

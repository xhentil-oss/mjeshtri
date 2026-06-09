import { query } from '../db.js';

// Recompute a professional's cached rating + review count from the reviews table.
export async function recomputeProRating(proId, conn = null) {
  const runner = conn || { execute: (sql, p) => query(sql, p).then((rows) => [rows]) };
  const [rows] = await runner.execute(
    'SELECT COUNT(*) AS n, COALESCE(AVG(rating), 0) AS avg FROM reviews WHERE pro_id = ?',
    [proId],
  );
  const { n, avg } = rows[0];
  await runner.execute(
    'UPDATE professionals SET reviews_count = ?, rating = ? WHERE id = ?',
    [Number(n), Number(avg).toFixed(2), proId],
  );
}

// Recompute completed-jobs count for a professional.
export async function recomputeCompletedJobs(proId, conn = null) {
  const runner = conn || { execute: (sql, p) => query(sql, p).then((rows) => [rows]) };
  const [rows] = await runner.execute(
    "SELECT COUNT(*) AS n FROM jobs WHERE selected_pro_id = ? AND status = 'Completed'",
    [proId],
  );
  await runner.execute('UPDATE professionals SET completed_jobs = ? WHERE id = ?', [Number(rows[0].n), proId]);
}

// Applies schema.sql to the configured database. Drops and recreates all tables.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import { config } from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const sql = await fs.readFile(path.join(__dirname, '..', 'schema.sql'), 'utf8');

  // multipleStatements lets us run the whole file in one shot.
  const conn = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
    charset: 'utf8mb4',
  });

  console.log(`Applying schema to ${config.db.database} @ ${config.db.host}…`);
  await conn.query(sql);
  await conn.end();
  console.log('✓ Schema applied (tables dropped + recreated).');
}

main().catch((err) => {
  console.error('Schema apply failed:', err.message);
  process.exit(1);
});

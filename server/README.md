# Mjeshtri API (server)

Express + MySQL backend for the Mjeshtri marketplace. Self-hosted — no external
services. Runs as a Node.js process behind nginx/LiteSpeed on the VPS.

## Stack
- **Express 4** — REST API under `/api`
- **MySQL / MariaDB** via `mysql2`
- **JWT + bcrypt** auth (3 roles: customer, professional, admin)
- **multer** for image uploads to local disk (served at `/uploads`)

## Local setup

```bash
cd server
cp .env.example .env          # then edit DB creds + JWT_SECRET
npm install
npm run db:reset              # applies schema.sql + seeds demo data
npm run dev                   # http://localhost:3001
```

Health check: `GET http://localhost:3001/api/health` → `{ "ok": true }`.

## Scripts
| Script            | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start with `--watch` (auto-restart)                 |
| `npm start`       | Start once (production)                             |
| `npm run db:schema` | Drop + recreate all tables                        |
| `npm run db:seed` | Insert demo users/professionals/jobs/bids/reviews   |
| `npm run db:reset`| schema + seed in one go                             |

## Demo logins (after seed)
| Role         | Email                  | Password   |
| ------------ | ---------------------- | ---------- |
| Customer     | `klient@demo.al`       | `demo1234` |
| Professional | `profesionist@demo.al` | `demo1234` |
| Admin        | `admin@demo.al`        | `demo1234` |

All seeded professional accounts use `demo1234`.

## API surface (all under `/api`)

**Auth** — `POST /auth/register/customer`, `POST /auth/register/professional`,
`POST /auth/login`, `GET /auth/me`

**Professionals (public)** — `GET /professionals?category=&area=&q=&featured=`,
`GET /professionals/:slug`

**Jobs** — `GET /jobs/available` (pro), `GET /jobs/mine` (customer),
`GET /jobs/:id`, `GET /jobs/:id/bids`, `POST /jobs` (customer),
`POST /jobs/:id/select-bid` (customer), `PATCH /jobs/:id/complete` (customer)

**Bids** — `GET /bids/mine` (pro), `POST /bids` (pro)

**Reviews** — `GET /reviews/mine` (customer), `POST /reviews` (customer)

**Me** — `PATCH /me`, `GET /me/professional`, `PATCH /me/professional`,
`GET /me/professional/reviews`, `GET /me/professional/jobs?status=`

**Admin** — `GET /admin/stats`, `GET /admin/professionals?status=`,
`PATCH /admin/professionals/:id` (`{action: approve|reject|toggleFeature|toggleVerify}`),
`GET /admin/customers`, `GET /admin/jobs`, `GET /admin/bids`,
`GET /admin/reviews`, `DELETE /admin/reviews/:id`

**Uploads** — `POST /uploads` (multipart field `files`) → `{ urls: [...] }`

Auth-required endpoints expect `Authorization: Bearer <token>`.

See [../DEPLOYMENT.md](../DEPLOYMENT.md) for the full VPS deployment guide.

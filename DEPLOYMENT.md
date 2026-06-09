# Deploying Mjeshtri to a CloudLinux VPS (root/SSH)

This guide deploys the full stack on one VPS:

```
nginx  ──┬─►  static frontend (dist/)        served from /var/www/mjeshtri
         └─►  /api  reverse-proxy ─►  Node API (pm2) on :3001
                                          └─►  MySQL / MariaDB
```

> Replace `mjeshtri.al` with your real domain and `/var/www/mjeshtri` with your path.

---

## 1. Prerequisites on the VPS

```bash
# Node.js 18+ (via NodeSource) — CloudLinux/AlmaLinux example
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs git

# MariaDB (or use the one bundled with cPanel/WHM)
sudo dnf install -y mariadb-server
sudo systemctl enable --now mariadb

# pm2 process manager + nginx
sudo npm install -g pm2
sudo dnf install -y nginx
sudo systemctl enable --now nginx
```

---

## 2. Database

```bash
sudo mysql
```
```sql
CREATE DATABASE mjeshtri CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'mjeshtri'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON mjeshtri.* TO 'mjeshtri'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 3. Get the code

```bash
sudo mkdir -p /var/www/mjeshtri && sudo chown $USER /var/www/mjeshtri
git clone https://github.com/xhentil-oss/mjeshtri.git /var/www/mjeshtri
cd /var/www/mjeshtri
```

---

## 4. Backend (API)

```bash
cd /var/www/mjeshtri/server
cp .env.example .env
nano .env                       # set DB creds, JWT_SECRET, CORS_ORIGIN, UPLOAD_PUBLIC_URL
npm ci --omit=dev               # install production deps

# Initialise the schema + demo data (run ONCE; db:seed wipes tables)
npm run db:reset

# Start under pm2
pm2 start src/index.js --name mjeshtri-api
pm2 save
pm2 startup                     # follow the printed command to start on boot
```

Key `.env` values for production:
```ini
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://mjeshtri.al
DB_HOST=127.0.0.1
DB_USER=mjeshtri
DB_PASSWORD=STRONG_PASSWORD_HERE
DB_NAME=mjeshtri
JWT_SECRET=<run: node -e "console.log(require('crypto').randomBytes(48).toString('hex'))">
UPLOAD_PUBLIC_URL=https://mjeshtri.al/uploads
```

Verify: `curl http://localhost:3001/api/health` → `{"ok":true,...}`

---

## 5. Frontend (static build)

```bash
cd /var/www/mjeshtri
cp .env.example .env
nano .env                       # VITE_API_URL=/api   (proxied by nginx, same domain)
npm ci --include=dev            # devDeps include Vite; needed for the build
npm run build                   # outputs dist/
```

> `--include=dev` matters: if `NODE_ENV=production` is set globally, npm skips
> devDependencies (Vite) and the build fails with "vite: not found".

---

## 6. nginx

`/etc/nginx/conf.d/mjeshtri.conf`:

```nginx
server {
    listen 80;
    server_name mjeshtri.al www.mjeshtri.al;

    root /var/www/mjeshtri/dist;
    index index.html;

    # SPA: serve index.html for any non-file route (React Router)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API → Node
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Uploaded images → Node (or point directly at server/uploads)
    location /uploads/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
    }

    client_max_body_size 10m;   # allow image uploads
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

> On a cPanel/LiteSpeed box you can do the equivalent with a vhost include or
> `.htaccess` rewrite (SPA fallback to `index.html`) + a ProxyPass for `/api`.

---

## 7. HTTPS

```bash
sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d mjeshtri.al -d www.mjeshtri.al
```

After issuing the cert, update `CORS_ORIGIN` and `UPLOAD_PUBLIC_URL` in
`server/.env` to `https://…` and `pm2 restart mjeshtri-api`.

---

## 8. Updating after a git push

```bash
cd /var/www/mjeshtri
git pull
# backend
cd server && npm ci --omit=dev && pm2 restart mjeshtri-api
# frontend
cd .. && npm ci --include=dev && npm run build
# (no nginx reload needed — it serves dist/ directly)
```

> Do **not** re-run `npm run db:seed` on updates — it wipes the tables. Only run
> it on first setup or when intentionally resetting demo data.

---

## Troubleshooting
- **`vite: not found` on build** → run `npm ci --include=dev`.
- **API 500 / health `ok:false`** → check DB creds in `server/.env`; `pm2 logs mjeshtri-api`.
- **CORS errors in browser** → `CORS_ORIGIN` must exactly match the site origin (scheme + host, no trailing slash).
- **Uploads 413** → raise `client_max_body_size` in nginx and `MAX_UPLOAD_MB` in `.env`.
- **Login works but refresh logs out** → the JWT is in localStorage; check the browser isn't clearing storage and `VITE_API_URL` is correct.

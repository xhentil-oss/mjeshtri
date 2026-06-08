# Mjeshtri — Local Services Marketplace (Tirana)

A premium, production-style **local-services marketplace** for Tirana, Albania, built with **React 18 + Vite + React Router v6 + Tailwind CSS**. Customers describe a job, verified professionals send competing offers, and the customer picks the best one — by price, rating *and* experience.

The public site copy is in **Albanian**; all code, filenames and identifiers are in **English**. The whole app is **demo-data-driven** so a real backend can be dropped in later without rewriting the UI.

---

## Quick start

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build
```

> Requires Node.js 18+.

---

## Demo logins

The app runs entirely on in-memory demo data — no server required. On the login page you can use the **quick role chips** (Klient / Profesionist / Admin), or sign in manually:

| Role          | Email                     | Password   |
| ------------- | ------------------------- | ---------- |
| Customer      | `klient@demo.al`          | `demo1234` |
| Professional  | `profesionist@demo.al`    | `demo1234` |
| Admin         | `admin@demo.al`           | `demo1234` |

Dashboards are also explorable directly (`/customer-dashboard`, `/pro-dashboard`, `/admin`) — the demo guard auto-logs-in the matching role.

---

## What's inside

**Public marketing site**
- Home with hero, service selector, "how it works", marketplace explainer (the auction model), trust badges, social proof, featured professionals, areas covered, FAQ and CTAs.
- Per-service **SEO landing pages** (`/services/:slug`) with problems, benefits, local-area sections, FAQs and full schema.org markup.
- Professionals listing with search/category/area filters, and public professional profiles with reviews, portfolio and schema.
- How it works, About, Contact pages.
- **Customer job-request flow** (`/request`) with query prefill (`?category=`, `?area=`, `?pro=`).
- Mobile sticky CTA bar and responsive header/footer.

**Auth** (mock, in-memory)
- Login with demo role chips, customer registration, professional registration (full verification form with success state).

**Dashboards** (role-aware sidebar + mobile bottom nav)
- **Customer:** overview, requests, **offer comparison & selection**, reviews, profile, settings.
- **Professional:** overview, available jobs, job details + bid form, my bids, active jobs, completed jobs, reviews, profile, settings.
- **Admin:** overview, professional approvals, customers, jobs, bids, reviews, categories, reports (charts), settings.

**SEO**
- `react-helmet-async` for per-page titles/descriptions/OG/Twitter tags.
- JSON-LD schemas: `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `Person`/professional.
- `public/robots.txt` and a generated `public/sitemap.xml`.

---

## Project structure

```
src/
  main.jsx              # entry: Router + HelmetProvider + AuthProvider
  App.jsx               # all routes + public layout + ScrollToTop
  index.css             # Tailwind layers + design-system component classes
  components/           # public-site components (Hero, Header, ServiceCard, …)
    ui/                 # primitives (Container, Icon, Avatar, SectionHeading)
  pages/                # public pages
  auth/                 # login/register + ProtectedRoute + AuthLayout
  context/AuthContext.jsx
  data/                 # ⬅ ALL demo content lives here (swap for API)
  utils/                # formatCurrency, statusStyles, seo, schemas
  dashboard/
    layouts/            # DashboardLayout, AdminDashboardLayout
    components/         # JobCard, BidForm, OfferComparisonTable, tables, …
    pages/              # customer / professional / admin dashboard pages
public/                 # favicon, robots.txt, sitemap.xml
```

---

## Connecting a real backend

The UI never hardcodes content — it reads from `src/data/*` and `src/utils/*`. To go live:

1. **Auth** — replace the in-memory `login` / `register` in `src/context/AuthContext.jsx` with real API calls; the consuming components don't change. Then switch `src/auth/ProtectedRoute.jsx` from demo auto-login back to a redirect to `/login` (the redirect line is included as a comment).
2. **Data** — replace each module in `src/data/` (services, professionals, jobs, bids, reviews, users) with fetches to your API, keeping the same exported shapes and helper names (`getJobById`, `bidsByJob`, `professionalsByCategory`, …).
3. **Forms** — the request form, bid form, registration and review forms have clearly marked submit handlers where a real `POST` goes.
4. **SEO** — update `SITE` in `src/utils/seo.js` (domain, phone, email, OG image) and regenerate `sitemap.xml`.

---

## Notes
- This is a **demonstration project**: professionals, reviews, jobs and stats are sample data and are labelled as demo in the UI.
- Fonts: Plus Jakarta Sans (display) + Figtree (body), loaded via Google Fonts; both render Albanian diacritics (ë, ç) correctly.
- Icons via `lucide-react`, resolved by name through `components/ui/Icon.jsx`.

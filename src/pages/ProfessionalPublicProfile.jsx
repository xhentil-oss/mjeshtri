import { useParams, Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReviewStars from '@/components/ReviewStars';
import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';
import CTASection from '@/components/CTASection';
import NotFound from '@/pages/NotFound';

import { useAsync } from '@/hooks/useAsync';
import { api, ApiError } from '@/lib/api';
import { categoryLabel } from '@/data/services';
import { SITE } from '@/utils/seo';
import { professionalSchema, breadcrumbSchema } from '@/utils/schemas';

function Stat({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
      <Icon name={icon} className="mx-auto h-5 w-5 text-amber-500" />
      <div className="mt-2 text-xl font-bold text-navy-900">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

export default function ProfessionalPublicProfile() {
  const { slug } = useParams();
  const { data: pro, loading, error } = useAsync(() => api.getProfessional(slug), [slug]);

  if (loading) {
    return (
      <Container className="section">
        <div className="card h-64 animate-pulse bg-slate-50" />
      </Container>
    );
  }
  // 404 from the API (or any load error) → show the NotFound page.
  if (error || !pro) {
    if (error instanceof ApiError && error.status !== 404) {
      return (
        <Container className="section text-center text-slate-600">
          Nuk u ngarkua dot profili. Provo sërish.
        </Container>
      );
    }
    return <NotFound />;
  }

  const proReviews = pro.reviewsList || [];
  const crumbs = [
    { name: 'Kreu', path: '/' },
    { name: 'Profesionistët', path: '/professionals' },
    { name: pro.name, path: `/professionals/${pro.slug}` },
  ];

  return (
    <>
      <SEOHelmet
        title={`${pro.name} — ${categoryLabel(pro.category)} në Tiranë | Mjeshtri`}
        description={`${pro.name}, ${categoryLabel(pro.category).toLowerCase()} i verifikuar në Tiranë me ${pro.rating}/5 nga ${pro.reviews} vlerësime dhe ${pro.completedJobs} punë të përfunduara. ${(pro.bio || '').slice(0, 80)}`}
        path={`/professionals/${pro.slug}`}
        schemas={[professionalSchema(pro, proReviews), breadcrumbSchema(crumbs)]}
      />

      <section className="bg-mist border-b border-slate-100">
        <Container className="py-8 lg:py-10">
          <Breadcrumbs items={crumbs} />
        </Container>
      </section>

      <section className="section pt-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2">
              <div className="card p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <Avatar name={pro.name} size={76} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">{pro.name}</h1>
                      {pro.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <Icon name="BadgeCheck" className="h-3.5 w-3.5" /> I verifikuar
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-medium text-slate-600">
                      {categoryLabel(pro.category)} · {pro.city}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <ReviewStars rating={pro.rating} showValue />
                      <span className="text-sm text-slate-500">({pro.reviews} vlerësime)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Stat icon="CheckCircle2" value={pro.completedJobs} label="Punë të kryera" />
                  <Stat icon="Award" value={`${pro.experience} vjet`} label="Eksperiencë" />
                  <Stat icon="Star" value={pro.rating} label="Vlerësim mesatar" />
                  <Stat icon="Clock" value={(pro.responseTime || '—').replace('mesatarisht ', '')} label="Përgjigje" />
                </div>
              </div>

              {/* Bio */}
              <div className="card mt-6 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-navy-900">Rreth profesionistit</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{pro.bio}</p>

                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Shërbime &amp; aftësi
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pro.skills.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>

                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Zonat e mbuluara
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pro.areas.map((a) => (
                    <span key={a} className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-3 py-1 text-sm text-navy-700">
                      <Icon name="MapPin" className="h-3.5 w-3.5" /> {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portfolio */}
              <div className="card mt-6 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-navy-900">Punë të mëparshme</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {pro.portfolio.map((c, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-2xl"
                      style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}
                      role="img"
                      aria-label={`Punë demo ${i + 1} nga ${pro.name}`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-400">Imazhe demo — zëvendësohen me foto reale të punës.</p>
              </div>

              {/* Reviews */}
              <div className="card mt-6 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-navy-900">
                  Vlerësime nga klientët ({proReviews.length})
                </h2>
                <div className="mt-5 space-y-5">
                  {proReviews.length === 0 && (
                    <p className="text-slate-500">Ende pa vlerësime.</p>
                  )}
                  {proReviews.map((r) => (
                    <div key={r.id} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar name={r.customer} size={40} />
                          <div>
                            <p className="text-sm font-semibold text-navy-900">{r.customer}</p>
                            <p className="text-xs text-slate-400">{r.area} · {r.date}</p>
                          </div>
                        </div>
                        <ReviewStars rating={r.rating} size={14} />
                      </div>
                      <p className="mt-3 text-slate-600">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="card bg-navy-900 p-6 text-white">
                <p className="text-sm text-navy-100">Gati për të nisur?</p>
                <h3 className="mt-1 text-xl font-bold">Kontakto {pro.name.split(' ')[0]}</h3>
                <p className="mt-2 text-sm text-navy-200">{pro.availability}</p>
                <div className="mt-5 space-y-3">
                  <Link to={`/request?pro=${pro.slug}&category=${encodeURIComponent(pro.category)}`} className="btn btn-primary w-full">
                    Kërko këtë profesionist
                  </Link>
                  <Link to="/request" className="btn btn-outline w-full !border-white/30 !text-white hover:!bg-white/10">
                    Dërgo kërkesë pune
                  </Link>
                  <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="btn btn-wa w-full">
                    <Icon name="MessageCircle" className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-navy-200">
                  <Icon name="ShieldCheck" className="h-4 w-4 text-emerald-400" />
                  Profesionist i kontrolluar nga Mjeshtri
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

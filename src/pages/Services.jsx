import { Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import Icon from '@/components/ui/Icon';
import { services, allCategories, getServiceByCategory } from '@/data/services';
import { canonical } from '@/utils/seo';
import { breadcrumbSchema } from '@/utils/schemas';

export default function Services() {
  const crumbs = [
    { name: 'Kreu', path: '/' },
    { name: 'Shërbimet', path: '/services' },
  ];

  return (
    <>
      <SEOHelmet
        title="Shërbimet | Mjeshtri Tiranë"
        description="Të gjitha shërbimet e disponueshme në Tiranë: elektricist, hidraulik, teknik kondicioneri, bojaxhi, riparime shtëpie dhe handyman. Kërko ofertë sot."
        path="/services"
        schemas={[breadcrumbSchema(crumbs)]}
      />

      <section className="bg-mist border-b border-slate-100">
        <Container className="py-10 lg:py-14">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 max-w-2xl">
            <p className="eyebrow">Shërbimet tona</p>
            <h1 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
              Shërbime profesionale në Tiranë
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Zgjidh shërbimin që të duhet, përshkruaj problemin dhe merr oferta të
              krahasueshme nga profesionistë të verifikuar pranë zonës tënde.
            </p>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>

          <div className="mt-14">
            <SectionHeading
              eyebrow="Kategori të tjera"
              title="Nuk e gjete shërbimin që kërkon?"
              subtitle="Kërko çdo lloj shërbimi tjetër — profesionistët tanë mbulojnë një gamë të gjerë nevojash për shtëpi dhe biznes."
              center
            />
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {allCategories.map((c) => {
                const svc = getServiceByCategory(c.key);
                const to = svc
                  ? `/services/${svc.slug}`
                  : `/request?category=${encodeURIComponent(c.key)}`;
                return (
                  <Link
                    key={c.key}
                    to={to}
                    className="card card-hover flex items-center gap-3 px-4 py-4"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-navy-900">{c.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

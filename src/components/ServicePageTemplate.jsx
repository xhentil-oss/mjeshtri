import { Link } from 'react-router-dom';
import { Search, MessageCircle, Check, ArrowRight, MapPin } from 'lucide-react';
import { services } from '@/data/services';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { areas } from '@/data/areas';
import { SITE } from '@/utils/seo';
import { serviceSchema, faqSchema, breadcrumbSchema, localBusinessSchema } from '@/utils/schemas';
import SEOHelmet from './SEOHelmet';
import Breadcrumbs from './Breadcrumbs';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import FAQ from './FAQ';
import ProfessionalCard from './ProfessionalCard';
import CTASection from './CTASection';
import Icon from './ui/Icon';

export default function ServicePageTemplate({ service }) {
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const { data } = useAsync(() => api.listProfessionals({ category: service.category }), [service.category]);
  const pros = data || [];
  const path = `/services/${service.slug}`;

  const crumbs = [
    { name: 'Ballina', path: '/' },
    { name: 'Shërbimet', path: '/services' },
    { name: service.name, path },
  ];

  return (
    <>
      <SEOHelmet
        title={service.seo.title}
        description={service.seo.description}
        path={path}
        schemas={[
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema(crumbs),
          localBusinessSchema(),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero text-white">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
        <Container className="relative py-12 md:py-16">
          <div className="mb-6 [&_*]:text-navy-200 [&_a:hover]:text-amber-400 [&_[aria-current]]:text-white">
            <Breadcrumbs items={crumbs} />
          </div>
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-white/15">
                <Icon name={service.icon} className="h-4 w-4" /> Shërbim në Tiranë
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl text-balance">{service.h1}</h1>
              <p className="mt-4 max-w-2xl text-lg text-navy-100">{service.intro}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={`/request?category=${encodeURIComponent(service.category)}`} className="btn-primary btn-lg">
                  <Search className="h-5 w-5" /> Kërko {service.name}
                </Link>
                <Link to={`/request?category=${encodeURIComponent(service.category)}`} className="btn-lg inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10">
                  Merr Oferta
                </Link>
                <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="btn-wa btn-lg">
                  <MessageCircle className="h-5 w-5" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Problems we solve */}
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Çfarë zgjidhim"
            title={`Probleme që mbulon ${service.name.toLowerCase()} në Tiranë`}
            subtitle="Përshkruaj problemin tënd dhe merr oferta nga profesionistë të verifikuar."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.problems.map((p) => (
              <div key={p.title} className="card card-hover p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-navy-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works + benefits */}
      <section className="section bg-mist">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading center={false} eyebrow="Si funksionon" title="Tre hapa të thjeshtë" />
              <ol className="mt-8 space-y-5">
                {['Përshkruaj problemin dhe zonën në Tiranë.', 'Merr oferta nga profesionistë të verifikuar.', 'Krahaso çmimet e vlerësimet dhe zgjidh më të mirin.'].map((t, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-500 text-sm font-bold text-white">{i + 1}</span>
                    <p className="pt-1 text-slate-700">{t}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <SectionHeading center={false} eyebrow="Përfitimet" title="Pse të kërkosh këtu" />
              <ul className="mt-8 space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-sm font-medium text-navy-800">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured pros for this service */}
      {pros.length > 0 && (
        <section className="section">
          <Container>
            <SectionHeading
              eyebrow="Profesionistët"
              title={`${service.name} të vlerësuar në Tiranë`}
              subtitle="Disa profesionistë të disponueshëm për këtë shërbim."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pros.slice(0, 3).map((pro) => <ProfessionalCard key={pro.id} pro={pro} />)}
            </div>
          </Container>
        </section>
      )}

      {/* Areas + local SEO content */}
      <section className="section bg-mist">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-navy-900">{service.name} në të gjitha zonat e Tiranës</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              {service.name} i platformës mbulon zona të ndryshme të Tiranës — nga qendra te periferia.
              Pavarësisht ku ndodhesh, mund të përshkruash problemin dhe të marrësh oferta nga profesionistë
              pranë teje. Krahaso çmimet, kohën e ardhjes dhe vlerësimet, dhe zgjidh me besim.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {areas.map((a) => (
                <Link key={a} to={`/request?category=${encodeURIComponent(service.category)}&area=${encodeURIComponent(a)}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-white px-3 py-1.5 text-xs font-medium text-navy-800 hover:border-amber-300 hover:text-amber-700">
                  <MapPin className="h-3 w-3 text-amber-500" /> {service.name} {a}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQ faqs={service.faqs} title={`Pyetje të shpeshta për ${service.name.toLowerCase()} në Tiranë`} />

      {/* Related services */}
      <section className="section">
        <Container>
          <SectionHeading eyebrow="Shërbime të lidhura" title="Mund të të interesojnë edhe" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {related.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card card-hover group flex items-center gap-4 p-5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-50 text-navy-700">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-navy-900">{s.title}</span>
                  <span className="text-sm text-amber-600">Shiko shërbimin</span>
                </span>
                <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-amber-600" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title={`Gati të kërkosh ${service.name.toLowerCase()}?`}
        primaryLabel={`Kërko ${service.name}`}
        primaryTo={`/request?category=${encodeURIComponent(service.category)}`}
      />
    </>
  );
}

import SEOHelmet from '@/components/SEOHelmet';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import Icon from '@/components/ui/Icon';
import CTASection from '@/components/CTASection';
import { demoStats } from '@/data/demoStats';
import { breadcrumbSchema, localBusinessSchema } from '@/utils/schemas';

const values = [
  { icon: 'ShieldCheck', title: 'Besueshmëri', text: 'Çdo profesionist kontrollohet përpara se të bëhet aktiv në platformë.' },
  { icon: 'Scale', title: 'Transparencë', text: 'Çmime, vlerësime dhe oferta të qarta — pa surpriza dhe pa kushte të fshehura.' },
  { icon: 'MapPin', title: 'Lokal', text: 'Profesionistë pranë zonës tënde në Tiranë, që e njohin terrenin dhe nevojat lokale.' },
  { icon: 'Zap', title: 'Shpejtësi', text: 'Merr oferta brenda pak kohe dhe zgjidh problemin pa pritur ditë të tëra.' },
];

export default function About() {
  const crumbs = [
    { name: 'Kreu', path: '/' },
    { name: 'Rreth nesh', path: '/about' },
  ];

  return (
    <>
      <SEOHelmet
        title="Rreth Nesh | Mjeshtri Tiranë"
        description="Mjeshtri është një treg lokal shërbimesh që lidh klientët në Tiranë me profesionistë të verifikuar — elektricistë, hidraulikë, teknikë dhe më shumë."
        path="/about"
        schemas={[breadcrumbSchema(crumbs), localBusinessSchema()]}
      />

      <section className="bg-mist border-b border-slate-100">
        <Container className="py-10 lg:py-14">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 max-w-2xl">
            <p className="eyebrow">Rreth nesh</p>
            <h1 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
              Tregu lokal i besueshëm i shërbimeve për Tiranën
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Mjeshtri lindi nga një nevojë e thjeshtë: të gjesh shpejt dhe me besim
              profesionistin e duhur për shtëpinë ose biznesin tënd, pa u mbështetur te
              kontaktet e rastësishme apo grupet e padisiplinuara në rrjete sociale.
            </p>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Misioni ynë</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Ne duam ta bëjmë kërkimin e një shërbimi po aq të thjeshtë sa porositja e
                një vakti. Klienti përshkruan problemin, profesionistët e verifikuar dërgojnë
                oferta, dhe klienti zgjedh sipas çmimit, vlerësimeve dhe eksperiencës — jo
                vetëm sipas çmimit më të ulët.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Për profesionistët, Mjeshtri është një kanal i qëndrueshëm punësh të reja,
                pa humbur kohë në negociata të pafundme apo reklama të shtrenjta.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {demoStats.map((s) => (
                <div key={s.label} className="card p-6 text-center">
                  <div className="text-3xl font-bold text-amber-500">{s.value}</div>
                  <div className="mt-1 text-sm text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Vlerat tona"
              title="Çfarë na udhëheq"
              center
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <div key={v.title} className="card card-hover p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon name={v.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-navy-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-12 max-w-2xl rounded-2xl bg-amber-50 p-4 text-center text-sm text-amber-800">
            Ky është një projekt demonstrues. Të dhënat, profesionistët dhe vlerësimet janë
            demo dhe shërbejnë për të treguar funksionalitetin e platformës.
          </p>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

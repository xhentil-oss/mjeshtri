import SEOHelmet from '@/components/SEOHelmet';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/Icon';
import { SITE } from '@/utils/seo';
import { breadcrumbSchema, localBusinessSchema } from '@/utils/schemas';

const details = [
  { icon: 'Phone', label: 'Telefon', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
  { icon: 'Mail', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: 'MessageCircle', label: 'WhatsApp', value: 'Shkruaj në WhatsApp', href: SITE.whatsapp },
  { icon: 'MapPin', label: 'Vendndodhja', value: 'Tiranë, Shqipëri', href: null },
];

export default function Contact() {
  const crumbs = [
    { name: 'Kreu', path: '/' },
    { name: 'Kontakt', path: '/contact' },
  ];

  return (
    <>
      <SEOHelmet
        title="Kontakt | Mjeshtri Tiranë"
        description="Na kontakto për çdo pyetje rreth shërbimeve në Tiranë. Telefon, WhatsApp ose email — ne të përgjigjemi shpejt."
        path="/contact"
        schemas={[breadcrumbSchema(crumbs), localBusinessSchema()]}
      />

      <section className="bg-mist border-b border-slate-100">
        <Container className="py-10 lg:py-14">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 max-w-2xl">
            <p className="eyebrow">Kontakt</p>
            <h1 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">Na kontakto</h1>
            <p className="mt-4 text-lg text-slate-600">
              Ke një pyetje ose dëshiron të kërkosh një shërbim? Plotëso formën ose na shkruaj
              direkt në WhatsApp — të përgjigjemi sa më shpejt.
            </p>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-navy-900">Dërgo një mesazh</h2>
              <p className="mt-2 text-slate-600">Plotëso të dhënat dhe do të të kontaktojmë.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900">Të dhënat e kontaktit</h2>
              <div className="mt-6 space-y-3">
                {details.map((d) => {
                  const inner = (
                    <div className="card card-hover flex items-center gap-4 p-4">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700">
                        <Icon name={d.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-wide text-slate-400">{d.label}</div>
                        <div className="font-semibold text-navy-900">{d.value}</div>
                      </div>
                    </div>
                  );
                  return d.href ? (
                    <a key={d.label} href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block">
                      {inner}
                    </a>
                  ) : (
                    <div key={d.label}>{inner}</div>
                  );
                })}
              </div>

              <div
                className="mt-6 grid h-56 place-items-center rounded-3xl border border-slate-100 bg-navy-50 text-navy-400"
                role="img"
                aria-label="Hartë demo e Tiranës"
              >
                <div className="text-center">
                  <Icon name="Map" className="mx-auto h-8 w-8" />
                  <p className="mt-2 text-sm">Hartë demo — Tiranë</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

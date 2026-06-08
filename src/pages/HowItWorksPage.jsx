import SEOHelmet from '@/components/SEOHelmet';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import HowItWorks from '@/components/HowItWorks';
import MarketplaceExplainer from '@/components/MarketplaceExplainer';
import TrustBadges from '@/components/TrustBadges';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import { homeFaqs } from '@/data/faqs';
import { breadcrumbSchema, faqSchema } from '@/utils/schemas';

export default function HowItWorksPage() {
  const crumbs = [
    { name: 'Kreu', path: '/' },
    { name: 'Si funksionon', path: '/how-it-works' },
  ];

  return (
    <>
      <SEOHelmet
        title="Si Funksionon | Mjeshtri Tiranë"
        description="Mëso si funksionon Mjeshtri: përshkruaj problemin, merr oferta nga profesionistë të verifikuar, krahaso dhe zgjidh atë që të përshtatet më mirë."
        path="/how-it-works"
        schemas={[breadcrumbSchema(crumbs), faqSchema(homeFaqs)]}
      />

      <section className="bg-mist border-b border-slate-100">
        <Container className="py-10 lg:py-14">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 max-w-2xl">
            <p className="eyebrow">Si funksionon</p>
            <h1 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
              Një proces i thjeshtë, transparent dhe i shpejtë
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Nga kërkesa te puna e përfunduar — ja si të lidhim me profesionistin e duhur
              në Tiranë, pa humbur kohë.
            </p>
          </div>
        </Container>
      </section>

      <HowItWorks />
      <MarketplaceExplainer />
      <TrustBadges />

      <FAQ
        faqs={homeFaqs}
        eyebrow="Pyetje të shpeshta"
        title="Pyetje rreth procesit"
      />

      <CTASection />
    </>
  );
}

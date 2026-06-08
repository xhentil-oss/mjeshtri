import SEOHelmet from '@/components/SEOHelmet';
import Hero from '@/components/Hero';
import ServiceSelector from '@/components/ServiceSelector';
import HowItWorks from '@/components/HowItWorks';
import ServiceCard from '@/components/ServiceCard';
import MarketplaceExplainer from '@/components/MarketplaceExplainer';
import TrustBadges from '@/components/TrustBadges';
import SocialProof from '@/components/SocialProof';
import FeaturedProfessionals from '@/components/FeaturedProfessionals';
import AreasCovered from '@/components/AreasCovered';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

import { services } from '@/data/services';
import { homeFaqs } from '@/data/faqs';
import { canonical } from '@/utils/seo';
import { localBusinessSchema, faqSchema } from '@/utils/schemas';

export default function Home() {
  const mainServices = services.slice(0, 4);

  return (
    <>
      <SEOHelmet
        title="Mjeshtri | Gjej Profesionistë të Besueshëm në Tiranë"
        description="Kërko shërbimin që të duhet, merr oferta nga profesionistë të verifikuar në Tiranë dhe zgjidh atë që të përshtatet më mirë. Elektricist, hidraulik, teknik kondicioneri dhe më shumë."
        path="/"
        schemas={[localBusinessSchema(), faqSchema(homeFaqs)]}
      />

      <Hero />
      <ServiceSelector />
      <HowItWorks />

      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Shërbimet kryesore"
            title="Shërbime profesionale për shtëpinë dhe biznesin tënd"
            subtitle="Zgjidh kategorinë, përshkruaj problemin dhe merr oferta nga profesionistë të verifikuar në Tiranë."
            center
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {mainServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      <MarketplaceExplainer />
      <TrustBadges />
      <SocialProof />
      <FeaturedProfessionals />
      <AreasCovered />

      <FAQ
        faqs={homeFaqs}
        eyebrow="Pyetje të shpeshta"
        title="Gjithçka që duhet të dish"
        subtitle="Përgjigje të shpejta për pyetjet më të zakonshme rreth platformës."
      />

      <CTASection />
    </>
  );
}

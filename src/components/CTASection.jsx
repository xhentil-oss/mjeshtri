import { Link } from 'react-router-dom';
import { Search, MessageCircle } from 'lucide-react';
import { SITE } from '@/utils/seo';
import Container from './ui/Container';

export default function CTASection({
  title = 'Gati të gjesh profesionistin e duhur?',
  text = 'Kërko shërbimin që të duhet, merr oferta dhe zgjidh profesionistin që të jep më shumë besim.',
  primaryLabel = 'Kërko Shërbim',
  primaryTo = '/request',
  secondaryLabel = 'Regjistrohu si Profesionist',
  secondaryTo = '/register/professional',
}) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-4xl bg-hero px-6 py-14 text-center text-white sm:px-12">
          <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-balance">{title}</h2>
            <p className="mt-4 text-lg text-navy-100">{text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to={primaryTo} className="btn-primary btn-lg">
                <Search className="h-5 w-5" /> {primaryLabel}
              </Link>
              <Link to={secondaryTo} className="btn-lg inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10">
                {secondaryLabel}
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="btn-wa btn-lg">
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

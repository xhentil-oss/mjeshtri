import { Link } from 'react-router-dom';
import { Search, MessageCircle, ShieldCheck, Star, MapPin, Briefcase, CheckCircle2 } from 'lucide-react';
import { SITE } from '@/utils/seo';
import { demoStats } from '@/data/demoStats';
import Container from './ui/Container';

const trustItems = [
  { icon: ShieldCheck, text: 'Profesionistë të verifikuar' },
  { icon: Star, text: 'Oferta të krahasueshme' },
  { icon: CheckCircle2, text: 'Vlerësime nga klientët' },
  { icon: MapPin, text: 'Shërbime në Tiranë' },
  { icon: Briefcase, text: 'Për shtëpi dhe biznese' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero text-white">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <Container className="relative py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-white/15 animate-fade-in">
              <ShieldCheck className="h-4 w-4" /> Profesionistë të verifikuar në Tiranë
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] animate-fade-up">
              Gjej Elektricist, Hidraulik dhe Profesionistë të Besueshëm në Tiranë
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100 animate-fade-up" style={{ animationDelay: '80ms' }}>
              Kërko shërbimin që të duhet, merr oferta nga profesionistë të verifikuar dhe zgjidh atë
              që të përshtatet më mirë.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '160ms' }}>
              <Link to="/request" className="btn-primary btn-lg">
                <Search className="h-5 w-5" /> Kërko Shërbim
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="btn-wa btn-lg">
                <MessageCircle className="h-5 w-5" /> Shkruaj në WhatsApp
              </a>
              <Link to="/register/professional" className="btn-lg inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10">
                Regjistrohu si Profesionist
              </Link>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2.5 animate-fade-up" style={{ animationDelay: '240ms' }}>
              {trustItems.map((t) => (
                <li key={t.text} className="flex items-center gap-2 text-sm text-navy-100">
                  <t.icon className="h-4 w-4 text-amber-400" /> {t.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats card */}
          <div className="lg:col-span-5">
            <div className="rounded-4xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm shadow-cardhover animate-fade-up" style={{ animationDelay: '120ms' }}>
              <p className="text-sm font-medium text-navy-200">Platforma në shifra (demo)</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {demoStats.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <div className="text-2xl font-extrabold text-amber-400">{s.value}</div>
                    <div className="mt-1 text-xs leading-snug text-navy-200">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-emerald-500/15 p-4 ring-1 ring-emerald-400/20">
                <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-300" />
                <p className="text-sm text-emerald-50">
                  Profesionistët kontrollohen përpara se të bëhen aktivë në platformë.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

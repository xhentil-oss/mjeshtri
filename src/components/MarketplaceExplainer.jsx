import { Tag, Star, Clock, Award, Wallet, Sparkles } from 'lucide-react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import ReviewStars from './ReviewStars';
import Avatar from './ui/Avatar';

const compareOn = [
  { icon: Wallet, label: 'Oferta në çmim' },
  { icon: Star, label: 'Vlerësimi dhe review-t' },
  { icon: Award, label: 'Eksperienca' },
  { icon: Clock, label: 'Koha e ardhjes' },
  { icon: Sparkles, label: 'Disponueshmëria' },
  { icon: Tag, label: 'Profili publik' },
];

const labelStyles = {
  'Më i vlerësuari': 'bg-amber-100 text-amber-800',
  'Përgjigje e shpejtë': 'bg-blue-100 text-blue-800',
  'Eksperiencë e lartë': 'bg-violet-100 text-violet-800',
  'Vlerë e mirë': 'bg-emerald-100 text-emerald-700',
};

// Illustrative mini bid cards (static, for explanation only).
const sampleBids = [
  { name: 'Arben H.', rating: 4.9, price: '2,500 ALL', arrival: 'Sot, pas 17:00', label: 'Më i vlerësuari' },
  { name: 'Sokol B.', rating: 4.6, price: '2,000 ALL', arrival: 'Nesër paradite', label: 'Vlerë e mirë' },
  { name: 'Erion L.', rating: 4.9, price: '2,800 ALL', arrival: 'Sot, pas 19:00', label: 'Përgjigje e shpejtë' },
];

export default function MarketplaceExplainer() {
  return (
    <section className="section bg-mist">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              center={false}
              eyebrow="Krahaso & Zgjidh"
              title="Krahaso oferta dhe zgjidh profesionistin më të përshtatshëm"
              subtitle="Nuk zgjedh verbërisht. Profesionistët dërgojnë oferta dhe ti vendos sipas asaj që ka më shumë rëndësi për ty."
            />
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {compareOn.map((c) => (
                <li key={c.label} className="flex items-center gap-3 rounded-xl border border-navy-100 bg-white p-3 text-sm font-medium text-navy-800">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-50 text-navy-700">
                    <c.icon className="h-4 w-4" />
                  </span>
                  {c.label}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-100">
              <strong>E rëndësishme:</strong> oferta më e lirë nuk është automatikisht më e mira.
              Platforma të nxit të vlerësosh besimin, cilësinë, review-t dhe kohën e përgjigjes.
            </p>
          </div>

          {/* Sample comparison */}
          <div className="rounded-3xl border border-navy-100 bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-navy-900">Oferta për: Elektricist · Astir</p>
              <span className="chip bg-amber-100 text-amber-800">3 oferta</span>
            </div>
            <div className="space-y-3">
              {sampleBids.map((b) => (
                <div key={b.name} className="flex items-center gap-3 rounded-2xl border border-navy-100 p-3">
                  <Avatar name={b.name} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-navy-900">{b.name}</span>
                      <span className={`chip ${labelStyles[b.label]}`}>{b.label}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                      <ReviewStars rating={b.rating} size={12} showValue />
                      <span>·</span>
                      <span>{b.arrival}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-navy-900">{b.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-400">Shembull ilustrues · të dhëna demo</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

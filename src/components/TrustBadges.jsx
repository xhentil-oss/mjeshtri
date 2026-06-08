import { ShieldCheck, MessageSquare, FileCheck2, Workflow, MapPin, UserCircle2 } from 'lucide-react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';

const items = [
  { icon: ShieldCheck, title: 'Profesionistë të verifikuar', text: 'Profilet kontrollohen përpara se të bëhen aktivë në platformë.' },
  { icon: MessageSquare, title: 'Review pas çdo pune', text: 'Klientët lënë vlerësime që ndihmojnë të tjerët të zgjedhin me besim.' },
  { icon: FileCheck2, title: 'Oferta të qarta', text: 'Çmimi dhe kushtet jepen para fillimit të punës — pa surpriza.' },
  { icon: Workflow, title: 'Proces i thjeshtë', text: 'Nga kërkesa te realizimi i shërbimit në pak hapa.' },
  { icon: MapPin, title: 'Mbështetje lokale', text: 'Profesionistë nga zona jote, që njohin Tiranën.' },
  { icon: UserCircle2, title: 'Profile publike', text: 'Shiko eksperiencë, punë të përfunduara dhe vlerësime.' },
];

export default function TrustBadges() {
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow="Besimi"
          title="Pse të zgjedhësh platformën"
          subtitle="Klientët mund të shohin vlerësime, eksperiencë dhe punë të përfunduara përpara se të zgjedhin."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="card card-hover flex gap-4 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <it.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-base font-bold text-navy-900">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

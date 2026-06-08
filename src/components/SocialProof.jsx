import { demoStats } from '@/data/demoStats';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import Testimonials from './Testimonials';

export default function SocialProof() {
  return (
    <section className="section bg-navy-900 text-white">
      <Container>
        <div className="grid gap-4 sm:grid-cols-4">
          {demoStats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/[0.06] p-6 text-center ring-1 ring-white/10">
              <div className="text-3xl font-extrabold text-amber-400">{s.value}</div>
              <div className="mt-1 text-sm text-navy-200">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Çfarë thonë klientët"
            title="Përvoja reale me profesionistët"
            subtitle="Vlerësime demo që tregojnë si funksionon platforma në praktikë."
            className="[&_h2]:text-white [&_p]:text-navy-200 [&_.eyebrow]:bg-white/10 [&_.eyebrow]:text-amber-300"
          />
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </Container>
    </section>
  );
}

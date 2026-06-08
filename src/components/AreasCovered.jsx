import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { areas } from '@/data/areas';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';

export default function AreasCovered() {
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow="Zonat"
          title="Shërbime në mbarë Tiranën"
          subtitle="Shërbimet tona janë të disponueshme në zona të ndryshme të Tiranës. Zgjidh shërbimin që të duhet dhe merr oferta nga profesionistë pranë zonës tënde."
        />
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {areas.map((a) => (
            <Link
              key={a}
              to={`/request?area=${encodeURIComponent(a)}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-medium text-navy-800 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
            >
              <MapPin className="h-4 w-4 text-amber-500" /> {a}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

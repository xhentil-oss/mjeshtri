import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import ProfessionalCard from './ProfessionalCard';

export default function FeaturedProfessionals() {
  const { data } = useAsync(() => api.listProfessionals({ featured: 'true' }), []);
  const pros = data || [];

  // Hide the section entirely until we have featured professionals to show.
  if (pros.length === 0) return null;

  return (
    <section className="section bg-mist">
      <Container>
        <SectionHeading
          eyebrow="Profesionistët"
          title="Profesionistë të vlerësuar në Tiranë"
          subtitle="Disa nga profesionistët më të vlerësuar në platformë. Shiko profilet dhe kërko ofertë direkt."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pros.slice(0, 4).map((pro) => (
            <ProfessionalCard key={pro.id} pro={pro} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/professionals" className="btn-outline">Shiko të gjithë profesionistët</Link>
        </div>
      </Container>
    </section>
  );
}

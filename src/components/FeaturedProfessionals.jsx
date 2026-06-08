import { Link } from 'react-router-dom';
import { featuredProfessionals } from '@/data/demoProfessionals';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import ProfessionalCard from './ProfessionalCard';

export default function FeaturedProfessionals() {
  return (
    <section className="section bg-mist">
      <Container>
        <SectionHeading
          eyebrow="Profesionistët"
          title="Profesionistë të vlerësuar në Tiranë"
          subtitle="Disa nga profesionistët më të vlerësuar në platformë. Shiko profilet dhe kërko ofertë direkt."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProfessionals.slice(0, 4).map((pro) => (
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

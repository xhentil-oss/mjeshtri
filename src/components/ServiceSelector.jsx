import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services, allCategories } from '@/data/services';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import Icon from './ui/Icon';

// Quick "what do you need today" selector. Maps known categories to their SEO
// service page when one exists, otherwise to the request flow with a prefill.
const slugByCategory = Object.fromEntries(services.map((s) => [s.category, s.slug]));

export default function ServiceSelector() {
  return (
    <section className="section bg-mist">
      <Container>
        <SectionHeading
          eyebrow="Shërbimet"
          title="Çfarë shërbimi të duhet sot?"
          subtitle="Zgjidh kategorinë dhe merr oferta nga profesionistë pranë zonës tënde në Tiranë."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {allCategories.map((c) => {
            const slug = slugByCategory[c.key];
            const to = slug ? `/services/${slug}` : `/request?category=${encodeURIComponent(c.key)}`;
            return (
              <Link key={c.key} to={to} className="card card-hover group flex flex-col gap-3 p-5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-50 text-navy-700 transition group-hover:bg-amber-500 group-hover:text-white">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <span className="text-base font-semibold text-navy-900">{c.label}</span>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                  Kërko këtë shërbim <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

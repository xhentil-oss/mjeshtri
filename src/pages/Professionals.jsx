import { useState, useMemo } from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProfessionalCard from '@/components/ProfessionalCard';
import CTASection from '@/components/CTASection';
import Icon from '@/components/ui/Icon';
import { professionals } from '@/data/demoProfessionals';
import { allCategories, categoryLabel } from '@/data/services';
import { areas } from '@/data/areas';
import { breadcrumbSchema } from '@/utils/schemas';

const categoryOptions = [...new Set(professionals.map((p) => p.category))];

export default function Professionals() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');

  const filtered = useMemo(() => {
    return professionals.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        categoryLabel(p.category).toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || p.category === category;
      const matchesArea = !area || p.areas.includes(area);
      return matchesSearch && matchesCategory && matchesArea;
    });
  }, [search, category, area]);

  const crumbs = [
    { name: 'Kreu', path: '/' },
    { name: 'Profesionistët', path: '/professionals' },
  ];

  return (
    <>
      <SEOHelmet
        title="Profesionistë të Verifikuar në Tiranë | Mjeshtri"
        description="Shfleto profesionistë të verifikuar në Tiranë — elektricistë, hidraulikë, teknikë kondicioneri dhe më shumë. Shiko vlerësime, eksperiencë dhe punë të përfunduara."
        path="/professionals"
        schemas={[breadcrumbSchema(crumbs)]}
      />

      <section className="bg-mist border-b border-slate-100">
        <Container className="py-10 lg:py-14">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 max-w-2xl">
            <p className="eyebrow">Profesionistët</p>
            <h1 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
              Profesionistë të verifikuar në Tiranë
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Krahaso vlerësime, eksperiencë dhe punë të përfunduara përpara se të zgjedhësh.
              Çdo profesionist kontrollohet përpara se të bëhet aktiv në platformë.
            </p>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          {/* Filters */}
          <div className="card mb-8 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Icon name="Search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="input pl-9"
                placeholder="Kërko sipas emrit…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Kërko profesionist"
              />
            </div>
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filtro sipas kategorisë">
              <option value="">Të gjitha kategoritë</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>{categoryLabel(c)}</option>
              ))}
            </select>
            <select className="input" value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filtro sipas zonës">
              <option value="">Të gjitha zonat</option>
              {areas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <button
              className="btn btn-outline"
              onClick={() => { setSearch(''); setCategory(''); setArea(''); }}
            >
              Pastro filtrat
            </button>
          </div>

          <p className="mb-6 text-sm text-slate-500">
            {filtered.length} profesionistë u gjetën
          </p>

          {filtered.length === 0 ? (
            <div className="card grid place-items-center gap-3 py-16 text-center">
              <Icon name="SearchX" className="h-10 w-10 text-slate-300" />
              <p className="text-slate-600">Asnjë profesionist nuk përputhet me filtrat.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProfessionalCard key={p.id} professional={p} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <CTASection
        title="Je profesionist? Bashkohu me Mjeshtri"
        text="Regjistrohu, shiko punët e disponueshme dhe dërgo oferta për të fituar klientë të rinj në Tiranë."
        primaryLabel="Regjistrohu si Profesionist"
        primaryTo="/register/professional"
        secondaryLabel="Si funksionon"
        secondaryTo="/how-it-works"
      />
    </>
  );
}

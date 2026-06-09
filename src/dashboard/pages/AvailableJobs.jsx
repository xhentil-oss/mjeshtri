import { useState, useMemo } from 'react';
import DashboardPage from '@/dashboard/components/DashboardPage';
import JobCard from '@/dashboard/components/JobCard';
import SearchAndFilterBar from '@/dashboard/components/SearchAndFilterBar';
import EmptyState from '@/dashboard/components/EmptyState';
import LoadingState from '@/dashboard/components/LoadingState';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { categoryLabel } from '@/data/services';
import { areas } from '@/data/areas';

export default function AvailableJobs() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');

  const { data, loading } = useAsync(() => api.availableJobs(), []);
  const openJobs = data || [];

  const categories = useMemo(() => [...new Set(openJobs.map((j) => j.category))], [openJobs]);

  const filtered = useMemo(
    () =>
      openJobs.filter((j) => {
        const s = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.description.toLowerCase().includes(search.toLowerCase());
        const c = !category || j.category === category;
        const a = !area || j.area === area;
        return s && c && a;
      }),
    [openJobs, search, category, area]
  );

  return (
    <DashboardPage title="Punë të disponueshme" subtitle="Gjej punë pranë teje dhe dërgo oferta.">
      <SearchAndFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Kërko punë…"
        filters={[
          { value: category, onChange: setCategory, label: 'Të gjitha kategoritë', options: categories.map((c) => ({ value: c, label: categoryLabel(c) })) },
          { value: area, onChange: setArea, label: 'Të gjitha zonat', options: areas.map((a) => ({ value: a, label: a })) },
        ]}
      />

      {loading ? (
        <LoadingState rows={3} />
      ) : filtered.length === 0 ? (
        <EmptyState icon="SearchX" title="Asnjë punë nuk u gjet" text="Provo të heqësh disa filtra ose kontrollo më vonë." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((j) => (
            <JobCard key={j.id} job={j} showBidCta />
          ))}
        </div>
      )}
    </DashboardPage>
  );
}

import { useState, useMemo } from 'react';
import DashboardPage from '@/dashboard/components/DashboardPage';
import AdminProfessionalApprovalTable from '@/dashboard/components/AdminProfessionalApprovalTable';
import SearchAndFilterBar from '@/dashboard/components/SearchAndFilterBar';
import { professionals } from '@/data/demoProfessionals';
import { categoryLabel } from '@/data/services';

const categories = [...new Set(professionals.map((p) => p.category))];

export default function AdminProfessionals() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filtered = useMemo(
    () =>
      professionals.filter((p) => {
        const s = !search || p.name.toLowerCase().includes(search.toLowerCase());
        const c = !category || p.category === category;
        return s && c;
      }),
    [search, category]
  );

  return (
    <DashboardPage title="Profesionistët" subtitle="Aprovo, refuzo dhe menaxho profesionistët.">
      <SearchAndFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Kërko profesionist…"
        filters={[{ value: category, onChange: setCategory, label: 'Të gjitha kategoritë', options: categories.map((c) => ({ value: c, label: categoryLabel(c) })) }]}
      />
      <AdminProfessionalApprovalTable professionals={filtered} />
    </DashboardPage>
  );
}

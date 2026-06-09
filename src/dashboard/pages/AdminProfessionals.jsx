import { useState, useMemo } from 'react';
import DashboardPage from '@/dashboard/components/DashboardPage';
import AdminProfessionalApprovalTable from '@/dashboard/components/AdminProfessionalApprovalTable';
import SearchAndFilterBar from '@/dashboard/components/SearchAndFilterBar';
import LoadingState from '@/dashboard/components/LoadingState';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { categoryLabel } from '@/data/services';

export default function AdminProfessionals() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const { data, loading, reload } = useAsync(() => api.adminProfessionals(), []);
  const professionals = data || [];

  const categories = useMemo(() => [...new Set(professionals.map((p) => p.category))], [professionals]);

  const filtered = useMemo(
    () =>
      professionals.filter((p) => {
        const s = !search || p.name.toLowerCase().includes(search.toLowerCase());
        const c = !category || p.category === category;
        return s && c;
      }),
    [professionals, search, category]
  );

  const act = async (id, action) => {
    try {
      await api.adminUpdatePro(id, action);
      reload();
    } catch (err) {
      alert(err.message || 'Veprimi dështoi.');
    }
  };

  return (
    <DashboardPage title="Profesionistët" subtitle="Aprovo, refuzo dhe menaxho profesionistët.">
      <SearchAndFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Kërko profesionist…"
        filters={[{ value: category, onChange: setCategory, label: 'Të gjitha kategoritë', options: categories.map((c) => ({ value: c, label: categoryLabel(c) })) }]}
      />
      {loading ? <LoadingState rows={4} /> : <AdminProfessionalApprovalTable professionals={filtered} onAction={act} />}
    </DashboardPage>
  );
}

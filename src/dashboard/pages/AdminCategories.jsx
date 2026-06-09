import { useMemo } from 'react';
import DashboardPage from '@/dashboard/components/DashboardPage';
import Icon from '@/components/ui/Icon';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { allCategories, getServiceByCategory } from '@/data/services';

export default function AdminCategories() {
  const { data } = useAsync(() => api.adminProfessionals(), []);
  const professionals = data || [];

  const counts = useMemo(
    () =>
      professionals.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {}),
    [professionals],
  );

  return (
    <DashboardPage
      title="Kategoritë"
      subtitle="Kategoritë e shërbimeve dhe numri i profesionistëve në secilën."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allCategories.map((c) => {
          const svc = getServiceByCategory(c.key);
          const count = counts[c.key] || 0;
          return (
            <div key={c.key} className="card p-5">
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-3 font-semibold text-navy-900">{c.label}</h3>
              <p className="mt-1 text-sm text-slate-500">{count} profesionistë</p>
              {svc && (
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600">
                  <Icon name="Search" className="h-3 w-3" /> Faqe SEO aktive
                </span>
              )}
            </div>
          );
        })}
      </div>
    </DashboardPage>
  );
}

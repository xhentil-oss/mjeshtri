import { useMemo } from 'react';
import DashboardPage from '@/dashboard/components/DashboardPage';
import StatCard from '@/dashboard/components/StatCard';
import Icon from '@/components/ui/Icon';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { allCategories } from '@/data/services';

// Illustrative monthly series — there is no time-series endpoint yet.
const monthly = [
  { m: 'Jan', v: 42 }, { m: 'Shk', v: 58 }, { m: 'Mar', v: 71 },
  { m: 'Pri', v: 64 }, { m: 'Maj', v: 89 }, { m: 'Qer', v: 103 },
];

export default function AdminReports() {
  const { data: stats } = useAsync(() => api.adminStats(), []);
  const { data: prosData } = useAsync(() => api.adminProfessionals(), []);
  const professionals = prosData || [];
  const s = stats || {};

  const maxV = Math.max(...monthly.map((d) => d.v));
  const byCategory = useMemo(() => {
    const counts = professionals.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    return allCategories
      .map((c) => ({ label: c.label, n: counts[c.key] || 0 }))
      .filter((c) => c.n > 0)
      .sort((a, b) => b.n - a.n);
  }, [professionals]);
  const maxCat = Math.max(1, ...byCategory.map((c) => c.n));

  return (
    <DashboardPage title="Raporte" subtitle="Pamje e përgjithshme e performancës së platformës.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon="Briefcase" label="Punë gjithsej" value={s.jobs ?? 0} accent="emerald" />
        <StatCard icon="Send" label="Oferta gjithsej" value={s.bids ?? 0} accent="amber" />
        <StatCard icon="Star" label="Vlerësim mesatar" value={(s.avgRating ?? 0).toFixed?.(1) ?? s.avgRating ?? 0} accent="blue" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-semibold text-navy-900">Kërkesa sipas muajit</h3>
          <div className="mt-6 flex h-48 items-end gap-3">
            {monthly.map((d) => (
              <div key={d.m} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div className="w-full rounded-t-lg bg-amber-400 transition-all" style={{ height: `${(d.v / maxV) * 100}%` }} title={`${d.v}`} />
                </div>
                <span className="text-xs text-slate-400">{d.m}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">Seri ilustruese.</p>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-navy-900">Profesionistë sipas kategorisë</h3>
          <div className="mt-6 space-y-3">
            {byCategory.length === 0 && <p className="text-sm text-slate-400">Ende pa të dhëna.</p>}
            {byCategory.map((c) => (
              <div key={c.label} className="flex items-center gap-3 text-sm">
                <span className="w-28 shrink-0 text-slate-600">{c.label}</span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-navy-700" style={{ width: `${(c.n / maxCat) * 100}%` }} />
                </div>
                <span className="w-5 text-right text-slate-400">{c.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}

import DashboardPage from '@/dashboard/components/DashboardPage';
import StatCard from '@/dashboard/components/StatCard';
import Icon from '@/components/ui/Icon';
import { platformStats } from '@/data/demoStats';
import { professionals, professionalsByCategory } from '@/data/demoProfessionals';
import { allCategories } from '@/data/services';

const monthly = [
  { m: 'Jan', v: 42 }, { m: 'Shk', v: 58 }, { m: 'Mar', v: 71 },
  { m: 'Pri', v: 64 }, { m: 'Maj', v: 89 }, { m: 'Qer', v: 103 },
];

export default function AdminReports() {
  const maxV = Math.max(...monthly.map((d) => d.v));
  const byCategory = allCategories
    .map((c) => ({ label: c.label, n: professionalsByCategory(c.key).length }))
    .filter((c) => c.n > 0)
    .sort((a, b) => b.n - a.n);
  const maxCat = Math.max(1, ...byCategory.map((c) => c.n));

  return (
    <DashboardPage title="Raporte" subtitle="Pamje e përgjithshme e performancës së platformës.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon="TrendingUp" label="Kërkesa këtë muaj" value="103" hint="+16% nga muaji i kaluar" accent="emerald" />
        <StatCard icon="Percent" label="Norma e konvertimit" value="68%" hint="oferta → punë e pranuar" accent="amber" />
        <StatCard icon="Clock" label="Koha mesatare e ofertës" value="14 min" accent="blue" />
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
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-navy-900">Profesionistë sipas kategorisë</h3>
          <div className="mt-6 space-y-3">
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

      <p className="mt-6 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-400">
        <Icon name="Info" className="h-4 w-4" /> Të dhënat janë demonstruese.
      </p>
    </DashboardPage>
  );
}

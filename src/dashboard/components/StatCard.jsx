import Icon from '@/components/ui/Icon';

export default function StatCard({ icon, label, value, hint, accent = 'navy' }) {
  const accents = {
    navy: 'bg-navy-50 text-navy-700',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
    blue: 'bg-blue-50 text-blue-600',
  };
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-navy-900">{value}</p>
        </div>
        {icon && (
          <span className={`grid h-10 w-10 place-items-center rounded-xl ${accents[accent] || accents.navy}`}>
            <Icon name={icon} className="h-5 w-5" />
          </span>
        )}
      </div>
      {hint && <p className="mt-3 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

import Icon from '@/components/ui/Icon';

export default function ProfileCompletion({ percent = 70, items = [] }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-navy-900">Plotësimi i profilit</h3>
        <span className="text-sm font-bold text-amber-600">{percent}%</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${percent}%` }} />
      </div>
      {items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {items.map((it) => (
            <li key={it.label} className="flex items-center gap-2 text-sm">
              <Icon
                name={it.done ? 'CheckCircle2' : 'Circle'}
                className={`h-4 w-4 ${it.done ? 'text-emerald-500' : 'text-slate-300'}`}
              />
              <span className={it.done ? 'text-slate-500 line-through' : 'text-slate-700'}>{it.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

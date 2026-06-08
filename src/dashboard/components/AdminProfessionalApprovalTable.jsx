import { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';
import { categoryLabel } from '@/data/services';

export default function AdminProfessionalApprovalTable({ professionals = [] }) {
  const [statuses, setStatuses] = useState(
    Object.fromEntries(professionals.map((p) => [p.id, p.verified ? 'approved' : 'pending']))
  );

  const setStatus = (id, status) => setStatuses((s) => ({ ...s, [id]: status }));

  const badge = {
    approved: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-800',
    rejected: 'bg-rose-100 text-rose-700',
  };
  const label = { approved: 'Aprovuar', pending: 'Në pritje', rejected: 'Refuzuar' };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-mist text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Profesionisti</th>
            <th className="px-4 py-3">Kategoria</th>
            <th className="px-4 py-3">Kontakti</th>
            <th className="px-4 py-3">Zonat</th>
            <th className="px-4 py-3">Statusi</th>
            <th className="px-4 py-3 text-right">Veprime</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {professionals.map((p) => (
            <tr key={p.id} className="hover:bg-mist/50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Avatar name={p.name} size={36} />
                  <div>
                    <div className="font-semibold text-navy-900">{p.name}</div>
                    <div className="text-xs text-slate-400">⭐ {p.rating} · {p.reviews} vlerësime</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600">{categoryLabel(p.category)}</td>
              <td className="px-4 py-3 text-slate-600">
                <div>{p.business || '—'}</div>
                <div className="text-xs text-slate-400">{p.city}</div>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{p.areas.slice(0, 2).join(', ')}{p.areas.length > 2 ? '…' : ''}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge[statuses[p.id]]}`}>
                  {label[statuses[p.id]]}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <button onClick={() => setStatus(p.id, 'approved')} title="Aprovo" className="grid h-8 w-8 place-items-center rounded-lg text-emerald-600 hover:bg-emerald-50">
                    <Icon name="Check" className="h-4 w-4" />
                  </button>
                  <button onClick={() => setStatus(p.id, 'rejected')} title="Refuzo" className="grid h-8 w-8 place-items-center rounded-lg text-rose-600 hover:bg-rose-50">
                    <Icon name="X" className="h-4 w-4" />
                  </button>
                  <Link to={`/professionals/${p.slug}`} title="Shiko" className="grid h-8 w-8 place-items-center rounded-lg text-navy-600 hover:bg-navy-50">
                    <Icon name="Eye" className="h-4 w-4" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

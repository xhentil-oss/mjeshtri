import Icon from '@/components/ui/Icon';
import { StatusBadge } from '@/dashboard/components/StatusBadge';
import { categoryLabel } from '@/data/services';
import { getProfessionalById } from '@/data/demoProfessionals';
import { customers } from '@/data/demoUsers';

const customerName = (id) => customers.find((c) => c.id === id)?.name || '—';

export default function AdminJobsTable({ jobs = [] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-mist text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Klienti</th>
            <th className="px-4 py-3">Kategoria</th>
            <th className="px-4 py-3">Zona</th>
            <th className="px-4 py-3">Statusi</th>
            <th className="px-4 py-3">Oferta</th>
            <th className="px-4 py-3">Data</th>
            <th className="px-4 py-3 text-right">Veprime</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {jobs.map((j) => (
            <tr key={j.id} className="hover:bg-mist/50">
              <td className="px-4 py-3 font-mono text-xs text-slate-400">{j.id}</td>
              <td className="px-4 py-3 font-medium text-navy-900">{customerName(j.customerId)}</td>
              <td className="px-4 py-3 text-slate-600">{categoryLabel(j.category)}</td>
              <td className="px-4 py-3 text-slate-600">{j.area}</td>
              <td className="px-4 py-3"><StatusBadge status={j.status} /></td>
              <td className="px-4 py-3 text-slate-600">{j.bidsCount}</td>
              <td className="px-4 py-3 text-xs text-slate-400">{j.postedAt}</td>
              <td className="px-4 py-3 text-right">
                <button className="grid h-8 w-8 place-items-center rounded-lg text-navy-600 hover:bg-navy-50" title="Shiko">
                  <Icon name="Eye" className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

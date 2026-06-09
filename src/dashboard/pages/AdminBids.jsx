import DashboardPage from '@/dashboard/components/DashboardPage';
import LoadingState from '@/dashboard/components/LoadingState';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { formatALL } from '@/utils/formatCurrency';

const statusBadge = {
  pending: 'bg-amber-100 text-amber-800',
  accepted: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-rose-100 text-rose-700',
};
const statusLabel = { pending: 'Në pritje', accepted: 'Pranuar', rejected: 'Refuzuar' };

export default function AdminBids() {
  const { data, loading } = useAsync(() => api.adminBids(), []);
  const bids = data || [];

  return (
    <DashboardPage title="Ofertat" subtitle="Të gjitha ofertat e dërguara nga profesionistët.">
      {loading ? (
        <LoadingState rows={4} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Profesionisti</th>
                <th className="px-4 py-3">Puna</th>
                <th className="px-4 py-3">Çmimi</th>
                <th className="px-4 py-3">Mbërritja</th>
                <th className="px-4 py-3">Etiketa</th>
                <th className="px-4 py-3">Statusi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bids.map((b) => (
                <tr key={b.id} className="hover:bg-mist/50">
                  <td className="px-4 py-3 font-medium text-navy-900">{b.proName || '—'}</td>
                  <td className="px-4 py-3 max-w-[200px] truncate text-slate-600" title={b.jobTitle}>{b.jobTitle || '—'}</td>
                  <td className="px-4 py-3 font-semibold text-navy-900">{formatALL(b.price)}</td>
                  <td className="px-4 py-3 text-slate-600">{b.arrival}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{b.label || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadge[b.status]}`}>{statusLabel[b.status]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardPage>
  );
}

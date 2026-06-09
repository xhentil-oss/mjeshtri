import { Link } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import EmptyState from '@/dashboard/components/EmptyState';
import LoadingState from '@/dashboard/components/LoadingState';
import Icon from '@/components/ui/Icon';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { categoryLabel } from '@/data/services';
import { formatALL } from '@/utils/formatCurrency';

const bidStatus = {
  pending: { label: 'Në pritje', cls: 'bg-amber-100 text-amber-800' },
  accepted: { label: 'Pranuar', cls: 'bg-emerald-100 text-emerald-700' },
  rejected: { label: 'Refuzuar', cls: 'bg-rose-100 text-rose-700' },
};

export default function ProfessionalBids() {
  const { data, loading } = useAsync(() => api.myBids(), []);
  const myBids = data || [];

  return (
    <DashboardPage title="Ofertat e mia" subtitle="Ndiq statusin e ofertave që ke dërguar.">
      {loading ? (
        <LoadingState rows={3} />
      ) : myBids.length === 0 ? (
        <EmptyState icon="Send" title="Ende pa oferta" text="Shfleto punët e disponueshme dhe dërgo ofertën tënde të parë." actionLabel="Shiko punët" actionTo="/pro-dashboard/jobs" />
      ) : (
        <div className="space-y-4">
          {myBids.map((b) => {
            const job = b.job || {};
            const st = bidStatus[b.status] || bidStatus.pending;
            return (
              <div key={b.id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-amber-600">{job.category && categoryLabel(job.category)}</p>
                    <h3 className="font-semibold text-navy-900">{job.title || 'Punë'}</h3>
                    <p className="mt-1 text-sm text-slate-500">{job.area}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${st.cls}`}>{st.label}</span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5"><Icon name="Wallet" className="h-4 w-4" /> {formatALL(b.price)}</span>
                  <span className="inline-flex items-center gap-1.5"><Icon name="Clock" className="h-4 w-4" /> {b.arrival}</span>
                  {job.id && <Link to={`/pro-dashboard/jobs/${job.id}`} className="ml-auto text-sm font-semibold text-amber-600 hover:underline">Shiko punën</Link>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardPage>
  );
}

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import OfferComparisonTable from '@/dashboard/components/OfferComparisonTable';
import { StatusBadge } from '@/dashboard/components/StatusBadge';
import EmptyState from '@/dashboard/components/EmptyState';
import LoadingState from '@/dashboard/components/LoadingState';
import Icon from '@/components/ui/Icon';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { categoryLabel } from '@/data/services';

export default function CustomerOffers() {
  const [params, setParams] = useSearchParams();

  const { data: jobsData, loading: jobsLoading, reload: reloadJobs } = useAsync(() => api.myJobs(), []);
  const allJobs = jobsData || [];
  // Only jobs that actually have offers are worth comparing.
  const myJobs = allJobs.filter((j) => (j.bidsCount || 0) > 0);

  const activeJobId = params.get('job') || myJobs[0]?.id || null;
  const job = myJobs.find((j) => j.id === activeJobId) || null;

  const { data: bidsData, loading: bidsLoading, reload: reloadBids } = useAsync(
    () => (activeJobId ? api.jobBids(activeJobId) : Promise.resolve([])),
    [activeJobId],
  );
  const bids = bidsData || [];

  const [selected, setSelected] = useState(null);
  const [confirming, setConfirming] = useState(false);

  if (jobsLoading) {
    return (
      <DashboardPage title="Ofertat" subtitle="Krahaso ofertat dhe zgjidh profesionistin.">
        <LoadingState rows={3} />
      </DashboardPage>
    );
  }

  if (myJobs.length === 0) {
    return (
      <DashboardPage title="Ofertat" subtitle="Krahaso ofertat dhe zgjidh profesionistin.">
        <EmptyState icon="GitCompareArrows" title="Ende pa oferta" text="Sapo profesionistët të dërgojnë oferta për kërkesat e tua, ato do të shfaqen këtu." actionLabel="Kërko shërbim" actionTo="/request" />
      </DashboardPage>
    );
  }

  const handleSelect = (bid) => setSelected(bid);

  const confirmSelection = async () => {
    if (!selected || !job) return;
    setConfirming(true);
    try {
      await api.selectBid(job.id, selected.id);
      setSelected(null);
      await Promise.all([reloadJobs(), reloadBids()]);
    } catch (err) {
      alert(err.message || 'Zgjedhja dështoi.');
    } finally {
      setConfirming(false);
    }
  };

  const alreadyChosen = job && job.status !== 'Open for Bids' && job.status !== 'Pending';

  return (
    <DashboardPage title="Ofertat" subtitle="Krahaso çmimet, vlerësimet dhe eksperiencën para se të zgjedhësh.">
      {/* Job switcher */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {myJobs.map((j) => (
          <button
            key={j.id}
            onClick={() => { setParams({ job: j.id }); setSelected(null); }}
            className={`shrink-0 rounded-xl border px-4 py-2.5 text-left text-sm transition ${
              j.id === activeJobId ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="block font-semibold text-navy-900">{j.title}</span>
            <span className="text-xs text-slate-500">{categoryLabel(j.category)} · {j.bidsCount} oferta</span>
          </button>
        ))}
      </div>

      {job && (
        <>
          <div className="card mb-6 flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <h2 className="font-bold text-navy-900">{job.title}</h2>
              <p className="text-sm text-slate-500">{categoryLabel(job.category)} · {job.area}</p>
            </div>
            <StatusBadge status={job.status} />
          </div>

          {alreadyChosen ? (
            <div className="mb-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
              <Icon name="CheckCircle2" className="h-4 w-4 shrink-0" />
              Ke zgjedhur tashmë një profesionist për këtë punë.
            </div>
          ) : (
            <div className="mb-3 flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
              <Icon name="Lightbulb" className="h-4 w-4 shrink-0" />
              Më e lira nuk është gjithmonë më e mira — shiko vlerësimet dhe eksperiencën.
            </div>
          )}

          {bidsLoading ? (
            <LoadingState rows={2} />
          ) : (
            <OfferComparisonTable bids={bids} onSelect={alreadyChosen ? undefined : handleSelect} />
          )}
        </>
      )}

      {/* Selection confirmation */}
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy-950/40 p-4" onClick={() => !confirming && setSelected(null)}>
          <div className="card w-full max-w-md p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Icon name="CheckCircle2" className="h-7 w-7" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-navy-900">Zgjidh {selected.pro?.name}</h3>
            <p className="mt-2 text-sm text-slate-600">
              Profesionisti do të njoftohet dhe puna do të kalojë në proces.
            </p>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setSelected(null)} disabled={confirming} className="btn btn-outline flex-1">Anulo</button>
              <button onClick={confirmSelection} disabled={confirming} className="btn btn-primary flex-1 disabled:opacity-60">
                {confirming ? 'Po konfirmohet…' : 'Konfirmo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardPage>
  );
}

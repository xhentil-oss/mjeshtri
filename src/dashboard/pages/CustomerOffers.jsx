import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import OfferComparisonTable from '@/dashboard/components/OfferComparisonTable';
import { StatusBadge } from '@/dashboard/components/StatusBadge';
import EmptyState from '@/dashboard/components/EmptyState';
import Icon from '@/components/ui/Icon';
import { jobsByCustomer, getJobById } from '@/data/demoJobs';
import { bidsByJob } from '@/data/demoBids';
import { getProfessionalById } from '@/data/demoProfessionals';
import { categoryLabel } from '@/data/services';

const CUSTOMER_ID = 'cust-1';

export default function CustomerOffers() {
  const [params, setParams] = useSearchParams();
  const myJobs = jobsByCustomer(CUSTOMER_ID).filter((j) => bidsByJob(j.id).length > 0);
  const activeJobId = params.get('job') || myJobs[0]?.id;
  const job = activeJobId ? getJobById(activeJobId) : null;
  const bids = job ? bidsByJob(job.id) : [];

  const [selected, setSelected] = useState(null);

  if (myJobs.length === 0) {
    return (
      <DashboardPage title="Ofertat" subtitle="Krahaso ofertat dhe zgjidh profesionistin.">
        <EmptyState icon="GitCompareArrows" title="Ende pa oferta" text="Sapo profesionistët të dërgojnë oferta për kërkesat e tua, ato do të shfaqen këtu." actionLabel="Kërko shërbim" actionTo="/request" />
      </DashboardPage>
    );
  }

  const handleSelect = (bid) => {
    const pro = getProfessionalById(bid.proId);
    setSelected({ bid, pro });
  };

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
            <span className="text-xs text-slate-500">{categoryLabel(j.category)} · {bidsByJob(j.id).length} oferta</span>
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

          <div className="mb-3 flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
            <Icon name="Lightbulb" className="h-4 w-4 shrink-0" />
            Më e lira nuk është gjithmonë më e mira — shiko vlerësimet dhe eksperiencën.
          </div>

          <OfferComparisonTable bids={bids} onSelect={handleSelect} />
        </>
      )}

      {/* Selection confirmation */}
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy-950/40 p-4" onClick={() => setSelected(null)}>
          <div className="card w-full max-w-md p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Icon name="CheckCircle2" className="h-7 w-7" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-navy-900">Zgjodhe {selected.pro.name}</h3>
            <p className="mt-2 text-sm text-slate-600">
              Profesionisti do të njoftohet dhe do të kontaktojë me ty për të finalizuar detajet.
            </p>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setSelected(null)} className="btn btn-outline flex-1">Mbyll</button>
              <a href={selected.pro ? `tel:` : '#'} className="btn btn-primary flex-1">Konfirmo</a>
            </div>
            <p className="mt-3 text-xs text-slate-400">Demo: zgjedhja nuk ruhet.</p>
          </div>
        </div>
      )}
    </DashboardPage>
  );
}

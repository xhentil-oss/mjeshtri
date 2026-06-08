import { useState } from 'react';
import DashboardPage from '@/dashboard/components/DashboardPage';
import ReviewStars from '@/components/ReviewStars';
import EmptyState from '@/dashboard/components/EmptyState';
import Icon from '@/components/ui/Icon';
import { jobs } from '@/data/demoJobs';
import { getProfessionalById } from '@/data/demoProfessionals';
import { categoryLabel } from '@/data/services';

const CUSTOMER_ID = 'cust-1';

export default function CustomerReviews() {
  // Completed jobs by this customer that can be reviewed.
  const reviewable = jobs.filter((j) => j.customerId === CUSTOMER_ID && j.status === 'Completed' && j.selectedProId);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  return (
    <DashboardPage title="Vlerësimet" subtitle="Vlerëso profesionistët me të cilët ke punuar.">
      {reviewable.length === 0 ? (
        <EmptyState icon="Star" title="Asgjë për të vlerësuar" text="Pasi një punë të përfundojë, do të mund të lësh një vlerësim këtu." />
      ) : done ? (
        <div className="card grid place-items-center gap-2 py-12 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Icon name="CheckCircle2" className="h-6 w-6" />
          </span>
          <h3 className="font-semibold text-navy-900">Faleminderit për vlerësimin!</h3>
          <p className="text-sm text-slate-500">Vlerësimi yt ndihmon klientët e tjerë të zgjedhin më mirë.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviewable.map((j) => {
            const pro = getProfessionalById(j.selectedProId);
            return (
              <div key={j.id} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-navy-900">{j.title}</h3>
                    <p className="text-sm text-slate-500">{pro?.name} · {categoryLabel(j.category)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="label">Vlerësimi yt</span>
                  <div className="mt-1.5 flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setRating(n)} aria-label={`${n} yje`}>
                        <Icon name="Star" className={`h-7 w-7 ${n <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  className="input mt-4 min-h-[90px] resize-y"
                  placeholder="Përshkruaj eksperiencën tënde…"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  onClick={() => rating > 0 && setDone(true)}
                  disabled={rating === 0}
                  className="btn btn-primary mt-3 w-full disabled:opacity-50"
                >
                  Dërgo vlerësimin
                </button>
              </div>
            );
          })}
        </div>
      )}
    </DashboardPage>
  );
}

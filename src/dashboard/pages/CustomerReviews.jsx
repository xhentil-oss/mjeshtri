import { useState } from 'react';
import DashboardPage from '@/dashboard/components/DashboardPage';
import EmptyState from '@/dashboard/components/EmptyState';
import LoadingState from '@/dashboard/components/LoadingState';
import Icon from '@/components/ui/Icon';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { categoryLabel } from '@/data/services';

export default function CustomerReviews() {
  const { data, loading, reload } = useAsync(() => api.myJobs(), []);
  const jobs = data || [];
  // Completed jobs with a chosen professional that haven't been reviewed yet.
  const reviewable = jobs.filter((j) => j.status === 'Completed' && j.selectedProId && !j.reviewed);

  return (
    <DashboardPage title="Vlerësimet" subtitle="Vlerëso profesionistët me të cilët ke punuar.">
      {loading ? (
        <LoadingState rows={2} />
      ) : reviewable.length === 0 ? (
        <EmptyState icon="Star" title="Asgjë për të vlerësuar" text="Pasi një punë të përfundojë, do të mund të lësh një vlerësim këtu." />
      ) : (
        <div className="space-y-4">
          {reviewable.map((j) => (
            <ReviewCard key={j.id} job={j} onDone={reload} />
          ))}
        </div>
      )}
    </DashboardPage>
  );
}

function ReviewCard({ job, onDone }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (rating === 0) return;
    setBusy(true);
    setError('');
    try {
      await api.createReview({ jobId: job.id, rating, text });
      setDone(true);
      onDone?.();
    } catch (err) {
      setError(err.message || 'Vlerësimi dështoi.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="card grid place-items-center gap-2 py-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Icon name="CheckCircle2" className="h-6 w-6" />
        </span>
        <h3 className="font-semibold text-navy-900">Faleminderit për vlerësimin!</h3>
        <p className="text-sm text-slate-500">Vlerësimi yt ndihmon klientët e tjerë të zgjedhin më mirë.</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-navy-900">{job.title}</h3>
      <p className="text-sm text-slate-500">{categoryLabel(job.category)} · {job.area}</p>
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
      {error && <p className="mt-2 text-xs text-rose-600">{error}</p>}
      <button onClick={submit} disabled={rating === 0 || busy} className="btn btn-primary mt-3 w-full disabled:opacity-50">
        {busy ? 'Po dërgohet…' : 'Dërgo vlerësimin'}
      </button>
    </div>
  );
}

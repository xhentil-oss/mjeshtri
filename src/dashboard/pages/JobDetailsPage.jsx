import { useParams, Link } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import JobDetails from '@/dashboard/components/JobDetails';
import BidForm from '@/dashboard/components/BidForm';
import EmptyState from '@/dashboard/components/EmptyState';
import LoadingState from '@/dashboard/components/LoadingState';
import Icon from '@/components/ui/Icon';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';

export default function JobDetailsPage() {
  const { id } = useParams();
  const { data: job, loading, reload } = useAsync(() => api.getJob(id), [id]);

  if (loading) {
    return (
      <DashboardPage title="Detajet e punës">
        <LoadingState rows={3} />
      </DashboardPage>
    );
  }

  if (!job) {
    return (
      <DashboardPage title="Puna nuk u gjet">
        <EmptyState icon="FileQuestion" title="Kjo punë nuk ekziston" actionLabel="Kthehu te punët" actionTo="/pro-dashboard/jobs" />
      </DashboardPage>
    );
  }

  const handleBid = async (form) => {
    await api.createBid({
      jobId: job.id,
      price: form.price,
      arrival: form.arrival,
      completion: form.completion,
      message: form.message,
    });
    reload();
  };

  return (
    <DashboardPage
      title="Detajet e punës"
      action={<Link to="/pro-dashboard/jobs" className="btn btn-outline btn-sm"><Icon name="ArrowLeft" className="h-4 w-4" /> Mbrapa</Link>}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <JobDetails job={job} />
          <div className="card p-5">
            <h2 className="text-base font-bold text-navy-900">Konkurrenca</h2>
            <p className="mt-1 text-sm text-slate-500">
              {job.bidsCount > 0
                ? `${job.bidsCount} profesionistë kanë dërguar oferta për këtë punë.`
                : 'Ende pa oferta — je i pari që mund të dërgojë!'}
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          {job.status === 'Open for Bids' ? (
            <BidForm onSubmit={handleBid} />
          ) : (
            <div className="card p-6 text-center">
              <Icon name="Lock" className="mx-auto h-6 w-6 text-slate-300" />
              <p className="mt-2 text-sm text-slate-500">Kjo punë nuk pranon më oferta.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardPage>
  );
}

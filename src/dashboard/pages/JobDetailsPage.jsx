import { useParams, Link } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import JobDetails from '@/dashboard/components/JobDetails';
import BidForm from '@/dashboard/components/BidForm';
import BidCard from '@/dashboard/components/BidCard';
import EmptyState from '@/dashboard/components/EmptyState';
import Icon from '@/components/ui/Icon';
import { getJobById } from '@/data/demoJobs';
import { bidsByJob } from '@/data/demoBids';

export default function JobDetailsPage() {
  const { id } = useParams();
  const job = getJobById(id);

  if (!job) {
    return (
      <DashboardPage title="Puna nuk u gjet">
        <EmptyState icon="FileQuestion" title="Kjo punë nuk ekziston" actionLabel="Kthehu te punët" actionTo="/pro-dashboard/jobs" />
      </DashboardPage>
    );
  }

  const otherBids = bidsByJob(job.id);

  return (
    <DashboardPage
      title="Detajet e punës"
      action={<Link to="/pro-dashboard/jobs" className="btn btn-outline btn-sm"><Icon name="ArrowLeft" className="h-4 w-4" /> Mbrapa</Link>}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <JobDetails job={job} />
          <div>
            <h2 className="mb-3 text-lg font-bold text-navy-900">Oferta të tjera ({otherBids.length})</h2>
            <p className="mb-4 text-sm text-slate-500">Shiko se si konkurrojnë profesionistët e tjerë për këtë punë.</p>
            <div className="space-y-3">
              {otherBids.map((b) => (
                <BidCard key={b.id} bid={b} selectable={false} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          {job.status === 'Open for Bids' ? (
            <BidForm />
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

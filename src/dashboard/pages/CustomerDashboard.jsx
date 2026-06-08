import { Link } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import StatCard from '@/dashboard/components/StatCard';
import JobCard from '@/dashboard/components/JobCard';
import EmptyState from '@/dashboard/components/EmptyState';
import { jobsByCustomer } from '@/data/demoJobs';
import { bidsByJob } from '@/data/demoBids';

const CUSTOMER_ID = 'cust-1';

export default function CustomerDashboard() {
  const myJobs = jobsByCustomer(CUSTOMER_ID);
  const openCount = myJobs.filter((j) => j.status === 'Open for Bids').length;
  const inProgress = myJobs.filter((j) => j.status === 'In Progress').length;
  const totalOffers = myJobs.reduce((s, j) => s + bidsByJob(j.id).length, 0);

  return (
    <DashboardPage
      title="Përshëndetje 👋"
      subtitle="Ja një përmbledhje e kërkesave dhe ofertave të tua."
      action={<Link to="/request" className="btn btn-primary btn-sm">Kërko shërbim</Link>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="FileText" label="Kërkesa gjithsej" value={myJobs.length} accent="navy" />
        <StatCard icon="Radio" label="Hapur për oferta" value={openCount} accent="amber" />
        <StatCard icon="GitCompareArrows" label="Oferta të marra" value={totalOffers} accent="blue" />
        <StatCard icon="Loader" label="Në proces" value={inProgress} accent="emerald" />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">Kërkesat e fundit</h2>
          <Link to="/customer-dashboard/requests" className="text-sm font-semibold text-amber-600 hover:underline">Shiko të gjitha</Link>
        </div>
        {myJobs.length === 0 ? (
          <EmptyState icon="FileText" title="Ende pa kërkesa" text="Dërgo kërkesën tënde të parë dhe merr oferta nga profesionistë." actionLabel="Kërko shërbim" actionTo="/request" />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {myJobs.slice(0, 4).map((j) => (
              <JobCard key={j.id} job={j} to={`/customer-dashboard/offers?job=${j.id}`} />
            ))}
          </div>
        )}
      </div>
    </DashboardPage>
  );
}

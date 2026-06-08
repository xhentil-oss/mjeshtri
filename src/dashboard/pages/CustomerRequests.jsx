import { Link } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import JobCard from '@/dashboard/components/JobCard';
import EmptyState from '@/dashboard/components/EmptyState';
import { jobsByCustomer } from '@/data/demoJobs';

const CUSTOMER_ID = 'cust-1';

export default function CustomerRequests() {
  const myJobs = jobsByCustomer(CUSTOMER_ID);

  return (
    <DashboardPage
      title="Kërkesat e mia"
      subtitle="Të gjitha kërkesat e shërbimit që ke dërguar."
      action={<Link to="/request" className="btn btn-primary btn-sm">Kërkesë e re</Link>}
    >
      {myJobs.length === 0 ? (
        <EmptyState icon="FileText" title="Ende pa kërkesa" actionLabel="Kërko shërbim" actionTo="/request" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {myJobs.map((j) => (
            <JobCard key={j.id} job={j} to={`/customer-dashboard/offers?job=${j.id}`} />
          ))}
        </div>
      )}
    </DashboardPage>
  );
}

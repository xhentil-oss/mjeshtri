import DashboardPage from '@/dashboard/components/DashboardPage';
import JobCard from '@/dashboard/components/JobCard';
import EmptyState from '@/dashboard/components/EmptyState';
import { jobs } from '@/data/demoJobs';

const PRO_ID = 'pro-arben';

export default function CompletedJobs() {
  const completed = jobs.filter(
    (j) => j.selectedProId === PRO_ID && (j.status === 'Completed' || j.status === 'Reviewed')
  );

  return (
    <DashboardPage title="Punë të përfunduara" subtitle="Historiku i punëve të kryera me sukses.">
      {completed.length === 0 ? (
        <EmptyState icon="CheckCircle2" title="Ende pa punë të përfunduara" text="Punët e mbyllura me sukses do të shfaqen këtu." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {completed.map((j) => (
            <JobCard key={j.id} job={j} to={`/pro-dashboard/jobs/${j.id}`} />
          ))}
        </div>
      )}
    </DashboardPage>
  );
}

import DashboardPage from '@/dashboard/components/DashboardPage';
import JobCard from '@/dashboard/components/JobCard';
import EmptyState from '@/dashboard/components/EmptyState';
import { jobs } from '@/data/demoJobs';

const PRO_ID = 'pro-arben';

export default function ActiveJobs() {
  const active = jobs.filter(
    (j) => j.selectedProId === PRO_ID && (j.status === 'In Progress' || j.status === 'Offer Selected')
  );

  return (
    <DashboardPage title="Punë aktive" subtitle="Punët që po kryen aktualisht.">
      {active.length === 0 ? (
        <EmptyState icon="Loader" title="Asnjë punë aktive" text="Sapo një klient të zgjedhë ofertën tënde, puna do të shfaqet këtu." actionLabel="Shiko punët e reja" actionTo="/pro-dashboard/jobs" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {active.map((j) => (
            <JobCard key={j.id} job={j} to={`/pro-dashboard/jobs/${j.id}`} />
          ))}
        </div>
      )}
    </DashboardPage>
  );
}

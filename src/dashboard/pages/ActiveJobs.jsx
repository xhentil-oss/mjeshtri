import DashboardPage from '@/dashboard/components/DashboardPage';
import JobCard from '@/dashboard/components/JobCard';
import EmptyState from '@/dashboard/components/EmptyState';
import LoadingState from '@/dashboard/components/LoadingState';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';

export default function ActiveJobs() {
  const { data, loading } = useAsync(() => api.myProJobs('In Progress'), []);
  const active = data || [];

  return (
    <DashboardPage title="Punë aktive" subtitle="Punët që po kryen aktualisht.">
      {loading ? (
        <LoadingState rows={2} />
      ) : active.length === 0 ? (
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

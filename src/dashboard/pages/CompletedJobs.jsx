import DashboardPage from '@/dashboard/components/DashboardPage';
import JobCard from '@/dashboard/components/JobCard';
import EmptyState from '@/dashboard/components/EmptyState';
import LoadingState from '@/dashboard/components/LoadingState';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';

export default function CompletedJobs() {
  const { data, loading } = useAsync(() => api.myProJobs('Completed'), []);
  const completed = data || [];

  return (
    <DashboardPage title="Punë të përfunduara" subtitle="Historiku i punëve të kryera me sukses.">
      {loading ? (
        <LoadingState rows={2} />
      ) : completed.length === 0 ? (
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

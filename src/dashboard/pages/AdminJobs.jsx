import DashboardPage from '@/dashboard/components/DashboardPage';
import AdminJobsTable from '@/dashboard/components/AdminJobsTable';
import LoadingState from '@/dashboard/components/LoadingState';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';

export default function AdminJobs() {
  const { data, loading } = useAsync(() => api.adminJobs(), []);
  const jobs = data || [];

  return (
    <DashboardPage title="Punët" subtitle="Të gjitha kërkesat e shërbimit në platformë.">
      {loading ? <LoadingState rows={4} /> : <AdminJobsTable jobs={jobs} />}
    </DashboardPage>
  );
}

import DashboardPage from '@/dashboard/components/DashboardPage';
import AdminJobsTable from '@/dashboard/components/AdminJobsTable';
import { jobs } from '@/data/demoJobs';

export default function AdminJobs() {
  return (
    <DashboardPage title="Punët" subtitle="Të gjitha kërkesat e shërbimit në platformë.">
      <AdminJobsTable jobs={jobs} />
    </DashboardPage>
  );
}

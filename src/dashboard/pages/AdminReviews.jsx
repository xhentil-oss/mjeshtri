import DashboardPage from '@/dashboard/components/DashboardPage';
import AdminReviewsTable from '@/dashboard/components/AdminReviewsTable';
import { reviews } from '@/data/demoReviews';

export default function AdminReviews() {
  return (
    <DashboardPage title="Vlerësimet" subtitle="Modero vlerësimet e lëna nga klientët.">
      <AdminReviewsTable reviews={reviews} />
    </DashboardPage>
  );
}

import DashboardPage from '@/dashboard/components/DashboardPage';
import AdminReviewsTable from '@/dashboard/components/AdminReviewsTable';
import LoadingState from '@/dashboard/components/LoadingState';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';

export default function AdminReviews() {
  const { data, loading, reload } = useAsync(() => api.adminReviews(), []);
  const reviews = data || [];

  const remove = async (id) => {
    if (!window.confirm('Të fshihet ky vlerësim?')) return;
    try {
      await api.adminDeleteReview(id);
      reload();
    } catch (err) {
      alert(err.message || 'Fshirja dështoi.');
    }
  };

  return (
    <DashboardPage title="Vlerësimet" subtitle="Modero vlerësimet e lëna nga klientët.">
      {loading ? <LoadingState rows={4} /> : <AdminReviewsTable reviews={reviews} onDelete={remove} />}
    </DashboardPage>
  );
}

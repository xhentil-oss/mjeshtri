import DashboardPage from '@/dashboard/components/DashboardPage';
import { ReviewCard, RatingSummary } from '@/dashboard/components/ReviewCard';
import EmptyState from '@/dashboard/components/EmptyState';
import LoadingState from '@/dashboard/components/LoadingState';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';

export default function ProfessionalReviews() {
  const { data: pro } = useAsync(() => api.myProProfile(), []);
  const { data, loading } = useAsync(() => api.myProReviews(), []);
  const myReviews = data || [];

  return (
    <DashboardPage title="Vlerësimet" subtitle="Çfarë thonë klientët për punën tënde.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <RatingSummary reviews={myReviews} rating={pro?.rating ?? 0} total={pro?.reviews ?? 0} />
        </div>
        <div className="space-y-4 lg:col-span-2">
          {loading ? (
            <LoadingState rows={3} />
          ) : myReviews.length === 0 ? (
            <EmptyState icon="Star" title="Ende pa vlerësime" />
          ) : (
            myReviews.map((r) => <ReviewCard key={r.id} review={r} />)
          )}
        </div>
      </div>
    </DashboardPage>
  );
}

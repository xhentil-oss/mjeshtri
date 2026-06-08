import DashboardPage from '@/dashboard/components/DashboardPage';
import { ReviewCard, RatingSummary } from '@/dashboard/components/ReviewCard';
import EmptyState from '@/dashboard/components/EmptyState';
import { getProfessionalById } from '@/data/demoProfessionals';
import { reviewsByPro } from '@/data/demoReviews';

const PRO_ID = 'pro-arben';

export default function ProfessionalReviews() {
  const pro = getProfessionalById(PRO_ID);
  const myReviews = reviewsByPro(PRO_ID);

  return (
    <DashboardPage title="Vlerësimet" subtitle="Çfarë thonë klientët për punën tënde.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <RatingSummary reviews={myReviews} rating={pro.rating} total={pro.reviews} />
        </div>
        <div className="space-y-4 lg:col-span-2">
          {myReviews.length === 0 ? (
            <EmptyState icon="Star" title="Ende pa vlerësime" />
          ) : (
            myReviews.map((r) => <ReviewCard key={r.id} review={r} />)
          )}
        </div>
      </div>
    </DashboardPage>
  );
}

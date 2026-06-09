import { Link } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import StatCard from '@/dashboard/components/StatCard';
import JobCard from '@/dashboard/components/JobCard';
import ProfileCompletion from '@/dashboard/components/ProfileCompletion';
import LoadingState from '@/dashboard/components/LoadingState';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function ProfessionalDashboard() {
  const { user } = useAuth();
  const { data: pro, loading: proLoading } = useAsync(() => api.myProProfile(), []);
  const { data: jobsData } = useAsync(() => api.availableJobs(), []);
  const { data: bidsData } = useAsync(() => api.myBids(), []);
  const { data: reviewsData } = useAsync(() => api.myProReviews(), []);

  const openJobs = jobsData || [];
  const myBids = bidsData || [];
  const myReviews = reviewsData || [];
  const suggested = pro ? openJobs.filter((j) => j.category === pro.category).slice(0, 3) : [];

  const firstName = (pro?.name || user?.name || '').split(' ')[0] || '';

  // Profile completeness checklist (drives the % bar).
  const checklist = [
    { label: 'Përshkrim profesional', done: !!pro?.bio },
    { label: 'Aftësi / shërbime', done: (pro?.skills?.length || 0) > 0 },
    { label: 'Zonat e mbuluara', done: (pro?.areas?.length || 0) > 0 },
    { label: 'Verifikim NIPT', done: !!pro?.nipt },
  ];
  const percent = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100);

  return (
    <DashboardPage
      title={`Mirë se erdhe${firstName ? ', ' + firstName : ''}`}
      subtitle="Ja një përmbledhje e aktivitetit tënd në Mjeshtri."
      action={<Link to="/pro-dashboard/jobs" className="btn btn-primary btn-sm">Shiko punët</Link>}
    >
      {pro && pro.status !== 'approved' && (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
          Profili yt është në proces verifikimi. Pasi të aprovohet, do të mund të dërgosh oferta.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="Briefcase" label="Punë të disponueshme" value={openJobs.length} accent="amber" />
        <StatCard icon="Send" label="Ofertat e mia aktive" value={myBids.filter((b) => b.status === 'pending').length} accent="blue" />
        <StatCard icon="CheckCircle2" label="Punë të kryera" value={pro?.completedJobs ?? 0} accent="emerald" />
        <StatCard icon="Star" label="Vlerësimi" value={pro?.rating ?? 0} hint={`${pro?.reviews ?? 0} vlerësime`} accent="navy" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy-900">Punë të sugjeruara për ty</h2>
            <Link to="/pro-dashboard/jobs" className="text-sm font-semibold text-amber-600 hover:underline">Shiko të gjitha</Link>
          </div>
          {proLoading ? (
            <LoadingState rows={2} />
          ) : suggested.length === 0 ? (
            <p className="text-sm text-slate-500">Asnjë punë e re në kategorinë tënde për momentin.</p>
          ) : (
            <div className="space-y-4">
              {suggested.map((j) => (
                <JobCard key={j.id} job={j} showBidCta />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <ProfileCompletion percent={percent} items={checklist} />
          <div className="card p-5">
            <h3 className="font-semibold text-navy-900">Vlerësimet e fundit</h3>
            <div className="mt-3 space-y-3">
              {myReviews.length === 0 && <p className="text-sm text-slate-400">Ende pa vlerësime.</p>}
              {myReviews.slice(0, 2).map((r) => (
                <div key={r.id} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <p className="text-sm text-slate-600 line-clamp-2">"{r.text}"</p>
                  <p className="mt-1 text-xs text-slate-400">— {r.customer}, {r.area}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}

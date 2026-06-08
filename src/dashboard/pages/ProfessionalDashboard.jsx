import { Link } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import StatCard from '@/dashboard/components/StatCard';
import JobCard from '@/dashboard/components/JobCard';
import ProfileCompletion from '@/dashboard/components/ProfileCompletion';
import { getProfessionalById } from '@/data/demoProfessionals';
import { openJobs } from '@/data/demoJobs';
import { bidsByPro } from '@/data/demoBids';
import { reviewsByPro } from '@/data/demoReviews';

const PRO_ID = 'pro-arben';

export default function ProfessionalDashboard() {
  const pro = getProfessionalById(PRO_ID);
  const myBids = bidsByPro(PRO_ID);
  const myReviews = reviewsByPro(PRO_ID);
  const suggested = openJobs.filter((j) => j.category === pro.category).slice(0, 3);

  return (
    <DashboardPage
      title={`Mirë se erdhe, ${pro.name.split(' ')[0]}`}
      subtitle="Ja një përmbledhje e aktivitetit tënd në Mjeshtri."
      action={<Link to="/pro-dashboard/jobs" className="btn btn-primary btn-sm">Shiko punët</Link>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="Briefcase" label="Punë të disponueshme" value={openJobs.length} accent="amber" />
        <StatCard icon="Send" label="Ofertat e mia aktive" value={myBids.filter((b) => b.status === 'pending').length} accent="blue" />
        <StatCard icon="CheckCircle2" label="Punë të kryera" value={pro.completedJobs} accent="emerald" />
        <StatCard icon="Star" label="Vlerësimi" value={pro.rating} hint={`${pro.reviews} vlerësime`} accent="navy" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy-900">Punë të sugjeruara për ty</h2>
            <Link to="/pro-dashboard/jobs" className="text-sm font-semibold text-amber-600 hover:underline">Shiko të gjitha</Link>
          </div>
          <div className="space-y-4">
            {suggested.map((j) => (
              <JobCard key={j.id} job={j} showBidCta />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <ProfileCompletion
            percent={85}
            items={[
              { label: 'Foto profili', done: true },
              { label: 'Përshkrim profesional', done: true },
              { label: 'Portofol pune', done: true },
              { label: 'Verifikim NIPT', done: false },
            ]}
          />
          <div className="card p-5">
            <h3 className="font-semibold text-navy-900">Vlerësimet e fundit</h3>
            <div className="mt-3 space-y-3">
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

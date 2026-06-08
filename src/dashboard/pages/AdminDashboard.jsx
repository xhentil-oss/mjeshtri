import { Link } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import StatCard from '@/dashboard/components/StatCard';
import AdminProfessionalApprovalTable from '@/dashboard/components/AdminProfessionalApprovalTable';
import { platformStats } from '@/data/demoStats';
import { professionals } from '@/data/demoProfessionals';

export default function AdminDashboard() {
  const pending = professionals.filter((p) => !p.verified);

  return (
    <DashboardPage title="Paneli i Adminit" subtitle="Mbikëqyr aktivitetin e platformës Mjeshtri.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="Users" label="Përdorues gjithsej" value={platformStats.totalUsers} accent="navy" />
        <StatCard icon="Wrench" label="Profesionistë" value={platformStats.totalProfessionals} accent="amber" />
        <StatCard icon="Clock" label="Në pritje aprovimi" value={platformStats.pendingApprovals} accent="rose" />
        <StatCard icon="Briefcase" label="Punë aktive" value={platformStats.activeJobs} accent="blue" />
        <StatCard icon="CheckCircle2" label="Punë të kryera" value={platformStats.completedJobs} accent="emerald" />
        <StatCard icon="Send" label="Oferta gjithsej" value={platformStats.totalBids} accent="navy" />
        <StatCard icon="Star" label="Vlerësime" value={platformStats.totalReviews} accent="amber" />
        <StatCard icon="Flag" label="Profile të raportuara" value={platformStats.reportedProfiles} accent="rose" />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">Profesionistë në pritje të aprovimit</h2>
          <Link to="/admin/professionals" className="text-sm font-semibold text-amber-600 hover:underline">Menaxho të gjithë</Link>
        </div>
        <AdminProfessionalApprovalTable professionals={pending.length ? pending : professionals.slice(0, 4)} />
      </div>
    </DashboardPage>
  );
}

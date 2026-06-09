import { Link } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import StatCard from '@/dashboard/components/StatCard';
import AdminProfessionalApprovalTable from '@/dashboard/components/AdminProfessionalApprovalTable';
import LoadingState from '@/dashboard/components/LoadingState';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';

export default function AdminDashboard() {
  const { data: stats } = useAsync(() => api.adminStats(), []);
  const { data: pendingData, loading, reload } = useAsync(() => api.adminProfessionals('pending'), []);
  const pending = pendingData || [];
  const s = stats || {};

  const act = async (id, action) => {
    try {
      await api.adminUpdatePro(id, action);
      reload();
    } catch (err) {
      alert(err.message || 'Veprimi dështoi.');
    }
  };

  return (
    <DashboardPage title="Paneli i Adminit" subtitle="Mbikëqyr aktivitetin e platformës Mjeshtri.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="Users" label="Klientë" value={s.customers ?? 0} accent="navy" />
        <StatCard icon="Wrench" label="Profesionistë" value={s.professionals ?? 0} accent="amber" />
        <StatCard icon="Clock" label="Në pritje aprovimi" value={s.pendingPros ?? 0} accent="rose" />
        <StatCard icon="Briefcase" label="Punë hapur" value={s.openJobs ?? 0} accent="blue" />
        <StatCard icon="CheckCircle2" label="Punë të kryera" value={s.completedJobs ?? 0} accent="emerald" />
        <StatCard icon="Send" label="Oferta gjithsej" value={s.bids ?? 0} accent="navy" />
        <StatCard icon="Star" label="Vlerësime" value={s.reviews ?? 0} accent="amber" />
        <StatCard icon="FileText" label="Punë gjithsej" value={s.jobs ?? 0} accent="blue" />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">Profesionistë në pritje të aprovimit</h2>
          <Link to="/admin/professionals" className="text-sm font-semibold text-amber-600 hover:underline">Menaxho të gjithë</Link>
        </div>
        {loading ? (
          <LoadingState rows={3} />
        ) : pending.length === 0 ? (
          <div className="card py-10 text-center text-sm text-slate-500">Asnjë profesionist në pritje. 🎉</div>
        ) : (
          <AdminProfessionalApprovalTable professionals={pending} onAction={act} />
        )}
      </div>
    </DashboardPage>
  );
}

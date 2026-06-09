import DashboardPage from '@/dashboard/components/DashboardPage';
import Avatar from '@/components/ui/Avatar';
import LoadingState from '@/dashboard/components/LoadingState';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';

export default function AdminCustomers() {
  const { data, loading } = useAsync(() => api.adminCustomers(), []);
  const customers = data || [];

  return (
    <DashboardPage title="Klientët" subtitle="Lista e klientëve të regjistruar.">
      {loading ? (
        <LoadingState rows={4} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Klienti</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Telefon</th>
                <th className="px-4 py-3">Zona</th>
                <th className="px-4 py-3">Kërkesa</th>
                <th className="px-4 py-3">Anëtar që nga</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-mist/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={c.name} size={36} />
                      <span className="font-medium text-navy-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{c.email}</td>
                  <td className="px-4 py-3 text-slate-600">{c.phone}</td>
                  <td className="px-4 py-3 text-slate-600">{c.area}</td>
                  <td className="px-4 py-3 text-slate-600">{c.requests}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{(c.joined || '').slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardPage>
  );
}

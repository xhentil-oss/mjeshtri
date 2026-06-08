import DashboardPage from '@/dashboard/components/DashboardPage';
import Icon from '@/components/ui/Icon';
import { SITE } from '@/utils/seo';

export default function AdminSettings() {
  return (
    <DashboardPage title="Cilësimet e platformës" subtitle="Konfigurimi i përgjithshëm i Mjeshtri.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-semibold text-navy-900">Informacioni i platformës</h3>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="label">Emri i platformës</span>
              <input className="input mt-1.5" defaultValue={SITE.name} />
            </label>
            <label className="block">
              <span className="label">Email kontakti</span>
              <input className="input mt-1.5" defaultValue={SITE.email} />
            </label>
            <label className="block">
              <span className="label">Telefon</span>
              <input className="input mt-1.5" defaultValue={SITE.phone} />
            </label>
            <label className="block">
              <span className="label">Qyteti</span>
              <input className="input mt-1.5" defaultValue={SITE.city} />
            </label>
          </div>
          <button className="btn btn-primary mt-5"><Icon name="Save" className="h-4 w-4" /> Ruaj</button>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-navy-900">Moderimi</h3>
          <div className="mt-4 space-y-3 text-sm">
            <label className="flex items-center justify-between">
              <span className="text-slate-700">Aprovim manual i profesionistëve</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-slate-700">Moderim i vlerësimeve para publikimit</span>
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-slate-700">Lejo regjistrime të reja</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400" />
            </label>
          </div>
          <p className="mt-6 rounded-xl bg-slate-50 p-3 text-xs text-slate-400">
            Demo: cilësimet nuk ruhen pa një backend.
          </p>
        </div>
      </div>
    </DashboardPage>
  );
}

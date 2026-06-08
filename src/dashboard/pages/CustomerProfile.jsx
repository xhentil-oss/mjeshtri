import DashboardPage from '@/dashboard/components/DashboardPage';
import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';
import { customers } from '@/data/demoUsers';
import { areas } from '@/data/areas';

const CUSTOMER_ID = 'cust-1';

export default function CustomerProfile() {
  const c = customers.find((x) => x.id === CUSTOMER_ID);

  return (
    <DashboardPage title="Profili im" subtitle="Menaxho të dhënat e tua personale.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card flex flex-col items-center p-6 text-center lg:col-span-1">
          <Avatar name={c.name} size={88} />
          <h2 className="mt-4 text-lg font-bold text-navy-900">{c.name}</h2>
          <p className="text-sm text-slate-500">{c.email}</p>
          <div className="mt-4 w-full rounded-2xl bg-mist p-4">
            <div className="text-2xl font-bold text-navy-900">{c.requests}</div>
            <div className="text-xs text-slate-500">kërkesa të dërguara</div>
          </div>
          <p className="mt-3 text-xs text-slate-400">Anëtar që nga {c.joined}</p>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h3 className="font-semibold text-navy-900">Të dhënat</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="label">Emri i plotë</span>
              <input className="input mt-1.5" defaultValue={c.name} />
            </label>
            <label className="block">
              <span className="label">Email</span>
              <input className="input mt-1.5" defaultValue={c.email} type="email" />
            </label>
            <label className="block">
              <span className="label">Telefon</span>
              <input className="input mt-1.5" defaultValue={c.phone} />
            </label>
            <label className="block">
              <span className="label">Zona</span>
              <select className="input mt-1.5" defaultValue={c.area}>
                {areas.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
          </div>
          <button className="btn btn-primary mt-5"><Icon name="Save" className="h-4 w-4" /> Ruaj ndryshimet</button>
          <p className="mt-2 text-xs text-slate-400">Demo: ndryshimet nuk ruhen pa backend.</p>
        </div>
      </div>
    </DashboardPage>
  );
}

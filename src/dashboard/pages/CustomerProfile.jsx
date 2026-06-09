import { useState } from 'react';
import DashboardPage from '@/dashboard/components/DashboardPage';
import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { areas } from '@/data/areas';

export default function CustomerProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    area: user?.area || '',
  });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setSaved(false); };

  const save = async () => {
    setBusy(true);
    setError('');
    try {
      const { user: updated } = await api.updateMe(form);
      updateUser(updated);
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Ruajtja dështoi.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <DashboardPage title="Profili im" subtitle="Menaxho të dhënat e tua personale.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card flex flex-col items-center p-6 text-center lg:col-span-1">
          <Avatar name={form.name || user?.email} size={88} />
          <h2 className="mt-4 text-lg font-bold text-navy-900">{form.name || '—'}</h2>
          <p className="text-sm text-slate-500">{user?.email}</p>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h3 className="font-semibold text-navy-900">Të dhënat</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="label">Emri i plotë</span>
              <input className="input mt-1.5" value={form.name} onChange={set('name')} />
            </label>
            <label className="block">
              <span className="label">Email</span>
              <input className="input mt-1.5" value={user?.email || ''} type="email" disabled />
            </label>
            <label className="block">
              <span className="label">Telefon</span>
              <input className="input mt-1.5" value={form.phone} onChange={set('phone')} />
            </label>
            <label className="block">
              <span className="label">Zona</span>
              <select className="input mt-1.5" value={form.area} onChange={set('area')}>
                <option value="">Zgjidh…</option>
                {areas.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
          </div>
          {error && <p className="mt-3 text-xs text-rose-600">{error}</p>}
          <button onClick={save} disabled={busy} className="btn btn-primary mt-5 disabled:opacity-60">
            <Icon name="Save" className="h-4 w-4" /> {busy ? 'Po ruhet…' : 'Ruaj ndryshimet'}
          </button>
          {saved && <span className="ml-3 text-sm text-emerald-600">U ruajt ✓</span>}
        </div>
      </div>
    </DashboardPage>
  );
}

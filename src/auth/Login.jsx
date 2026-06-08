import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';
import Icon from '@/components/ui/Icon';
import { useAuth, dashboardPath } from '@/context/AuthContext';

const demoRoles = [
  { role: 'customer', label: 'Klient', icon: 'User' },
  { role: 'professional', label: 'Profesionist', icon: 'Wrench' },
  { role: 'admin', label: 'Admin', icon: 'ShieldCheck' },
];

export default function Login() {
  const { login, loginAs } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const res = login(form.email, form.password);
    if (res.ok) navigate(dashboardPath(res.user.role));
    else setError(res.error);
  };

  const quick = (role) => {
    const res = loginAs(role);
    if (res.ok) navigate(dashboardPath(res.user.role));
  };

  return (
    <>
      <SEOHelmet title="Hyr | Mjeshtri" description="Hyr në llogarinë tënde Mjeshtri." path="/login" noindex />

      <h1 className="text-2xl font-bold text-navy-900">Mirë se erdhe sërish</h1>
      <p className="mt-2 text-slate-600">Hyr për të menaxhuar kërkesat, ofertat dhe profilin.</p>

      <form onSubmit={submit} noValidate className="mt-8 space-y-4">
        <label className="block">
          <span className="label">Email</span>
          <input className="input mt-1.5" type="email" value={form.email} onChange={set('email')} placeholder="ti@email.com" />
        </label>
        <label className="block">
          <span className="label">Fjalëkalimi</span>
          <input className="input mt-1.5" type="password" value={form.password} onChange={set('password')} placeholder="••••••••" />
        </label>

        {error && (
          <p className="flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
            <Icon name="AlertCircle" className="h-4 w-4" /> {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary w-full">Hyr</button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" /> ose hyr shpejt si demo <span className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {demoRoles.map((r) => (
          <button
            key={r.role}
            onClick={() => quick(r.role)}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 px-2 py-3 text-sm font-medium text-navy-800 transition hover:border-amber-400 hover:bg-amber-50"
          >
            <Icon name={r.icon} className="h-5 w-5 text-amber-500" />
            {r.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        S'ke llogari?{' '}
        <Link to="/register/customer" className="font-semibold text-amber-600 hover:underline">Regjistrohu si klient</Link>
        {' '}ose{' '}
        <Link to="/register/professional" className="font-semibold text-amber-600 hover:underline">si profesionist</Link>
      </p>
      <p className="mt-4 rounded-xl bg-slate-50 p-3 text-center text-xs text-slate-400">
        Demo: email <strong>klient@demo.al</strong> · fjalëkalimi <strong>demo1234</strong>
      </p>
    </>
  );
}

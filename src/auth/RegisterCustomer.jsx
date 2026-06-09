import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';
import Icon from '@/components/ui/Icon';
import { useAuth, dashboardPath } from '@/context/AuthContext';
import { areas } from '@/data/areas';

export default function RegisterCustomer() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', email: '', area: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Shkruaj emrin.';
    if (!form.phone.trim()) errs.phone = 'Shkruaj telefonin.';
    if (!form.email.trim()) errs.email = 'Shkruaj email.';
    if (form.password.length < 6) errs.password = 'Të paktën 6 karaktere.';
    if (form.password !== form.confirm) errs.confirm = 'Fjalëkalimet nuk përputhen.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setBusy(true);
    const res = await register(
      { name: form.name, email: form.email, phone: form.phone, area: form.area, password: form.password },
      'customer',
    );
    setBusy(false);
    if (res.ok) navigate(dashboardPath('customer'));
    else setErrors({ email: res.error });
  };

  return (
    <>
      <SEOHelmet title="Regjistrohu si Klient | Mjeshtri" description="Krijo një llogari klienti për të kërkuar shërbime në Tiranë." path="/register/customer" noindex />

      <h1 className="text-2xl font-bold text-navy-900">Krijo llogari klienti</h1>
      <p className="mt-2 text-slate-600">Kërko shërbime dhe merr oferta nga profesionistë të verifikuar.</p>

      <form onSubmit={submit} noValidate className="mt-8 space-y-4">
        <Field label="Emri i plotë" error={errors.name} required>
          <input className="input" value={form.name} onChange={set('name')} placeholder="Eralda Meta" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Telefon" error={errors.phone} required>
            <input className="input" value={form.phone} onChange={set('phone')} placeholder="+355 6X XXX XXXX" />
          </Field>
          <Field label="Zona" >
            <select className="input" value={form.area} onChange={set('area')}>
              <option value="">Zgjidh…</option>
              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Email" error={errors.email} required>
          <input className="input" type="email" value={form.email} onChange={set('email')} placeholder="ti@email.com" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Fjalëkalimi" error={errors.password} required>
            <input className="input" type="password" value={form.password} onChange={set('password')} placeholder="••••••••" />
          </Field>
          <Field label="Konfirmo" error={errors.confirm} required>
            <input className="input" type="password" value={form.confirm} onChange={set('confirm')} placeholder="••••••••" />
          </Field>
        </div>

        <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:opacity-60">
          {busy ? 'Po regjistrohet…' : 'Regjistrohu'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Ke llogari? <Link to="/login" className="font-semibold text-amber-600 hover:underline">Hyr</Link>
      </p>
      <p className="mt-3 text-center text-sm text-slate-500">
        Je profesionist?{' '}
        <Link to="/register/professional" className="font-semibold text-amber-600 hover:underline">Regjistrohu si profesionist</Link>
      </p>
    </>
  );
}

function Field({ label, error, required, children }) {
  return (
    <label className="block">
      <span className="label">{label} {required && <span className="text-amber-500">*</span>}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  );
}

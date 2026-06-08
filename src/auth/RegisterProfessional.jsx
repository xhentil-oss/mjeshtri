import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';
import Icon from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { allCategories } from '@/data/services';
import { areas } from '@/data/areas';

const availabilityOptions = ['I disponueshëm tani', 'I disponueshëm këtë javë', 'Vetëm me orar', 'I zënë'];

export default function RegisterProfessional() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', password: '', confirm: '',
    category: '', experience: '', bio: '', business: '', nipt: '',
    availability: availabilityOptions[0], terms: false,
  });
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggleArea = (a) =>
    setSelectedAreas((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Shkruaj emrin.';
    if (!form.phone.trim()) errs.phone = 'Shkruaj telefonin.';
    if (!form.email.trim()) errs.email = 'Shkruaj email.';
    if (!form.category) errs.category = 'Zgjidh kategorinë.';
    if (!form.experience) errs.experience = 'Shkruaj vitet e eksperiencës.';
    if (selectedAreas.length === 0) errs.areas = 'Zgjidh të paktën një zonë.';
    if (form.password.length < 6) errs.password = 'Të paktën 6 karaktere.';
    if (form.password !== form.confirm) errs.confirm = 'Fjalëkalimet nuk përputhen.';
    if (!form.terms) errs.terms = 'Prano kushtet për të vazhduar.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      register({ ...form, areas: selectedAreas }, 'professional');
      setSent(true);
    }
  };

  if (sent) {
    return (
      <>
        <SEOHelmet title="Profili u dërgua | Mjeshtri" description="Profili yt u dërgua për verifikim." path="/register/professional" noindex />
        <div className="text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-emerald-50 text-emerald-600">
            <Icon name="ShieldCheck" className="h-8 w-8" />
          </span>
          <h1 className="mt-6 text-2xl font-bold text-navy-900">Profili yt u dërgua për verifikim</h1>
          <p className="mt-3 text-slate-600">
            Pasi të aprovohet, do të mund të shohësh punë të disponueshme dhe të dërgosh oferta.
            Të njoftojmë sapo profili të jetë aktiv.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/pro-dashboard" className="btn btn-primary">Shko te paneli (demo)</Link>
            <Link to="/" className="btn btn-outline">Kreu</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHelmet title="Regjistrohu si Profesionist | Mjeshtri" description="Bashkohu me Mjeshtri si profesionist, shiko punët e disponueshme dhe dërgo oferta në Tiranë." path="/register/professional" noindex />

      <h1 className="text-2xl font-bold text-navy-900">Regjistrohu si profesionist</h1>
      <p className="mt-2 text-slate-600">Plotëso profilin për t'u verifikuar dhe për të filluar të marrësh punë.</p>

      <form onSubmit={submit} noValidate className="mt-8 space-y-4">
        <Field label="Emri i plotë" error={errors.name} required>
          <input className="input" value={form.name} onChange={set('name')} placeholder="Arben Hoxha" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Telefon" error={errors.phone} required>
            <input className="input" value={form.phone} onChange={set('phone')} placeholder="+355 6X XXX XXXX" />
          </Field>
          <Field label="Email" error={errors.email} required>
            <input className="input" type="email" value={form.email} onChange={set('email')} placeholder="ti@email.com" />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Kategoria" error={errors.category} required>
            <select className="input" value={form.category} onChange={set('category')}>
              <option value="">Zgjidh…</option>
              {allCategories.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Vite eksperiencë" error={errors.experience} required>
            <input className="input" type="number" min="0" value={form.experience} onChange={set('experience')} placeholder="P.sh. 5" />
          </Field>
        </div>

        <div>
          <span className="label">Zonat e mbuluara {<span className="text-amber-500">*</span>}</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {areas.map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => toggleArea(a)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  selectedAreas.includes(a)
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          {errors.areas && <span className="mt-1 block text-xs text-rose-600">{errors.areas}</span>}
        </div>

        <Field label="Përshkrim i shkurtër profesional">
          <textarea className="input min-h-[90px] resize-y" value={form.bio} onChange={set('bio')} placeholder="Përshkruaj shërbimet dhe eksperiencën tënde…" />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Emri i biznesit (opsional)">
            <input className="input" value={form.business} onChange={set('business')} placeholder="P.sh. Hoxha Electric" />
          </Field>
          <Field label="NIPT (opsional)">
            <input className="input" value={form.nipt} onChange={set('nipt')} placeholder="L12345678A" />
          </Field>
        </div>

        <Field label="Disponueshmëria">
          <select className="input" value={form.availability} onChange={set('availability')}>
            {availabilityOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>

        <div>
          <span className="label">Foto profili &amp; portofol (opsional)</span>
          <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-5 text-sm text-slate-500 hover:border-amber-400 hover:text-amber-600">
            <Icon name="ImagePlus" className="h-5 w-5" /> Ngarko foto
            <input type="file" accept="image/*" multiple className="hidden" />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Fjalëkalimi" error={errors.password} required>
            <input className="input" type="password" value={form.password} onChange={set('password')} placeholder="••••••••" />
          </Field>
          <Field label="Konfirmo" error={errors.confirm} required>
            <input className="input" type="password" value={form.confirm} onChange={set('confirm')} placeholder="••••••••" />
          </Field>
        </div>

        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input type="checkbox" checked={form.terms} onChange={(e) => setForm((f) => ({ ...f, terms: e.target.checked }))} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400" />
          <span>Pranoj kushtet e përdorimit dhe politikën e privatësisë (demo).</span>
        </label>
        {errors.terms && <span className="block text-xs text-rose-600">{errors.terms}</span>}

        <button type="submit" className="btn btn-primary w-full">Dërgo për verifikim</button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Ke llogari? <Link to="/login" className="font-semibold text-amber-600 hover:underline">Hyr</Link>
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

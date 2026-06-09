import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/ui/Icon';
import { allCategories } from '@/data/services';
import { areas } from '@/data/areas';
import { breadcrumbSchema } from '@/utils/schemas';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

const urgencyLevels = ['Sot', 'Brenda 24 orëve', 'Këtë javë', 'Jo urgjente'];
const contactMethods = ['Telefon', 'WhatsApp', 'Email'];

export default function RequestService() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isCustomer = user?.role === 'customer';

  const prefillCategory = params.get('category') || '';
  const prefillArea = params.get('area') || '';

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    category: prefillCategory, area: prefillArea,
    description: '', urgency: 'Brenda 24 orëve',
    budget: '', contact: 'WhatsApp',
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!isCustomer && !form.name.trim()) errs.name = 'Shkruaj emrin tënd.';
    if (!isCustomer && !form.phone.trim()) errs.phone = 'Shkruaj numrin e telefonit.';
    if (!form.category) errs.category = 'Zgjidh një kategori.';
    if (!form.area) errs.area = 'Zgjidh një zonë.';
    if (!form.description.trim()) errs.description = 'Përshkruaj problemin.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Posting a job requires a customer account. Send them to register/login,
    // remembering where they were headed.
    if (!isCustomer) {
      navigate('/register/customer', { state: { from: '/request' } });
      return;
    }

    setBusy(true);
    setSubmitError('');
    try {
      await api.createJob({
        category: form.category,
        area: form.area,
        title: form.description.slice(0, 80),
        description: form.description,
        urgency: form.urgency,
        budget: form.budget,
        contact: form.contact,
      });
      setSent(true);
    } catch (err) {
      setSubmitError(err.message || 'Dërgimi dështoi.');
    } finally {
      setBusy(false);
    }
  };

  const crumbs = [
    { name: 'Kreu', path: '/' },
    { name: 'Kërko shërbim', path: '/request' },
  ];

  if (sent) {
    return (
      <>
        <SEOHelmet title="Kërkesa u dërgua | Mjeshtri" description="Kërkesa jote u dërgua me sukses." path="/request" noindex />
        <section className="section bg-white">
          <Container className="grid place-items-center text-center">
            <div className="max-w-lg">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-emerald-50 text-emerald-600">
                <Icon name="CheckCircle2" className="h-8 w-8" />
              </span>
              <h1 className="mt-6 text-3xl font-bold text-navy-900">Kërkesa u dërgua me sukses!</h1>
              <p className="mt-3 text-lg text-slate-600">
                Profesionistët do të mund të dërgojnë oferta dhe ti do të mund t'i krahasosh
                sipas çmimit, vlerësimeve dhe eksperiencës.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/customer-dashboard/offers" className="btn btn-primary">Shiko ofertat e mia</Link>
                <Link to="/" className="btn btn-outline">Kthehu në fillim</Link>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <SEOHelmet
        title="Kërko Shërbim në Tiranë | Mjeshtri"
        description="Përshkruaj problemin, zgjidh zonën dhe merr oferta nga profesionistë të verifikuar në Tiranë. Falas dhe pa detyrime."
        path="/request"
        schemas={[breadcrumbSchema(crumbs)]}
      />

      <section className="bg-mist border-b border-slate-100">
        <Container className="py-10 lg:py-14">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 max-w-2xl">
            <p className="eyebrow">Kërko shërbim</p>
            <h1 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
              Përshkruaj problemin dhe merr oferta
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Plotëso formën më poshtë. Profesionistët e verifikuar do të dërgojnë oferta që mund
              t'i krahasosh para se të zgjedhësh.
            </p>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container className="max-w-3xl">
          {!isCustomer && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-amber-50 p-4 text-amber-800">
              <Icon name="Info" className="h-5 w-5 shrink-0 text-amber-600" />
              <p className="text-sm">
                Për të dërguar kërkesën dhe për të ndjekur ofertat, duhet një llogari klienti.
                Pasi të plotësosh formën, do të të kërkohet të regjistrohesh ose të hysh.
              </p>
            </div>
          )}

          <form onSubmit={submit} noValidate className="card space-y-5 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Emri i plotë" error={errors.name} required>
                <input className="input" value={form.name} onChange={set('name')} placeholder="P.sh. Eralda Meta" />
              </Field>
              <Field label="Numri i telefonit" error={errors.phone} required>
                <input className="input" value={form.phone} onChange={set('phone')} placeholder="+355 6X XXX XXXX" />
              </Field>
            </div>

            <Field label="Email (opsional)">
              <input className="input" type="email" value={form.email} onChange={set('email')} placeholder="ti@email.com" />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Kategoria e shërbimit" error={errors.category} required>
                <select className="input" value={form.category} onChange={set('category')}>
                  <option value="">Zgjidh kategorinë…</option>
                  {allCategories.map((c) => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Zona në Tiranë" error={errors.area} required>
                <select className="input" value={form.area} onChange={set('area')}>
                  <option value="">Zgjidh zonën…</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Përshkruaj problemin" error={errors.description} required>
              <textarea
                className="input min-h-[120px] resize-y"
                value={form.description}
                onChange={set('description')}
                placeholder="P.sh. Prizat në një dhomë nuk punojnë. Të tjerat funksionojnë normalisht."
              />
            </Field>

            <div>
              <span className="label">Sa urgjent është?</span>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {urgencyLevels.map((u) => (
                  <button
                    type="button"
                    key={u}
                    onClick={() => setForm((f) => ({ ...f, urgency: u }))}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                      form.urgency === u
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Buxheti (opsional)">
                <input className="input" value={form.budget} onChange={set('budget')} placeholder="P.sh. 3,000 - 5,000 ALL" />
              </Field>
              <Field label="Si preferon të kontaktohesh?">
                <select className="input" value={form.contact} onChange={set('contact')}>
                  {contactMethods.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div>
              <span className="label">Foto (opsional)</span>
              <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500 hover:border-amber-400 hover:text-amber-600">
                <Icon name="ImagePlus" className="h-5 w-5" />
                Ngarko foto të problemit
                <input type="file" accept="image/*" className="hidden" multiple />
              </label>
            </div>

            {submitError && (
              <p className="flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
                <Icon name="AlertCircle" className="h-4 w-4" /> {submitError}
              </p>
            )}

            <button type="submit" disabled={busy} className="btn btn-primary btn-lg w-full disabled:opacity-60">
              {busy ? 'Po dërgohet…' : isCustomer ? 'Dërgo kërkesën' : 'Vazhdo'}
            </button>
            <p className="text-center text-xs text-slate-400">
              Falas dhe pa detyrime. Merr oferta para se të vendosësh.
            </p>
          </form>
        </Container>
      </section>
    </>
  );
}

function Field({ label, error, required, children }) {
  return (
    <label className="block">
      <span className="label">
        {label} {required && <span className="text-amber-500">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  );
}

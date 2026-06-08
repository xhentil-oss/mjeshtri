import { useState } from 'react';
import Icon from '@/components/ui/Icon';

export default function BidForm({ onSubmit }) {
  const [form, setForm] = useState({ price: '', arrival: '', completion: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.price) errs.price = 'Shkruaj çmimin.';
    if (!form.arrival.trim()) errs.arrival = 'Shkruaj kohën e mbërritjes.';
    if (!form.message.trim()) errs.message = 'Shkruaj një mesazh.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      onSubmit?.(form);
    }
  };

  if (sent) {
    return (
      <div className="card grid place-items-center gap-2 p-6 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Icon name="CheckCircle2" className="h-6 w-6" />
        </span>
        <h3 className="font-semibold text-navy-900">Oferta u dërgua!</h3>
        <p className="text-sm text-slate-500">Klienti do ta shohë ofertën tënde dhe mund të të zgjedhë.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card space-y-4 p-6">
      <h3 className="font-semibold text-navy-900">Dërgo një ofertë</h3>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Çmimi (ALL)" error={errors.price}>
          <input className="input" type="number" min="0" value={form.price} onChange={set('price')} placeholder="2500" />
        </Field>
        <Field label="Mbërritja" error={errors.arrival}>
          <input className="input" value={form.arrival} onChange={set('arrival')} placeholder="Sot pas 17:00" />
        </Field>
        <Field label="Përfundimi">
          <input className="input" value={form.completion} onChange={set('completion')} placeholder="~1 orë" />
        </Field>
      </div>

      <Field label="Mesazh për klientin" error={errors.message}>
        <textarea
          className="input min-h-[90px] resize-y"
          value={form.message}
          onChange={set('message')}
          placeholder="Përshëndetje, mund të vij sot pas orës 17:00. Çmimi konfirmohet pasi të kontrolloj problemin."
        />
      </Field>

      <button type="submit" className="btn btn-primary w-full">Dërgo ofertën</button>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  );
}

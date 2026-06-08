import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { services } from '@/data/services';
import { areas } from '@/data/areas';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: '', area: '', message: '' });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Shkruaj emrin.';
    if (!form.phone.trim()) errs.phone = 'Shkruaj numrin e telefonit.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="card flex flex-col items-center p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 text-xl font-bold text-navy-900">Faleminderit!</h3>
        <p className="mt-2 text-sm text-slate-600">
          Mesazhi yt u dërgua (demo). Do të kontaktohesh sa më shpejt nga ekipi ynë.
        </p>
        <button className="btn-outline mt-6" onClick={() => { setSent(false); setForm({ name: '', phone: '', service: '', area: '', message: '' }); }}>
          Dërgo një tjetër
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card space-y-4 p-6">
      <div>
        <label className="label" htmlFor="cf-name">Emri *</label>
        <input id="cf-name" className="input" value={form.name} onChange={set('name')} placeholder="Emri yt" />
        {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
      </div>
      <div>
        <label className="label" htmlFor="cf-phone">Numri i telefonit *</label>
        <input id="cf-phone" type="tel" className="input" value={form.phone} onChange={set('phone')} placeholder="+355 6X XXX XXXX" />
        {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="cf-service">Shërbimi</label>
          <select id="cf-service" className="input" value={form.service} onChange={set('service')}>
            <option value="">Zgjidh shërbimin</option>
            {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="cf-area">Zona</label>
          <select id="cf-area" className="input" value={form.area} onChange={set('area')}>
            <option value="">Zgjidh zonën</option>
            {areas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="cf-msg">Përshkrim i shkurtër</label>
        <textarea id="cf-msg" rows="3" className="input" value={form.message} onChange={set('message')} placeholder="Çfarë të duhet?" />
      </div>
      <button type="submit" className="btn-primary w-full">Dërgo Mesazhin</button>
    </form>
  );
}

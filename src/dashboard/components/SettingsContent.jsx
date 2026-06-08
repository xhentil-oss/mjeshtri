import { useState } from 'react';
import Icon from '@/components/ui/Icon';

function Toggle({ label, desc, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0">
      <div>
        <p className="text-sm font-medium text-navy-900">{label}</p>
        {desc && <p className="text-xs text-slate-400">{desc}</p>}
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? 'bg-amber-500' : 'bg-slate-200'}`}
        aria-pressed={on}
        aria-label={label}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${on ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

export default function SettingsContent() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-6">
        <h3 className="font-semibold text-navy-900">Njoftimet</h3>
        <div className="mt-2">
          <Toggle label="Njoftime me email" desc="Merr përditësime për oferta dhe punë të reja." defaultOn />
          <Toggle label="Njoftime SMS" desc="Mesazhe të shpejta për ngjarje urgjente." />
          <Toggle label="Njoftime WhatsApp" desc="Përditësime përmes WhatsApp." defaultOn />
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-navy-900">Privatësia</h3>
        <div className="mt-2">
          <Toggle label="Shfaq profilin publikisht" defaultOn />
          <Toggle label="Lejo kontakt direkt" desc="Klientët mund të të shkruajnë direkt." defaultOn />
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-navy-900">Llogaria</h3>
        <div className="mt-4 space-y-2">
          <button className="btn btn-outline w-full justify-start"><Icon name="KeyRound" className="h-4 w-4" /> Ndrysho fjalëkalimin</button>
          <button className="btn btn-outline w-full justify-start"><Icon name="Mail" className="h-4 w-4" /> Ndrysho email-in</button>
        </div>
      </div>

      <div className="card border-rose-100 p-6">
        <h3 className="font-semibold text-rose-700">Zona e rrezikut</h3>
        <p className="mt-1 text-sm text-slate-500">Fshirja e llogarisë është e pakthyeshme.</p>
        <button className="btn mt-4 w-full bg-rose-50 text-rose-700 hover:bg-rose-100"><Icon name="Trash2" className="h-4 w-4" /> Fshij llogarinë</button>
      </div>

      <p className="lg:col-span-2 rounded-xl bg-slate-50 p-3 text-center text-xs text-slate-400">
        Demo: cilësimet nuk ruhen pa një backend.
      </p>
    </div>
  );
}

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

export default function ImageUpload({ label = 'Ngarko foto', multiple = true, hint = 'Demo: ngarkimi nuk ruhet.' }) {
  const [names, setNames] = useState([]);
  const onChange = (e) => setNames(Array.from(e.target.files || []).map((f) => f.name));

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500 hover:border-amber-400 hover:text-amber-600">
        <Icon name="ImagePlus" className="h-6 w-6" />
        {label}
        <input type="file" accept="image/*" multiple={multiple} className="hidden" onChange={onChange} />
      </label>
      {names.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-slate-500">
          {names.map((n) => (
            <li key={n} className="flex items-center gap-1.5">
              <Icon name="Paperclip" className="h-3.5 w-3.5" /> {n}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    </div>
  );
}

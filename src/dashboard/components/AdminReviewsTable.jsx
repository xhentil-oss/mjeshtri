import ReviewStars from '@/components/ReviewStars';
import Icon from '@/components/ui/Icon';

export default function AdminReviewsTable({ reviews = [], onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-mist text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Klienti</th>
            <th className="px-4 py-3">Profesionisti</th>
            <th className="px-4 py-3">Vlerësimi</th>
            <th className="px-4 py-3">Teksti</th>
            <th className="px-4 py-3">Data</th>
            <th className="px-4 py-3 text-right">Veprime</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {reviews.map((r) => (
            <tr key={r.id} className="hover:bg-mist/50">
              <td className="px-4 py-3 font-medium text-navy-900">{r.customer}</td>
              <td className="px-4 py-3 text-slate-600">{r.proName || '—'}</td>
              <td className="px-4 py-3"><ReviewStars rating={r.rating} size={12} showValue /></td>
              <td className="px-4 py-3 max-w-xs truncate text-slate-600" title={r.text}>{r.text}</td>
              <td className="px-4 py-3 text-xs text-slate-400">{(r.date || '').slice(0, 10)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <button onClick={() => onDelete?.(r.id)} className="grid h-8 w-8 place-items-center rounded-lg text-rose-600 hover:bg-rose-50" title="Fshij">
                    <Icon name="Trash2" className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

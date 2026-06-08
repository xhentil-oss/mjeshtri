import { Link } from 'react-router-dom';
import ReviewStars from '@/components/ReviewStars';
import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';
import { getProfessionalById } from '@/data/demoProfessionals';
import { formatALL } from '@/utils/formatCurrency';

const labelStyles = {
  'Më i vlerësuari': 'bg-amber-100 text-amber-800',
  'Përgjigje e shpejtë': 'bg-blue-100 text-blue-800',
  'Më me eksperiencë': 'bg-violet-100 text-violet-800',
  'Vlerë e mirë': 'bg-emerald-100 text-emerald-700',
};

export default function OfferComparisonTable({ bids = [], onSelect }) {
  if (bids.length === 0) {
    return <p className="text-sm text-slate-500">Ende pa oferta për këtë kërkesë.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100">
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="bg-mist text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Profesionisti</th>
            <th className="px-4 py-3">Vlerësimi</th>
            <th className="px-4 py-3">Çmimi</th>
            <th className="px-4 py-3">Mbërritja</th>
            <th className="px-4 py-3">Etiketa</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {bids.map((b) => {
            const pro = getProfessionalById(b.proId);
            if (!pro) return null;
            return (
              <tr key={b.id} className="hover:bg-mist/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={pro.name} size={36} />
                    <div>
                      <div className="flex items-center gap-1 font-semibold text-navy-900">
                        {pro.name}
                        {pro.verified && <Icon name="BadgeCheck" className="h-3.5 w-3.5 text-emerald-500" />}
                      </div>
                      <div className="text-xs text-slate-400">{pro.experience} vjet eksperiencë</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <ReviewStars rating={pro.rating} size={12} showValue />
                  <div className="text-xs text-slate-400">{pro.reviews} vlerësime</div>
                </td>
                <td className="px-4 py-3 font-bold text-navy-900">{formatALL(b.price)}</td>
                <td className="px-4 py-3 text-slate-600">{b.arrival}</td>
                <td className="px-4 py-3">
                  {b.label && (
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${labelStyles[b.label] || 'bg-slate-100 text-slate-600'}`}>
                      {b.label}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onSelect?.(b)} className="btn btn-primary btn-sm">Zgjidh</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="divide-y divide-slate-100 md:hidden">
        {bids.map((b) => {
          const pro = getProfessionalById(b.proId);
          if (!pro) return null;
          return (
            <div key={b.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar name={pro.name} size={36} />
                  <div>
                    <div className="flex items-center gap-1 font-semibold text-navy-900">
                      {pro.name}
                      {pro.verified && <Icon name="BadgeCheck" className="h-3.5 w-3.5 text-emerald-500" />}
                    </div>
                    <ReviewStars rating={pro.rating} size={12} showValue />
                  </div>
                </div>
                <span className="font-bold text-navy-900">{formatALL(b.price)}</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">{b.arrival} · {b.completion}</p>
              <button onClick={() => onSelect?.(b)} className="btn btn-primary btn-sm mt-3 w-full">Zgjidh këtë profesionist</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

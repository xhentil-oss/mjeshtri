import { Link } from 'react-router-dom';
import Avatar from '@/components/ui/Avatar';
import ReviewStars from '@/components/ReviewStars';
import Icon from '@/components/ui/Icon';
import { getProfessionalById } from '@/data/demoProfessionals';
import { formatALL } from '@/utils/formatCurrency';

const labelStyles = {
  'Më i vlerësuari': 'bg-amber-100 text-amber-800',
  'Përgjigje e shpejtë': 'bg-blue-100 text-blue-800',
  'Më me eksperiencë': 'bg-violet-100 text-violet-800',
  'Vlerë e mirë': 'bg-emerald-100 text-emerald-700',
};

export default function BidCard({ bid, onSelect, selectable = true, highlight = false }) {
  const pro = getProfessionalById(bid.proId);
  if (!pro) return null;

  return (
    <div className={`card p-5 ${highlight ? 'ring-2 ring-amber-400' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={pro.name} size={48} />
          <div>
            <div className="flex items-center gap-1.5">
              <Link to={`/professionals/${pro.slug}`} className="font-semibold text-navy-900 hover:text-amber-600">
                {pro.name}
              </Link>
              {pro.verified && <Icon name="BadgeCheck" className="h-4 w-4 text-emerald-500" />}
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <ReviewStars rating={pro.rating} size={13} showValue />
              <span className="text-xs text-slate-400">({pro.reviews})</span>
            </div>
          </div>
        </div>
        {bid.label && (
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${labelStyles[bid.label] || 'bg-slate-100 text-slate-600'}`}>
            {bid.label}
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl bg-mist p-3 text-center">
        <div>
          <div className="text-lg font-bold text-navy-900">{formatALL(bid.price)}</div>
          <div className="text-xs text-slate-500">Çmimi</div>
        </div>
        <div className="border-x border-slate-200">
          <div className="text-sm font-semibold text-navy-900">{bid.arrival}</div>
          <div className="text-xs text-slate-500">Mbërritja</div>
        </div>
        <div>
          <div className="text-sm font-semibold text-navy-900">{bid.completion}</div>
          <div className="text-xs text-slate-500">Përfundimi</div>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-600">{bid.message}</p>

      {selectable && (
        <div className="mt-4 flex gap-2">
          <button onClick={() => onSelect?.(bid)} className="btn btn-primary btn-sm flex-1">
            Zgjidh këtë profesionist
          </button>
          <Link to={`/professionals/${pro.slug}`} className="btn btn-outline btn-sm">Profili</Link>
        </div>
      )}
    </div>
  );
}

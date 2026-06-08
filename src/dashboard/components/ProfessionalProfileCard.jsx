import Avatar from '@/components/ui/Avatar';
import ReviewStars from '@/components/ReviewStars';
import Icon from '@/components/ui/Icon';
import { categoryLabel } from '@/data/services';

export default function ProfessionalProfileCard({ professional: pro }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-4">
        <Avatar name={pro.name} size={64} />
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-lg font-bold text-navy-900">{pro.name}</h2>
            {pro.verified && <Icon name="BadgeCheck" className="h-4 w-4 text-emerald-500" />}
          </div>
          <p className="text-sm text-slate-500">{categoryLabel(pro.category)} · {pro.city}</p>
          <ReviewStars rating={pro.rating} size={14} showValue className="mt-1" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-mist p-3">
          <div className="text-lg font-bold text-navy-900">{pro.completedJobs}</div>
          <div className="text-xs text-slate-500">Punë</div>
        </div>
        <div className="rounded-xl bg-mist p-3">
          <div className="text-lg font-bold text-navy-900">{pro.reviews}</div>
          <div className="text-xs text-slate-500">Vlerësime</div>
        </div>
        <div className="rounded-xl bg-mist p-3">
          <div className="text-lg font-bold text-navy-900">{pro.experience}v</div>
          <div className="text-xs text-slate-500">Eksperiencë</div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">{pro.bio}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {pro.skills.map((s) => <span key={s} className="chip">{s}</span>)}
      </div>
    </div>
  );
}

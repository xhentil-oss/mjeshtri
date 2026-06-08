import { Link } from 'react-router-dom';
import { BadgeCheck, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { categoryLabel } from '@/data/services';
import ReviewStars from './ReviewStars';
import Avatar from './ui/Avatar';

export default function ProfessionalCard({ pro }) {
  return (
    <article className="card card-hover flex flex-col p-5">
      <div className="flex items-start gap-3">
        <Avatar name={pro.name} size={56} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-base font-bold text-navy-900">{pro.name}</h3>
            {pro.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-600" aria-label="I verifikuar" />}
          </div>
          <p className="text-sm text-slate-500">{categoryLabel(pro.category)} · {pro.city}</p>
          <div className="mt-1 flex items-center gap-1.5 text-sm">
            <ReviewStars rating={pro.rating} size={14} showValue />
            <span className="text-slate-400">({pro.reviews})</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {pro.areas.slice(0, 3).map((a) => (
          <span key={a} className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-700">
            <MapPin className="h-3 w-3" /> {a}
          </span>
        ))}
        {pro.areas.length > 3 && <span className="rounded-full bg-navy-50 px-2.5 py-1 text-xs text-navy-600">+{pro.areas.length - 3}</span>}
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-navy-50 pt-4 text-xs text-slate-600">
        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {pro.completedJobs} punë</span>
        <span>{pro.experience} vjet eksperiencë</span>
      </div>

      <div className="mt-4 flex gap-2">
        <Link to={`/professionals/${pro.slug}`} className="btn-outline btn-sm flex-1">Shiko Profilin</Link>
        <Link to={`/request?category=${encodeURIComponent(pro.category)}&pro=${pro.id}`} className="btn-primary btn-sm flex-1">
          Kërko këtë profesionist <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

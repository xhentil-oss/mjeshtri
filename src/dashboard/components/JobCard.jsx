import { Link } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import { StatusBadge, UrgencyBadge } from '@/dashboard/components/StatusBadge';
import { categoryLabel } from '@/data/services';
import { formatALL } from '@/utils/formatCurrency';

export default function JobCard({ job, to, showBidCta = false }) {
  const link = to || `/pro-dashboard/jobs/${job.id}`;
  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy-700">
            <Icon name="Briefcase" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
              {categoryLabel(job.category)}
            </p>
            <h3 className="font-semibold text-navy-900">{job.title}</h3>
          </div>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-600">{job.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1"><Icon name="MapPin" className="h-3.5 w-3.5" /> {job.area}</span>
        <span className="inline-flex items-center gap-1"><Icon name="Wallet" className="h-3.5 w-3.5" /> {formatALL(job.budget)}</span>
        <span className="inline-flex items-center gap-1"><Icon name="Calendar" className="h-3.5 w-3.5" /> {job.postedAt}</span>
        <UrgencyBadge urgency={job.urgency} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
          <Icon name="Users" className="h-4 w-4" /> {job.bidsCount} oferta
        </span>
        <div className="flex gap-2">
          <Link to={link} className="btn btn-outline btn-sm">Shiko punën</Link>
          {showBidCta && job.status === 'Open for Bids' && (
            <Link to={link} className="btn btn-primary btn-sm">Dërgo ofertë</Link>
          )}
        </div>
      </div>
    </div>
  );
}

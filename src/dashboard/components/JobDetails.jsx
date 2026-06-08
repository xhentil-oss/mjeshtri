import Icon from '@/components/ui/Icon';
import { StatusBadge, UrgencyBadge } from '@/dashboard/components/StatusBadge';
import { categoryLabel } from '@/data/services';
import { formatALL } from '@/utils/formatCurrency';

function Row({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
      <span className="inline-flex items-center gap-2 text-sm text-slate-500">
        <Icon name={icon} className="h-4 w-4" /> {label}
      </span>
      <span className="text-sm font-medium text-navy-900">{value}</span>
    </div>
  );
}

export default function JobDetails({ job }) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
            {categoryLabel(job.category)}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-navy-900">{job.title}</h1>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <p className="mt-4 leading-relaxed text-slate-600">{job.description}</p>

      {job.photos?.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {job.photos.map((c, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl"
              style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}
              role="img"
              aria-label={`Foto demo ${i + 1} e punës`}
            />
          ))}
        </div>
      )}

      <div className="mt-6">
        <Row icon="MapPin" label="Zona" value={job.area} />
        <Row icon="Wallet" label="Buxheti" value={formatALL(job.budget)} />
        <div className="flex items-center justify-between border-b border-slate-100 py-3">
          <span className="inline-flex items-center gap-2 text-sm text-slate-500">
            <Icon name="Clock" className="h-4 w-4" /> Urgjenca
          </span>
          <UrgencyBadge urgency={job.urgency} />
        </div>
        <Row icon="Calendar" label="Postuar më" value={job.postedAt} />
        <Row icon="MessageSquare" label="Kontakti i preferuar" value={job.contact} />
        <Row icon="Users" label="Oferta të dërguara" value={`${job.bidsCount}`} />
      </div>
    </div>
  );
}

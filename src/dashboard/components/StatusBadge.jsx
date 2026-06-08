import { getStatus, urgencyMap } from '@/utils/statusStyles';

export function StatusBadge({ status }) {
  const s = getStatus(status);
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${s.cls}`}>
      {s.label}
    </span>
  );
}

export function UrgencyBadge({ urgency }) {
  const cls = urgencyMap[urgency] || 'bg-slate-100 text-slate-600';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>
      {urgency}
    </span>
  );
}

export default StatusBadge;

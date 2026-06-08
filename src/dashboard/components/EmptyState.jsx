import { Link } from 'react-router-dom';
import Icon from '@/components/ui/Icon';

export default function EmptyState({ icon = 'Inbox', title, text, actionLabel, actionTo, onAction }) {
  return (
    <div className="card grid place-items-center gap-3 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-300">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <h3 className="text-lg font-semibold text-navy-900">{title}</h3>
      {text && <p className="max-w-sm text-sm text-slate-500">{text}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-primary btn-sm mt-2">{actionLabel}</Link>
      )}
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-sm mt-2">{actionLabel}</button>
      )}
    </div>
  );
}

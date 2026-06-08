import { Link } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/context/AuthContext';

export default function DashboardHeader({ title, subtitle, action }) {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-100 bg-white/90 px-4 backdrop-blur lg:px-8">
      <div className="lg:hidden">
        <Link to="/" className="flex items-center gap-2 font-bold text-navy-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500">
            <Icon name="Wrench" className="h-4 w-4 text-white" />
          </span>
        </Link>
      </div>
      <div className="hidden min-w-0 lg:block">
        <h1 className="truncate text-lg font-bold text-navy-900">{title}</h1>
        {subtitle && <p className="truncate text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {action}
        <button className="grid h-9 w-9 place-items-center rounded-xl text-slate-500 hover:bg-mist" aria-label="Njoftime">
          <Icon name="Bell" className="h-5 w-5" />
        </button>
        {user && <Avatar name={user.name || user.email} size={36} />}
      </div>
    </header>
  );
}

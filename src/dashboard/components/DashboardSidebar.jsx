import { NavLink, Link } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import { navConfig } from '@/dashboard/components/navConfig';
import { useAuth } from '@/context/AuthContext';

export default function DashboardSidebar({ role }) {
  const cfg = navConfig[role];
  const { user, logout } = useAuth();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-100 bg-white lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-navy-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500">
            <Icon name="Wrench" className="h-4 w-4 text-white" />
          </span>
          Mjeshtri
        </Link>
      </div>

      <div className="px-4 py-3">
        <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{cfg.title}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {cfg.items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-mist hover:text-navy-900'
              }`
            }
          >
            <Icon name={item.icon} className="h-[18px] w-[18px]" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-3">
        <Link to="/" onClick={logout} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-mist">
          <Icon name="LogOut" className="h-[18px] w-[18px]" /> Dil
        </Link>
        {user && (
          <p className="px-3 pt-2 text-xs text-slate-400">I kyçur si {user.name || user.email}</p>
        )}
      </div>
    </aside>
  );
}

import { Outlet, NavLink } from 'react-router-dom';
import DashboardSidebar from '@/dashboard/components/DashboardSidebar';
import Icon from '@/components/ui/Icon';
import { mobileNav } from '@/dashboard/components/navConfig';

export default function DashboardLayout({ role = 'customer' }) {
  const items = mobileNav(role);

  return (
    <div className="flex min-h-screen bg-mist">
      <DashboardSidebar role={role} />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 pb-24 lg:pb-0">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-100 bg-white lg:hidden">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${
                  isActive ? 'text-amber-600' : 'text-slate-500'
                }`
              }
            >
              <Icon name={item.icon} className="h-5 w-5" />
              <span className="max-w-[64px] truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

import DashboardPage from '@/dashboard/components/DashboardPage';
import Icon from '@/components/ui/Icon';
import { allCategories, getServiceByCategory } from '@/data/services';
import { professionalsByCategory } from '@/data/demoProfessionals';

export default function AdminCategories() {
  return (
    <DashboardPage
      title="Kategoritë"
      subtitle="Menaxho kategoritë e shërbimeve."
      action={<button className="btn btn-primary btn-sm"><Icon name="Plus" className="h-4 w-4" /> Shto kategori</button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allCategories.map((c) => {
          const svc = getServiceByCategory(c.key);
          const count = professionalsByCategory(c.key).length;
          return (
            <div key={c.key} className="card card-hover p-5">
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <div className="flex gap-1">
                  <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-mist" title="Ndrysho"><Icon name="Pencil" className="h-4 w-4" /></button>
                  <button className="grid h-8 w-8 place-items-center rounded-lg text-rose-600 hover:bg-rose-50" title="Fshij"><Icon name="Trash2" className="h-4 w-4" /></button>
                </div>
              </div>
              <h3 className="mt-3 font-semibold text-navy-900">{c.label}</h3>
              <p className="mt-1 text-sm text-slate-500">{count} profesionistë</p>
              {svc && (
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600">
                  <Icon name="Search" className="h-3 w-3" /> Faqe SEO aktive
                </span>
              )}
            </div>
          );
        })}
      </div>
    </DashboardPage>
  );
}

import { Outlet, Link } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import { demoStats } from '@/data/demoStats';

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-hero p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500">
            <Icon name="Wrench" className="h-5 w-5 text-white" />
          </span>
          Mjeshtri
        </Link>

        <div className="max-w-md">
          <h2 className="font-display text-3xl font-bold leading-tight">
            Gjej profesionistin e duhur për shtëpinë ose biznesin tënd në Tiranë.
          </h2>
          <p className="mt-4 text-navy-100">
            Kërko shërbimin, krahaso ofertat dhe zgjidh profesionistin që të jep më shumë besim.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {demoStats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-amber-400">{s.value}</div>
                <div className="text-sm text-navy-200">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-navy-300">Projekt demonstrues · Të dhënat janë demo.</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col">
        <div className="border-b border-slate-100 p-4 lg:hidden">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold text-navy-900">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500">
              <Icon name="Wrench" className="h-4 w-4 text-white" />
            </span>
            Mjeshtri
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

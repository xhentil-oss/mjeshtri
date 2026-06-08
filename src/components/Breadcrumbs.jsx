import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-slate-500">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-300" />}
              {last || !it.path ? (
                <span className="font-medium text-navy-900" aria-current="page">{it.name}</span>
              ) : (
                <Link to={it.path} className="hover:text-amber-600">{it.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

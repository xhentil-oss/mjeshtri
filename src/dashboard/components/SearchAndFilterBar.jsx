import Icon from '@/components/ui/Icon';

export default function SearchAndFilterBar({
  search, onSearch, placeholder = 'Kërko…',
  filters = [], // [{ value, onChange, options: [{value,label}], label }]
}) {
  return (
    <div className="card mb-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Icon name="Search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className="input pl-9"
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label={placeholder}
        />
      </div>
      {filters.map((f, i) => (
        <select
          key={i}
          className="input sm:w-auto"
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          aria-label={f.label}
        >
          <option value="">{f.label}</option>
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ))}
    </div>
  );
}

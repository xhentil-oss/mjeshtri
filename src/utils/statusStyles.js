// Maps job status -> Albanian label + badge styling.
export const statusMap = {
  Pending:          { label: 'Në pritje',        cls: 'bg-slate-100 text-slate-700' },
  'Open for Bids':  { label: 'Hapur për oferta',  cls: 'bg-amber-100 text-amber-800' },
  'Offer Selected': { label: 'Ofertë e zgjedhur', cls: 'bg-navy-100 text-navy-800' },
  'In Progress':    { label: 'Në proces',         cls: 'bg-blue-100 text-blue-800' },
  Completed:        { label: 'Përfunduar',        cls: 'bg-emerald-100 text-emerald-700' },
  Cancelled:        { label: 'Anuluar',           cls: 'bg-rose-100 text-rose-700' },
  Reviewed:         { label: 'Vlerësuar',         cls: 'bg-violet-100 text-violet-700' },
};

export const urgencyMap = {
  'Sot':              'bg-rose-100 text-rose-700',
  'Brenda 24 orëve':  'bg-amber-100 text-amber-800',
  'Këtë javë':        'bg-blue-100 text-blue-800',
  'Jo urgjente':      'bg-slate-100 text-slate-600',
};

export const getStatus = (status) =>
  statusMap[status] || { label: status, cls: 'bg-slate-100 text-slate-700' };

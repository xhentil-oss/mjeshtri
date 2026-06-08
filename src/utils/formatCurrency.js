// Albanian Lek formatting.
export const formatALL = (value) => {
  if (value === null || value === undefined || value === '') return 'Pa specifikuar';
  if (typeof value === 'string') return value; // ranges like "3,000 - 5,000 ALL"
  return new Intl.NumberFormat('sq-AL', { maximumFractionDigits: 0 }).format(value) + ' ALL';
};

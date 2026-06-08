import * as Lucide from 'lucide-react';

// Resolve a lucide icon by name string (used so data files can reference icons
// without importing React components).
export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 2, ...rest }) {
  const Cmp = Lucide[name] || Lucide.Circle;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
}

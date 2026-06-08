import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';

export default function FAQ({ faqs = [], eyebrow = 'Pyetje të Shpeshta', title = 'Pyetje të shpeshta', subtitle, wrap = true }) {
  const [open, setOpen] = useState(0);
  const content = (
    <div className="mx-auto mt-10 max-w-3xl divide-y divide-navy-100 overflow-hidden rounded-2xl border border-navy-100 bg-white">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-navy-900">{f.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-amber-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{f.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );

  if (!wrap) return <div>{title && <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />}{content}</div>;

  return (
    <section className="section bg-mist">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {content}
      </Container>
    </section>
  );
}

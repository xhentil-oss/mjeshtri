import { Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import ReviewStars from './ReviewStars';

export default function Testimonials() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {testimonials.map((t) => (
        <figure key={t.id} className="card flex flex-col p-6">
          <Quote className="h-7 w-7 text-amber-400" />
          <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">“{t.quote}”</blockquote>
          <figcaption className="mt-5 border-t border-navy-50 pt-4">
            <ReviewStars rating={t.rating} size={14} />
            <div className="mt-1.5 text-sm font-semibold text-navy-900">{t.name}</div>
            <div className="text-xs text-slate-500">{t.area}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

import { Star } from 'lucide-react';

export default function ReviewStars({ rating = 0, size = 16, showValue = false, className = '' }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} nga 5 yje`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i < full || (i === full && half);
        return (
          <Star
            key={i}
            width={size}
            height={size}
            className={filled ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}
          />
        );
      })}
      {showValue && <span className="ml-1 text-sm font-semibold text-navy-900">{rating}</span>}
    </span>
  );
}

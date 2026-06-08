import Avatar from '@/components/ui/Avatar';
import ReviewStars from '@/components/ReviewStars';

export function ReviewCard({ review }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={review.customer} size={40} />
          <div>
            <p className="text-sm font-semibold text-navy-900">{review.customer}</p>
            <p className="text-xs text-slate-400">{review.area} · {review.date}</p>
          </div>
        </div>
        <ReviewStars rating={review.rating} size={14} />
      </div>
      <p className="mt-3 text-sm text-slate-600">{review.text}</p>

      {review.breakdown && (
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs sm:grid-cols-4">
          {[
            ['Cilësia', review.breakdown.quality],
            ['Komunikimi', review.breakdown.communication],
            ['Përpikëria', review.breakdown.punctuality],
            ['Vlera', review.breakdown.value],
          ].map(([label, val]) => (
            <div key={label} className="flex items-center justify-between gap-1">
              <span className="text-slate-400">{label}</span>
              <span className="font-semibold text-navy-900">{val}.0</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function RatingSummary({ reviews = [], rating, total }) {
  const avg = rating ?? (reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : 0);
  const count = total ?? reviews.length;

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    n: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const max = Math.max(1, ...dist.map((d) => d.n));

  return (
    <div className="card p-6">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-navy-900">{avg}</div>
          <ReviewStars rating={Number(avg)} size={14} className="mt-1" />
          <div className="mt-1 text-xs text-slate-400">{count} vlerësime</div>
        </div>
        <div className="flex-1 space-y-1.5">
          {dist.map((d) => (
            <div key={d.star} className="flex items-center gap-2 text-xs">
              <span className="w-3 text-slate-500">{d.star}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-amber-400" style={{ width: `${(d.n / max) * 100}%` }} />
              </div>
              <span className="w-5 text-right text-slate-400">{d.n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;

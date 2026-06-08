// Initials-based avatar so no external image assets are needed for the demo.
const palette = ['#0a2540', '#1f467c', '#2c5d9e', '#f15c00', '#163a64', '#059669'];

export default function Avatar({ name = '?', size = 48, color, className = '' }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const bg = color || palette[(name.charCodeAt(0) || 0) % palette.length];
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${className}`}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

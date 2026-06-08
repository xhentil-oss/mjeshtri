import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Check } from 'lucide-react';
import { SITE } from '@/utils/seo';
import Icon from './ui/Icon';

export default function ServiceCard({ service }) {
  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <div className="flex items-start gap-4 border-b border-navy-50 p-6">
        <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${
          service.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-navy-50 text-navy-700'
        }`}>
          <Icon name={service.icon} className="h-7 w-7" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-navy-900">{service.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{service.short}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <ul className="space-y-2">
          {service.benefits.slice(0, 3).map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {b}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link to={`/services/${service.slug}`} className="btn-navy btn-sm flex-1">
            Shiko Shërbimin
          </Link>
          <Link to={`/request?category=${encodeURIComponent(service.category)}`} className="btn-primary btn-sm flex-1">
            Kërko Ofertë
          </Link>
        </div>
        <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-[#1ebe5b] hover:underline">
          <MessageCircle className="h-4 w-4" /> Shkruaj në WhatsApp
        </a>
      </div>
    </article>
  );
}

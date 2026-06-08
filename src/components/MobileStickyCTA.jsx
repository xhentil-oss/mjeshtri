import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Search } from 'lucide-react';
import { SITE } from '@/utils/seo';

// Sticky bottom CTA bar — visible on mobile only.
export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 gap-1 p-2">
        <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex flex-col items-center gap-1 rounded-lg py-2 text-navy-800 active:bg-navy-50">
          <Phone className="h-5 w-5" />
          <span className="text-xs font-semibold">Telefono</span>
        </a>
        <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 rounded-lg py-2 text-[#1ebe5b] active:bg-emerald-50">
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs font-semibold">WhatsApp</span>
        </a>
        <Link to="/request" className="flex flex-col items-center gap-1 rounded-lg bg-amber-500 py-2 text-white active:bg-amber-600">
          <Search className="h-5 w-5" />
          <span className="text-xs font-semibold">Kërko</span>
        </Link>
      </div>
    </div>
  );
}

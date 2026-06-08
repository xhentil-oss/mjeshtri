import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle, Wrench } from 'lucide-react';
import { services } from '@/data/services';
import { SITE } from '@/utils/seo';
import Icon from './ui/Icon';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label={`${SITE.name} — ballina`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy-900 text-white">
        <Wrench className="h-5 w-5 text-amber-400" />
      </span>
      <span className="text-xl font-bold tracking-tight text-navy-900">{SITE.name}</span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navCls = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-amber-600' : 'text-navy-700 hover:text-navy-900'}`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        scrolled ? 'border-navy-100 bg-white/90 backdrop-blur-md shadow-soft' : 'border-transparent bg-white'
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-navy-700 hover:text-navy-900">
              Shërbimet <ChevronDown className="h-4 w-4" />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-[440px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-navy-100 bg-white p-2 shadow-cardhover">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-navy-50"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-700">
                        <Icon name={s.icon} className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-navy-900">{s.name}</span>
                        <span className="line-clamp-1 text-xs text-slate-500">{s.short}</span>
                      </span>
                    </Link>
                  ))}
                  <Link to="/services" className="col-span-2 rounded-xl bg-navy-50 p-3 text-center text-sm font-semibold text-navy-800 hover:bg-navy-100">
                    Shiko të gjitha shërbimet →
                  </Link>
                </div>
              </div>
            )}
          </div>
          <NavLink to="/how-it-works" className={navCls}>Si Funksionon</NavLink>
          <NavLink to="/professionals" className={navCls}>Profesionistët</NavLink>
          <NavLink to="/contact" className={navCls}>Kontakt</NavLink>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost btn-sm" aria-label="WhatsApp">
            <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
          </a>
          <Link to="/register/professional" className="btn-outline btn-sm">Regjistrohu si Profesionist</Link>
          <Link to="/request" className="btn-primary btn-sm">Kërko Shërbim</Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-navy-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Mbyll menunë' : 'Hap menunë'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy-100 bg-white lg:hidden">
          <div className="container space-y-1 py-4">
            <p className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Shërbimet</p>
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-navy-800 hover:bg-navy-50">
                <Icon name={s.icon} className="h-4 w-4 text-navy-600" /> {s.name}
              </Link>
            ))}
            <div className="my-2 h-px bg-navy-100" />
            <Link to="/how-it-works" className="block rounded-lg px-2 py-2.5 font-medium text-navy-800 hover:bg-navy-50">Si Funksionon</Link>
            <Link to="/professionals" className="block rounded-lg px-2 py-2.5 font-medium text-navy-800 hover:bg-navy-50">Profesionistët</Link>
            <Link to="/contact" className="block rounded-lg px-2 py-2.5 font-medium text-navy-800 hover:bg-navy-50">Kontakt</Link>
            <Link to="/login" className="block rounded-lg px-2 py-2.5 font-medium text-navy-800 hover:bg-navy-50">Hyr</Link>
            <div className="grid gap-2 pt-3">
              <Link to="/register/professional" className="btn-outline w-full">Regjistrohu si Profesionist</Link>
              <Link to="/request" className="btn-primary w-full">Kërko Shërbim</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

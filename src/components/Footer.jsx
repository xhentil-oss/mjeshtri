import { Link } from 'react-router-dom';
import { Wrench, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { SITE } from '@/utils/seo';

const socials = [
  { name: 'Facebook', href: 'https://facebook.com/demo', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com/demo', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/demo', icon: Linkedin },
  { name: 'WhatsApp', href: SITE.whatsapp, icon: MessageCircle },
];

function Col({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy-200">{title}</h3>
      <ul className="space-y-2.5 text-sm text-navy-300">{children}</ul>
    </div>
  );
}

const FLink = ({ to, children }) => (
  <li><Link to={to} className="transition hover:text-amber-400">{children}</Link></li>
);

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
                <Wrench className="h-5 w-5 text-amber-400" />
              </span>
              <span className="text-xl font-bold">{SITE.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-navy-300">
              Gjej profesionistin e duhur për shtëpinë ose biznesin tënd në Tiranë. Kërko shërbimin,
              krahaso ofertat dhe zgjidh profesionistin që të përshtatet më mirë.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}
                   className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 transition hover:bg-amber-500">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <Col title="Shërbimet">
            {services.slice(0, 5).map((s) => (
              <FLink key={s.slug} to={`/services/${s.slug}`}>{s.title}</FLink>
            ))}
          </Col>

          <Col title="Kompania">
            <FLink to="/about">Rreth nesh</FLink>
            <FLink to="/how-it-works">Si funksionon</FLink>
            <FLink to="/contact">Kontakt</FLink>
            <FLink to="/professionals">Profesionistët</FLink>
          </Col>

          <Col title="Për Profesionistët">
            <FLink to="/register/professional">Regjistrohu si profesionist</FLink>
            <FLink to="/pro-dashboard/jobs">Shiko punët</FLink>
            <FLink to="/how-it-works">Si funksionon për profesionistët</FLink>
            <FLink to="/login">Hyr në llogari</FLink>
          </Col>

          <Col title="Mbështetje">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-amber-400" /> <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-amber-400">{SITE.phone}</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-amber-400" /> <a href={`mailto:${SITE.email}`} className="hover:text-amber-400">{SITE.email}</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-amber-400" /> Tiranë, Shqipëri</li>
          </Col>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-400">Zona të mbuluara</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-navy-300">
            {areas.map((a) => <span key={a}>{a}</span>)}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-navy-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Të dhënat janë demo për versionin e parë.</p>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-amber-400">Terms (demo)</Link>
            <Link to="/contact" className="hover:text-amber-400">Privacy (demo)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';

export default function NotFound() {
  return (
    <>
      <SEOHelmet title="Faqja nuk u gjet | Mjeshtri" description="Faqja që kërkove nuk ekziston." path="/404" noindex />
      <section className="section bg-white">
        <Container className="grid place-items-center text-center">
          <div className="max-w-md">
            <span className="grid mx-auto h-16 w-16 place-items-center rounded-3xl bg-amber-50 text-amber-500">
              <Icon name="Compass" className="h-8 w-8" />
            </span>
            <h1 className="mt-6 text-5xl font-bold text-navy-900">404</h1>
            <p className="mt-3 text-lg text-slate-600">
              Faqja që kërkove nuk u gjet. Ndoshta është zhvendosur ose nuk ekziston më.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/" className="btn btn-primary">Kthehu në fillim</Link>
              <Link to="/services" className="btn btn-outline">Shiko shërbimet</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

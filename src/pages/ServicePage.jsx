import { useParams } from 'react-router-dom';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import NotFound from '@/pages/NotFound';
import { getServiceBySlug } from '@/data/services';

export default function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <NotFound />;

  return <ServicePageTemplate service={service} />;
}

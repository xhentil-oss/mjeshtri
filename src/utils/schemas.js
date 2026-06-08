import { SITE, canonical } from './seo';

// LocalBusiness schema for the marketplace brand.
export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  image: SITE.ogImage,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tiranë',
    addressCountry: 'AL',
  },
  areaServed: { '@type': 'City', name: 'Tiranë' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '396',
  },
});

// Service schema for SEO service pages.
export const serviceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: service.title,
  name: service.seo.title,
  description: service.seo.description,
  areaServed: { '@type': 'City', name: 'Tiranë' },
  provider: { '@type': 'LocalBusiness', name: SITE.name, url: SITE.url },
  url: canonical(`/services/${service.slug}`),
});

// FAQPage schema from an array of { q, a }.
export const faqSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

// BreadcrumbList schema from [{ name, path }].
export const breadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: canonical(it.path),
  })),
});

// Person / professional profile schema with reviews.
export const professionalSchema = (pro, reviewList = []) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: pro.name,
  jobTitle: pro.category,
  url: canonical(`/professionals/${pro.slug}`),
  address: { '@type': 'PostalAddress', addressLocality: 'Tiranë', addressCountry: 'AL' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: String(pro.rating),
    reviewCount: String(pro.reviews),
  },
  review: reviewList.slice(0, 3).map((r) => ({
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: String(r.rating) },
    author: { '@type': 'Person', name: r.customer },
    reviewBody: r.text,
  })),
});

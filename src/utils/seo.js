// Site-wide SEO constants. Swap SITE_URL / brand details for production.
export const SITE = {
  name: 'Mjeshtri',
  brand: 'Mjeshtri — Profesionistë të Besueshëm në Tiranë',
  url: 'https://mjeshtri.al',
  locale: 'sq_AL',
  description:
    'Kërko shërbimin që të duhet, merr oferta nga profesionistë të verifikuar në Tiranë dhe zgjidh atë që të përshtatet më mirë.',
  phone: '+355 69 000 0000',
  email: 'info@demo.al',
  whatsapp: 'https://wa.me/355690000000',
  city: 'Tiranë',
  country: 'AL',
  ogImage: 'https://mjeshtri.al/og-image.jpg',
};

export const canonical = (path = '') => `${SITE.url}${path}`;

import { Helmet } from 'react-helmet-async';
import { SITE, canonical } from '@/utils/seo';

// Centralised SEO head management: title, description, canonical, Open Graph,
// and any JSON-LD schema objects passed via `schemas`.
export default function SEOHelmet({
  title,
  description = SITE.description,
  path = '',
  image = SITE.ogImage,
  noindex = false,
  schemas = [],
}) {
  const fullTitle = title ? `${title}` : SITE.brand;
  const url = canonical(path);
  const schemaList = Array.isArray(schemas) ? schemas.filter(Boolean) : [schemas];

  return (
    <Helmet prioritizeSeoTags>
      <html lang="sq" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemaList.map((s, i) => (
        <script type="application/ld+json" key={i}>{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}

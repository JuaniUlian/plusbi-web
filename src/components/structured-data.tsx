export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PLUS BI',
    alternateName: 'PLUS Business Intelligence',
    url: 'https://plusbi.ar',
    logo: 'https://plusbi.ar/logo/plusbi.png',
    description: 'Soluciones GovTech e inteligencia artificial para gobiernos en Argentina',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AR',
    },
    sameAs: [
      // Agregar redes sociales si las tienen
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'juan.ulian@pluscompol.com',
      contactType: 'Sales',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareProductSchema({
  name,
  description,
  applicationCategory
}: {
  name: string;
  description: string;
  applicationCategory: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    description: description,
    applicationCategory: applicationCategory,
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: 'PLUS BI',
      url: 'https://plusbi.ar',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebPageSchema({
  title,
  description,
  url
}: {
  title: string;
  description: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'PLUS BI',
      url: 'https://plusbi.ar',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

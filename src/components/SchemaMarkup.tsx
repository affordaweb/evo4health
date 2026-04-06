const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://evo4health.vercel.app'

export default function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': BASE_URL,
    name: 'Evolution Functional Medicine',
    description: 'Functional medicine, weight loss, and hormone balancing led by Erin.',
    url: BASE_URL,
    logo: BASE_URL + '/images/logo.png',
    image: BASE_URL + '/og-image.png',
    telephone: '+1-000-000-0000',
    priceRange: '$$',
    address: { '@type': 'PostalAddress', addressCountry: 'US' },
    sameAs: [
      'https://www.facebook.com/evolution4health',
      'https://www.instagram.com/evolution4health',
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

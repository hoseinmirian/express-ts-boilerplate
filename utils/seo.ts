// seo related functions
// ---------- TYPES ----------
type SeoTagOptions = Readonly<{
  title?: string
  description?: string
  keywords?: string
  author?: string
  canonical?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' | 'profile'
}>

type JsonLdOptions = Readonly<{
  type?: 'WebPage' | 'Article' | 'Product' | 'FAQPage' | 'BreadcrumbList'
  name?: string
  description?: string
  url?: string
  image?: string
}>

type ProductJsonLdOptions = Readonly<{
  name: string
  description: string
  sku?: string
  brand?: string
  price: number
  currency: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  url: string
  image?: string
}>

type FaqJsonLdOptions = Readonly<{
  questions: ReadonlyArray<{ question: string; answer: string }>
}>

type BreadcrumbJsonLdOptions = Readonly<{
  items: ReadonlyArray<{ name: string; url: string }>
}>

type JsonLdSchema = Record<string, unknown>

type SeoTags = Readonly<{
  title: string
  description: string
  keywords: string
  author: string
  canonical?: string
  ogTitle: string
  ogDescription: string
  ogImage?: string
  ogUrl?: string
  ogType: 'website' | 'article' | 'product' | 'profile'
  twitterTitle: string
  twitterDescription: string
  twitterImage?: string
  twitterCard: 'summary_large_image'
}>

// ---------- SEO TAG BUILDER ----------
const buildSeoTags = ({
  title = 'MyApp',
  description = 'Default description for MyApp.',
  keywords = 'myapp, default, keywords',
  author = 'MyApp Team',
  canonical,
  image,
  url,
  type = 'website'
}: SeoTagOptions = {}): SeoTags => ({
  title,
  description,
  keywords,
  author,
  canonical,
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogUrl: url,
  ogType: type,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
  twitterCard: 'summary_large_image'
})

// ---------- GENERIC JSON-LD ----------
const buildJsonLd = ({
  type = 'WebPage',
  name = 'MyApp',
  description = 'Default JSON-LD description for MyApp.',
  url = 'https://example.com',
  image
}: JsonLdOptions = {}): JsonLdSchema => {
  const schema: JsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url
  }
  if (image) schema.image = image
  return schema
}

// ---------- PRODUCT JSON-LD ----------
const buildProductJsonLd = ({
  name,
  description,
  sku,
  brand,
  price,
  currency,
  availability = 'InStock',
  url,
  image
}: ProductJsonLdOptions): JsonLdSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    ...(sku && { sku }),
    ...(brand && { brand: { '@type': 'Brand', name: brand } }),
    ...(image && { image }),
    url,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url
    }
  }
}

// ---------- FAQ JSON-LD ----------
const buildFaqJsonLd = ({ questions }: FaqJsonLdOptions): JsonLdSchema => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map((q) => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.answer
    }
  }))
})

// ---------- BREADCRUMB JSON-LD ----------
const buildBreadcrumbJsonLd = ({
  items
}: BreadcrumbJsonLdOptions): JsonLdSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

export {
  buildSeoTags,
  buildJsonLd,
  buildProductJsonLd,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd
}

// usage example
/*
app.get('/product/123', (req, res) => {
  const seo = buildSeoTags({
    title: 'SuperWidget 3000',
    description: 'The best widget in the market.',
    url: 'https://example.com/product/123',
    image: 'https://example.com/images/widget.jpg',
    canonical: 'https://example.com/product/123'
  });

  const productJsonLd = buildProductJsonLd({
    name: 'SuperWidget 3000',
    description: 'High-performance widget with advanced features.',
    sku: 'SW3000',
    brand: 'WidgetCorp',
    price: 59.99,
    currency: 'USD',
    availability: 'InStock',
    url: 'https://example.com/product/123',
    image: 'https://example.com/images/widget.jpg'
  });

  res.render('product', {
    ...seo,
    jsonLd: productJsonLd
  });
});

app.get('/about', (req, res) => {
  const seo = buildSeoTags({
    title: 'About Us - MyApp',
    description: 'Learn about the team behind MyApp.',
    keywords: 'about, team, company',
    canonical: 'https://example.com/about',
    image: 'https://example.com/images/about.jpg',
    url: 'https://example.com/about'
  });

  const jsonLd = buildJsonLd({
    type: 'Organization',
    name: 'MyApp Inc.',
    description: 'We build powerful tools for modern teams.',
    url: 'https://example.com/about',
    image: 'https://example.com/images/logo.png'
  });

  res.render('about', {
    ...seo,
    jsonLd
  });
});
*/

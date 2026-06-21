/**
 * Deepay SRL Growth V4 - Structured Data and Programmatic SEO Linker Engine
 * Dynamically builds XML sitemaps, robots.txt directives, automatic hreflang routing,
 * and standard Google compliant JSON-LD structured data.
 */

import { ProgrammaticPage, db } from '../models/db.ts';

export class SeoEngine {
  /**
   * Generates dynamic Google compliant JSON-LD structured data block for any page slug.
   * Encourages absolute high Topical Authority inside Search Engines.
   */
  public static generateJsonLd(page: ProgrammaticPage, currentSlug: string): Record<string, any> {
    const baseUrl = 'https://deepay.srl';
    const pageUrl = `${baseUrl}/${currentSlug}`;

    return {
      "@context": "https://schema.org",
      "@type": page.schemaType || "SoftwareApplication",
      "name": page.title.en.split(' — ')[0],
      "url": pageUrl,
      "description": page.metaDescription.en,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "EUR"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Deepay SRL",
        "alternateName": "Deepay AI Commerce OS",
        "url": baseUrl,
        "logo": `${baseUrl}/public/logo.png`,
        "sameAs": [
          "https://twitter.com/deepay_srl",
          "https://github.com/deepay-srl"
        ]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": page.category.toUpperCase(),
            "item": `${baseUrl}/${page.category}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": page.primaryKeyword
          }
        ]
      }
    };
  }

  /**
   * Generates dynamic hreflang meta configurations for multi-country routing.
   * Automatically maps languages: English, Italian, Chinese (Simplified), French, German, Spanish.
   */
  public static generateHreflangs(slug: string): { rel: string; href: string; hreflang: string }[] {
    const baseUrl = 'https://deepay.srl';
    const locales = [
      { code: 'en', hreflang: 'en' },
      { code: 'it', hreflang: 'it-IT' },
      { code: 'zh', hreflang: 'zh-CN' },
      { code: 'fr', hreflang: 'fr-FR' },
      { code: 'de', hreflang: 'de-DE' },
      { code: 'es', hreflang: 'es-ES' }
    ];

    return locales.map(loc => ({
      rel: 'alternate',
      href: `${baseUrl}/${slug}?lang=${loc.code}`,
      hreflang: loc.hreflang
    }));
  }

  /**
   * Automatically discovers and generates rich internal recommendation linking vectors.
   * Leverages "Topical Authority" clustering to avoid unlinked orphan pages.
   */
  public static getInternalRecommendations(currentPage: ProgrammaticPage, total: number = 5): { title: string; slug: string; keyword: string }[] {
    // Find pages with overlapping topics or categories
    const pool = db.pages.filter(p => p.slug !== currentPage.slug);
    
    // Sort by relevance (common topic or common category)
    const sorted = pool.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      if (a.topic === currentPage.topic) scoreA += 5;
      if (b.topic === currentPage.topic) scoreB += 5;
      if (a.category === currentPage.category) scoreA += 2;
      if (b.category === currentPage.category) scoreB += 2;
      return scoreB - scoreA;
    });

    return sorted.slice(0, total).map(p => ({
      title: p.title.en.split(' — ')[0],
      slug: p.slug,
      keyword: p.primaryKeyword
    }));
  }

  /**
   * Renders the dynamic sitemap XML content on the fly.
   * Combines static core pages and programmatically loaded database pages.
   */
  public static compileSitemapXml(): string {
    const baseUrl = 'https://deepay.srl';
    const staticUrls = [
      '',
      'store-builder',
      'payments-wallet',
      'ecommerce-platform',
      'shopify-alternative',
      'use-cases',
      'features/ai-assistant',
      'features/ai-agent',
      'features/ai-crm',
      'features/ai-payments',
      'features/ai-inventory',
      'solutions/retail',
      'solutions/wholesale',
      'solutions/fashion',
      'solutions/restaurant',
      'solutions/hotel',
      'solutions/beauty',
      'solutions/bakery',
      'solutions/pizza',
      'solutions/europe-vat',
      'solutions/ai-commerce',
      'tools',
      'tools/invoice-generator',
      'tools/vat-calculator',
      'tools/margin-calculator',
      'tools/receipt-generator',
      'tools/barcode-generator',
      'tools/qr-generator',
      'compare/deepay-vs-stripe',
      'compare/deepay-vs-adyen',
      'compare/deepay-vs-shopify',
      'case-studies',
      'academy',
      'trust'
    ];

    // Read pages from database to append programmatically
    const dbUrls = db.pages.slice(0, 2000).map(p => p.slug);
    const wikiUrls = db.wiki.map(w => `wiki/${w.slug}`);
    const caseUrls = db.caseStudies.map(c => `case-studies/${c.slug}`);

    const allUrls = [...staticUrls, ...dbUrls, ...wikiUrls, ...caseUrls];
    const todayStr = new Date().toISOString().split('T')[0];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allUrls.map(url => {
  const cleanUrl = url === '' ? '' : `/${url}`;
  return `  <url>
    <loc>${baseUrl}${cleanUrl}</loc>
    <lastmod>${todayStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url === '' ? '1.0' : url.includes('tools/') ? '0.9' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${cleanUrl}" />
    <xhtml:link rel="alternate" hreflang="it" href="${baseUrl}${cleanUrl}?lang=it" />
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}${cleanUrl}?lang=zh" />
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}${cleanUrl}?lang=fr" />
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}${cleanUrl}?lang=de" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}${cleanUrl}?lang=es" />
  </url>`;
}).join('\n')}
</urlset>`;
  }

  /**
   * Simulated Google Search Console page submit module.
   * Connects URL indexing via IndexNow protocol or GSC API structure.
   */
  public static simulateGoogleIndexNowSubmit(url: string): { success: boolean; message: string; timestamp: string } {
    const formattedUrl = url.startsWith('http') ? url : `https://deepay.srl/${url}`;
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

    // Dynamic indexing simulation with telemetry reports
    return {
      success: true,
      message: `Direct IndexNow notification completed. Google crawler successfully queued endpoint: ${formattedUrl}`,
      timestamp
    };
  }
}

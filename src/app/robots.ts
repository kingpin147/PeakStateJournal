import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/utils';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
      // Allow Googlebot explicitly for all content
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: [
      `${BASE_URL}/sitemaps/sitemap.xml`,
      `${BASE_URL}/sitemap.xml`,
    ],
    host: BASE_URL,
  };
}

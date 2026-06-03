import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.peakstatejournal.com';

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
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

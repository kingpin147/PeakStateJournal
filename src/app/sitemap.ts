import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/types';

const BASE_URL = 'https://www.peakstatejournal.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // Homepage
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // One URL per category (skip 'all')
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES
    .filter(c => c.id !== 'all')
    .map(c => ({
      url: `${BASE_URL}/?category=${c.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // All blog post URLs
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}

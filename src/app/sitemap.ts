import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/types';

const BASE_URL = 'https://www.peakstatejournal.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // Find the latest post date to use as modification timestamp for static & category list views
  const latestPostDate = posts.length > 0 
    ? new Date(posts[0].date) 
    : new Date('2026-06-04');

  // Homepage
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: latestPostDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // One URL per category (skip 'all')
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES
    .filter(c => c.id !== 'all')
    .map(c => {
      // Find latest post in this specific category
      const categoryPosts = posts.filter(p => p.category === c.id);
      const categoryDate = categoryPosts.length > 0 
        ? new Date(categoryPosts[0].date) 
        : latestPostDate;

      return {
        url: `${BASE_URL}/?category=${c.id}`,
        lastModified: categoryDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    });

  // All blog post URLs
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}

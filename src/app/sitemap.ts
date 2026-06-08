import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { BASE_URL } from '@/lib/utils';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const now = new Date();
  const clampDate = (date: Date) => (date > now ? now : date);

  // Find the latest post date to use as modification timestamp for static views
  const latestPostDate = posts.length > 0 
    ? clampDate(new Date(posts[0].date)) 
    : now;

  // Homepage
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: latestPostDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // All blog post URLs
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: clampDate(new Date(post.date)),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...postRoutes];
}


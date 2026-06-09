import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { BASE_URL } from '@/lib/utils';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const fallbackDate = new Date().toISOString().split('T')[0];

  // Homepage
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: posts.length > 0 ? posts[0].date : fallbackDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // All blog post URLs
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date || fallbackDate,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...postRoutes];
}


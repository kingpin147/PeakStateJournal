import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './types';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

// Helper to get all post slugs
export async function getPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
}

// Helper to get a post by slug
export function getPostBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      slug: realSlug,
      category: data.category || '',
      tags: data.tags || [],
      readTime: data.readTime || '',
      date: data.date || '',
      coverImage: data.coverImage || '',
      summary: data.summary || '',
      citations: data.citations || [],
      content,
    };
  } catch (error) {
    console.error(`Error reading post with slug ${slug}:`, error);
    return null;
  }
}

// Helper to get all posts sorted by date
export function getAllPosts(): Post[] {
  try {
    if (!fs.existsSync(postsDirectory)) return [];
    const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
    const posts = files
      .map(file => getPostBySlug(file))
      .filter((post): post is Post => post !== null);

    // Sort posts by date in descending order
    return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

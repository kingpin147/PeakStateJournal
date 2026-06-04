import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

const BASE_URL = 'https://www.peakstatejournal.com';

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  try {
    const posts = getAllPosts();
    
    // Sort posts to ensure newest are first
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const rssItems = sortedPosts
      .map((post) => {
        const url = `${BASE_URL}/blog/${post.slug}`;
        const pubDate = new Date(post.date).toUTCString();
        return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.summary)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>`;
      })
      .join('\n');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Peak State Journal | Clinical &amp; Data-Driven Longevity</title>
    <link>${BASE_URL}</link>
    <description>A premium, scientific resource for high-income professionals. Peer-reviewed articles on longevity, preventive health, nutrigenomics, and executive performance.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=18000, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating feed', { status: 500 });
  }
}

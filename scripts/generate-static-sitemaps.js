const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://peak-state-journal.vercel.app';
const postsDirectory = path.join(process.cwd(), 'src/content/posts');
const publicDirectory = path.join(process.cwd(), 'public');

function generateSitemaps() {
  console.log('Generating static sitemaps...');
  
  if (!fs.existsSync(postsDirectory)) {
    console.error(`Error: Posts directory not found at ${postsDirectory}`);
    process.exit(1);
  }

  // Get all posts and parse frontmatter
  const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
  const posts = files.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.mdx$/, '');
    
    return {
      slug,
      date: data.date || new Date().toISOString().split('T')[0],
      title: data.title || '',
      coverImage: data.coverImage || ''
    };
  });

  // Sort posts by date descending
  posts.sort((a, b) => (a.date > b.date ? -1 : 1));

  const today = new Date().toISOString().split('T')[0];
  const latestPostDate = posts.length > 0 ? posts[0].date : today;

  // 1. Generate sitemap.xml (Index Sitemap)
  const indexSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/pages-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/blog-posts-sitemap.xml</loc>
    <lastmod>${latestPostDate}</lastmod>
  </sitemap>
</sitemapindex>
`;

  // 2. Generate pages-sitemap.xml (Static Pages)
  const pagesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${latestPostDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

  // 3. Generate blog-posts-sitemap.xml (Blog Posts with Images)
  let blogUrls = '';
  posts.forEach(post => {
    let imageXml = '';
    if (post.coverImage) {
      const imageUrl = post.coverImage.startsWith('http') 
        ? post.coverImage 
        : `${SITE_URL}${post.coverImage}`;
      
      imageXml = `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title><![CDATA[${post.title}]]></image:title>
    </image:image>`;
    }

    blogUrls += `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>${imageXml}
  </url>\n`;
  });

  const blogPostsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${blogUrls}</urlset>
`;

  // Write to public directory
  fs.writeFileSync(path.join(publicDirectory, 'sitemap.xml'), indexSitemap);
  fs.writeFileSync(path.join(publicDirectory, 'pages-sitemap.xml'), pagesSitemap);
  fs.writeFileSync(path.join(publicDirectory, 'blog-posts-sitemap.xml'), blogPostsSitemap);

  console.log('✅ Static sitemaps generated successfully in /public!');
  console.log('- public/sitemap.xml');
  console.log('- public/pages-sitemap.xml');
  console.log('- public/blog-posts-sitemap.xml');
}

generateSitemaps();

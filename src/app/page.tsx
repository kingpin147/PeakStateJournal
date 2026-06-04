import { getAllPosts } from '@/lib/posts';
import BlogExplorer from '@/components/BlogExplorer';
import { BASE_URL } from '@/lib/utils';

// WebSite + Organization JSON-LD for the homepage
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: BASE_URL,
  name: 'Peak State Journal',
  description:
    'A premium, scientific resource for high-income professionals covering longevity, preventive health, nutrigenomics, and executive performance.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Peak State Journal',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/images/logo.png`,
  },
  sameAs: [],
};

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <BlogExplorer posts={posts} />
    </>
  );
}

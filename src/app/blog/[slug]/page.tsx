import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, Clock, BookOpen, ChevronRight, FileText, ExternalLink, ShieldAlert } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/types';
import { BASE_URL } from '@/lib/utils';
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';
import RelatedPosts from '@/components/RelatedPosts';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params at build time
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

// Generate page-specific metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
  const ogImage = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${BASE_URL}${post.coverImage}`;

  return {
    // Title — template in layout adds "| Peak State Journal" automatically
    title: post.title,
    description: post.summary,

    // Canonical URL — critical for preventing duplicate content penalties
    alternates: {
      canonical: canonicalUrl,
    },

    // Open Graph (Facebook, LinkedIn, WhatsApp previews)
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      siteName: 'Peak State Journal',
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ['Peak State Editorial Board'],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/png',
        },
      ],
    },

    // Twitter / X card
    twitter: {
      card: 'summary_large_image',
      site: '@peakstatejournal',
      creator: '@peakstatejournal',
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },

    // Robots — explicitly index every article
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Article-specific keywords
    keywords: post.tags,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Find next/prev posts for bottom navigation
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const categoryLabel = CATEGORIES.find(c => c.id === post.category)?.label || post.category;

  // JSON-LD: MedicalWebPage schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: post.title,
    headline: post.title,
    description: post.summary,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    lastReviewed: post.date,
    inLanguage: 'en-US',
    image: {
      '@type': 'ImageObject',
      url: post.coverImage.startsWith('http')
        ? post.coverImage
        : `${BASE_URL}${post.coverImage}`,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Organization',
      name: 'Peak State Editorial Board',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Peak State Journal',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    reviewedBy: {
      '@type': 'MedicalOrganization',
      name: 'Peak State Editorial Board',
    },
    about: [{ '@type': 'MedicalTopic', name: categoryLabel }],
    keywords: post.tags.join(', '),
    isPartOf: { '@type': 'WebSite', url: BASE_URL, name: 'Peak State Journal' },
  };

  // JSON-LD: BreadcrumbList for Google rich results
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryLabel,
        item: `${BASE_URL}/?category=${post.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${BASE_URL}/blog/${post.slug}`,
      },
    ],
  };

  // JSON-LD: WebSite with SearchAction (enables Google Sitelinks search box)
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: BASE_URL,
    name: 'Peak State Journal',
    description: 'Clinical & Data-Driven Longevity Research',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <ProgressBar />

      {/* Structured Data — MedicalWebPage + BreadcrumbList + WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Header */}
      <Header showBackButton />

      {/* Breadcrumbs Navigation */}
      <div className="border-b border-border/40 py-3 px-6 md:px-12 bg-card/40 transition-colors">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Database</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="cursor-default">{categoryLabel}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </div>
      </div>

      {/* Article Main Section */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left/Main Column: Article Body */}
        <article className="lg:col-span-8 space-y-8">
          
          {/* Article Header */}
          <div className="space-y-4">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
              {categoryLabel}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>
            
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-y border-border/40 py-3 mt-4">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="text-muted-foreground/30">|</span>
              <span className="font-semibold text-foreground">
                By Peak State Editorial Board
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-64 md:h-[400px] overflow-hidden rounded-xl border border-border/40 bg-muted">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Article Prose Body (Serif typography) */}
          <div className="blog-prose font-serif">
            <MDXRemote source={post.content} />
          </div>

          {/* Interactive Citations Accordion */}
          {post.citations && post.citations.length > 0 && (
            <div className="mt-12 border border-border/40 rounded-xl bg-card overflow-hidden shadow-sm">
              <div className="border-b border-border/40 px-5 py-4 bg-muted/20 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm text-foreground tracking-tight">Academic Citations & Studies</h3>
              </div>
              <div className="p-4">
                <Accordion type="single" collapsible className="w-full">
                  {post.citations.map((cit) => (
                    <AccordionItem key={cit.id} value={`citation-${cit.id}`} className="border-b-0">
                      <AccordionTrigger className="text-xs font-semibold py-2 hover:text-primary transition-colors">
                        [{cit.id}] {cit.authors} ({cit.year}) — &ldquo;{cit.title}&rdquo;
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-muted-foreground pt-1 pb-3 pl-4 border-l-2 border-primary/20 space-y-1">
                        <p><strong>Journal:</strong> {cit.journal}, {cit.year}</p>
                        <p><strong>Authors:</strong> {cit.authors}</p>
                        <a 
                          href={cit.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1 text-primary hover:underline font-semibold mt-1"
                        >
                          View Study Database
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          )}

          {/* Global Medical Disclaimer Box */}
          <div className="mt-8 border-l-4 border-amber-500 bg-amber-50/70 dark:bg-amber-950/20 p-5 rounded-r-xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              Medical Disclaimer
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-sans font-medium">
              Disclaimer: The information in this article is for educational and informational purposes only. It is not intended as medical advice. Always consult a qualified medical professional or doctor for any health-related questions or concerns.
            </p>
          </div>

          {/* Related Posts Carousel */}
          <RelatedPosts
            currentSlug={post.slug}
            currentCategory={post.category}
            currentTags={post.tags}
            allPosts={allPosts}
          />

          {/* Navigation links (Next / Prev Post) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 pt-8 mt-12">
            {prevPost ? (
              <Link 
                href={`/blog/${prevPost.slug}`}
                className="group p-4 rounded-xl border border-border/40 bg-card hover:bg-muted/10 hover:border-border transition-all flex flex-col text-left"
              >
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Previous Article</span>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
            
            {nextPost && (
              <Link 
                href={`/blog/${nextPost.slug}`}
                className="group p-4 rounded-xl border border-border/40 bg-card hover:bg-muted/10 hover:border-border transition-all flex flex-col text-right"
              >
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Next Article</span>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>

        </article>

        {/* Right Column: Sticky Meta Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Editorial Board Card */}
            <div className="border border-border/40 rounded-xl bg-card p-5 shadow-sm space-y-4">
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-muted-foreground border-b border-border/30 pb-2">
                Editorial Control
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary">
                    PS
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-foreground">Peak State Board</h4>
                    <p className="text-[10px] text-muted-foreground">Peer-Reviewed Reviews</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This review has been compiled and checked by the Peak State Editorial Board for clarity, citations accuracy, and scientific source matching.
                </p>
              </div>
            </div>

            {/* Category Tags Card */}
            <div className="border border-border/40 rounded-xl bg-card p-5 shadow-sm space-y-4">
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-muted-foreground border-b border-border/30 pb-2">
                Research tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back to Database button */}
            <Link 
              href="/"
              className="w-full h-9 rounded-lg border border-primary/25 text-primary bg-primary/5 hover:bg-primary hover:text-primary-foreground text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Back to Database
            </Link>
          </div>
        </aside>

      </main>

      {/* Centralized Attractive Footer */}
      <Footer />
    </div>
  );
}

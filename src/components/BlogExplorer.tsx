'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Search, Grid, List, ArrowRight, Clock, Calendar, Filter, Sparkles, BookOpen,
} from 'lucide-react';
import { Post, CATEGORIES } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';

interface BlogExplorerProps {
  posts: Post[];
}

function BlogExplorerInner({ posts }: BlogExplorerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const categoryParam = searchParams.get('category') ?? 'all';
  const selectedCategory = CATEGORIES.some(c => c.id === categoryParam) ? categoryParam : 'all';

  const sortParam = searchParams.get('sort');
  const basePosts = sortParam === 'latest'
    ? [...posts].sort((a, b) => (a.date > b.date ? -1 : 1))
    : posts;

  const filteredPosts = basePosts.filter(post => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.summary.toLowerCase().includes(q) ||
      post.tags.some(tag => tag.toLowerCase().includes(q));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const showHero = searchQuery === '' && selectedCategory === 'all' && !sortParam;
  const featuredPost = posts[0];

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams();
    if (categoryId !== 'all') params.set('category', categoryId);
    router.replace(
      `${pathname}${params.toString() ? `?${params.toString()}` : ''}`,
      { scroll: false }
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2 px-4 text-center font-medium tracking-wide">
        PEAK STATE JOURNAL — CLINICAL EVIDENCE-BASED LONGEVITY RESEARCH FOR HIGH-PERFORMANCE PROFESSIONALS
      </div>

      <Header />

      {/* Hero Banner — only on unfiltered homepage */}
      {showHero && <HeroBanner />}

      {/* Featured Hero card — only when no filter/search */}
      {featuredPost && showHero && (
        <section
          id="database"
          className={`px-6 md:px-12 py-8 max-w-7xl mx-auto w-full transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-border/40 rounded-2xl p-6 md:p-8 bg-card shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                <Sparkles className="w-4 h-4 animate-pulse" />
                Featured Research
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight hover:text-primary transition-colors">
                <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {featuredPost.summary}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredPost.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-4 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {featuredPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.readTime}
                </span>
              </div>
              <div className="pt-2">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline group/btn"
                >
                  Read Full Article
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[220px] md:min-h-[300px] w-full rounded-xl overflow-hidden border border-border/40">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </section>
      )}

      {/* Main Database */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-8 space-y-8">

        {/* Title & Controls */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Longevity Research Database
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Showing {filteredPosts.length} clinical review{filteredPosts.length === 1 ? '' : 's'} across {CATEGORIES.length - 1} categories.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search database..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs w-full bg-card"
              />
            </div>
            <div className="flex items-center border border-border/40 rounded-lg p-0.5 bg-card">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md cursor-pointer transition-all ${viewMode === 'grid' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                title="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md cursor-pointer transition-all ${viewMode === 'list' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div
          className={`flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ scrollbarWidth: 'none' }}
        >
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1 mr-2 shrink-0">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary font-medium shadow-sm'
                  : 'bg-card text-foreground border-border/40 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Posts Grid / List */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border/60 rounded-2xl bg-card animate-in fade-in duration-300">
            <p className="text-muted-foreground text-sm font-medium">No research reviews match your search or filters.</p>
            <button
              onClick={() => { setSearchQuery(''); handleCategoryChange('all'); }}
              className="text-xs font-semibold text-primary mt-3 hover:underline cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <Card
                key={post.slug}
                className="group relative flex flex-col h-full border border-border/40 bg-card overflow-hidden hover:shadow-lg transition-all duration-300 rounded-xl hover:-translate-y-0.5"
                style={{
                  animationDelay: `${i * 40}ms`,
                  animation: mounted ? `fadeSlideUp 0.5s ease both ${i * 40}ms` : 'none',
                }}
              >
                <div className="absolute top-3 left-3 z-10 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-background/90 text-foreground border border-border/40 shadow-sm backdrop-blur-sm">
                  {CATEGORIES.find(c => c.id === post.category)?.label.split(' & ')[0] || post.category}
                </div>

                <div className="relative w-full h-44 overflow-hidden bg-muted">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.05] transition-all duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                <CardHeader className="p-5 pb-2">
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors min-h-[46px] line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 pt-0 pb-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {post.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-5 pt-0 border-t border-border/30 mt-auto flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1.5"
                  >
                    View Research
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  {post.citations && post.citations.length > 0 && (
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/60 px-1.5 py-0.5 rounded border border-border/20">
                      {post.citations.length} Ref{post.citations.length === 1 ? '' : 's'}
                    </span>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border border-border/40 rounded-xl overflow-hidden bg-card divide-y divide-border/40 shadow-sm">
            {filteredPosts.map(post => (
              <div key={post.slug} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-muted/20 transition-all group">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                      {CATEGORIES.find(c => c.id === post.category)?.label || post.category}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{post.date}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />{post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-3xl leading-relaxed">{post.summary}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-border/40">
                  <div className="flex gap-1.5">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="h-8 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all hover:-translate-y-0.5"
                  >
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card py-12 px-6 md:px-12 text-center text-xs text-muted-foreground transition-colors duration-300 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left space-y-1">
            <h4 className="font-bold text-sm text-foreground">Peak State Journal</h4>
            <p className="text-xs max-w-sm">
              An evidence-based resource providing accessible, review-level insights on human healthspan, performance, and longevity.
            </p>
          </div>
          <div className="text-xs md:text-right space-y-1">
            <p>© {new Date().getFullYear()} Peak State Journal. All rights reserved.</p>
            <p className="text-[10px] text-muted-foreground max-w-md">
              Disclaimer: The information provided on this website is for educational purposes only. Always consult a medical professional for personal health concerns.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function BlogExplorer(props: BlogExplorerProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm">Loading database...</div>
      </div>
    }>
      <BlogExplorerInner {...props} />
    </Suspense>
  );
}

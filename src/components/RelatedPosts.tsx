'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { Post, CATEGORIES } from '@/lib/types';

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
  currentTags: string[];
  allPosts: Post[];
}

function scoreRelevance(post: Post, category: string, tags: string[]): number {
  let score = 0;
  if (post.category === category) score += 10;
  const sharedTags = post.tags.filter(t =>
    tags.some(ct => ct.toLowerCase() === t.toLowerCase())
  );
  score += sharedTags.length * 3;
  return score;
}

export default function RelatedPosts({
  currentSlug,
  currentCategory,
  currentTags,
  allPosts,
}: RelatedPostsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Score and sort all other posts by relevance
  const related = allPosts
    .filter(p => p.slug !== currentSlug)
    .map(p => ({ post: p, score: scoreRelevance(p, currentCategory, currentTags) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(r => r.post);

  if (related.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="mt-16 border-t border-border/40 pt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-foreground">Related Research</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            More articles you may find relevant
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-border/40 bg-card hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-border/40 bg-card hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {related.map(post => {
          const catLabel = CATEGORIES.find(c => c.id === post.category)?.label?.split(' & ')[0] || post.category;
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex-shrink-0 w-72 rounded-xl border border-border/40 bg-card hover:shadow-md hover:border-primary/20 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Cover image */}
              <div className="relative w-full h-40 overflow-hidden bg-muted">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="288px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span className="absolute top-2 left-2 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-background/90 text-foreground border border-border/40 shadow-sm backdrop-blur-sm">
                  {catLabel}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 flex-1 mb-3">
                  {post.summary}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  <span className="text-[10px] font-bold text-primary flex items-center gap-1 group-hover:underline">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Fade edges indicator */}
      <p className="text-center text-[10px] text-muted-foreground mt-2 font-medium">
        ← scroll to explore more →
      </p>
    </section>
  );
}

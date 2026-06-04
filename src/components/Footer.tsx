'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Rss, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/65 backdrop-blur-md py-16 px-6 md:px-12 text-xs text-muted-foreground transition-colors duration-300 mt-20 relative overflow-hidden">
      {/* Visual Top Glow Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                src="/images/logo.svg"
                alt="Peak State Journal Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-sans font-bold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                Peak State Journal
              </p>
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold leading-none">
                Longevity &amp; Performance
              </p>
            </div>
          </Link>
          <p className="text-xs leading-relaxed max-w-sm text-muted-foreground/80 font-medium">
            An evidence-based resource providing peer-reviewed insights on human healthspan, performance, and longevity. Designed for high-performance professionals.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Link 
              href="/feed.xml" 
              className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-all border border-border/20 flex items-center gap-1.5 font-bold"
              title="RSS Feed"
              target="_blank"
            >
              <Rss className="w-3.5 h-3.5" />
              <span>RSS Feed</span>
            </Link>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Evidence-Based</span>
            </div>
          </div>
        </div>

        {/* Sitemap / Links Column */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Database</h4>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                Home Explorer
              </Link>
            </li>
            <li>
              <Link href="/?sort=latest" className="hover:text-primary transition-colors flex items-center gap-1">
                Latest Research
              </Link>
            </li>
            <li>
              <a href="/sitemap.xml" target="_blank" className="hover:text-primary transition-colors flex items-center gap-0.5">
                Sitemap <ArrowUpRight className="w-3 h-3 text-muted-foreground/45" />
              </a>
            </li>
          </ul>
        </div>

        {/* Categories Column */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Core Research</h4>
          <ul className="grid grid-cols-1 gap-2 font-medium">
            <li><Link href="/?category=preventive-health" className="hover:text-primary transition-colors">Longevity &amp; Prevention</Link></li>
            <li><Link href="/?category=clinical-testing" className="hover:text-primary transition-colors">Lab Tests &amp; Diagnostics</Link></li>
            <li><Link href="/?category=hormones-metabolism" className="hover:text-primary transition-colors">Hormones &amp; Metabolism</Link></li>
            <li><Link href="/?category=sleep-recovery" className="hover:text-primary transition-colors">Sleep &amp; Recovery</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Stay Informed</h4>
          <p className="text-xs leading-relaxed text-muted-foreground/80 font-medium">
            Subscribe to receive our latest clinical evidence summaries directly in your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2 pt-1">
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-9 rounded-lg border border-border/40 pl-9 pr-3 text-xs bg-card focus:outline-none focus:border-primary/60 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full h-9 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs transition-all shadow-sm hover:shadow cursor-pointer"
            >
              Subscribe Summary
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border/30 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
        <p className="font-medium text-center lg:text-left">
          &copy; {new Date().getFullYear()} Peak State Journal. All rights reserved. Peer-reviewed research, citations mapped.
        </p>
        <p className="text-[10px] text-muted-foreground/60 max-w-2xl text-center lg:text-right leading-relaxed">
          Disclaimer: The informational content on this website is for educational purposes only and is not intended as medical advice. Always consult a qualified medical professional for personal health concerns or diagnosis.
        </p>
      </div>
    </footer>
  );
}

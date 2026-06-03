'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sun, Moon, ArrowLeft, ChevronDown, Menu, X,
  Activity, Brain, Dna, Shield, Zap, Flame, Waves,
  ArrowRight, FlaskConical, Pill, Moon as MoonIcon, Gauge,
} from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
}

const MEGA_MENU_CATEGORIES = [
  {
    id: 'early-signs',
    label: 'Early Signs & Symptoms',
    description: 'Spot hidden signs before they become problems',
    icon: Activity,
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
  },
  {
    id: 'mental-awareness',
    label: 'Mental Focus & Stress',
    description: 'Manage burnout, dopamine, and brain health',
    icon: Brain,
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
  },
  {
    id: 'personalized-medicine',
    label: 'Personalized DNA Medicine',
    description: 'Your genes, your health blueprint',
    icon: Dna,
    color: 'text-sky-500',
    bg: 'bg-sky-50 dark:bg-sky-950/30',
  },
  {
    id: 'preventive-health',
    label: 'Longevity & Prevention',
    description: 'Science-backed strategies to live longer',
    icon: Shield,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    id: 'immune-support',
    label: 'Immunity & Gut Health',
    description: 'Your gut microbiome and immune system',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    id: 'fitness-metabolic',
    label: 'Fitness & Metabolism',
    description: 'Zone 2, VO2 Max, and metabolic health',
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
  {
    id: 'wellness-somatics',
    label: 'Somatics & Body Wellness',
    description: 'Cold therapy, light, breath, and heat',
    icon: Waves,
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
  },
  {
    id: 'clinical-testing',
    label: 'Lab Tests & Diagnostics',
    description: 'Interpret every blood marker and panel',
    icon: FlaskConical,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    id: 'nutrition-supplements',
    label: 'Nutrition & Supplements',
    description: 'Evidence-based supplements and nutrition',
    icon: Pill,
    color: 'text-lime-500',
    bg: 'bg-lime-50 dark:bg-lime-950/30',
  },
  {
    id: 'sleep-recovery',
    label: 'Sleep & Recovery',
    description: 'Circadian biology and restorative sleep',
    icon: MoonIcon,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
  },
  {
    id: 'hormones-metabolism',
    label: 'Hormones & Metabolism',
    description: 'Thyroid, cortisol, insulin, and testosterone',
    icon: Gauge,
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-950/30',
  },
];

export default function Header({ showBackButton = false }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileResearchOpen, setMobileResearchOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemTheme)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  const handleMenuMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMenuMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setMegaMenuOpen(false), 150);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-6">

          {/* Left: Logo */}
          <div className="flex items-center gap-3 shrink-0">
            {showBackButton && (
              <Link
                href="/"
                className="p-2 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all border border-border/40 flex items-center justify-center"
                title="Back to Database"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            )}
            <Link href="/" className="flex items-center gap-3 group">
              {/* Logo uses SVG for transparent background */}
              <div className="relative w-9 h-9 flex items-center justify-center">
                <Image
                  src="/images/logo.svg"
                  alt="Peak State Journal Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <p className="font-sans font-bold text-base md:text-lg tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                  Peak State Journal
                </p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold leading-none">
                  Longevity & Performance
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              Home
            </Link>

            <div className="relative" onMouseEnter={handleMenuMouseEnter} onMouseLeave={handleMenuMouseLeave}>
              <button
                ref={triggerRef}
                onClick={() => setMegaMenuOpen(v => !v)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  megaMenuOpen
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
              >
                Research Topics
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>
            </div>

            <Link
              href="/?sort=latest"
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              Latest
            </Link>
          </nav>

          {/* Right: Theme + Mobile */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all cursor-pointer border border-border/40"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              className="md:hidden p-2 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all cursor-pointer border border-border/40"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* MEGA MENU */}
        {megaMenuOpen && (
          <div
            ref={megaMenuRef}
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
            className="absolute left-0 right-0 top-full z-40 border-t border-border/40 bg-background/97 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-bold text-base text-foreground">Research Topics</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Browse all 11 clinical research categories</p>
                </div>
                <Link
                  href="/"
                  onClick={() => setMegaMenuOpen(false)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  Browse All Articles
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {MEGA_MENU_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.id}
                      href={`/?category=${cat.id}`}
                      onClick={() => setMegaMenuOpen(false)}
                      className="group flex items-start gap-3 p-3 rounded-xl border border-border/30 hover:border-primary/30 hover:shadow-md bg-card hover:bg-muted/20 transition-all duration-200"
                    >
                      <div className={`p-2 rounded-lg ${cat.bg} shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${cat.color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                          {cat.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}

                <Link
                  href="/"
                  onClick={() => setMegaMenuOpen(false)}
                  className="group flex flex-col justify-between p-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all duration-200"
                >
                  <div>
                    <p className="text-xs font-bold text-primary leading-tight">View Full Database</p>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                      Search and filter all 102 peer-reviewed articles by category, date, or keyword.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-primary group-hover:underline">
                    Go to Database <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>

              <div className="border-t border-border/30 mt-6 pt-4 flex flex-wrap gap-4 text-[10px] text-muted-foreground">
                <span>102 Peer-Reviewed Articles</span>
                <span>·</span>
                <span>11 Research Categories</span>
                <span>·</span>
                <span>Academic Citations Included</span>
                <span>·</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold">Always consult a medical professional</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-lg overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-6 py-6 space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl border border-border/40 bg-card text-sm font-semibold text-foreground hover:text-primary hover:border-primary/30 transition-all"
            >
              Home — All Articles
            </Link>

            <div className="border border-border/40 rounded-xl bg-card overflow-hidden">
              <button
                onClick={() => setMobileResearchOpen(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted/20 transition-all cursor-pointer"
              >
                Research Topics
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${mobileResearchOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileResearchOpen && (
                <div className="border-t border-border/30 divide-y divide-border/20">
                  {MEGA_MENU_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.id}
                        href={`/?category=${cat.id}`}
                        onClick={() => { setMobileMenuOpen(false); setMobileResearchOpen(false); }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-all"
                      >
                        <div className={`p-1.5 rounded-lg ${cat.bg} shrink-0`}>
                          <Icon className={`w-3.5 h-3.5 ${cat.color}`} />
                        </div>
                        <span className="text-xs font-semibold text-foreground hover:text-primary transition-colors">
                          {cat.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <p className="text-[10px] text-muted-foreground text-center px-2 leading-relaxed">
              Educational content only. Always consult a qualified medical professional for health concerns.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

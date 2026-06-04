'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Activity, Brain, Dna, Shield, Zap, Flame } from 'lucide-react';

const STATS = [
  { value: '102', label: 'Research Articles' },
  { value: '11', label: 'Health Categories' },
  { value: '400+', label: 'Academic Citations' },
  { value: '100%', label: 'Evidence-Based' },
];

const FLOATING_ICONS = [
  { Icon: Activity, color: 'text-rose-400', delay: '0s', x: '8%', y: '20%' },
  { Icon: Brain, color: 'text-violet-400', delay: '0.4s', x: '88%', y: '15%' },
  { Icon: Dna, color: 'text-sky-400', delay: '0.8s', x: '6%', y: '70%' },
  { Icon: Shield, color: 'text-emerald-400', delay: '1.2s', x: '90%', y: '65%' },
  { Icon: Zap, color: 'text-amber-400', delay: '0.2s', x: '75%', y: '35%' },
  { Icon: Flame, color: 'text-orange-400', delay: '1.0s', x: '18%', y: '80%' },
];

export default function HeroBanner() {
  const [visible, setVisible] = useState(false);
  const [countDone, setCountDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animation
    const t = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setCountDone(true), 1200);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.12_0.03_220)] via-[oklch(0.16_0.04_230)] to-[oklch(0.20_0.05_240)] dark:from-[oklch(0.10_0.03_220)] dark:via-[oklch(0.14_0.04_230)] dark:to-[oklch(0.18_0.05_240)] min-h-[540px] flex items-center"
      aria-label="Peak State Journal — Clinical Longevity Research"
    >
      {/* Background Image with elegant blend overlays */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/images/hero-banner.png"
          alt="Clinical DNA & Longevity Graphic"
          fill
          priority
          className="object-cover opacity-45 dark:opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.03_220)] via-[oklch(0.12_0.03_220)]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.03_220)] via-[oklch(0.12_0.03_220)]/40 to-transparent" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute rounded-full opacity-20 animate-pulse"
          style={{
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, oklch(0.65 0.15 200), transparent)',
            top: '-200px', left: '-100px',
            animationDuration: '6s',
          }}
        />
        <div
          className="absolute rounded-full opacity-15 animate-pulse"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, oklch(0.55 0.12 260), transparent)',
            bottom: '-150px', right: '-80px',
            animationDuration: '8s',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, oklch(0.70 0.10 160), transparent)',
            top: '40%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)"/>
        </svg>

        {/* Floating icons */}
        {FLOATING_ICONS.map(({ Icon, color, delay, x, y }, i) => (
          <div
            key={i}
            className={`absolute opacity-20 ${color}`}
            style={{
              left: x, top: y,
              animation: `heroFloat 4s ease-in-out infinite`,
              animationDelay: delay,
            }}
          >
            <Icon className="w-6 h-6" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
              Clinical Evidence-Based Research
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-6 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Science of
            <span className="block bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Peak Health
            </span>
            <span className="text-white/50 text-3xl md:text-4xl lg:text-5xl font-light">
              & Longevity
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mb-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Peer-reviewed insights for high-performance professionals. Covering longevity,
            preventive medicine, nutrigenomics, and executive health — without the noise.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-14 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <Link
              href="#database"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[oklch(0.15_0.04_230)] font-bold text-sm hover:bg-sky-50 transition-all shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5"
            >
              Browse Research Database
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/?sort=latest"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold text-sm hover:bg-white/10 hover:border-white/30 transition-all hover:-translate-y-0.5"
            >
              Latest Articles
            </Link>
          </div>

          {/* Stats row */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur-sm hover:bg-white/8 transition-all"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p className={`text-2xl font-extrabold text-white transition-all duration-1000 ${countDone ? 'opacity-100' : 'opacity-60'}`}>
                  {stat.value}
                </p>
                <p className="text-[11px] text-white/50 font-medium mt-0.5 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative right side — research topics preview */}
        <div
          className={`hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-3 transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
        >
          {[
            { label: 'Lab Tests & Diagnostics', color: 'from-blue-500/20 to-sky-500/10 border-blue-500/20' },
            { label: 'Longevity & Prevention', color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/20' },
            { label: 'Hormones & Metabolism', color: 'from-pink-500/20 to-rose-500/10 border-pink-500/20' },
            { label: 'Sleep & Recovery', color: 'from-indigo-500/20 to-violet-500/10 border-indigo-500/20' },
            { label: 'Fitness & Metabolism', color: 'from-orange-500/20 to-amber-500/10 border-orange-500/20' },
          ].map((topic, i) => (
            <div
              key={topic.label}
              className={`px-4 py-2 rounded-lg bg-gradient-to-r ${topic.color} border backdrop-blur-sm`}
              style={{ animationDelay: `${0.7 + i * 0.1}s` }}
            >
              <p className="text-xs font-semibold text-white/70">{topic.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <style jsx>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(5deg); }
        }
      `}</style>
    </section>
  );
}

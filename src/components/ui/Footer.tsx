'use client';

import React from 'react';
import { HitCounter } from '@/components/sidequests/HitCounter';
import { Sparkles, Heart, ExternalLink, Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[#a34063]/20 bg-[#fff8f1]/90 dark:bg-[#0c1021]/90 py-12 px-4 backdrop-blur z-10 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Hit Counter Odometer (+1 pt) */}
        <HitCounter />

        <div className="flex items-center gap-2 font-serif font-bold text-xl text-[#a34063]">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <span>haX.baby · Baby&apos;s First Website</span>
        </div>

        <p className="max-w-md text-xs sm:text-sm text-[#5c4033]/80 dark:text-zinc-400 leading-relaxed">
          Crafted with love, Three.js 3D WebGL, Web Audio API synthesis, and early-web whimsical soul for the 48-hour online hackathon (17–19 October 2026).
        </p>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#a34063]">
          <a
            href="https://hax.baby/first-website"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline font-bold"
          >
            <span>Hackathon Hub</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <span>•</span>

          <a
            href="https://unstop.com/p/babys-first-website-hackathon-hax-baby-1758510"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline font-bold"
          >
            <span>Unstop Listing</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <span>•</span>

          <span className="flex items-center gap-1 font-semibold text-[#5c4033]/70 dark:text-zinc-400">
            <Terminal className="h-3 w-3" />
            <span>Track 2: 100% Original Character</span>
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
          <span>Built for the dreamers with</span>
          <Heart className="h-3 w-3 text-rose-500 fill-rose-500 inline" />
          <span>© 2026 haX.baby</span>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React from 'react';
import { sound } from '@/lib/audio';
import { Sparkles, ArrowDown, BookOpen, Compass } from 'lucide-react';

interface HeroSectionProps {
  onOpenCharacterSheet: () => void;
}

export function HeroSection({ onOpenCharacterSheet }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-between pt-12 pb-8 px-4 text-center z-10 pointer-events-none">
      {/* Top Tagline Pill */}
      <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#a34063]/25 bg-[#fffdfa]/90 dark:bg-[#13192f]/90 px-4 py-1.5 shadow-sm backdrop-blur">
        <Sparkles className="h-4 w-4 text-amber-500 animate-spin" style={{ animationDuration: '5s' }} />
        <span className="text-xs font-mono font-bold tracking-wider text-[#a34063] uppercase">
          Baby&apos;s First Portfolio · Track 2 haX.baby
        </span>
      </div>

      {/* Main Title & Bio Card */}
      <div className="mt-8 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-[#5c4033] dark:text-[#ffccd8] drop-shadow-sm">
          Meet <span className="text-[#a34063]">Lumi</span>
        </h1>
        <p className="mt-2 text-lg sm:text-2xl font-serif italic text-[#a34063] font-semibold">
          “I spin the starlight you curl up inside.”
        </p>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-[#5c4033]/85 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
          A gentle celestial cloud starling who catches wandering nightmares, spins stardust into cozy sleep blankets, and delivers dreams across neighborhood rooftops.
        </p>

        {/* 3D Interaction Hint */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-100/80 dark:bg-amber-950/40 border border-amber-300/60 px-3.5 py-1.5 text-xs text-amber-800 dark:text-amber-300 font-mono shadow-2xs">
          <span>✨ Move cursor or drag to interact with Lumi in 3D ✨</span>
        </div>

        {/* Action Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <a
            href="#projects"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 rounded-xl bg-[#a34063] hover:bg-[#8f3353] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-95"
          >
            <Compass className="h-4 w-4" />
            <span>Explore 3D Inventions</span>
          </a>

          <button
            onClick={() => {
              sound.playClick();
              onOpenCharacterSheet();
            }}
            className="flex items-center gap-2 rounded-xl border-2 border-[#a34063]/30 bg-white/90 dark:bg-[#1a233f]/90 hover:bg-[#ffccd8]/30 px-5 py-2.5 text-xs sm:text-sm font-bold text-[#a34063] dark:text-[#ffccd8] shadow-sm transition-all active:scale-95"
          >
            <BookOpen className="h-4 w-4" />
            <span>5-Point Character Sheet</span>
          </button>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="pointer-events-auto mt-8 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[11px] font-mono font-semibold tracking-wider text-[#a34063] uppercase">
          Scroll to Fly Through the Starfield
        </span>
        <ArrowDown className="h-4 w-4 text-[#a34063]" />
      </div>
    </section>
  );
}

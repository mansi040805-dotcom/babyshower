'use client';

import React, { useState, useEffect } from 'react';
import { sound } from '@/lib/audio';
import { Volume2, VolumeX, Moon, Sun, Sparkles, BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenCharacterSheet: () => void;
}

export function Navbar({ onOpenCharacterSheet }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
    const unsubscribe = sound.subscribeMute(m => setIsMuted(m));
    return unsubscribe;
  }, []);

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  const handleToggleTheme = () => {
    sound.playClick();
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#a34063]/15 bg-[#fff8f1]/85 dark:bg-[#0c1021]/85 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-serif font-bold text-lg text-[#a34063]">
            <Sparkles className="h-4 w-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Lumi</span>
          </div>
          <span className="hidden sm:inline-block rounded-full bg-[#a34063]/10 border border-[#a34063]/20 px-2.5 py-0.5 text-[11px] font-mono font-medium text-[#a34063] dark:text-[#ffccd8]">
            Star-Weaver Baby
          </span>
        </div>

        {/* Live Status Ticker */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-[#a34063]/15 bg-white/70 dark:bg-[#13192f]/70 px-3 py-1 text-xs text-[#5c4033] dark:text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px]">Status: Weaving starlight dreams for sleepy souls</span>
        </div>

        {/* Nav Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Track 2 Character Sheet Modal Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCharacterSheet();
            }}
            className="flex items-center gap-1.5 rounded-full border border-[#a34063]/25 bg-white/80 dark:bg-[#1a233f]/80 px-3 py-1.5 text-xs font-semibold text-[#a34063] dark:text-[#ffccd8] hover:bg-[#a34063]/10 transition-all active:scale-95 shadow-2xs"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Character Sheet</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            aria-label={isDark ? "Switch to Day Nursery" : "Switch to Midnight Starlight"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#a34063]/20 bg-white/80 dark:bg-[#1a233f]/80 text-[#5c4033] dark:text-amber-400 hover:bg-[#a34063]/10 transition-all active:scale-90"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4 text-[#a34063]" />}
          </button>

          {/* Accessible Audio Toggle (+3 pts side quest) */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? "Unmute lullabies" : "Mute lullabies"}
            className="flex items-center gap-1.5 rounded-full border border-[#a34063]/25 bg-[#a34063] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#8f3353] transition-all active:scale-95 shadow-sm"
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            <span className="text-[11px] font-mono">{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

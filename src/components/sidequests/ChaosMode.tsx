'use client';

import React, { useState } from 'react';
import { sound } from '@/lib/audio';
import { Sparkles, Zap, Flame } from 'lucide-react';

export function ChaosMode() {
  const [isActive, setIsActive] = useState(false);

  const toggleChaos = () => {
    const next = !isActive;
    setIsActive(next);
    if (next) {
      sound.playChord([440, 554.37, 659.25, 880]); // Retro celebratory chord
    } else {
      sound.playClick();
    }
  };

  return (
    <>
      {/* Chaos Mode Sticky Trigger Button */}
      <button
        onClick={toggleChaos}
        className={`fixed top-20 right-4 z-40 flex items-center gap-2 rounded-full border-2 px-3.5 py-1.5 text-xs font-mono font-bold shadow-md transition-all active:scale-95 ${
          isActive
            ? 'border-amber-400 bg-amber-300 text-black animate-bounce shadow-amber-300/50'
            : 'border-[#a34063]/30 bg-[#fff8f1]/90 text-[#a34063] hover:bg-[#ffccd8]/40 dark:bg-[#13192f]/90 dark:text-[#ffccd8]'
        }`}
        title="Toggle Retro 90s Chaos Mode (+5 pts)"
      >
        <Zap className={`h-3.5 w-3.5 ${isActive ? 'text-rose-600 fill-rose-600' : 'text-amber-500'}`} />
        <span>{isActive ? 'Chaos: ACTIVE!' : 'Retro Chaos (+5pts)'}</span>
      </button>

      {/* Floating Retro 90s Elements when Chaos is Active */}
      {isActive && (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none">
          {/* Top Marquee Banner */}
          <div className="pointer-events-auto fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 text-black font-mono text-xs font-extrabold py-1 shadow-md border-b-2 border-black flex items-center justify-around overflow-hidden whitespace-nowrap animate-pulse">
            <span className="flex items-center gap-2">
              ⭐ WELCOME TO LUMI&apos;S RETRO CELESTIAL REALM ⭐ BEST VIEWED AT 800x600 ⭐ POWERED BY STARDUST ⭐ HAX.BABY CERTIFIED CUTE ⭐
            </span>
          </div>

          {/* Floating Retro Stickers */}
          <div className="absolute top-28 left-6 pointer-events-auto animate-pulse">
            <div className="bg-yellow-200 border-2 border-black p-2 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[11px] font-mono font-bold text-black rotate-[-6deg]">
              🚧 UNDER COZY CONSTRUCTION 🚧
            </div>
          </div>

          <div className="absolute top-44 right-8 pointer-events-auto">
            <div className="bg-pink-300 border-2 border-black p-2 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[11px] font-mono font-bold text-black rotate-[8deg] animate-bounce">
              🍼 100% ORGANIC CELESTIAL STARDUST ✨
            </div>
          </div>

          <div className="absolute bottom-28 left-8 pointer-events-auto">
            <div className="bg-cyan-200 border-2 border-black px-3 py-1.5 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[11px] font-mono font-bold text-black rotate-[4deg]">
              <span className="flex items-center gap-1">
                <Flame className="h-3 w-3 text-red-500 fill-red-500" />
                HOT DREAMS ON TAP!
              </span>
            </div>
          </div>

          <div className="absolute bottom-16 right-20 pointer-events-auto hidden sm:block">
            <div className="bg-emerald-200 border-2 border-black p-2 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[11px] font-mono font-bold text-black rotate-[-4deg]">
              ⭐ NETSCAPE 4.0 COMPATIBLE ⭐
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { getHitCount } from '@/lib/storage';
import { Sparkles } from 'lucide-react';

export function HitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(getHitCount());
  }, []);

  const formattedDigits = count !== null ? String(count).padStart(6, '0').split('') : ['0','0','1','8','4','3'];

  return (
    <div className="inline-flex flex-col items-center gap-2 rounded-2xl border-2 border-[#5c4033]/20 bg-[#fffdfa]/90 dark:bg-[#13192f]/90 dark:border-[#ffccd8]/20 p-4 shadow-sm backdrop-blur transition-all">
      <div className="flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-[#a34063] uppercase">
        <Sparkles className="h-3.5 w-3.5 animate-spin text-amber-500" style={{ animationDuration: '4s' }} />
        <span>Starlight Spun (Odometer)</span>
      </div>

      {/* Retro Drum Roll Digits */}
      <div className="flex items-center gap-1 rounded-lg border border-black/30 bg-black/85 p-1.5 shadow-inner">
        {formattedDigits.map((digit, i) => (
          <div
            key={i}
            className="flex h-9 w-6 items-center justify-center rounded bg-gradient-to-b from-[#222] via-[#111] to-[#222] font-mono text-base font-bold text-amber-400 shadow-sm border-t border-white/20 select-none"
          >
            {digit}
          </div>
        ))}
        <span className="px-1 text-[11px] font-mono font-medium text-zinc-400">m</span>
      </div>

      <p className="text-[11px] text-[#5c4033]/70 dark:text-zinc-400">
        Over 1,800+ dreams woven across the rooftops
      </p>
    </div>
  );
}

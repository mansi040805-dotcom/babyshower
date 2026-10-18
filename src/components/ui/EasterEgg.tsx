'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/audio';
import { Sparkles, Star, X } from 'lucide-react';

export function EasterEgg() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleSecretTrigger = () => {
    const next = clickCount + 1;
    setClickCount(next);

    if (next >= 3) {
      sound.playChord([523.25, 659.25, 783.99, 1046.50]); // High C Major arpeggio
      setIsUnlocked(true);
      setClickCount(0);

      // Launch celestial pastel confetti
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#a34063', '#a855f7', '#fbcfe8', '#fff8f1'],
      });
    } else {
      sound.playChime(784 + next * 80, 0.2);
    }
  };

  return (
    <>
      {/* Hidden Star in the corner to click 3 times */}
      <button
        onClick={handleSecretTrigger}
        aria-label="Secret Starlight Trigger"
        title="Something secret is hidden here..."
        className="fixed bottom-4 left-4 z-40 h-8 w-8 rounded-full border border-amber-300/40 bg-amber-100/60 dark:bg-amber-900/40 flex items-center justify-center text-amber-500 hover:scale-125 transition-all opacity-60 hover:opacity-100 active:scale-95 shadow-xs"
      >
        <Star className="h-4 w-4 fill-amber-400 text-amber-500 animate-pulse" />
      </button>

      {/* Secret Revelation Modal */}
      {isUnlocked && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in zoom-in-95 duration-200"
        >
          <div className="relative w-full max-w-sm rounded-3xl border-2 border-amber-400 bg-[#fffdfa] dark:bg-[#13192f] p-6 shadow-2xl text-center text-[#5c4033] dark:text-zinc-200">
            <button
              onClick={() => {
                sound.playClick();
                setIsUnlocked(false);
              }}
              className="absolute top-4 right-4 h-7 w-7 rounded-full border border-[#a34063]/20 flex items-center justify-center text-[#a34063] hover:bg-[#a34063]/10"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300">
              <Sparkles className="h-7 w-7 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
            </div>

            <span className="mt-4 inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-[#a34063] bg-[#a34063]/10 px-3 py-1 rounded-full">
              ✨ Easter Egg Discovered! ✨
            </span>

            <h3 className="mt-3 font-serif text-xl font-bold text-[#a34063] dark:text-[#ffccd8]">
              Lumi&apos;s Secret Starlight Wish
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-[#5c4033]/85 dark:text-zinc-300">
              “You caught the secret star! Whenever you look up at night and feel sleepy, remember that every constellation is just a blanket woven to keep you warm.”
            </p>

            <button
              onClick={() => {
                sound.playClick();
                setIsUnlocked(false);
              }}
              className="mt-5 w-full rounded-xl bg-[#a34063] hover:bg-[#8f3353] py-2 text-xs font-bold text-white shadow-sm transition-all"
            >
              Sweet Dreams ⭐
            </button>
          </div>
        </div>
      )}
    </>
  );
}

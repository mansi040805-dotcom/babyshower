'use client';

import React from 'react';
import { sound } from '@/lib/audio';
import { X, Sparkles, Heart, Award, Compass, BookOpen } from 'lucide-react';

interface CharacterSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterSheetModal({ isOpen, onClose }: CharacterSheetModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sheet-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-[#a34063]/30 bg-[#fffdfa] dark:bg-[#13192f] p-6 md:p-8 shadow-2xl text-[#5c4033] dark:text-zinc-200">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          aria-label="Close Character Sheet"
          className="absolute top-5 right-5 h-8 w-8 rounded-full border border-[#a34063]/20 flex items-center justify-center text-[#a34063] hover:bg-[#a34063]/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Ribbon */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-[#a34063] uppercase bg-[#a34063]/10 px-3 py-1 rounded-full">
            <Award className="h-3.5 w-3.5" /> Official Track 2 Canon
          </span>
          <span className="text-xs font-mono text-zinc-400">haX.baby Certified</span>
        </div>

        <h2 id="sheet-title" className="text-2xl md:text-3xl font-serif font-bold text-[#a34063]">
          Lumi&apos;s 5-Point Character Sheet
        </h2>
        <p className="mt-1 text-xs text-[#5c4033]/70 dark:text-zinc-400 italic">
          “I spin the starlight you curl up inside.”
        </p>

        {/* The 5 Fields */}
        <div className="mt-6 flex flex-col gap-3.5 text-xs md:text-sm">
          <div className="flex gap-3 items-start bg-[#fff8f1] dark:bg-[#1a233f] p-3 rounded-xl border border-[#a34063]/15">
            <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#a34063] block">1. Name</span>
              <p className="font-semibold text-[#5c4033] dark:text-zinc-100">
                Lumi (The Little Star-Weaver)
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-[#fff8f1] dark:bg-[#1a233f] p-3 rounded-xl border border-[#a34063]/15">
            <Heart className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#a34063] block">2. What They Are (Species &amp; Look)</span>
              <p className="text-[#5c4033]/85 dark:text-zinc-300">
                A celestial cloud starling born from a gentle nebula. Has a smooth pearlescent cloud body, glowing golden star antenna, warm amber eyes, floating mitten hands, and a cozy lavender constellation scarf. Sleepy, giggly, easily delighted by raindrops.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-[#fff8f1] dark:bg-[#1a233f] p-3 rounded-xl border border-[#a34063]/15">
            <Compass className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#a34063] block">3. What They Do (Profession &amp; Craft)</span>
              <p className="text-[#5c4033]/85 dark:text-zinc-300">
                <strong>Apprentice Starlight Weaver at the Cosmic Cradle.</strong> Lumi catches raw stardust, spins it into comforting sleep blankets, and delivers soft bedtime dreams across neighborhood rooftops.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-[#fff8f1] dark:bg-[#1a233f] p-3 rounded-xl border border-[#a34063]/15">
            <BookOpen className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#a34063] block">4. Their Story (Origin &amp; Bedtime Journey)</span>
              <p className="text-[#5c4033]/85 dark:text-zinc-300">
                Drifted down like a dandelion seed into the starry cloud nursery after a laughing supernova. Learned that nightmares are just scared dreams that need a bedside nightlight, and dedicated life to weaving cozy bedtime peace.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-[#fff8f1] dark:bg-[#1a233f] p-3 rounded-xl border border-[#a34063]/15">
            <Sparkles className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#a34063] block">5. Tagline &amp; Motto</span>
              <p className="font-serif italic font-bold text-[#a34063]">
                “I spin the starlight you curl up inside.”
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-[#a34063]/15 text-[11px] text-[#5c4033]/60 dark:text-zinc-400">
          <span>100% Original Character · Track 2 haX.baby</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="font-bold text-[#a34063] hover:underline"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}

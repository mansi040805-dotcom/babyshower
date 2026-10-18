'use client';

import React, { useState } from 'react';
import { sound } from '@/lib/audio';
import { BookOpen, Sparkles, Compass, Moon } from 'lucide-react';

const CHAPTERS = [
  {
    id: 1,
    title: 'The Seed in the Nebula',
    subtitle: 'Where Lumi Began',
    icon: Sparkles,
    badge: 'Chapter 01',
    text: 'When a laughing supernova dusted the cosmic nursery with starlight, Lumi floated down like a golden dandelion seed. Clumsy, sleepy, and bundled in a constellation scarf, Lumi discovered that the universe gets lonely in the dark—and that every little star baby needs someone to sing them to sleep.',
    quote: '“Even the greatest galaxy starts with a single tiny spark.”',
  },
  {
    id: 2,
    title: 'The Art of Weaving Calm',
    subtitle: 'The First Sleep Blanket',
    icon: Moon,
    badge: 'Chapter 02',
    text: 'Lumi gathered discarded meteor tails and spun them through a pocket music box. To Lumi’s delight, the spun starlight didn’t burn—it cooled into the softest lavender fleece imaginable. When nightmares crept through the nursery, Lumi tucked them in. Curiously, nightmares aren’t scary at all; they are simply tired dreams that lost their way.',
    quote: '“A nightmare is just a tired dream waiting for a nightlight.”',
  },
  {
    id: 3,
    title: 'Rooftops of the Quiet World',
    subtitle: 'The Nightly Delivery',
    icon: Compass,
    badge: 'Chapter 03',
    text: 'Every evening at twilight, Lumi straps on the starlight incubator lantern and floats above slumbering chimneys. Tucking sleepy owls into oak trees, gifting sweet dreams to curled-up kittens, and making sure no bedroom ceiling is left without a constellation to watch over it.',
    quote: '“Close your eyes. The stars have already finished your blanket.”',
  },
];

export function StorySection() {
  const [activeChapter, setActiveChapter] = useState(0);

  const current = CHAPTERS[activeChapter];
  const Icon = current.icon;

  return (
    <section id="story" className="relative my-20 wrap max-w-4xl mx-auto px-4 z-10">
      <div className="rounded-3xl border-2 border-[#a34063]/20 bg-[#fffdfa]/95 dark:bg-[#13192f]/95 dark:border-[#a34063]/30 p-6 md:p-10 shadow-xl backdrop-blur">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-[#a34063] uppercase bg-[#a34063]/10 px-3 py-1 rounded-full">
            <BookOpen className="h-3.5 w-3.5" /> What Lumi&apos;s Story Is · Bedtime Journey
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-[#5c4033] dark:text-[#ffccd8]">
            The Journey of the Star-Weaver
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#5c4033]/70 dark:text-zinc-400">
            A cozy bedtime tale in three illustrated chapters. Flip through to discover how Lumi came to weave the night.
          </p>
        </div>

        {/* Chapter Stepper */}
        <div className="mt-8 flex justify-center gap-2">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                sound.playChime(523.25 + idx * 80, 0.4);
                setActiveChapter(idx);
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-bold transition-all ${
                activeChapter === idx
                  ? 'bg-[#a34063] text-white shadow-sm scale-105'
                  : 'bg-[#fff8f1] dark:bg-[#0c1021] text-[#a34063] hover:bg-[#a34063]/10 border border-[#a34063]/20'
              }`}
            >
              <span>{ch.badge}</span>
            </button>
          ))}
        </div>

        {/* Active Chapter Card */}
        <div className="mt-8 rounded-2xl bg-[#fff8f1]/90 dark:bg-[#0c1021]/80 p-6 md:p-8 border border-[#a34063]/15 transition-all">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 text-amber-600">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#a34063] font-bold uppercase">{current.badge} · {current.subtitle}</span>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#5c4033] dark:text-zinc-100">
                {current.title}
              </h3>
            </div>
          </div>

          <p className="mt-5 text-sm md:text-base leading-relaxed text-[#5c4033]/90 dark:text-zinc-300">
            {current.text}
          </p>

          <div className="mt-6 border-t border-[#a34063]/15 pt-4">
            <p className="font-serif italic text-xs md:text-sm text-[#a34063] dark:text-[#ffccd8] font-semibold">
              {current.quote}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between items-center text-xs font-mono">
          <button
            onClick={() => {
              if (activeChapter > 0) {
                sound.playClick();
                setActiveChapter(activeChapter - 1);
              }
            }}
            disabled={activeChapter === 0}
            className="text-[#a34063] disabled:opacity-30 hover:underline font-bold"
          >
            ← Previous Chapter
          </button>

          <span className="text-zinc-400">Chapter {activeChapter + 1} of 3</span>

          <button
            onClick={() => {
              if (activeChapter < CHAPTERS.length - 1) {
                sound.playClick();
                setActiveChapter(activeChapter + 1);
              }
            }}
            disabled={activeChapter === CHAPTERS.length - 1}
            className="text-[#a34063] disabled:opacity-30 hover:underline font-bold"
          >
            Next Chapter →
          </button>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { getGuestbookWishes, saveGuestbookWish, DreamWish } from '@/lib/storage';
import { sound } from '@/lib/audio';
import { Heart, Send, Sparkles } from 'lucide-react';

const STICKERS = ['⭐', '🌙', '☁️', '🍼', '🧸', '🍰'];

export function Guestbook() {
  const [wishes, setWishes] = useState<DreamWish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('⭐');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setWishes(getGuestbookWishes());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    sound.playChord([587.33, 739.99, 880.00]); // D5, F#5, A5 warm chord

    const newWish = saveGuestbookWish(name, message, selectedSticker);
    setWishes([newWish, ...wishes]);
    setMessage('');
    setName('');
    setIsSubmitting(false);
  };

  return (
    <section id="guestbook" className="relative my-16 wrap max-w-4xl mx-auto px-4">
      <div className="rounded-3xl border-2 border-[#a34063]/20 bg-[#fffdfa]/95 dark:bg-[#13192f]/95 dark:border-[#a34063]/30 p-6 md:p-10 shadow-lg backdrop-blur">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#a34063]/15 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-[#a34063] uppercase bg-[#a34063]/10 px-3 py-1 rounded-full">
              <Sparkles className="h-3.5 w-3.5" /> Early-Web Guestbook (+2 pts)
            </span>
            <h3 className="mt-2 text-2xl md:text-3xl font-serif font-bold text-[#5c4033] dark:text-[#ffccd8]">
              Leave a Dream Wish for Lumi
            </h3>
            <p className="mt-1 text-sm text-[#5c4033]/70 dark:text-zinc-400">
              Pin your bedtime wish to the nursery wall. Every note is remembered!
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#a34063] bg-[#fff8f1] dark:bg-black/30 border border-[#a34063]/20 px-3 py-1.5 rounded-full">
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>{wishes.length} wishes pinned</span>
          </div>
        </div>

        {/* Wish Submission Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 bg-[#fff8f1]/80 dark:bg-[#0c1021]/60 p-5 rounded-2xl border border-[#a34063]/15">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Your Name / Stargazer Alias"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={40}
              className="flex-1 rounded-xl border border-[#a34063]/25 bg-white dark:bg-[#1a233f] px-3.5 py-2 text-sm text-[#5c4033] dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#a34063]"
            />
            {/* Sticker Picker */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-[#1a233f] p-1 rounded-xl border border-[#a34063]/25">
              <span className="text-[11px] font-mono text-zinc-400 px-1">Stamp:</span>
              {STICKERS.map(s => (
                <button
                  type="button"
                  key={s}
                  onClick={() => {
                    setSelectedSticker(s);
                    sound.playClick();
                  }}
                  className={`h-7 w-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                    selectedSticker === s ? 'bg-[#a34063] text-white scale-110 shadow-sm' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="Write a sweet bedtime wish or dream request for Lumi..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              maxLength={140}
              className="flex-1 rounded-xl border border-[#a34063]/25 bg-white dark:bg-[#1a233f] px-3.5 py-2 text-sm text-[#5c4033] dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#a34063]"
            />
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#a34063] hover:bg-[#8f3353] active:scale-95 disabled:opacity-50 text-white font-semibold text-sm px-5 py-2 transition-all shadow-sm"
            >
              <Send className="h-4 w-4" />
              <span>Pin Wish</span>
            </button>
          </div>
        </form>

        {/* Corkboard / Wish Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {wishes.map((w, idx) => {
            // Slight vintage tilt angles: -2deg, 1deg, -1deg, 2deg
            const rotations = ['rotate-[-1.5deg]', 'rotate-[1deg]', 'rotate-[-2deg]', 'rotate-[1.5deg]'];
            const rot = rotations[idx % rotations.length];
            return (
              <div
                key={w.id}
                className={`relative rounded-2xl border border-[#a34063]/20 bg-[#fff9ee] dark:bg-[#1a233f] p-4 shadow-sm hover:shadow-md transition-transform hover:scale-102 hover:rotate-0 ${rot}`}
              >
                {/* Vintage Tape / Pin Top */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-3 bg-amber-200/80 dark:bg-amber-900/60 rounded-sm border border-amber-300/60 shadow-xs" />
                
                <div className="flex items-center justify-between mt-1 text-xs text-[#a34063] font-mono">
                  <span className="font-bold flex items-center gap-1">
                    <span>{w.sticker}</span>
                    <span className="truncate max-w-[130px]">{w.name}</span>
                  </span>
                  <span className="text-[10px] text-zinc-400">{w.timestamp}</span>
                </div>
                
                <p className="mt-2.5 text-xs text-[#5c4033] dark:text-zinc-300 font-sans leading-relaxed">
                  “{w.message}”
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

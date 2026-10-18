'use client';

import React, { useState } from 'react';
import { sound } from '@/lib/audio';
import { Music, Lightbulb, Box, Play, Sparkles } from 'lucide-react';

const CHIME_KEYS = [
  { note: 'C5', freq: 523.25, label: 'Star C' },
  { note: 'D5', freq: 587.33, label: 'Cloud D' },
  { note: 'E5', freq: 659.25, label: 'Moon E' },
  { note: 'G5', freq: 783.99, label: 'Mist G' },
  { note: 'A5', freq: 880.00, label: 'Dawn A' },
];

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<'music' | 'lantern' | 'blocks'>('music');
  const [lanternWarmth, setLanternWarmth] = useState(80);
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handlePlayKey = (note: string, freq: number) => {
    setActiveKey(note);
    sound.playChime(freq, 0.9);
    setTimeout(() => setActiveKey(null), 250);
  };

  const handlePlayFullLullaby = () => {
    setIsPlayingLullaby(true);
    sound.playLullaby();
    setTimeout(() => setIsPlayingLullaby(false), 3000);
  };

  return (
    <section id="projects" className="relative my-20 wrap max-w-5xl mx-auto px-4 z-10">
      <div className="rounded-3xl border-2 border-[#a34063]/20 bg-[#fffdfa]/95 dark:bg-[#13192f]/95 dark:border-[#a34063]/30 p-6 md:p-10 shadow-xl backdrop-blur">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-[#a34063] uppercase bg-[#a34063]/10 px-3 py-1 rounded-full">
            <Sparkles className="h-3.5 w-3.5" /> What Lumi Does · 3 Showcase Projects
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-[#5c4033] dark:text-[#ffccd8]">
            The Starlight Workshop
          </h2>
          <p className="mt-2 text-sm text-[#5c4033]/70 dark:text-zinc-400">
            Lumi crafts bedtime inventions to help sleepy creatures drift off to sleep. Play with the live interactive prototypes below!
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-2xl border border-[#a34063]/20 bg-[#fff8f1] dark:bg-[#0c1021] p-1.5 gap-1.5 shadow-inner">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('music');
              }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'music'
                  ? 'bg-[#a34063] text-white shadow-sm'
                  : 'text-[#5c4033] dark:text-zinc-300 hover:bg-[#a34063]/10'
              }`}
            >
              <Music className="h-4 w-4" />
              <span>1. Celestial Music Box</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('lantern');
              }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'lantern'
                  ? 'bg-[#a34063] text-white shadow-sm'
                  : 'text-[#5c4033] dark:text-zinc-300 hover:bg-[#a34063]/10'
              }`}
            >
              <Lightbulb className="h-4 w-4" />
              <span>2. Starlight Lanterns</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('blocks');
              }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'blocks'
                  ? 'bg-[#a34063] text-white shadow-sm'
                  : 'text-[#5c4033] dark:text-zinc-300 hover:bg-[#a34063]/10'
              }`}
            >
              <Box className="h-4 w-4" />
              <span>3. Meteor Blocks</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Celestial Music Box */}
        {activeTab === 'music' && (
          <div className="mt-8 bg-[#fff8f1]/90 dark:bg-[#0c1021]/80 rounded-2xl p-6 md:p-8 border border-[#a34063]/15">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#a34063] font-bold uppercase tracking-wider">
                  Tier 2 Standout · Web Audio Synthesizer
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#5c4033] dark:text-zinc-100 mt-1">
                  The Celestial Lullaby Synthesizer
                </h3>
                <p className="text-xs sm:text-sm text-[#5c4033]/70 dark:text-zinc-400 mt-1 max-w-xl">
                  Tap the glowing star keys to compose your own bedtime chimes, or let Lumi play the soothing twilight sequence.
                </p>
              </div>

              <button
                onClick={handlePlayFullLullaby}
                disabled={isPlayingLullaby}
                className="flex items-center gap-2 rounded-xl bg-[#a34063] hover:bg-[#8f3353] disabled:opacity-50 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 shadow-sm transition-all active:scale-95 shrink-0"
              >
                <Play className={`h-4 w-4 ${isPlayingLullaby ? 'animate-spin' : ''}`} />
                <span>{isPlayingLullaby ? 'Playing Lullaby...' : 'Play Bedtime Melody'}</span>
              </button>
            </div>

            {/* Playable Star Keys */}
            <div className="mt-8 grid grid-cols-5 gap-2 sm:gap-4">
              {CHIME_KEYS.map(k => {
                const isHit = activeKey === k.note;
                return (
                  <button
                    key={k.note}
                    onClick={() => handlePlayKey(k.note, k.freq)}
                    className={`flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl border-2 transition-all active:scale-90 ${
                      isHit
                        ? 'border-amber-400 bg-amber-200 text-black shadow-lg scale-105'
                        : 'border-[#a34063]/20 bg-white dark:bg-[#1a233f] text-[#5c4033] dark:text-zinc-200 hover:border-[#a34063]/50 hover:bg-[#fff9ee]'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold text-[#a34063]">{k.note}</span>
                    <span className="mt-1 text-lg sm:text-2xl">✨</span>
                    <span className="mt-1 text-[10px] sm:text-xs text-zinc-400 font-mono hidden xs:inline">{k.label}</span>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-center text-[11px] font-mono text-zinc-400">
              🎵 Tuned in pentatonic harmony — no wrong notes can be played!
            </p>
          </div>
        )}

        {/* Tab 2: Starlight Lanterns */}
        {activeTab === 'lantern' && (
          <div className="mt-8 bg-[#fff8f1]/90 dark:bg-[#0c1021]/80 rounded-2xl p-6 md:p-8 border border-[#a34063]/15">
            <div className="max-w-xl">
              <span className="text-xs font-mono text-[#a34063] font-bold uppercase tracking-wider">
                Showcase Project 2 · Dynamic Nightlight Illumination
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#5c4033] dark:text-zinc-100 mt-1">
                The Starlight Incubator Lantern
              </h3>
              <p className="text-xs sm:text-sm text-[#5c4033]/70 dark:text-zinc-400 mt-1">
                A bedside porcelain and brass lantern storing living stellar embers. Drag the slider to adjust stardust warmth.
              </p>
            </div>

            {/* Live Glow Preview & Warmth Slider */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-[#1a233f] p-5 rounded-2xl border border-[#a34063]/15">
              <div
                className="h-20 w-20 rounded-full flex items-center justify-center border-2 border-amber-300 transition-all shrink-0"
                style={{
                  backgroundColor: `rgba(251, 191, 36, ${lanternWarmth / 100})`,
                  boxShadow: `0 0 ${lanternWarmth * 0.4}px rgba(251, 191, 36, 0.8)`,
                }}
              >
                <Lightbulb className="h-8 w-8 text-white drop-shadow-md" />
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between text-xs font-mono font-bold text-[#a34063]">
                  <span>Stardust Warmth</span>
                  <span>{lanternWarmth}% Glow</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={lanternWarmth}
                  onChange={e => {
                    setLanternWarmth(Number(e.target.value));
                    sound.playClick();
                  }}
                  className="w-full mt-2 accent-[#a34063] cursor-pointer"
                />
                <p className="mt-1 text-[11px] text-zinc-400">
                  {lanternWarmth > 75
                    ? '✨ Cozy Amber: Perfect for deep bedtime sleep.'
                    : lanternWarmth > 40
                    ? '🌙 Moonlit Lavender: For reading quiet storybooks.'
                    : '☁️ Soft Twilight: Just enough light to chase shadows away.'}
                </p>
              </div>
            </div>

            {/* Lantern Types */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-[#a34063]/15 bg-white/70 dark:bg-[#1a233f]/70">
                <span className="text-base">🌙</span>
                <h4 className="font-serif font-bold text-sm text-[#5c4033] dark:text-zinc-200 mt-1">Crescent Cradle</h4>
                <p className="text-[11px] text-[#5c4033]/70 dark:text-zinc-400 mt-0.5">Gentle concave reflector shaped like a resting moon.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-[#a34063]/15 bg-white/70 dark:bg-[#1a233f]/70">
                <span className="text-base">✨</span>
                <h4 className="font-serif font-bold text-sm text-[#5c4033] dark:text-zinc-200 mt-1">Stardust Thimble</h4>
                <p className="text-[11px] text-[#5c4033]/70 dark:text-zinc-400 mt-0.5">Pocket-sized lantern for small creatures under floorboards.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-[#a34063]/15 bg-white/70 dark:bg-[#1a233f]/70">
                <span className="text-base">⭐</span>
                <h4 className="font-serif font-bold text-sm text-[#5c4033] dark:text-zinc-200 mt-1">Constellation Globe</h4>
                <p className="text-[11px] text-[#5c4033]/70 dark:text-zinc-400 mt-0.5">Projects real bedtime star patterns onto bedroom ceilings.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Meteor Blocks */}
        {activeTab === 'blocks' && (
          <div className="mt-8 bg-[#fff8f1]/90 dark:bg-[#0c1021]/80 rounded-2xl p-6 md:p-8 border border-[#a34063]/15">
            <div className="max-w-xl">
              <span className="text-xs font-mono text-[#a34063] font-bold uppercase tracking-wider">
                Showcase Project 3 · Playable 3D Toys
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#5c4033] dark:text-zinc-100 mt-1">
                The Meteor Cradle Block Sandbox
              </h3>
              <p className="text-xs sm:text-sm text-[#5c4033]/70 dark:text-zinc-400 mt-1">
                Whimsical alphabet building blocks carved from soft fallen meteors. Click each block to rattle and play!
              </p>
            </div>

            {/* Interactive Block Grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { letter: 'H', label: 'Heart', color: 'from-rose-400 to-pink-500', freq: 440 },
                { letter: 'A', label: 'Astral', color: 'from-amber-400 to-orange-500', freq: 554.37 },
                { letter: 'X', label: 'Xylophone', color: 'from-purple-400 to-indigo-500', freq: 659.25 },
                { letter: '★', label: 'Stardust', color: 'from-emerald-400 to-teal-500', freq: 880 },
              ].map(block => (
                <button
                  key={block.letter}
                  onClick={() => sound.playChime(block.freq, 0.4)}
                  className={`h-28 rounded-2xl bg-gradient-to-br ${block.color} text-white font-serif text-3xl font-bold flex flex-col items-center justify-center shadow-md hover:scale-105 active:scale-90 transition-transform`}
                >
                  <span>{block.letter}</span>
                  <span className="text-[10px] font-mono tracking-wider opacity-90 uppercase mt-1">{block.label}</span>
                </button>
              ))}
            </div>

            <p className="mt-4 text-center text-[11px] font-mono text-zinc-400">
              🎲 Click any block to hear its resonant stardust tone!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

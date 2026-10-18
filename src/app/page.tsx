'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/ui/Navbar';
import { HeroSection } from '@/components/ui/HeroSection';
import { ProjectsSection } from '@/components/ui/ProjectsSection';
import { StorySection } from '@/components/ui/StorySection';
import { Guestbook } from '@/components/sidequests/Guestbook';
import { Footer } from '@/components/ui/Footer';
import { SparkleTrail } from '@/components/sidequests/SparkleTrail';
import { ChaosMode } from '@/components/sidequests/ChaosMode';
import { EasterEgg } from '@/components/ui/EasterEgg';
import { CharacterSheetModal } from '@/components/ui/CharacterSheetModal';

// Load ThreeCanvas client-side with no SSR to ensure pristine WebGL context
const ThreeCanvas = dynamic(
  () => import('@/components/canvas/ThreeCanvas').then(mod => mod.ThreeCanvas),
  { ssr: false }
);

export default function HomePage() {
  const [isCharacterSheetOpen, setIsCharacterSheetOpen] = useState(false);

  return (
    <main className="relative min-h-screen text-[#5c4033] dark:text-zinc-100 overflow-x-hidden">
      {/* 1. 3D Three.js Interactive WebGL Canvas Layer */}
      <ThreeCanvas />

      {/* 2. Side Quest Overlays */}
      <SparkleTrail />
      <ChaosMode />
      <EasterEgg />

      {/* 3. Sticky Navigation Bar */}
      <Navbar onOpenCharacterSheet={() => setIsCharacterSheetOpen(true)} />

      {/* 4. Main Content Sections */}
      <div className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <HeroSection onOpenCharacterSheet={() => setIsCharacterSheetOpen(true)} />

        {/* 3 Showcase Projects */}
        <ProjectsSection />

        {/* Bedtime Story Scroll */}
        <StorySection />

        {/* Live Dream Guestbook */}
        <Guestbook />

        {/* Footer with Hit Counter Odometer */}
        <Footer />
      </div>

      {/* 5. Track 2 Character Sheet Modal */}
      <CharacterSheetModal
        isOpen={isCharacterSheetOpen}
        onClose={() => setIsCharacterSheetOpen(false)}
      />
    </main>
  );
}

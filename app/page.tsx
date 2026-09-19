'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import AboutSummary from '@/components/AboutSummary';
import SelectedWorks from '@/components/SelectedWorks';
import Capabilities from '@/components/Capabilities';
import About from '@/components/About';
import EnterScreen from '@/components/EnterScreen';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="w-full">
      {/* The Enter screen stays mounted until its animation completes */}
      {!hasEntered && <EnterScreen onEnter={() => setHasEntered(true)} />}
      
      {/* Hero Section */}
      <Hero hasEntered={hasEntered} />
      
      {/* --- NEW: Personal Summary Section --- */}
      <AboutSummary />

      {/* Selected Projects */}
      <SelectedWorks />
      
      {/* Pinned Accordion Capabilities */}
      <Capabilities />
      
      {/* Footer / About Module */}
      <About />
    </main>
  );
}
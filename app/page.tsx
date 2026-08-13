'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import SelectedWorks from '@/components/SelectedWorks';
import About from '@/components/About';
import EnterScreen from '@/components/EnterScreen';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="w-full">
      {/* The Enter screen stays mounted until its animation completes, then it tells this state to flip */}
      {!hasEntered && <EnterScreen onEnter={() => setHasEntered(true)} />}
      
      {/* We pass hasEntered to Hero so it knows when to trigger its entrance animations */}
      <Hero hasEntered={hasEntered} />
      <SelectedWorks />
      <About />
    </main>
  );
}
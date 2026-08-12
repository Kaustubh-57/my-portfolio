'use client';

import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Hero from '@/components/Hero';
import SelectedWorks from '@/components/SelectedWorks';
import About from '@/components/About';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  
  useGSAP(() => {
   ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: ".snap-point", 
        duration: { min: 0.4, max: 0.8 }, 
        delay: 0.05, 
        ease: "power3.inOut" 
      } as any // <-- Add 'as any' right here
    });
  });

  return (
    <main className="w-full">
      <Hero />
      <SelectedWorks />
      <About />
    </main>
  );
}
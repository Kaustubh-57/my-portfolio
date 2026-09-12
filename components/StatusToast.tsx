'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function StatusToast() {
  const toastRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useGSAP(() => {
    // Waits 3.5 seconds to let the Preloader and Hero animations finish first
    gsap.fromTo(
      toastRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 3.5 }
    );
  }, { scope: toastRef });

  const handleClose = () => {
    gsap.to(toastRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setIsVisible(false)
    });
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={toastRef}
      // Fixed to bottom right, z-index high enough to sit above case studies
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[150] w-[calc(100%-48px)] md:w-auto md:max-w-[340px] bg-[#141613] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex flex-col gap-3 font-dm-sans border border-white/10 opacity-0"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2.5">
          {/* Pulsing Status Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7E86B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C7E86B]"></span>
          </span>
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/70">
            Live Deployment
          </span>
        </div>
        <button 
          onClick={handleClose} 
          className="text-white/40 hover:text-white transition-colors p-1 -mt-1 -mr-1"
          aria-label="Close notification"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <p className="text-[14px] leading-relaxed text-white/90 font-light mt-1">
        Welcome! I am currently pushing the final updates to this portfolio tonight. Most case studies are fully accessible, but the final polished experience will be ready by tomorrow.
      </p>
      
      <a 
        href="/resume.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[13px] text-[#C7E86B] hover:text-white transition-colors underline decoration-white/30 underline-offset-4 mt-2 w-fit font-medium"
      >
        View PDF Resume meanwhile
      </a>
    </div>
  );
}
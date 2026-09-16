'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

export default function StatusToast() {
  const toastRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only set to visible if we are on the Home page AND it hasn't been closed this session
    if (pathname === '/' && sessionStorage.getItem('toastClosed') !== 'true') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [pathname]);

  useGSAP(() => {
    if (!isVisible) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    // Set initial hidden state immediately
    gsap.set(toastRef.current, { y: 100, opacity: 0 });

    const playAnimation = () => {
      gsap.to(toastRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    };

    const hasSeenPreloader = typeof window !== 'undefined' && sessionStorage.getItem('hasSeenPreloader') === 'true';

    if (hasSeenPreloader) {
      // If the preloader is already done (e.g. reloading the page), just wait 5 seconds
      timeoutId = setTimeout(playAnimation, 7000);
    } else {
      // If the preloader is still running, wait for it to finish FIRST, then start the 5-second timer
      intervalId = setInterval(() => {
        if (sessionStorage.getItem('hasSeenPreloader') === 'true') {
          clearInterval(intervalId);
          timeoutId = setTimeout(playAnimation, 7000);
        }
      }, 100);
    }

    // Cleanup function to prevent double-firing if the component remounts quickly
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, { scope: toastRef, dependencies: [isVisible] });

  const handleClose = () => {
    gsap.to(toastRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setIsVisible(false);
        // Save to session storage so it doesn't come back until they fully restart the site
        sessionStorage.setItem('toastClosed', 'true');
      }
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
            OPEN TO OPPORTUNITIES
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
       Currently exploring: Product Design · UX/UI · Design Internships
    
      </p>

      <p className="text-[14px] leading-relaxed text-white/90 font-light">
        
      </p>
      
      <a 
        href="/resume.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[13px] text-[#C7E86B] hover:text-white transition-colors underline decoration-white/30 underline-offset-4 mt-2 w-fit font-medium"
      >
        View my PDF Resume 
      </a>
    </div>
  );
}
'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const soundBtnRef = useRef<HTMLButtonElement>(null); // New ref for the sound button
  const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const pathname = usePathname();
  const isHome = pathname === '/';

  const desktopLinks = [
    { name: 'Works', href: '/projects' },
    { name: 'About', href: '/about' }
  ];
  
  const overlayLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Resume', href: '/resume.pdf', isExternal: true }
  ];

  // Global Audio Initialization & Sync
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!(window as any).__bgMusic) {
        const audio = new Audio('/background-music.mp3');
        audio.loop = true;
        audio.volume = 0.5;
        (window as any).__bgMusic = audio;
      }

      const globalAudio = (window as any).__bgMusic;

      const updateState = () => setIsMusicPlaying(!globalAudio.paused);
      
      globalAudio.addEventListener('play', updateState);
      globalAudio.addEventListener('pause', updateState);
      
      updateState();

      return () => {
        globalAudio.removeEventListener('play', updateState);
        globalAudio.removeEventListener('pause', updateState);
      };
    }
  }, []);

  const toggleMusic = () => {
    const globalAudio = (window as any).__bgMusic;
    if (!globalAudio) return;

    if (isMusicPlaying) {
      gsap.to(globalAudio, { 
        volume: 0, 
        duration: 0.5, 
        onComplete: () => globalAudio.pause() 
      });
    } else {
      globalAudio.play().catch(() => {});
      gsap.to(globalAudio, { volume: 0.5, duration: 0.5 });
    }
  };

  useGSAP(() => {
    const initTl = gsap.timeline({ paused: true });
    
    // Navbar drop down
    initTl.fromTo(
      headerRef.current,
      { yPercent: -100 },
      { 
        yPercent: 0, 
        duration: isHome ? 1.5 : 0.8, 
        ease: isHome ? 'power2.out' : 'power3.out'
      }
    );
    
    // Navbar links fade in
    initTl.to(
      [logoRef.current, ...gsap.utils.toArray('.nav-item')],
      { opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
      '<0.15' 
    );

    // --- NEW: Sound Button Pop-in Animation ---
    initTl.fromTo(
      soundBtnRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
      '<0.2' // Triggers slightly after the text links start fading in
    );

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
      },
    });

    if (isHome) {
      const hasSeenPreloader = typeof window !== 'undefined' && sessionStorage.getItem('hasSeenPreloader') === 'true';
      
      if (hasSeenPreloader) {
        setTimeout(() => initTl.play(), 1700);
      } else {
        const checkReady = setInterval(() => {
          if (sessionStorage.getItem('hasSeenPreloader') === 'true') {
            clearInterval(checkReady);
            setTimeout(() => initTl.play(), 2900);
          }
        }, 100);
      }
    } else {
      initTl.play();
    }
  }, { dependencies: [isHome] });

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current.to(overlayRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.8,
      ease: 'expo.inOut',
    });

    tl.current.fromTo(
      menuLinksRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
      '-=0.4'
    );
  }, { scope: headerRef });

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.current?.reverse();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      <div 
        ref={progressRef} 
        className="fixed top-0 left-0 w-full h-[2px] bg-[#C1001F] z-[100] origin-left scale-x-0"
      />

      {/* --- GLOBAL FLOATING MUSIC BUTTON --- */}
      <button 
        ref={soundBtnRef}
        onClick={toggleMusic}
        // Removed 'nav-item' so it isn't grabbed by the generic stagger array. Kept 'opacity-0' to prevent flash before JS loads.
        className="fixed top-24 right-8 md:top-20 md:right-10 z-[85] w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-transform duration-300 outline-none opacity-0"
        data-cursor="hover"
        aria-label="Toggle background music"
      >
        <img 
          src={isMusicPlaying ? '/sound-on.png' : '/sound-mute.png'} 
          alt={isMusicPlaying ? 'Sound on' : 'Sound muted'} 
          className="w-5 h-5 object-contain"
        />
      </button>

      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[90] transition-colors transition-shadow duration-300 ease-in-out flex justify-between items-center px-8 md:px-12 py-2.5 md:py-3.5 bg-white shadow-sm"
      >
        <a 
          href="/"
          ref={logoRef}
          className="flex items-center gap-3 md:gap-4 cursor-pointer opacity-0 relative z-[100]"
          data-cursor="hover"
          onClick={() => setIsOpen(false)}
        >
          <span className="font-dm-sans text-[15px] font-medium text-[#141613] tracking-[-0.02em]">
            Kaustubh Korde
          </span>
          <span className="hidden md:flex items-center gap-3 md:gap-4">
            <span className="w-[1px] h-3.5 bg-[#141613]/20"></span>
            <span className="font-dm-sans text-[10px] md:text-[11px] font-semibold text-[#141613]/50 tracking-[0.05em] uppercase mt-[1px]">
              Product Design
            </span>
          </span>
        </a>

        <div className="flex items-center gap-6 md:gap-10">
          <nav 
            className={`hidden md:flex items-center gap-8 transition-all duration-500 ease-in-out ${
              isOpen ? 'opacity-0 translate-x-8 pointer-events-none' : 'opacity-100 translate-x-0'
            }`}
          >
            {desktopLinks.map((link, i) => {
              const isActive = pathname.startsWith(link.href);
              
              return (
                <a 
                  key={i} 
                  href={link.href}
                  className="relative cursor-pointer group nav-item opacity-0 flex flex-col items-center"
                  data-cursor="hover"
                >
                  <span className={`font-dm-sans text-[15px] tracking-[-0.02em] font-medium transition-colors duration-300 ${
                    isActive ? 'text-[#C1001F]' : 'text-[#141613] group-hover:text-[#C1001F]'
                  }`}>
                    {link.name}
                  </span>
                  
                  <span className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-[#C1001F] transition-all duration-300 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 z-[100]">
            {/* Hamburger */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] cursor-pointer nav-item opacity-0 outline-none"
              data-cursor="hover"
            >
              <span 
                className={`block w-[22px] h-[1.6px] bg-[#141613] transition-transform duration-500 ease-in-out origin-center ${
                  isOpen ? 'translate-y-[3.25px] rotate-45' : ''
                }`} 
              />
              <span 
                className={`block w-[22px] h-[1.6px] bg-[#141613] transition-transform duration-500 ease-in-out origin-center ${
                  isOpen ? '-translate-y-[3.25px] -rotate-45' : ''
                }`} 
              />
            </button>
          </div>
        </div>
      </header>

      {/* --- OVERLAY MENU --- */}
      <div 
        className={`fixed inset-0 z-[75] bg-black/10 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div 
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-[85vh] md:h-[80vh] bg-[#FFFFFF] z-[80] flex flex-col justify-center items-center pointer-events-auto shadow-2xl"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        <nav className="flex flex-col items-center gap-2 md:gap-1">
          {overlayLinks.map((link, i) => (
            <a
              key={link.name}
              ref={(el) => { menuLinksRef.current[i] = el; }}
              href={link.href}
              target={link.isExternal ? "_blank" : "_self"}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="font-momo text-5xl md:text-[4.5vw] leading-[1.1] tracking-tight text-[#141613] font-medium hover:text-[#C1001F] transition-colors duration-400"
              data-cursor="hover"
              onClick={() => {
                if (!link.isExternal) setIsOpen(false);
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div 
          ref={footerRef}
          className="absolute bottom-6 left-8 right-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0 font-dm-sans text-[#141613]"
        >
          <div className="flex flex-col z-10 relative">
            <span className="text-sm opacity-80">...</span>
            <a 
              href="mailto:kaustubh.workspace@gmail.com" 
              className="text-xl md:text-1xl font-small underline mt-1 decoration-1 underline-offset-4 hover:text-[#C1001F] transition-colors"
              data-cursor="hover"
            >
              kaustubh.workspace@gmail.com
            </a>
          </div>

          <div className="w-full md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 flex justify-center text-sm font-medium opacity-80 z-10">
            <button 
              onClick={() => {
                sessionStorage.removeItem('hasSeenPreloader');
                window.location.href = '/'; 
              }} 
              className="flex items-center gap-1.5 hover:text-[#C1001F] transition-colors group" 
              data-cursor="hover"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transition-transform duration-500 ease-in-out group-hover:-rotate-180"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Restart Site
            </button>
          </div>

          <div className="text-sm font-medium opacity-80 z-10 relative">
            © 2026 Kaustubh Korde Portfolio
          </div>
        </div>
      </div>
    </>
  );
}
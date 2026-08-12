'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  // TypeScript Fix: Explicitly defining the union type and initial null value
  const tl = useRef<gsap.core.Timeline | null>(null);

  const centerLinks = ['Home', 'Works', 'Archive', 'About'];
  const overlayLinks = ['Home', 'Projects', 'Contact'];

  // 1. Initial Load & Scroll Progress Animations
  useGSAP(() => {
    const initTl = gsap.timeline();
    
    initTl.fromTo(
      logoRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
    initTl.fromTo(
      '.nav-item',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out' },
      '-=0.6'
    );

    // Red scroll line tracking
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

    // Background toggle for the header
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      onEnter: () => {
        if (headerRef.current) {
          headerRef.current.classList.remove('bg-transparent');
          headerRef.current.classList.add('bg-white', 'shadow-sm');
        }
      },
      onLeaveBack: () => {
        if (headerRef.current) {
          headerRef.current.classList.remove('bg-white', 'shadow-sm');
          headerRef.current.classList.add('bg-transparent');
        }
      }
    });
  });

  // 2. Overlay Menu Timeline setup
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

    tl.current.fromTo(
      footerRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );
  }, { scope: headerRef });

  // 3. Play/Reverse overlay timeline on state change
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
      {/* Top Red Scroll Progress Bar */}
      <div 
        ref={progressRef} 
        className="fixed top-0 left-0 w-full h-[2px] bg-[#C1001F] z-[100] origin-left scale-x-0"
      />

      {/* Main Sticky Header (Reduced padding to py-4, starting transparent) */}
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[90] bg-transparent transition-all duration-300 ease-in-out flex justify-between items-center px-8 md:px-12 py-4"
      >
        {/* Left: Logo */}
        <div 
          ref={logoRef}
          className="font-dm-sans text-sm font-medium text-[#141613] tracking-[-0.02em] cursor-pointer opacity-0 relative z-[100]"
          data-cursor="hover"
          onClick={() => setIsOpen(false)}
        >
          Kaustubh Korde
        </div>

        {/* Center: Inline Links */}
        <nav 
          className={`hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 transition-opacity duration-500 ease-in-out ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {centerLinks.map((link, i) => (
            <div 
              key={i} 
              className="relative cursor-pointer group nav-item opacity-0"
              data-cursor="hover"
            >
              <span className="font-dm-sans text-[15px] tracking-[-0.02em] text-[#141613] font-medium block group-hover:text-[#C1001F] group-hover:-translate-y-0.5 transition-all duration-300">
                {link}
              </span>
            </div>
          ))}
        </nav>

        {/* Right: Hamburger / Close Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] z-[100] cursor-pointer nav-item opacity-0 outline-none"
          data-cursor="hover"
        >
          {/* Top Line */}
          <span 
            className={`block w-[22px] h-[1.5px] bg-[#141613] transition-transform duration-500 ease-in-out origin-center ${
              isOpen ? 'translate-y-[3.25px] rotate-45' : ''
            }`} 
          />
          {/* Bottom Line */}
          <span 
            className={`block w-[22px] h-[1.5px] bg-[#141613] transition-transform duration-500 ease-in-out origin-center ${
              isOpen ? '-translate-y-[3.25px] -rotate-45' : ''
            }`} 
          />
        </button>
      </header>

      {/* Full Screen Overlay Menu */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-[#F7F6F0] z-[80] flex flex-col justify-center items-center pointer-events-auto"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        {/* Massive Centered Links */}
        <nav className="flex flex-col items-center gap-4 md:gap-2">
          {overlayLinks.map((link, i) => (
            <a
              key={link}
              ref={(el) => { menuLinksRef.current[i] = el; }}
              href={`#${link.toLowerCase()}`}
              className="font-dm-sans text-6xl md:text-[8vw] leading-[1.1] tracking-tight text-[#141613] font-medium hover:text-[#C1001F] transition-colors duration-400"
              data-cursor="hover"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Overlay Footer (with Placeholders) */}
        <div 
          ref={footerRef}
          className="absolute bottom-6 left-8 right-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0 font-dm-sans text-[#141613]"
        >
          <div className="flex flex-col">
            <span className="text-sm opacity-80">+1 (000) 000-0000</span>
            <a 
              href="mailto:placeholder@email.com" 
              className="text-xl md:text-2xl font-medium underline mt-1 decoration-1 underline-offset-4 hover:text-[#C1001F] transition-colors"
              data-cursor="hover"
            >
              placeholder@email.com
            </a>
          </div>

          <div className="flex gap-6 md:gap-10 text-sm font-medium opacity-80">
            <a href="#" className="hover:text-[#C1001F] transition-colors" data-cursor="hover">Privacy Policy</a>
            <a href="#" className="hover:text-[#C1001F] transition-colors" data-cursor="hover">Terms of Service</a>
          </div>

          <div className="text-sm font-medium opacity-80">
            © 2026 Kaustubh Korde
          </div>
        </div>
      </div>
    </>
  );
}
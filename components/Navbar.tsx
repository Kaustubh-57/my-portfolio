'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const NavItem = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.to(textRef.current, { 
      y: -2, 
      color: '#C1001F', 
      duration: 0.3, 
      ease: 'power2.out' 
    });
  };

  const handleMouseLeave = () => {
    gsap.to(textRef.current, { 
      y: 0, 
      color: '#141613', 
      duration: 0.3, 
      ease: 'power2.out' 
    });
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center cursor-pointer px-2 py-1 nav-item opacity-0"
      data-cursor="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span 
        ref={textRef} 
        className="font-dm-sans text-base tracking-[-0.02em] text-[#141613] font-medium block"
      >
        {text}
      </span>
    </div>
  );
};

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const navLinks = ['Work', 'About', 'Experiments', 'Resume', 'Contact'];

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
    tl.fromTo(
      '.nav-item',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out' },
      '-=0.6'
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

    // FIXED: Using onEnter/onLeaveBack to avoid DOMTokenList whitespace errors
    const glassClasses = ['bg-white/75', 'backdrop-blur-md', 'border-b', 'border-gray-200/50', 'shadow-sm'];
    
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      onEnter: () => {
        if (headerRef.current) {
          headerRef.current.classList.add(...glassClasses);
        }
      },
      onLeaveBack: () => {
        if (headerRef.current) {
          headerRef.current.classList.remove(...glassClasses);
        }
      }
    });
  });

  return (
    <>
      <div 
        ref={progressRef} 
        className="fixed top-0 left-0 w-full h-[2px] bg-[#C1001F] z-[100] origin-left scale-x-0"
      />

      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[90] flex justify-between items-center px-8 md:px-12 py-5 transition-all duration-300 ease-out border-b border-transparent"
      >
        <div 
          ref={logoRef}
          className="font-dm-sans text-sm font-medium text-[#141613] tracking-[-0.02em] cursor-pointer opacity-0"
          data-cursor="hover"
        >
          Kaustubh Korde
        </div>

        <nav className="flex items-center gap-8 md:gap-10">
          {navLinks.map((link, i) => (
            <NavItem key={i} text={link} />
          ))}
        </nav>
      </header>
    </>
  );
}
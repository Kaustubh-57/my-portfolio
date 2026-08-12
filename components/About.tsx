'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
const graphicRef = useRef<HTMLImageElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo(
      graphicRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.5'
    );

    tl.fromTo(
      footerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="contact"
      className="relative w-full bg-[#F7F6F0] pt-4 md:pt-6 overflow-hidden flex flex-col justify-between z-30"
    >
      {/* Background Grid Layer */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E5E7EB 1px, transparent 1px),
            linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
        }}
      />

      {/* Content Container */}
      <div ref={contentRef} className="relative z-10 w-full max-w-[1440px] mx-auto px-8 md:px-12 pt-4">
        <h2 className="font-momo text-4xl md:text-6xl lg:text-[64px] text-[#141613] leading-[1.1] tracking-[-0.03em] max-w-5xl">
          Because good design isn’t just about visuals.{' '}
          <span className="text-[#141613]/50">
            It’s about listening, understanding, clarity, and helping teams move forward.
          </span>
        </h2>

        {/* Subtext */}
        <div className="mt-8 mb-16 max-w-lg" data-cursor="hover">
          <p className="font-dm-sans text-sm md:text-base text-[#141613]/80 leading-relaxed tracking-[-0.02em]">
            I’m a designer who enjoys figuring things out—whether that’s a product problem, a new tool, a technical constraint or an unfamiliar domain.
          </p>
        </div>
      </div>

      {/* Bottom Dark Section containing Graphic Bridge & Footer */}
      <div className="relative w-full bg-[#141613] rounded-t-[60px] md:rounded-t-[100px] overflow-visible pt-12 pb-20 px-8 md:px-12">
        
        {/* Red Mechanical Graphic Positioned at the Top Center Boundary */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-20 md:-top-28 z-25 w-36 md:w-48 pointer-events-none flex justify-center">
          <img 
            ref={graphicRef}
            src="/about-graphic.png" 
            alt="Mechanical pulley design element" 
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Footer Details Container */}
        <div ref={footerRef} className="max-w-[1440px] mx-auto pt-24 md:pt-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
          
          {/* Left Column: Contact & Professional Links */}
          <div className="flex flex-col gap-8 font-dm-sans">
            <div>
              <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">Email</span>
              <a 
                href="mailto:kaustubh.workspace@gmail.com" 
                className="text-base md:text-lg text-white underline decoration-white/30 underline-offset-4 hover:text-[#C1001F] hover:decoration-[#C1001F] transition-colors"
                data-cursor="hover"
              >
                kaustubh.workspace@gmail.com
              </a>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">Phone</span>
              <a 
                href="tel:+917249872188" 
                className="text-base md:text-lg text-white underline decoration-white/30 underline-offset-4 hover:text-[#C1001F] hover:decoration-[#C1001F] transition-colors"
                data-cursor="hover"
              >
                +91 7249872188
              </a>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a 
                href="https://www.linkedin.com/in/kaustubh-korde" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm md:text-base text-white/80 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
                data-cursor="hover"
              >
                www.linkedin.com/in/kaustubh-korde
              </a>
              <a 
                href="https://www.behance.net/kaustubhko0d27" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm md:text-base text-white/80 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
                data-cursor="hover"
              >
                www.behance.net/kaustubhko0d27
              </a>
              <a 
                href="mailto:kaustubh.korde25@nmims.in" 
                className="text-sm md:text-base text-white/80 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
                data-cursor="hover"
              >
                kaustubh.korde25@nmims.in
              </a>
            </div>
          </div>

          {/* Right Column: Warm Regards & Signature */}
          <div className="flex flex-col items-start md:items-end w-full md:w-auto">
            <p className="font-dm-sans text-lg text-white/90 mb-4">
              Warm Regards,    
            </p>
            <div className="w-48 md:w-64">
              <img 
                src="/signature.png" 
                alt="Kaustubh Signature" 
                className="w-full h-auto object-contain brightness-0 invert" 
                // Fallback if signature image isn't added yet, or you can place your exported signature.png in public/
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
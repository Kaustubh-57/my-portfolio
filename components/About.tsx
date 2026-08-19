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
      '-=0.6'
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="contact"
      className="relative w-full bg-[#ffffff] flex flex-col z-30 overflow-hidden"
    >
      {/* Background Grid Layer (Spans the white section) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E5E7EB 1px, transparent 1px),
            linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
        }}
      />

      {/* --- TOP WHITE SECTION --- */}
      <div ref={contentRef} className="relative z-10 w-full max-w-[1440px] mx-auto px-8 md:px-12 pt-16 md:pt-24 pb-12">
        <h2 className="font-momo text-4xl md:text-6xl lg:text-[64px] text-[#141613] leading-[1.1] tracking-[-0.03em] max-w-5xl">
          Because good design isn’t just about visuals.{' '}
          <span className="text-[#141613]/50">
            It’s about listening, understanding, clarity, and helping teams move forward.
          </span>
        </h2>

        {/* Subtext */}
        <div className="mt-8 max-w-2xl" data-cursor="hover">
          <p className="font-dm-sans text-sm md:text-base text-[#141613]/80 leading-relaxed tracking-[-0.02em]">
            I’m a designer who enjoys figuring things out
          </p>
          <p className="font-dm-sans text-sm md:text-base text-[#141613]/80 leading-relaxed tracking-[-0.02em]">
            whether that’s a product problem, a new tool, a technical constraint or an unfamiliar domain.
          </p>
        </div>
      </div>

      {/* --- BOTTOM BLACK SECTION (Dome Curve) --- */}
      <div className="relative w-full bg-[#141613] rounded-t-[60px] md:rounded-t-[100px] pt-32 md:pt-40 pb-20 px-8 md:px-12 z-20 mt-20 md:mt-32 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        
        {/* Red Mechanical Graphic - Increased Size and Centered on the Dome Edge */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-24 md:-top-36 z-30 w-[300px] md:w-[260px] pointer-events-none flex justify-center">
          <img 
            ref={graphicRef}
            src="/about-graphic.png" 
            alt="Mechanical pulley design element" 
            className="w-full h-80 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Footer Details Container */}
        <div ref={footerRef} className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
          
          {/* Left Column: Contact Details */}
          <div className="flex flex-col gap-5 font-dm-sans">
            <div>
              <span className="block text-[11px] md:text-xs uppercase tracking-[0.05em] text-white/40 mb-1.5">Email</span>
              <a 
                href="mailto:kaustubh.workspace@gmail.com" 
                className="text-base md:text-lg text-white underline decoration-white/30 underline-offset-4 hover:text-[#C1001F] hover:decoration-[#C1001F] transition-colors"
                data-cursor="hover"
              >
                kaustubh.workspace@gmail.com
              </a>
            </div>

            <div>
              <span className="block text-[11px] md:text-xs uppercase tracking-[0.05em] text-white/40 mb-1.5">Alternate Email</span>
              <a 
                href="mailto:kaustubh.korde25@nmims.in" 
                className="text-base md:text-lg text-white underline decoration-white/30 underline-offset-4 hover:text-[#C1001F] hover:decoration-[#C1001F] transition-colors"
                data-cursor="hover"
              >
                kaustubh.korde25@nmims.in
              </a>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <a 
                href="https://www.linkedin.com/in/kaustubh-korde" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm md:text-base text-white/80 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 w-fit"
                data-cursor="hover"
              >
                Linkedin
              </a>
              <a 
                href="https://www.behance.net/kaustubhko0d27" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm md:text-base text-white/80 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 w-fit"
                data-cursor="hover"
              >
                Behance
              </a>
              <a 
                href="https://www.instagram.com/does.kaus?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                className="text-sm md:text-base text-white/80 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 w-fit"
                data-cursor="hover"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Right Column: Warm Regards & Signature (UPDATED) */}
          <div className="flex flex-col items-center w-full md:w-auto text-center mt-30 md:mt-0">
            <p className="font-dm-sans text-base md:text-lg text-white tracking-wide z-10 relative">
              Designed & built by,
            </p>

            <div className="w-44 md:w-52 -my-4 relative z-0 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <img 
                src="/signature.png" 
                alt="Kaustubh Signature" 
                className="w-full h-auto object-contain brightness-0 invert" 
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex flex-col items-center gap-0.5 z-10 relative">
              <p className="font-dm-sans text-base md:text-lg text-white tracking-wide">
                Kaustubh Korde
              </p>
              <p className="font-dm-sans text-sm md:text-base text-white/60 tracking-wide">
                (19 Aug 2026)
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
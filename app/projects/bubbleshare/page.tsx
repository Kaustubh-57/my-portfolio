'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';

export default function BubblesharePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    // Animate Back Button
    tl.fromTo('.go-back-link',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' },
      0
    );

    // Fade in the image stack smoothly
    tl.fromTo('.image-stack',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' },
      0.1
    );
  }, { scope: pageRef });

  const handleGoBack = () => {
    if (isExiting) return;
    setIsExiting(true);

    gsap.to('.case-study-content', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push('/?returnTo=03'); // Routes back to the 3rd card
      }
    });
  };

  return (
    <main ref={pageRef} className="w-full min-h-screen bg-[#ffffff] text-[#141613] pt-28 md:pt-36 overflow-hidden flex flex-col justify-between">
      
      {/* GSAP wrapper that fades out the whole page on exit */}
      <div className="case-study-content w-full">
        
        {/* --- CONSTRAINED TOP SECTION (Only Back Button) --- */}
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          
          <div className="mb-2 md:mb-6 go-back-link opacity-0 pl-2">
            <button 
              onClick={handleGoBack} 
              className="inline-flex items-center gap-2 font-dm-sans text-[15px] md:text-base hover:opacity-60 transition-opacity cursor-pointer"
            >
              <span className="text-lg leading-none mb-[2px]">←</span> Go back
            </button>
          </div>

        </div>

        {/* --- FULL WIDTH IMAGE STACK (Touches edges) --- */}
        <div className="w-full mt-8 md:mt-12 flex flex-col image-stack opacity-0">
          <img 
            src="/projects/bubbleshare/presentation-part-1.png" 
            alt="Bubbleshare Presentation Part 1" 
            className="w-full h-auto block object-cover"
            onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
          />
      
        </div>

      </div>

      {/* --- INLINE FOOTER WITH GRID & PULLEY --- */}
      <div className="relative w-full bg-[#ffffff] pt-40 md:pt-56 flex flex-col overflow-hidden z-20">
        
        {/* Background Grid Layer (Spans the white gap above the footer) */}
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

        {/* BOTTOM BLACK SECTION (Dome Curve) */}
        <div className="relative w-full bg-[#141613] rounded-t-[60px] md:rounded-t-[100px] pt-32 md:pt-40 pb-20 px-8 md:px-12 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          
          {/* Red Mechanical Graphic */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-24 md:-top-36 z-30 w-[300px] md:w-[260px] pointer-events-none flex justify-center">
            <img 
              src="/about-graphic.png" 
              alt="Mechanical pulley design element" 
              className="w-full h-80 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Footer Details Container */}
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 relative z-40">
            
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

            {/* Right Column: Warm Regards & Signature */}
            <div className="flex flex-col items-center w-full md:w-auto text-center mt-12 md:mt-0">
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
      </div>

    </main>
  );
}
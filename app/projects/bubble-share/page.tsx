'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';

export default function BubbleSharePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const blueCardRef = useRef<HTMLDivElement>(null);
  const overlapGraphicRef = useRef<HTMLDivElement>(null);
  const contextSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo('.go-back-link',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' },
      0
    );

    tl.fromTo(blueCardRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' },
      0.1
    );

    tl.fromTo(overlapGraphicRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' },
      0.2
    );

    tl.fromTo(contextSectionRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' },
      0.3
    );
  }, { scope: pageRef });

  const handleGoBack = () => {
    if (isExiting) return;
    setIsExiting(true);

    // Fade out ONLY the inner content to preserve the white background
    gsap.to('.case-study-content', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push('/?returnTo=01');
      }
    });
  };

  return (
    <main ref={pageRef} className="w-full min-h-screen bg-[#ffffff] text-[#141613] pt-28 md:pt-36 pb-24 overflow-hidden">
      
      {/* Wrapper to fade contents without losing the white background */}
      <div className="case-study-content w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="mb-6 go-back-link opacity-0">
          <button 
            onClick={handleGoBack} 
            className="inline-flex items-center gap-2 font-dm-sans text-[15px] md:text-base hover:opacity-60 transition-opacity cursor-pointer"
          >
            <span className="text-lg leading-none mb-[2px]">←</span> Go back
          </button>
        </div>

        <div 
          ref={blueCardRef}
          className="relative w-full bg-[#3D2FA9] rounded-t-[32px] pt-12 md:pt-20 px-8 md:px-16 flex flex-col items-center opacity-0"
        >
          
          <div className="relative flex flex-col md:flex-row justify-between items-start w-full mb-6 md:mb-10">
            <div className="max-w-2xl">
              <h1 className="font-momo text-4xl md:text-5xl lg:text-[48px] text-white whitespace-pre-line leading-[1.08] tracking-[-0.02em]">
                Making File Sending{'\n'}feel Natural
              </h1>
              <p className="font-dm-sans text-sm md:text-[15px] text-white opacity-80 mt-6 max-w-[500px] leading-relaxed">
                I’m interested in the everyday interactions, ......we stop questioning the awkward flow, unnecessary step or confusing interface that has simply become normal. I like understanding why it happens and turning it into a product experience that feels obvious in hindsight.
              </p>
            </div>
            
            <div className="font-momo text-3xl md:text-4xl text-white opacity-60">
              (01)
            </div>
          </div>

          <div className="w-full relative z-10 translate-y-12 md:translate-y-24">
            <div 
              ref={overlapGraphicRef}
              className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#E2F0F9] bg-gradient-to-br from-[#E2F0F9] to-[#F3F8FB] rounded-[16px] md:rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative border border-white/50 opacity-0"
            >
              <img 
                src="/projects/bubble-share/hero-graphic.png" 
                alt="BubbleShare Graphic" 
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-black font-dm-sans text-lg flex items-center justify-center w-full h-full">BubbleShare Graphic</span>';
                }}
              />
            </div>
          </div>
        </div>

        <div className="h-12 md:h-24 w-full bg-transparent"></div>

        <div 
          ref={contextSectionRef}
          className="w-full border-t border-[#141613]/10 pt-16 mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 opacity-0"
        >
          <div className="md:col-span-4 flex flex-col gap-10">
            <div>
              <h3 className="font-dm-sans text-base md:text-[17px] text-[#141613] font-medium mb-1.5 md:mb-2">Timeframe</h3>
              <p className="font-dm-sans text-sm text-[#141613]/70">Apr 2025– May 2025</p>
            </div>
            
            <div>
              <h3 className="font-dm-sans text-base md:text-[17px] text-[#141613] font-medium mb-1.5 md:mb-2">Done at</h3>
              <p className="font-dm-sans text-sm text-[#141613]/70">NMIMS School of Design</p>
            </div>
            
            <div>
              <h3 className="font-dm-sans text-base md:text-[17px] text-[#141613] font-medium mb-1.5 md:mb-2">The Team</h3>
              <p className="font-dm-sans text-sm text-[#141613]/70 leading-relaxed">
                Aaron Carvalho, Sai Ghate,<br/>Kaustubh Korde, Rohit Chattre
              </p>
            </div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-12 md:pl-8 lg:pl-12">
            <div>
              <h2 className="font-dm-sans text-2xl md:text-[28px] font-bold text-[#141613] tracking-tight mb-4 md:mb-5">Context:</h2>
              <p className="font-dm-sans text-sm md:text-base text-[#141613]/80 leading-relaxed max-w-2xl">
                I’m interested in the everyday interactions, ......we stop questioning the awkward flow, unnecessary step or confusing interface that has simply become normal. I like understanding why it happens and turning it into a product experience that feels obvious in hindsight.
              </p>
            </div>

            <div>
              <h2 className="font-dm-sans text-2xl md:text-[28px] font-bold text-[#141613] tracking-tight mb-4 md:mb-5">My role:</h2>
              <ul className="list-disc pl-5 font-dm-sans text-sm md:text-base text-[#141613]/80 leading-relaxed max-w-2xl space-y-3 marker:text-[#141613]/60">
                <li>I’m interested in the everyday interactions, ......we stop questioning the awkward flow, unnecessary step or confusing interface that has simply become normal. I like understanding why</li>
                <li>I’m interested in the everyday interactions, ......we stop questioning the awkward flow, unnecessary step or confusing interface that has simply become normal. I like understanding why</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
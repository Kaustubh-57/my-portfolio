'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';

export default function ChromebudsPage() {
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

    gsap.to('.case-study-content', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push('/?returnTo=02');
      }
    });
  };

  return (
    <main ref={pageRef} className="w-full min-h-screen bg-[#ffffff] text-[#141613] pt-28 md:pt-36 pb-24 overflow-hidden">
      
      <div className="case-study-content w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        <div className="mb-6 go-back-link opacity-0 pl-2">
          <button 
            onClick={handleGoBack} 
            className="inline-flex items-center gap-2 font-dm-sans text-[15px] md:text-base hover:opacity-60 transition-opacity cursor-pointer"
          >
            <span className="text-lg leading-none mb-[2px]">←</span> Go back
          </button>
        </div>

        <div 
          ref={blueCardRef}
          className="relative w-full bg-[#F1F0EC] rounded-t-[24px] md:rounded-t-[32px] pt-12 md:pt-20 px-6 md:px-12 lg:px-16 flex flex-col opacity-0 overflow-hidden"
        >
          
          <div className="relative flex flex-col md:flex-row justify-between items-start w-full mb-4 md:mb-6">
            <div className="max-w-2xl">
              <h1 className="font-momo text-4xl md:text-5xl lg:text-[48px] text-[#151515] whitespace-pre-line leading-[1.08] tracking-[-0.02em]">
                Chromebuds: Rethinking{'\n'}why people are leaving{'\n'}TWS behind.
              </h1>
              <p className="font-dm-sans text-sm md:text-[15px] text-[#151515] opacity-80 mt-6 max-w-[500px] leading-relaxed">
                A product redesign exploring comfort, convenience and everyday usability in TWS.
              </p>
            </div>
            
            <div className="font-momo text-3xl md:text-4xl text-[#151515] opacity-60 mt-6 md:mt-0">
              (02)
            </div>
          </div>

          <div 
            ref={overlapGraphicRef}
            className="w-full relative z-10 opacity-0"
          >
            <img 
              src="/projects/chromebuds/mockup.png" 
              alt="Chromebuds Graphic" 
              className="w-full h-auto rounded-t-[16px] md:rounded-t-[24px] rounded-b-[16px] md:rounded-b-[0px] shadow-2xl block"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<span class="text-black font-dm-sans text-lg flex items-center justify-center w-full h-48 bg-gray-100 rounded-[24px]">Chromebuds Graphic</span>';
              }}
            />
          </div>
        </div>

        <div 
          ref={contextSectionRef}
          className="w-full border-t border-[#141613]/15 pt-16 md:pt-20 px-2 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 opacity-0"
        >
          <div className="md:col-span-4 flex flex-col gap-10">
            <div>
              <h3 className="font-dm-sans text-base md:text-[17px] text-[#141613] font-medium mb-1.5 md:mb-2">Timeframe</h3>
              <p className="font-dm-sans text-sm text-[#141613]/70">Jan 2026 – Mar 2026</p>
            </div>
            
            <div>
              <h3 className="font-dm-sans text-base md:text-[17px] text-[#141613] font-medium mb-1.5 md:mb-2">Done at</h3>
              <p className="font-dm-sans text-sm text-[#141613]/70">Personal Project</p>
            </div>
            
            <div>
              <h3 className="font-dm-sans text-base md:text-[17px] text-[#141613] font-medium mb-1.5 md:mb-2">The Team</h3>
              <p className="font-dm-sans text-sm text-[#141613]/70 leading-relaxed">
                Kaustubh Korde
              </p>
            </div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-12 md:pl-8 lg:pl-12">
            <div>
              <h2 className="font-dm-sans text-2xl md:text-[28px] font-bold text-[#141613] tracking-tight mb-4 md:mb-5">Context:</h2>
              <p className="font-dm-sans text-sm md:text-base text-[#141613]/80 leading-relaxed max-w-2xl">
                TWS earbuds have become ubiquitous, yet long-term comfort and everyday physical interactions remain pain points. This project explores a form factor that challenges the current status quo.
              </p>
            </div>

            <div>
              <h2 className="font-dm-sans text-2xl md:text-[28px] font-bold text-[#141613] tracking-tight mb-4 md:mb-5">My role:</h2>
              <ul className="list-disc pl-5 font-dm-sans text-sm md:text-base text-[#141613]/80 leading-relaxed max-w-2xl space-y-3 marker:text-[#141613]/60">
                <li>Industrial Design & Form Exploration</li>
                <li>3D Modeling and Rendering</li>
                <li>Physical Prototyping</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
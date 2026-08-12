'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const verticalGridRef = useRef<HTMLDivElement>(null);
  const horizontalGridRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  
  const textRefs = useRef<(HTMLHeadingElement | HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    // 1. Grid Preloader
    tl.to(verticalGridRef.current, {
      scaleY: 1,
      duration: 1.2,
      ease: 'expo.inOut',
    });
    tl.to(horizontalGridRef.current, {
      scaleX: 1,
      duration: 1.2,
      ease: 'expo.inOut',
    }, '-=0.8');

    // 2. Bottom Block Slides Up 
    tl.fromTo(
      bottomSectionRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 1.2, ease: 'expo.out' },
      '-=0.6'
    );

    // 3. Clean Fade for Typography
    tl.fromTo(
      textRefs.current,
      { 
        y: 40, 
        opacity: 0,
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        stagger: 0.15,
        ease: 'power2.out',
      },
      '-=0.7' 
    );

    // 4. Scroll Indicator Loop
    gsap.to(scrollIndicatorRef.current, {
      y: 4,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: containerRef });

  const addToRefs = (el: HTMLHeadingElement | HTMLDivElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col bg-white overflow-hidden">
      
      {/* --- TOP SECTION (70vh) --- */}
      {/* Using items-end and pb-6 to guarantee the 'g' has clearance from the bottom edge */}
      <div className="relative w-full h-[70vh] flex-none flex flex-col justify-center px-8 md:px-12 border-b border-gray-100 pb-6">
        
        {/* Layer 1: Vertical Grid */}
        <div 
          ref={verticalGridRef}
          className="absolute inset-0 w-full h-full pointer-events-none origin-top scale-y-0"
          style={{
            backgroundImage: `linear-gradient(to right, #E5E7EB 1px, transparent 1px)`,
            backgroundSize: '90px 100%',
            backgroundPosition: '0 0',
          }}
        />

        {/* Layer 2: Horizontal Grid */}
        <div 
          ref={horizontalGridRef}
          className="absolute inset-0 w-full h-full pointer-events-none origin-left scale-x-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)`,
            backgroundSize: '100% 90px',
            backgroundPosition: '0 0',
          }}
        />

        {/* Typography Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto flex items-end justify-between mt-13">
          
          {/* Main Title Block */}
          <div className="flex flex-col gap-3 w-fit" data-cursor="hover">
            {['Product', 'Experience', 'Designer'].map((word, i) => (
              <h1
                key={i}
                ref={addToRefs}
                className="text-[9vw] lg:text-[105px] font-momo text-[#C1001F] tracking-[-0.03em] font-normal leading-none m-0 p-0"
              >
                {word}
              </h1>
            ))}
          </div>

          {/* Subtitle bottom-aligned precisely with the word 'Designer' */}
          <div 
            ref={addToRefs}
            className="hidden lg:block pb-1" 
            data-cursor="hover"
          >
            <p className="font-dm-sans text-[#C1001F] text-xl tracking-[-0.05em] font-normal">
              I design digital products that work beautifully
            </p>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION (30vh) --- */}
      <div 
        ref={bottomSectionRef}
        className="relative w-full h-[30vh] flex-none bg-[#141613] will-change-transform"
      >
        <div className="absolute inset-0 bg-[#141613]/50 z-[5] pointer-events-none" />

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/trees.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 w-full max-w-[1440px] h-full mx-auto px-8 md:px-12 py-8 flex justify-between items-end">
          
          <div className="max-w-[460px] text-white">
            <p className="font-dm-sans text-sm md:text-[15px] leading-relaxed tracking-[-0.05em] font-light text-white/90">
              I’m interested in the everyday interactions,
              ......we stop questioning the awkward flow,
              unnecessary step or confusing interface
              that has simply become normal. I like
              understanding why it happens and turning
              it into a product experience that feels
              obvious in hindsight.
            </p>
          </div>

          <div className="flex flex-col items-end text-white gap-6">
            <div 
              className="group cursor-pointer flex flex-col items-end"
              data-cursor="hover" 
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-[1px] bg-white transition-transform duration-300 origin-right group-hover:scale-x-125" />
                <span className="font-dm-sans text-base md:text-lg tracking-[-0.05em]">
                  About me
                </span>
              </div>
              <p className="font-dm-sans text-xs text-white/60 tracking-[-0.05em] mt-1 group-hover:text-white transition-colors duration-300">
                What do I care about?
              </p>
            </div>

            <div ref={scrollIndicatorRef} className="font-dm-sans text-xs text-white/80 tracking-[-0.05em] mt-4">
              Scroll!
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
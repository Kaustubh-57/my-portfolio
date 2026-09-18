'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    title: 'UI / UX DESIGN',
    desc: 'Exceptional design starts with the user. I craft intuitive interfaces and seamless experiences that not only look stunning but also drive engagement and enhance usability, putting your audience first.',
    image: '/Capabilities/uiux.jpg' // Updated capital 'C' and removed hyphen
  },
  {
    title: 'INTERACTION DESIGN',
    desc: 'Motion and micro-interactions breathe life into digital products. I design meaningful transitions that guide users, provide feedback, and make the overall experience feel natural and responsive.',
    image: '/Capabilities/interaction.jpg' // Updated capital 'C'
  },
  {
    title: 'VISUAL DESIGN',
    desc: 'Aesthetics matter. I create cohesive visual languages, typography systems, and color palettes that align with brand identities and elevate the perceived value of the product.',
    image: '/Capabilities/visual.jpg' // Updated capital 'C'
  },
  {
    title: 'EXPERIMENTS',
    desc: 'Innovation requires play. I constantly explore new tools, emerging tech, and unconventional layouts to discover fresh ways to solve complex design challenges.',
    image: '/Capabilities/experiments.jpg' // Updated capital 'C'
  }
];

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 1. Scroll tracking to determine the active index
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${CAPABILITIES.length * 100}%`, // Pins for 4 full viewport heights
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const index = Math.min(
          Math.floor(self.progress * CAPABILITIES.length),
          CAPABILITIES.length - 1
        );
        setActiveIndex((prev) => (prev !== index ? index : prev));
      }
    });
  }, { scope: containerRef });

  // 2. Smooth vertical slide animation for the images whenever the active index changes
  useGSAP(() => {
    gsap.to(imageTrackRef.current, {
      yPercent: -(activeIndex * 100),
      duration: 0.8,
      ease: 'power3.out'
    });
  }, { dependencies: [activeIndex] });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex flex-col md:flex-row z-10">
      
      {/* --- LEFT SIDE: Sliding Image Track --- */}
      <div className="hidden md:block w-1/2 h-full relative overflow-hidden">
        <div 
          ref={imageTrackRef} 
          className="w-full h-full flex flex-col will-change-transform"
        >
          {CAPABILITIES.map((item, index) => (
            <div key={`img-${index}`} className="w-full h-full flex-shrink-0 relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { 
                  // Fallback colors if the image path isn't set up yet
                  const colors = ['#DF1F1F', '#1F3FDF', '#1FDF7F', '#DF1FDF'];
                  (e.target as HTMLImageElement).style.backgroundColor = colors[index]; 
                  (e.target as HTMLImageElement).style.backgroundImage = 'none';
                }} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- RIGHT SIDE: Accordion Content --- */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        
        <h2 
          className="text-[14px] md:text-sm font-semibold tracking-wider uppercase mb-10 text-white/50 font-dm-sans"
        >
          WHAT CAN I DO
        </h2>
        
        <div className="w-full flex flex-col">
          <div className="w-full h-[1px] bg-white/20"></div>

          {CAPABILITIES.map((item, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div 
                key={index} 
                className="flex flex-col border-b border-white/20 cursor-pointer"
              >
                {/* Title Row */}
                <div className="w-full py-6 md:py-8 flex items-center justify-between">
                  <h3 
                    className={`text-2xl md:text-[28px] font-bold tracking-wide transition-colors duration-500 uppercase ${
                      isActive ? 'text-white' : 'text-white/40'
                    }`}
                    style={{ fontFamily: "'Stack Sans Headline', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                </div>
                
                {/* Smooth Expandable Description (CSS Grid technique) */}
                <div 
                  className="grid transition-all duration-500 ease-in-out"
                  style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="font-dm-sans text-[15px] md:text-[16px] text-white/80 leading-relaxed max-w-[480px] pb-8 md:pb-10 tracking-[-0.02em]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </section>
  );
}
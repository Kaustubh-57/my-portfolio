'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    title: 'UI/UX Design',
    desc: 'I spend time understanding what people are trying to do, where things break down, and what the product actually needs before jumping into the interface.',
    image: '/Capabilities/uiux.jpg' 
  },
  {
    title: 'Interaction Design',
    desc: 'Motion and micro-interactions breathe life into digital products. I design meaningful transitions that guide users, provide feedback, and make the overall experience feel natural and responsive.',
    image: '/Capabilities/interaction.jpg' 
  },
  {
    title: 'Visual Design',
    desc: 'Aesthetics matter. I create cohesive visual languages, typography systems, and color palettes that align with brand identities and elevate the perceived value of the product.',
    image: '/Capabilities/visual.jpg' 
  },
  {
    title: 'Experiments',
    desc: 'Some of my best ideas have started outside a traditional screen. I have explored physical computing, immersive experiences, data visualisation and other weird little experiments that help me understand how people interact with things.',
    image: '/Capabilities/experiments.jpg' 
  }
];

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${CAPABILITIES.length * 100}%`,
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

  useGSAP(() => {
    gsap.to(imageTrackRef.current, {
      yPercent: -(activeIndex * 100),
      duration: 0.8,
      ease: 'power3.out'
    });
  }, { dependencies: [activeIndex] });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#ffffff] flex flex-col justify-center z-10 overflow-hidden">
      
      <div className="w-full max-w-[1440px] mx-auto px-12 md:px-16 flex flex-col gap-5 md:gap-10">
        
        {/* --- TOP ROW: Header & Intro Text --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <h2 
            className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#141613] pt-1"
            style={{ fontFamily: "'Stack Sans Headline', sans-serif" }}
          >
            WHAT CAN I DO
          </h2>
          
          {/* UPDATED: Added pt-3 md:pt-4 here to push the paragraph down slightly */}
          <p className="font-dm-sans text-[14px] md:text-[15px] text-[#141613]/80 leading-relaxed max-w-[480px] tracking-[-0.01em] pt-3 md:pt-4">
            A few things I like to work on.
          </p>
        </div>

        {/* --- BOTTOM ROW: Image & Accordion --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          
          {/* LEFT: Image */}
          <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] rounded-[2px] overflow-hidden bg-[#F4F7FA]">
            <div 
              ref={imageTrackRef} 
              className="absolute inset-0 w-full h-full flex flex-col will-change-transform"
            >
              {CAPABILITIES.map((item, index) => (
                <div key={`img-${index}`} className="w-full h-full flex-shrink-0 relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { 
                      const colors = ['#DF1F1F', '#1F3FDF', '#1FDF7F', '#DF1FDF'];
                      (e.target as HTMLImageElement).style.backgroundColor = colors[index]; 
                      (e.target as HTMLImageElement).style.backgroundImage = 'none';
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Accordion Container */}
          <div className="flex flex-col w-full h-full justify-start mt-1 md:mt-0">
            {/* Top Border Line */}
            <div className="w-full border-t border-[#141613]/20"></div>

            {CAPABILITIES.map((item, index) => {
              const isActive = activeIndex === index;
              
              return (
                <div 
                  key={index} 
                  className="flex flex-col border-b border-[#141613]/20 cursor-pointer"
                >
                  <div className="w-full py-3 md:py-4 flex items-center justify-between">
                    <h3 
                      className={`text-[22px] md:text-[26px] font-bold tracking-tight transition-colors duration-500 ${
                        isActive ? 'text-[#141613]' : 'text-[#141613]/40'
                      }`}
                      style={{ fontFamily: "'Stack Sans Headline', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  
                  {/* Expandable Content Box */}
                  <div 
                    className="grid transition-all duration-500 ease-in-out"
                    style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="h-[180px] md:h-[240px] flex flex-col justify-start">
                        <p className="font-dm-sans text-[14px] md:text-[17px] text-[#141613]/90 leading-relaxed max-w-[500px] tracking-[-0.03em]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
      
    </section>
  );
}
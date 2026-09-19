'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  {
    id: 'who',
    label: 'WHO I AM',
    text: "Designer who enjoys figuring things out whether that’s a product problem, a new tool, a technical constraint or an unfamiliar domain."
  },
  {
    id: 'care',
    label: 'WHAT I CARE ABOUT',
    text: "Good hierarchy, thoughtful details and knowing what actually needs to be there matter a lot to me."
  },
  {
    id: 'believe',
    label: 'WHAT I BELIEVE IN',
    text: "The visuals matter, but what matters more is whether they help someone understand, decide, or get something done"
  },
  {
    id: 'upto',
    label: 'I AM UPTO?',
    text: "I AM UP TO? / SEP 26'",
    bullets: [
      "Finishing up my final year at NMIMS School of Design",
      "Working on my graduation project on agricultural wholesale markets",
      "Exploring how AI can actually fit into my design workflow"
    ]
  }
];

const TOOLS = [
  { name: 'Figma', icon: 'https://api.iconify.design/logos:figma.svg' },
  { name: 'VS Code', icon: 'https://api.iconify.design/logos:visual-studio-code.svg' },
  { name: 'Procreate', icon: '/tools/procreate.svg' },
  { name: 'Unity', icon: 'https://api.iconify.design/logos:unity.svg' },
  { name: 'Wix Studio', icon: 'https://cdn.simpleicons.org/wix/141613' },
  { name: 'Fusion 360', icon: '/tools/fusion360.svg' },
  { name: 'Framer', icon: 'https://api.iconify.design/logos:framer.svg' },
  { name: 'Affinity', icon: '/tools/affinity.svg' },
  { name: 'Gemini', icon: '/tools/gemini.svg' },
  { name: 'Claude', icon: 'https://cdn.simpleicons.org/claude/D97757' },
  { name: 'ChatGPT', icon: 'https://api.iconify.design/logos:openai-icon.svg' },
  { name: 'My Brain', icon: 'https://api.iconify.design/lucide:brain.svg?color=%23141613' }
];

export default function AboutSummary() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [isAnimating, setIsAnimating] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });

  
  }, { scope: containerRef });

  const handleTabClick = (tabId: string) => {
    if (tabId === activeTab || isAnimating) return;
    setIsAnimating(true);

    gsap.to(textWrapperRef.current, {
      opacity: 0,
      y: 5,
      duration: 0.15,
      onComplete: () => {
        setActiveTab(tabId);
        gsap.fromTo(
          textWrapperRef.current,
          { opacity: 0, y: -5 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', onComplete: () => setIsAnimating(false) }
        );
      }
    });
  };

  const activeTabObj = TABS.find(t => t.id === activeTab);

  return (
    <section ref={containerRef} className="relative w-full bg-[#ffffff] py-10 md:py-12 overflow-hidden z-20">
      
      <div className="w-full max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-stretch">
        
        {/* LEFT: Bare Image with no white frame, tilted slightly */}
        <div className="flex justify-start">
          <div 
            ref={imageRef}
            className="relative w-[240px] md:w-[280px] aspect-[4/4.5] rounded-sm overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.18)] -rotate-3 transition-transform duration-500 hover:-rotate-1 hover:scale-[1.02] cursor-pointer"
          >
            <img 
              src="/profile.jpg" 
              alt="Kaustubh"
              className="w-full h-full object-cover"
              onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
            />
          </div>
        </div>

        {/* RIGHT: Content Area (Flex Col + Justify Between locks top and bottom in place) */}
        <div ref={contentRef} className="flex flex-col justify-between py-1 md:py-2 w-full">
          
          {/* TABS (Locked to top) */}
          <div className="flex flex-wrap items-center gap-12 md:gap-12">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`font-dm-sans text-[11px] md:text-[16px] font-medium tracking-[-0.01em] uppercase transition-colors duration-300 outline-none ${
                  activeTab === tab.id ? 'text-[#C1001F]' : 'text-[#141613]/60 hover:text-[#141613]/90'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* DYNAMIC TEXT (Pushed near top, leaving a massive breathing gap below) */}
          <div className="mt-8 md:mt-10 mb-auto w-full">
            <div ref={textWrapperRef} className="will-change-transform">
              <h3 
                className="text-[32px] md:text-[38px] lg:text-[32px] font-bold text-[#141613] leading-[1.15] tracking-[-0.01em] "
                style={{ fontFamily: "'Stack Sans Headline', sans-serif" }}
              >
                {activeTabObj?.text}
              </h3>
              
              {/* Bullets */}
              {activeTabObj?.bullets && (
                <ul className="mt-3 flex flex-col gap-1.3">
                  {activeTabObj.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C1001F] shrink-0"></span>
                      <span className="font-dm-sans text-[14px] md:text-[15px] text-[#141613]/70 font-medium tracking-[-0.01em]">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* TOOLS & BUTTON (Locked to bottom) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 mt-10">
            
            {/* Interactive overlapping icons */}
            <div className="flex items-center -space-x-2 transition-all duration-300">
              {TOOLS.map((tool, i) => (
                <div 
                  key={i} 
                  className="group w-10 h-10 md:w-[42px] md:h-[42px] rounded-full bg-white border border-[#141613]/15 flex items-center justify-center shadow-sm relative z-10 hover:!z-[100] hover:scale-110 transition-all duration-300 cursor-pointer"
                  style={{ zIndex: TOOLS.length - i }}
                >
                  <img 
                    src={tool.icon} 
                    alt={tool.name} 
                    className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] object-contain opacity-90"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Tool name directly below the hovered icon */}
                  <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="font-dm-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-[#141613]/60 whitespace-nowrap">
                      {tool.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Button */}
            <a 
              href="mailto:kaustubh.workspace@gmail.com"
              className="inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 border border-[#C1001F] text-[#C1001F] rounded-full font-dm-sans text-[12px] md:text-[13px] font-bold tracking-[0.04em] uppercase hover:bg-[#C1001F] hover:text-white transition-colors duration-300 whitespace-nowrap"
            >
              Let's get in touch
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
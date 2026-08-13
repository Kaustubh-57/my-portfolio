'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'Making File Sending\nfeel Natural',
    descriptionTop: 'I’m interested in the everyday interactions, ......we stop questioning the awkward flow, unnecessary step or confusing interface that has simply become normal. I like understanding why it happens and turning it into a product experience that feels obvious in hindsight.',
    descriptionBottom: 'I’m interested in the everyday interactions, ......we stop questioning the awkward flow, unnecessary step or confusing interface that has simply become normal. I like understanding why it happens and turning it into a product experience that feels obvious in hindsight.',
    badgeTitle: 'BubbleShare',
    badgeSub: 'Share Anything, Anywhere.',
    bgColor: '#3D2FA9',
    textColor: 'text-white',
    mockups: [
      '/projects/bubble-share/mockup-1.png', 
      '/projects/bubble-share/mockup-2.png', 
      '/projects/bubble-share/mockup-3.png'
    ]
  },
  {
    id: '02',
    title: 'Branding that drives\nconversion & funding.',
    descriptionTop: 'We clarify positioning, define a distinctive tone of voice, and build a visual system that works across acquisition and product.',
    descriptionBottom: 'Each sprint ships a robust logo, pragmatic brand guidelines, and a social kit tailored for scale.',
    badgeTitle: 'Brand Strategy',
    badgeSub: 'Identity & Growth.',
    bgColor: '#FF7722',
    textColor: 'text-white',
    mockups: [
      '/projects/brand/mockup-1.png', 
      '/projects/brand/mockup-2.png', 
      '/projects/brand/mockup-3.png'
    ]
  },
  {
    id: '03',
    title: 'Infection Protocol:\nBehavioral Systems',
    descriptionTop: 'Designing sustainable developmental frameworks through gamification. Analyzing user choices and failure states.',
    descriptionBottom: 'Building a system that intrinsically motivates users toward long-term engagement and environmental impact.',
    badgeTitle: 'System Design',
    badgeSub: 'Behavioral Architecture.',
    bgColor: '#FF3C34',
    textColor: 'text-white',
    mockups: [
      '/projects/infection/mockup-1.png', 
      '/projects/infection/mockup-2.png', 
      '/projects/infection/mockup-3.png'
    ]
  }
];

export default function SelectedWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // We separate the first card (which is already visible) 
    // from the rest of the cards (which need to slide up)
    const cardsToAnimate = cardsRef.current.slice(1);

    if (cardsToAnimate.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        // Scroll distance: 100vh per extra card. This controls how "long" you have to scroll to finish the deck.
        end: `+=${cardsToAnimate.length * 100}%`, 
        pin: true, 
        scrub: 1, // Adds a 1-second physics smoothing delay to the animation
      }
    });

    // Stagger the remaining cards up from below the screen
    cardsToAnimate.forEach((card, index) => {
      tl.fromTo(card,
        { y: '120%' }, // Start off-screen
        { 
          y: '0%',     // Slide into place perfectly covering the last card
          ease: 'none', 
          duration: 1 
        } 
      );
    });
  }, { scope: containerRef });

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#Ffffff] flex flex-col justify-center px-10 md:px-12 pt-6">
      
      {/* Section Header */}
      <div className="w-full max-w-[1440px] mx-auto mb-6 flex-shrink-0">
        <h2 className="font-dm-sans text-2xl md:text-2xl text-[#141613] tracking-[-0.03em] font-medium">
          View Selected Works.
        </h2>
      </div>

      {/* Card Stacking Area */}
      <div className="relative w-full max-w-[1440px] mx-auto h-[82vh] overflow-hidden">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={addToRefs}
            data-cursor="case-study"
            className="absolute top-0 left-0 w-full h-full cursor-none will-change-transform rounded-[0px] shadow-[0_0_40px_rgba(0,0,0,0.15)]"
            style={{ 
              zIndex: index + 1,
              backgroundColor: project.bgColor,
              // The first card renders exactly at 0, the others render off-screen waiting for GSAP
              transform: index === 0 ? 'translateY(0)' : 'translateY(120%)'
            }}
          >
            {/* Inner Fixed Container with Flex Column Layout */}
            <div className="w-full h-full flex flex-col p-8 md:p-12">
              
              {/* --- TOP ROW --- */}
              <div className="relative flex justify-between items-start w-full">
                <div className="max-w-2xl">
                  <h3 className={`font-momo text-4xl md:text-5xl lg:text-[36px] ${project.textColor} whitespace-pre-line leading-[1.08] tracking-[-0.02em]`}>
                    {project.title}
                  </h3>
                  <p className={`font-dm-sans text-sm md:text-[15px] ${project.textColor} opacity-80 mt-6 max-w-[500px] leading-relaxed`}>
                    {project.descriptionTop}
                  </p>
                </div>
                
                <div className={`font-momo text-3xl md:text-3xl ${project.textColor} opacity-60`}>
                  ({project.id})
                </div>
              </div>

              {/* --- MIDDLE DIVIDER & BADGE --- */}
              <div className="relative w-full flex-grow flex items-center">
                <div className="w-full h-px bg-white/20 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-l-2xl rounded-r-2xl py-3 px-6 shadow-2xl flex items-center gap-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-black rounded-full" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-black rounded-full" />
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-dm-sans font-bold text-base leading-none text-black">{project.badgeTitle}</span>
                      <span className="font-dm-sans text-[#4173FE] text-[11px] font-medium mt-1">{project.badgeSub}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- BOTTOM ROW --- */}
              <div className="relative flex flex-col md:flex-row justify-between items-end w-full gap-10">
                <div className="max-w-sm hidden md:block pb-2">
                  <p className={`font-dm-sans text-sm md:text-[15px] ${project.textColor} opacity-80 leading-relaxed`}>
                    {project.descriptionBottom}
                  </p>
                </div>

                {/* Mockup Containers */}
                <div className="flex items-end gap-4 w-full md:w-auto h-[30vh]">
                  {project.mockups.map((src, i) => (
                    <div 
                      key={i} 
                      className="w-1/3 md:w-56 bg-black/10 rounded-2xl overflow-hidden backdrop-blur-sm relative shadow-xl h-full"
                    >
                      <img 
                        src={src} 
                        alt={`Mockup ${i + 1}`} 
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
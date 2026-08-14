'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    slug: 'bubble-share', 
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
    slug: 'brand',
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
    slug: 'infection',
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
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useGSAP(() => {
    const cardsToAnimate = cardsRef.current.slice(1);

    if (cardsToAnimate.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${(cardsToAnimate.length + 1) * 120}%`, 
        pin: true, 
        scrub: 1, 
      }
    });

    cardsToAnimate.forEach((card) => {
      tl.fromTo(card,
        { y: '120%' }, 
        { 
          y: '0%',     
          ease: 'none', 
          duration: 1 
        } 
      );
    });

    tl.to({}, { duration: 0.8 }); 

    // Handle seamless return routing (snap to position instantly, then fade in contents)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get('returnTo');

      if (returnTo) {
        // Fade out inner contents instantly, keeping the white background visible
        gsap.set('.works-content', { opacity: 0 });

        setTimeout(() => {
          ScrollTrigger.refresh(); 
          const st = tl.scrollTrigger;
          if (st) {
            let progress = 0;
            if (returnTo === '01') progress = 0;
            else if (returnTo === '02') progress = 1 / 2.8; 
            else if (returnTo === '03') progress = 2 / 2.8; 

            // Snap scroll instantly
            const targetScroll = st.start + (st.end - st.start) * progress;
            window.scrollTo({ top: targetScroll, behavior: 'instant' });

            // Smoothly fade the content back in
            gsap.to('.works-content', { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.1 });
          }
        }, 50);
      }
    }
  }, { scope: containerRef });

  const handleProjectClick = (slug: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Fade out ONLY the inner content, keeping the white background solid
    gsap.to('.works-content', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push(`/projects/${slug}`);
      }
    });
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={containerRef} id="works" className="relative w-full h-screen bg-[#ffffff] flex flex-col justify-center px-10 md:px-12 pt-6">
      
      {/* Wrapper to fade contents without losing the white background */}
      <div className="works-content w-full h-full flex flex-col justify-center">
        
        <div className="w-full max-w-[1440px] mx-auto mb-6 flex-shrink-0">
          <h2 className="font-dm-sans text-2xl md:text-2xl text-[#141613] tracking-[-0.03em] font-medium">
            View Selected Works.
          </h2>
        </div>

        <div className="relative w-full max-w-[1440px] mx-auto h-[82vh] overflow-hidden">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={addToRefs}
              data-cursor="case-study"
              onClick={() => handleProjectClick(project.slug)}
              className="absolute top-0 left-0 w-full h-full cursor-none will-change-transform rounded-[0px] shadow-[0_0_40px_rgba(0,0,0,0.15)]"
              style={{ 
                zIndex: index + 1,
                backgroundColor: project.bgColor,
                transform: index === 0 ? 'translateY(0)' : 'translateY(120%)'
              }}
            >
              <div className="block w-full h-full flex flex-col p-8 md:p-12">
                
                <div className="relative flex justify-between items-start w-full">
                  <div className="max-w-2xl">
                    <h3 className={`font-momo text-4xl md:text-5xl lg:text-[48px] ${project.textColor} whitespace-pre-line leading-[1.08] tracking-[-0.02em]`}>
                      {project.title}
                    </h3>
                    <p className={`font-dm-sans text-sm md:text-[15px] ${project.textColor} opacity-80 mt-6 max-w-[500px] leading-relaxed`}>
                      {project.descriptionTop}
                    </p>
                  </div>
                  
                  <div className={`font-momo text-3xl md:text-4xl ${project.textColor} opacity-60`}>
                    ({project.id})
                  </div>
                </div>

                <div className="relative w-full flex-grow flex items-center">
                  <div className="w-full h-px bg-white/20 relative">
            
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row justify-between items-end w-full gap-10">
                  <div className="max-w-sm hidden md:block pb-2">
                    <p className={`font-dm-sans text-sm md:text-[15px] ${project.textColor} opacity-80 leading-relaxed`}>
                      {project.descriptionBottom}
                    </p>
                  </div>

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
      </div>
    </section>
  );
}
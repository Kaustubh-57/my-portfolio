'use client';

import React, { useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRouter, usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

// --- UPDATED: Reordered so Shoppin is 1st and Bubbleshare is 2nd ---
const allProjects = [
  {
    id: '01',
    slug: 'shoppin',
    badge: 'UX/UI Design • UX RESEARCH',
    title: 'Shoppin: Making street shopping easier to explore.',
    description: 'A digital experience designed to help people discover, locate and save street-market stalls without taking away the spontaneity of shopping offline.',
    role: 'UX Research · Product Design · UI/UX · Usability Testing',
    image: '/projects/shoppin/mockup.png', 
    bgColor: '#FFFAF1', 
    accentColor: '#672424', 
    textColor: '#151515' 
  },
  {
    id: '02',
    slug: 'bubbleshare',
    badge: 'INTERACTION Design • UX/UI Design',
    title: 'Bubbleshare: Making file\n sending feel natural',
    description: 'A file-sharing experience that turns an invisible digital process into something tangible and intuitive.',
    role: 'Concept  | UI ideation | Prototyping',
    image: '/projects/bubbleshare/mockup.png',
    bgColor: '#4438B5', 
    accentColor: '#fffc34',
    textColor: '#FFFFFF'
  },
  {
    id: '03',
    slug: 'decicon', 
    badge: 'SYSTEM DESIGN • UX/UI Design',
    title: 'Decicon : A quieter way to experience the everyday.', 
    description: 'A connected physical-digital system designed to rethink how people experience and respond to everyday noise.',
    role: 'Concept | Physical Product | UI ideation',
    image: '/projects/decicon/mockup.png', 
    bgColor: '#171918',
    accentColor: '#C7E86B',
    textColor: '#FFFFFF'
  },
  {
    id: '04',
    slug: 'chromebuds',
    badge: 'INDUSTRIAL DESIGN • UX Design',
    title: 'Chromebuds: Rethinking\nwhy people are leaving\nTWS behind.',
    description: 'A product redesign exploring comfort, convenience and everyday usability in TWS.',
    role: 'Concept | Physical Product | UI ideation',
    image: '/projects/chromebuds/mockup.png', 
    bgColor: '#F1F0EC', 
    accentColor: '#176BCC', 
    textColor: '#151515'
  }
];

export default function SelectedWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isHome = pathname === '/';

  // Filters projects based on the page
  const projects = useMemo(() => {
    return isHome 
      ? allProjects.filter(p => ['shoppin', 'bubbleshare', 'decicon'].includes(p.slug))
      : allProjects; 
  }, [isHome]);

  useGSAP(() => {
    const validCards = cardsRef.current.slice(0, projects.length);
    const cardsToAnimate = validCards.slice(1);

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
      if (card) {
        tl.fromTo(card,
          { y: '120%' }, 
          { y: '0%', ease: 'none', duration: 1 } 
        );
      }
    });

    tl.to({}, { duration: 0.8 }); 

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get('returnTo');

      if (returnTo) {
        gsap.set('.works-content', { opacity: 0 });

        setTimeout(() => {
          ScrollTrigger.refresh(); 
          const st = tl.scrollTrigger;
          if (st) {
            const projectIndex = projects.findIndex(p => p.slug === returnTo);
            let progress = 0;
            
            if (projectIndex > 0) {
               progress = projectIndex / (projects.length - 0.2); 
            }

            const targetScroll = st.start + (st.end - st.start) * progress;
            window.scrollTo({ top: targetScroll, behavior: 'instant' });

            gsap.to('.works-content', { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.1 });
          }
        }, 50);
      }
    }
  }, { scope: containerRef, dependencies: [projects] });

  const handleProjectClick = (slug: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    gsap.to('.works-content', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push(`/projects/${slug}`);
      }
    });
  };

  return (
    <section ref={containerRef} id="works" className="relative w-full h-screen bg-[#ffffff] flex flex-col justify-center px-10 md:px-12 pt-6">
      <div className="works-content w-full h-full flex flex-col justify-center">
        <div className="w-full max-w-[1440px] mx-auto mb-6 flex-shrink-0">
          <h2 className="font-dm-sans text-2xl md:text-2xl text-[#141613] tracking-[-0.03em] font-medium">
            View Selected Works.
          </h2>
        </div>

        <div className="relative w-full max-w-[1440px] mx-auto h-[82vh] overflow-hidden">
          {projects.map((project, index) => {
            const displayId = `0${index + 1}`;

            return (
              <div
                key={project.slug}
                ref={(el) => { cardsRef.current[index] = el; }}
                data-cursor="case-study"
                onClick={() => handleProjectClick(project.slug)}
                className="absolute top-0 left-0 w-full h-full cursor-none will-change-transform rounded-[0px] shadow-[0_0_40px_rgba(0,0,0,0.15)]"
                style={{ 
                  zIndex: index + 1,
                  transform: index === 0 ? 'translateY(0)' : 'translateY(120%)',
                  backgroundColor: project.bgColor 
                }}
              >
                <div className="w-full h-full flex flex-col pt-10 pl-10 md:pt-12 md:pl-12 pointer-events-none">
                  

                  <div className="flex-grow flex flex-col md:flex-row w-full justify-between items-end pb-0 min-h-0">
                    <div className="w-full md:w-[60%] flex flex-col justify-between h-full pb-8 md:pb-10 pr-8 md:pr-12 min-h-0">
                      <div>
                        <h3 className="font-momo text-4xl md:text-5xl lg:text-[40px] whitespace-pre-line leading-[1.08] tracking-[-0.02em]" style={{ color: project.textColor }}>
                          {project.title}
                        </h3>
                        <p className="font-dm-sans text-[15px] md:text-base mt-6 max-w-[480px] leading-relaxed" style={{ color: project.textColor, opacity: 0.8 }}>
                          {project.description}
                        </p>
                      </div>

                      <div className="w-full max-w-[480px]">
                        <div className="w-full h-px mb-6" style={{ backgroundColor: project.textColor, opacity: 0.2 }}></div>
                        
                        <div className="flex flex-col gap-1 mb-8">
                          <span className="font-dm-sans text-[15px]" style={{ color: project.textColor, opacity: 0.6 }}>My role:</span>
                          <span className="font-dm-sans text-[15px] md:text-base" style={{ color: project.textColor }}>{project.role}</span>
                        </div>

                        <div className="flex items-center gap-4 font-dm-sans text-[15px] md:text-base" style={{ color: project.accentColor }}>
                          <span>View Case Study</span>
                          <svg className="w-12 h-3" viewBox="0 0 40 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="0" y1="8" x2="38" y2="8"></line>
                            <polyline points="32 2 38 8 32 14"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-[48%] h-[40vh] md:h-full relative rounded-tl-[10px] overflow-hidden bg-black/5 shadow-2xl mt-8 md:mt-0">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover object-left-top"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
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
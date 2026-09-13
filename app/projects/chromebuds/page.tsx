'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const SIDEBAR_ITEMS = [
  { id: '01', title: 'Overview', target: 'overview' },
  { id: '02', title: 'The Context', target: 'context' },
  { id: '03', title: 'Digging Deeper', target: 'deeper' },
  { id: '04', title: 'The Direction', target: 'direction' },
  { id: '05', title: 'Designing Chromebuds', target: 'designing' },
  { id: '06', title: 'Key Features', target: 'features' },
  { id: '07', title: 'Prototyping & Testing', target: 'prototyping' },
  { id: '08', title: 'Iterations', target: 'iterations' },
  { id: '09', title: 'Final Experience', target: 'final' },
  { id: '10', title: 'Reflection', target: 'reflection' }
];

export default function ChromebudsCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const [activeSection, setActiveSection] = useState('01');
  const [isExiting, setIsExiting] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo('.sidebar-anim',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }
    );

    tl.fromTo('.overview-anim',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
      '-=0.6'
    );

    SIDEBAR_ITEMS.forEach((item) => {
      const element = document.getElementById(item.target);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveSection(item.id);
            }
          }
        });
      }
    });

  }, { scope: containerRef });

  const handleGoBack = () => {
    if (isExiting) return;
    setIsExiting(true);

    gsap.to('.case-study-content', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push('/?returnTo=chromebuds');
      }
    });
  };

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-[#ffffff]">
      <Navbar />
      
      <div className="case-study-content w-full flex">
        
        {/* --- LEFT SIDEBAR (Light Beige Background) --- */}
        <aside className="hidden lg:flex flex-col w-[19%] h-screen sticky top-0 bg-[#F1F0EC] pl-6 xl:pl-10 pt-[120px] pb-12 z-20 border-r border-[#151515]/10 shadow-[8px_0_30px_rgba(0,0,0,0.12)]">
          <button 
            onClick={handleGoBack}
            className="sidebar-anim flex items-center justify-center gap-2 w-fit px-5 py-2 rounded-full border border-[#151515]/30 text-[#151515] font-dm-sans text-[14px] tracking-[-0.05em] hover:bg-[#151515] hover:text-white transition-colors duration-300 mb-14 opacity-0"
            data-cursor="hover"
          >
            <span className="text-lg leading-none -mt-[2px]">←</span> Go back
          </button>

          <nav className="flex flex-col gap-4 font-dm-sans text-[14px] xl:text-[15px] tracking-[-0.05em]">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.target)}
                  className={`sidebar-anim flex items-center gap-4 text-left transition-all duration-300 opacity-0 ${
                    isActive ? 'text-[#176BCC] font-medium' : 'text-[#151515]/40 hover:text-[#151515]/80'
                  }`}
                  data-cursor="hover"
                >
                  <span className="text-[11px] xl:text-xs font-momo w-4">{item.id}</span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* --- RIGHT CONTENT --- */}
        <div className="w-full lg:w-[81%] px-6 lg:px-12 xl:px-16 pt-[120px] pb-32 overflow-hidden z-10">
          
          {/* =========================================
              SECTION 1: OVERVIEW (Light Beige Header)
          ========================================= */}
          <div className="-mt-[120px] -mx-6 lg:-mx-12 xl:-mx-16 pt-[120px] pb-0 bg-[#F1F0EC] border-b border-[#151515]/10 flex flex-col">
            <section id="overview" className="w-full max-w-[1400px] mx-auto flex flex-col flex-1">
              
              {/* Text Area */}
              <div className="px-6 lg:px-12 xl:px-16 w-full flex flex-col">
                <div className="overview-anim flex justify-between items-center w-full pr-0 mb-10 opacity-0 mt-6 lg:mt-0">
                  <div 
                    className="inline-flex items-center px-6 md:px-7 py-1.5 md:py-2 rounded-full border-[1.5px] border-[#176BCC]/30 font-dm-sans text-xs tracking-wider uppercase text-[#176BCC]"
                  >
                    INDUSTRIAL DESIGN • UX Design
                  </div>
                  <div className="font-momo text-2xl md:text-3xl font-light text-[#151515]/60">
                    (01)
                  </div>
                </div>

                <h1 className="overview-anim font-momo text-[36px] lg:text-[40px] xl:text-[48px] font-bold leading-[1.1] text-[#151515] tracking-[-0.02em] max-w-[850px] mb-6 opacity-0">
                  Chromebuds: Rethinking why people are leaving TWS behind.
                </h1>
                <p className="overview-anim font-dm-sans text-[16px] lg:text-[18px] leading-[1.5] text-[#151515]/80 tracking-[-0.05em] max-w-[700px] mb-12 lg:mb-16 opacity-0">
                  A product redesign exploring comfort, convenience and everyday usability in TWS.
                </p>
              </div>

              {/* Image Area */}
              <div className="overview-anim w-full opacity-0 mt-auto flex items-end px-3 lg:px-5">
                <img 
                  src="/projects/chromebuds/hero.png" 
                  alt="Chromebuds interface showcase" 
                  className="w-full h-auto object-cover rounded-t-[16px] md:rounded-t-[20px] rounded-b-none block align-bottom"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            </section>
          </div>

          {/* Project Details Grid (White Background) */}
          <div className="w-full pt-16 lg:pt-20">
            <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 lg:gap-16">
              
              <div className="flex flex-col gap-8 mt-1">
                <div className="overview-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">Timeframe</h3>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em]">Aug 2025 – Oct 2025</p>
                </div>
                <div className="overview-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">Done at</h3>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em]">NMIMS School of Design</p>
                </div>
                <div className="overview-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">The Team</h3>
                  <ul className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em] leading-relaxed">
                    <li>Kaustubh Korde</li>
                    <li>Placeholder Team Member</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="overview-anim opacity-0">
                  <h2 className="font-momo text-[24px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] mb-3">Context</h2>
                  <div className="flex flex-col gap-4 font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.4]">
                    <p>[Placeholder for Context] I started noticing how differently people navigate street markets compared to regular streets. At Hill Road, people weren't always relying on shop names or addresses. They used cafés, familiar shops and other landmarks to remember where things were.</p>
                    <p>That made me look at the problem differently. Instead of trying to turn street shopping into another online marketplace, I wanted to explore how a digital product could help people navigate the market that already exists.</p>
                  </div>
                </div>
                <div className="overview-anim opacity-0">
                  <h2 className="font-momo text-[24px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] mb-3">My role</h2>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.4]">
                    <li>Concept and Research</li>
                    <li>Physical Product Design</li>
                    <li>UI/UX Ideation & Prototyping</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* =========================================
              FULL BLEED FIGMA EXPORT (Seamless)
          ========================================= */}
          <div className="overview-anim -mx-6 lg:-mx-12 xl:-mx-16 mt-16 lg:mt-24 opacity-0 flex flex-col">
            <img 
              src="/projects/chromebuds/presentation-part-1.png" 
              alt="Chromebuds Case Study Overview" 
              className="w-full h-auto block"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

// --- UPDATED: Only kept Overview and Context ---
const SIDEBAR_ITEMS = [
  { id: '01', title: 'Overview', target: 'overview' },
  { id: '02', title: 'The Context', target: 'context' }
];

export default function LilavatiCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const [activeSection, setActiveSection] = useState('01');
  const [isExiting, setIsExiting] = useState(false);

  // --- REFACTORED PROGRESS BAR LOGIC ---
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hasStartedLoading = useRef(false);

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

    // Only keeping context-anim since other sections were removed
    const sectionClasses = ['.context-anim'];
    
    sectionClasses.forEach(selector => {
      gsap.utils.toArray(selector).forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });
    });

    SIDEBAR_ITEMS.forEach((item) => {
      ScrollTrigger.create({
        trigger: `#${item.target}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(item.id);
          }
        }
      });
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
        router.push('/?returnTo=lilavati');
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
        
        {/* --- LEFT SIDEBAR --- */}
        <aside className="hidden lg:flex flex-col w-[19%] h-screen sticky top-0 bg-[#F4F7FA] pl-6 xl:pl-10 pt-[120px] pb-12 z-10 border-r border-[#141613]/5">
          <button 
            onClick={handleGoBack}
            className="sidebar-anim flex items-center justify-center gap-2 w-fit px-5 py-2 rounded-full border border-[#262626] text-[#262626] font-dm-sans text-[14px] tracking-[-0.05em] hover:bg-[#262626] hover:text-[#F4F7FA] transition-colors duration-300 mb-14 opacity-0"
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
                    isActive ? 'text-[#262626] font-medium' : 'text-[#262626]/40 hover:text-[#262626]/80'
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
        <div className="w-full lg:w-[81%] px-6 lg:px-12 xl:px-16 pt-[120px] pb-32 overflow-hidden">
          
          {/* =========================================
              SECTION 1: OVERVIEW 
          ========================================= */}
          <div className="-mt-[180px] -mx-6 lg:-mx-12 xl:-mx-16 pt-[80px] lg:pt-[100px] pb-12 lg:pb-20 bg-[#F4F7FA] border-b border-[#262626]/10 flex flex-col justify-center min-h-[90vh]">
            <section id="overview" className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 xl:gap-16 px-6 lg:px-12 xl:px-16">
              
               {/* Left Column: Interactive Prototype (Raw Figma Embed) */}
              <div className="overview-anim flex flex-col items-center w-full lg:w-auto opacity-0 order-2 lg:order-1 pt-4 lg:pt-0 shrink-0">
                <div className="relative w-[320px] sm:w-[380px] h-[650px] sm:h-[750px]">
                  {/* Clean Figma Iframe */}
                  <iframe
                    src="https://embed.figma.com/proto/BhakxuFIy0K6W8cbR8GiAm/Untitled?node-id=1-13961&viewport=-492%2C-1980%2C0.33&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&hide-ui=1&embed-host=share"
                    title="Lilavati Interactive Prototype"
                    className="w-full h-full border-0 relative z-0"
                    allowFullScreen
                    onLoad={() => {
                      // Block multiple onLoad triggers
                      if (hasStartedLoading.current) return;
                      hasStartedLoading.current = true;
                      
                      // Smooth GSAP bar animation
                      if (progressBarRef.current) {
                        gsap.to(progressBarRef.current, {
                          width: '100%',
                          duration: 10,
                          ease: 'none', // linear fill
                          onComplete: () => setIsIframeLoading(false)
                        });
                      } else {
                        // Fallback
                        setTimeout(() => setIsIframeLoading(false), 10000);
                      }
                    }} 
                  />
                </div>
              </div>

              {/* Right Column: Text & Details */}
              <div className="overview-anim flex-1 flex flex-col items-start w-full opacity-0 order-1 lg:order-2 mt-6 lg:mt-[60px] xl:mt-[80px]">
                
                <div className="flex items-center w-full mb-6 lg:mb-8">
                  <div 
                    className="inline-flex items-center px-6 md:px-7 py-1.5 md:py-2 rounded-full border-[1.5px] border-[#262626]/30 font-dm-sans text-[11px] md:text-xs tracking-wider uppercase text-[#262626]/80"
                  >
                    UX/UI REDESIGN • USABILITY TESTING • HEALTHCARE
                  </div>
                </div>

                <h1 className="font-momo text-[32px] lg:text-[36px] xl:text-[42px] font-bold leading-[1.1] text-[#262626] tracking-[-0.02em] max-w-[550px] mb-5">
                  Lilavati Hospital: Streamlining healthcare access.
                </h1>
                <p className="font-dm-sans text-[15px] lg:text-[16px] leading-[1.5] text-[#262626]/80 tracking-[-0.05em] max-w-[550px]">
                  A comprehensive redesign of the digital experience to simplify critical user journeys, including booking appointments, comparing health checkup packages, and streamlining job applications.
                </p>

                {/* Note directly beneath the prototype */}
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#262626]/50 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                    <p className="font-dm-sans text-[13px] text-[#262626]/60 tracking-[-0.02em] leading-relaxed">
                      Interact with the final version of the prototype here.<br/>
                    </p>
                  </div>

                  {/* Windows-style progress bar */}
                  {isIframeLoading && (
                    <div className="flex flex-col gap-2 pl-6 pt-1">
                      <div className="w-[200px] h-2 border border-[#262626]/20 bg-[#262626]/5 p-[1px] rounded-[2px] overflow-hidden">
                        <div 
                          ref={progressBarRef}
                          className="h-full bg-[#262626] rounded-[1px]" 
                          style={{ width: '0%' }}
                        />
                      </div>
                      <p className="font-dm-sans text-[13px] text-[#262626]/50 tracking-[-0.02em]">
                        The prototype is loading.
                      </p>
                    </div>
                  )}
                </div>
              
              </div>

            </section>
          </div>

          {/* Project Details Grid (White Background) */}
          <div className="w-full pt-16 lg:pt-20">
            <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 lg:gap-16">
              
              <div className="flex flex-col gap-8 mt-1">
                <div className="overview-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">Timeframe</h3>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em]">Fall 2023</p>
                </div>
                <div className="overview-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">Done at</h3>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em]">NMIMS School of Design</p>
                </div>
                <div className="overview-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">The Team</h3>
                  <ul className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em] leading-relaxed">
                    <li>Kaustubh Korde</li>
                    <li>Design Team Member</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="overview-anim opacity-0">
                  <h2 className="font-momo text-[24px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] mb-3">Context</h2>
                  <div className="flex flex-col gap-4 font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.4]">
                    <p>Lilavati Hospital is one of Mumbai's premier healthcare facilities. However, patients frequently encountered friction when trying to utilize their digital services. We observed that key tasks, such as booking an appointment or a health checkup, were unnecessarily complex and lacked transparency.</p>
                    <p>The goal of this project was to completely redesign the mobile experience, conducting rigorous usability testing on new flows like appointment booking and job applications to ensure a seamless experience for all users.</p>
                  </div>
                </div>
                <div className="overview-anim opacity-0">
                  <h2 className="font-momo text-[24px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] mb-3">My role</h2>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.4]">
                    <li>Led UX Research and structured the primary user personas.</li>
                    <li>Designed the redesigned Homepage and key navigation flows.</li>
                    <li>Conducted Usability Testing on critical tasks (e.g., Faux-Applying for a job, Booking a health checkup).</li>
                    <li>Prototyped the final high-fidelity mobile experience in Figma.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <hr className="overview-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 2: THE CONTEXT 
          ========================================= */}
          <section id="context" className="w-full">
            <div className="flex flex-col md:flex-row justify-between gap-8 lg:gap-12 items-stretch">
              <div className="flex flex-col justify-between w-full md:w-[48%] lg:w-[46%] py-2">
                <div className="flex flex-col gap-6">
                  <h2 className="context-anim font-momo text-[22px] lg:text-[26px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] opacity-0 max-w-[480px]">
                    Great healthcare needs a great digital front door.
                  </h2>
                  <p className="context-anim font-dm-sans text-[13px] lg:text-[15px] text-[#262626]/80 tracking-[-0.05em] leading-[1.6] opacity-0 max-w-[460px]">
                    We started looking at how people actually interact with hospital websites during stressful times. We noticed that finding a specific doctor or comparing medical packages often felt overwhelming and disconnected.
                  </p>
                  <p className="context-anim font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.6] opacity-0 max-w-[460px]">
                    What stood out to us during testing was that patients didn't just want to book an appointment; they wanted to understand the prerequisites, pricing, and availability upfront without having to make a phone call.
                  </p>
                </div>
                <h2 className="context-anim font-momo text-[22px] lg:text-[26px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.25] mt-16 md:mt-auto opacity-0 max-w-[460px]">
                  If the medical care is seamless, why shouldn't the booking process be?
                </h2>
              </div>

              <div className="flex flex-col items-center justify-start w-full md:w-[48%] lg:w-[45%] context-anim opacity-0">
                <div className="relative w-full aspect-[3/4] rounded-[16px] overflow-hidden group cursor-crosshair bg-[#f5f5f5]">
                  <img 
                    src="/projects/lilavati/context-1.png" 
                    alt="Lilavati previous design flow" 
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0 z-20"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <img 
                    src="/projects/lilavati/context-2.png" 
                    alt="Lilavati navigation problem" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-105 z-10"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <p className="font-dm-sans text-[12px] lg:text-[13px] text-[#262626]/60 tracking-[-0.05em] mt-3 text-center">
                  *
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
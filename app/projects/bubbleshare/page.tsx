'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import About from '@/components/About'; 

gsap.registerPlugin(ScrollTrigger);

export default function BubbleshareCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const [isExiting, setIsExiting] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo('.overview-anim',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }
    );

    // Fade in the back-to-top section when scrolled to the bottom
    gsap.fromTo('.footer-anim',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-anim', start: 'top 95%', toggleActions: 'play none none none' }
      }
    );

    // Fade in section scroll triggers (added .concept-anim and .video-anim)
    const sectionClasses = ['.concept-anim', '.video-anim'];
    
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

  }, { scope: containerRef });

  const handleGoBack = () => {
    if (isExiting) return;
    setIsExiting(true);

    gsap.to('.case-study-content', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push('/?returnTo=bubbleshare');
      }
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-[#ffffff]">
      <Navbar />
      
      <div className="case-study-content w-full flex flex-col">
        
        {/* --- MAIN CONTENT (Full Width - NO SIDEBAR) --- */}
        <div className="w-full px-6 lg:px-12 xl:px-16 pt-[120px] pb-24 overflow-hidden z-10">
          
          {/* =========================================
              SECTION 1: OVERVIEW (Dark Blue Header)
          ========================================= */}
          <div className="-mt-[120px] -mx-6 lg:-mx-12 xl:-mx-16 pt-[120px] pb-0 bg-[#4438B5] border-b border-white/10 flex flex-col">
            <section id="overview" className="w-full max-w-[1400px] mx-auto flex flex-col flex-1">
              
              {/* Text Area */}
              <div className="px-6 lg:px-12 xl:px-16 w-full flex flex-col pt-8 lg:pt-10">
                
                {/* Top Actions: Go Back Button */}
                <button 
                  onClick={handleGoBack}
                  className="overview-anim flex items-center justify-center gap-2 w-fit px-5 py-2 rounded-full border border-white/30 text-white font-dm-sans text-[14px] tracking-[-0.05em] hover:bg-white hover:text-[#4438B5] transition-colors duration-300 mb-10 opacity-0"
                  data-cursor="hover"
                >
                  <span className="text-lg leading-none -mt-[2px]">←</span> Go back
                </button>

                {/* Tags */}
                <div className="overview-anim flex items-center w-full mb-8 opacity-0">
                  <div 
                    className="inline-flex items-center px-6 md:px-7 py-1.5 md:py-2 rounded-full border-[1.5px] border-[#fffc34]/30 font-dm-sans text-xs tracking-wider uppercase text-[#fffc34]"
                  >
                    INTERACTION Design • UX/UI Design
                  </div>
                </div>

                <h1 className="overview-anim font-momo text-[36px] lg:text-[40px] xl:text-[48px] font-bold leading-[1.1] text-white tracking-[-0.02em] max-w-[850px] mb-6 opacity-0">
                  Bubbleshare: Making file sending feel natural.
                </h1>
                <p className="overview-anim font-dm-sans text-[16px] lg:text-[18px] leading-[1.5] text-white/80 tracking-[-0.05em] max-w-[700px] mb-12 lg:mb-16 opacity-0">
                  A file-sharing experience that turns an invisible digital process into something tangible and intuitive.
                </p>
              </div>

              {/* Image Area */}
              <div className="overview-anim w-full opacity-0 mt-auto flex items-end px-3 lg:px-5">
                <img 
                  src="/projects/bubbleshare/hero.png" 
                  alt="Bubbleshare interface showcase" 
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
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em]">May 2025 (4 weeks)</p>
                </div>
                <div className="overview-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">Done at</h3>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em]">NMIMS School of Design</p>
                </div>
                <div className="overview-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">The Team</h3>
                  <ul className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em] leading-relaxed">
                    <li>Kaustubh Korde</li>
                    <li>Aaron Carvalho</li>
                    <li>Sai Ghate</li>
                    <li>Rohit Chhatre</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="overview-anim opacity-0">
                  <h2 className="font-momo text-[24px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] mb-3">Context</h2>
                  <div className="flex flex-col gap-4 font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.4]">
                    <p>File transfer works, but the experience often feels invisible and uncertain.</p>
                    <p>Moving files between devices and operating systems can involve friction, while conventional progress bars give users little sense of what is actually happening. </p>
                    <p>BubbleShare explores a more human way to experience file transfer by giving digital files a visible, tangible presence through a physics-based bubble metaphor.</p>
                  </div>
                </div>
                <div className="overview-anim opacity-0">
                  <h2 className="font-momo text-[24px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] mb-3">My role</h2>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.4]">
                    <li>I contributed to the initial ideation and core product concept, helping define how BubbleShare could rethink the file transfer experience. I also worked on the UI design and final visual execution of the product.</li>
                    <li>Concept Development · Interaction Direction · UI Design · Visual Execution</li>
                    
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <hr className="concept-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 2: CONCEPT (Text + 1 Image)
          ========================================= */}
          <section id="concept" className="w-full">
            <div className="flex flex-col md:flex-row justify-between gap-8 lg:gap-12 items-stretch">
              
              {/* LEFT SIDE: Text Analysis block */}
              <div className="flex flex-col justify-between w-full md:w-[48%] lg:w-[55%] py-2">
                <div className="flex flex-col gap-6">
                  <h2 className="concept-anim font-momo text-[22px] lg:text-[38px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] opacity-0 max-w-[580px]">
                    File sharing is not necessary<br/> to feel technical
                  </h2>
                  <p className="concept-anim font-dm-sans text-[13px] lg:text-[18px] text-[#262626]/80 tracking-[-0.05em] leading-[1.6] opacity-0 max-w-[460px]">
                   .
                  </p>
                  <p className="concept-anim font-dm-sans text-[13px] lg:text-[18px] text-[#262626]/80 tracking-[-0.05em] leading-[1.6] opacity-0 max-w-[460px]">
                    Bubbleshare started with a simple question:
                  </p>
                </div>
                <h2 className="concept-anim font-momo text-[22px] lg:text-[32px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.25] mt-16 md:mt-auto opacity-0 max-w-[600px]">
                  What if sharing a digital file was as easy as handing over a physical object?
                </h2>
              </div>

              {/* RIGHT SIDE: 1 Static Image */}
              <div className="flex flex-col items-end justify-start w-full md:w-[48%] lg:w-[50%] concept-anim opacity-0">
                <div className="relative w-full h-[280px] sm:h-[350px] lg:h-[400px] rounded-[8px] overflow-hidden  group cursor-pointer">
                  <img 
                    src="/projects/bubbleshare/concept.png" 
                    alt="Bubbleshare interaction concept" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              </div>

            </div>
          </section>

          <hr className="video-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 3: VIMEO VIDEO
          ========================================= */}
          <section id="narrative-video" className="w-full">
            <div className="video-anim opacity-0 flex flex-col w-full max-w-[1400px] mx-auto">
              <h2 className="font-momo text-[22px] lg:text-[26px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] mb-6 md:mb-8 text-left">
                How BubbleShare file sending works
              </h2>
              
              <div className="w-[90%] mx-auto">
                {/* Vimeo Embed Wrapper with updated 16:9 aspect padding */}
                <div className="relative w-full bg-gray-100 overflow-hidden rounded-[8px]" style={{ padding: '56.25% 0 0 0' }}>
                  <iframe 
                    src="https://player.vimeo.com/video/1228585427?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title="bubbleshare"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>

          <hr className="overview-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              FULL BLEED FIGMA EXPORT (Seamless)
          ========================================= */}
          <div className="overview-anim -mx-6 lg:-mx-12 xl:-mx-16 opacity-0 flex flex-col">
            <img 
              src="/projects/bubbleshare/presentation-part-10.png" 
              alt="Bubbleshare Case Study Overview" 
              className="w-full h-auto block"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* =========================================
              BACK TO TOP
          ========================================= */}
          <div className="footer-anim opacity-0 w-full flex flex-col items-center justify-center pt-12 pb-24 mt-8 border-t border-[#262626]/10">
            
            {/* Back to Top Button (Themed for Bubbleshare) */}
            <button
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-[#4438B5] flex items-center justify-center text-[#ffffff] transition-transform duration-300 group-hover:-translate-y-2 shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </div>
              <span className="font-dm-sans text-[14px] font-bold tracking-[-0.02em] text-[#262626]/50 group-hover:text-[#262626] transition-colors">
                Back to top
              </span>
            </button>

          </div>

        </div>
      </div>

      {/* --- Contact Footer Module (From About Page) --- */}
      <About hideIntro={true} />

    </main>
  );
}
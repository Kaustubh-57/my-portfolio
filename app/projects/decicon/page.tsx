'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import About from '@/components/About'; 

gsap.registerPlugin(ScrollTrigger);

export default function DeciconCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const [isExiting, setIsExiting] = useState(false);

  // Audio references for the 3 hoverable images
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  
  // Reference for the Vimeo Iframe
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // --- UPDATED: Play hover audio & mute global music ---
  const playAudio = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => console.log("Audio playback prevented:", err));

      const globalAudio = (window as any).__bgMusic;
      if (globalAudio && !globalAudio.paused) {
        (window as any).__wasMusicPlayingBeforeHover = true;
        gsap.killTweensOf(globalAudio);
        gsap.to(globalAudio, { 
          volume: 0, 
          duration: 0.3, 
          onComplete: () => globalAudio.pause() 
        });
      }
    }
  };

  // --- UPDATED: Stop hover audio & resume global music ---
  const stopAudio = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      audio.pause();

      const globalAudio = (window as any).__bgMusic;
      if (globalAudio && (window as any).__wasMusicPlayingBeforeHover) {
        (window as any).__wasMusicPlayingBeforeHover = false;
        globalAudio.play().catch(() => {});
        gsap.killTweensOf(globalAudio);
        gsap.to(globalAudio, { volume: 0.5, duration: 0.5 });
      }
    }
  };

  // --- Vimeo Player API Integration to sync with background music ---
  useEffect(() => {
    let player: any = null;

    const initVimeoPlayer = () => {
      if (iframeRef.current && (window as any).Vimeo) {
        player = new (window as any).Vimeo.Player(iframeRef.current);
        
        // When Vimeo plays, pause the background music
        player.on('play', () => {
          const globalAudio = (window as any).__bgMusic;
          if (globalAudio && !globalAudio.paused) {
            (window as any).__wasMusicPlayingBeforeVideo = true;
            gsap.killTweensOf(globalAudio);
            gsap.to(globalAudio, { 
              volume: 0, 
              duration: 0.5, 
              onComplete: () => globalAudio.pause() 
            });
          }
        });

        // When Vimeo pauses or ends, resume the background music
        const resumeAudio = () => {
          const globalAudio = (window as any).__bgMusic;
          if (globalAudio && (window as any).__wasMusicPlayingBeforeVideo) {
            (window as any).__wasMusicPlayingBeforeVideo = false;
            globalAudio.play().catch(() => {});
            gsap.killTweensOf(globalAudio);
            gsap.to(globalAudio, { volume: 0.5, duration: 0.5 });
          }
        };

        player.on('pause', resumeAudio);
        player.on('ended', resumeAudio);
      }
    };

    // Dynamically inject Vimeo's SDK if it isn't already loaded
    if (!(window as any).Vimeo) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.onload = initVimeoPlayer;
      document.body.appendChild(script);
    } else {
      initVimeoPlayer();
    }

    return () => {
      if (player) {
        player.off('play');
        player.off('pause');
        player.off('ended');
      }
    };
  }, []);

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

    // Fade in section scroll triggers
    const sectionClasses = ['.context-anim', '.problem-anim', '.video-anim'];
    
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
        router.push('/?returnTo=decicon');
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
              SECTION 1: OVERVIEW (Dark Charcoal Header)
          ========================================= */}
          <div className="-mt-[120px] -mx-6 lg:-mx-12 xl:-mx-16 pt-[120px] pb-0 bg-[#171918] border-b border-white/10 flex flex-col">
            <section id="overview" className="w-full max-w-[1400px] mx-auto flex flex-col flex-1">
              
              {/* Text Area */}
              <div className="px-6 lg:px-12 xl:px-16 w-full flex flex-col pt-8 lg:pt-10">
                
                {/* Top Actions: Go Back Button */}
                <button 
                  onClick={handleGoBack}
                  className="overview-anim flex items-center justify-center gap-2 w-fit px-5 py-2 rounded-full border border-white/30 text-white font-dm-sans text-[14px] tracking-[-0.05em] hover:bg-white hover:text-[#171918] transition-colors duration-300 mb-10 opacity-0"
                  data-cursor="hover"
                >
                  <span className="text-lg leading-none -mt-[2px]">←</span> Go back
                </button>

                {/* Tags */}
                <div className="overview-anim flex items-center w-full mb-8 opacity-0">
                  <div 
                    className="inline-flex items-center px-6 md:px-7 py-1.5 md:py-2 rounded-full border-[1.5px] border-[#C7E86B]/30 font-dm-sans text-xs tracking-wider uppercase text-[#C7E86B]"
                  >
                    SYSTEM DESIGN • UX/UI Design
                  </div>
                </div>

                <h1 className="overview-anim font-momo text-[36px] lg:text-[40px] xl:text-[48px] font-bold leading-[1.1] text-white tracking-[-0.02em] max-w-[850px] mb-6 opacity-0">
                  Decicon: A quieter way to experience the everyday.
                </h1>
                <p className="overview-anim font-dm-sans text-[16px] lg:text-[18px] leading-[1.5] text-white/80 tracking-[-0.05em] max-w-[700px] mb-12 lg:mb-16 opacity-0">
                  A connected physical-digital system designed to rethink how people experience and respond to everyday noise.
                </p>
              </div>

              {/* Image Area */}
              <div className="overview-anim w-full opacity-0 mt-auto flex items-end px-3 lg:px-5">
                <img 
                  src="/projects/decicon/hero.png" 
                  alt="NoiseShield interface showcase" 
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
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em]">Oct 2025 (4 weeks)</p>
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
                    <li>Suhani Abrol</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="overview-anim opacity-0">
                  <h2 className="font-momo text-[24px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] mb-3">Context</h2>
                  <div className="flex flex-col gap-4 font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.4]">
                    <p>Noise is everywhere, but we rarely know when it becomes harmful.</p>
                    <p>Our research found a gap between awareness and action: while 77% of participants recognised noise as a problem, only 18% knew what levels were considered safe or harmful over the long term.</p>
                    <p>Decicon was developed as a connected system that makes noise visible, understandable and actionable through a physical Noise Shield, mobile application and dashboard.</p>
                  </div>
                </div>
                <div className="overview-anim opacity-0">
                  <h2 className="font-momo text-[24px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] mb-3">My role</h2>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.4]">
                    <li>Led the concept development and physical product direction, exploring how the window could become an intervention point for reducing incoming noise.</li>
                    <li>Worked on the physical product, mechanism development and prototyping, taking the Noise Shield from early product exploration toward a high-fidelity prototype.</li>
                    <li>Contributed to the UI and connected experience, helping translate the physical product into a cohesive interaction between the Noise Shield, mobile app and dashboard.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <hr className="context-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 3: THE PROBLEM (Images with Sound)
          ========================================= */}
          <section id="problem" className="w-full">
            <div className="flex flex-col md:flex-row justify-between gap-8 lg:gap-12 items-stretch">
              
              {/* LEFT SIDE: Text Analysis block */}
              <div className="flex flex-col justify-between w-full md:w-[48%] lg:w-[55%] py-2">
                <div className="flex flex-col gap-6">
                  <h2 className="problem-anim font-momo text-[22px] lg:text-[38px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] opacity-0 max-w-[580px]">
                    Noise has become something<br/>we learn to live with.
                  </h2>
                  <p className="problem-anim font-dm-sans text-[13px] lg:text-[18px] text-[#262626]/80 tracking-[-0.05em] leading-[1.6] opacity-0 max-w-[460px]">
                    Homes are meant to be spaces of comfort and recovery, yet everyday noise from traffic, festivals and construction can make them vulnerable to constant disturbance.
                  </p>
                  <p className="problem-anim font-dm-sans text-[13px] lg:text-[18px] text-[#262626]/80 tracking-[-0.05em] leading-[1.6] opacity-0 max-w-[460px]">
                    Decicon began with a simple question:
                  </p>
                </div>
                <h2 className="problem-anim font-momo text-[22px] lg:text-[32px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.25] mt-16 md:mt-auto opacity-0 max-w-[600px]">
                  What if we could understand the noise around us and actually do something about it?
                </h2>
              </div>

              {/* RIGHT SIDE: 3 Interactive Sound Images */}
              <div className="flex flex-col items-end justify-start w-full md:w-[48%] lg:w-[50%] problem-anim opacity-0">
                <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 w-full h-[280px] sm:h-[350px] lg:h-[400px]">
                  
                  {/* Image 1: Construction */}
                  <div 
                    className="relative w-full h-full rounded-[8px] overflow-hidden group cursor-pointer"
                    onMouseEnter={() => playAudio(0)}
                    onMouseLeave={() => stopAudio(0)}
                  >
                    <img 
                      src="/projects/decicon/noise-1.jpg" 
                      alt="Construction noise" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <audio ref={(el) => { audioRefs.current[0] = el; }} src="/projects/decicon/audio-1.mp3" preload="auto" loop />
                  </div>

                  {/* Image 2: Festival/Fireworks */}
                  <div 
                    className="relative w-full h-full rounded-[8px] overflow-hidden group cursor-pointer"
                    onMouseEnter={() => playAudio(1)}
                    onMouseLeave={() => stopAudio(1)}
                  >
                    <img 
                      src="/projects/decicon/noise-2.jpg" 
                      alt="Festival noise" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <audio ref={(el) => { audioRefs.current[1] = el; }} src="/projects/decicon/audio-2.mp3" preload="auto" loop />
                  </div>

                  {/* Image 3: Traffic */}
                  <div 
                    className="relative w-full h-full rounded-[8px] overflow-hidden group cursor-pointer"
                    onMouseEnter={() => playAudio(2)}
                    onMouseLeave={() => stopAudio(2)}
                  >
                    <img 
                      src="/projects/decicon/noise-3.jpg" 
                      alt="Traffic noise" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <audio ref={(el) => { audioRefs.current[2] = el; }} src="/projects/decicon/audio-3.mp3" preload="auto" loop />
                  </div>

                </div>
                <p className="font-dm-sans text-[12px] lg:text-[13px] text-[#262626]/60 tracking-[-0.05em] mt-3 text-right">
                  * Click and then hover over the images to hear the daily noises
                </p>
              </div>

            </div>
          </section>

          <hr className="problem-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 4: NARRATIVE VIDEO (Vimeo Embed)
          ========================================= */}
          <section id="narrative-video" className="w-full">
            <div className="video-anim opacity-0 flex flex-col w-full">
              <h2 className="font-momo text-[22px] lg:text-[26px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] mb-6 md:mb-8 text-left">
                Check out our narrative video
              </h2>
              
              {/* Vimeo Player Wrapper */}
              <div className="relative w-full aspect-video bg-gray-100 overflow-hidden rounded-[8px]">
                <iframe 
                  ref={iframeRef}
                  src="https://player.vimeo.com/video/1159403863?badge=0&autopause=0&player_id=0&app_id=58479" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  className="absolute top-0 left-0 w-full h-full"
                  title="Narrative Vid final"
                ></iframe>
              </div>
            </div>
          </section>

          {/* =========================================
              FULL BLEED FIGMA EXPORT (Seamless)
          ========================================= */}
          <div className="video-anim -mx-6 lg:-mx-12 xl:-mx-16 mt-16 lg:mt-24 opacity-0 flex flex-col">
            <img 
              src="/projects/decicon/presentation-part-1.png" 
              alt="NoiseShield Case Study Overview" 
              className="w-full h-auto block"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* =========================================
              BACK TO TOP
          ========================================= */}
          <div className="footer-anim opacity-0 w-full flex flex-col items-center justify-center pt-12 pb-24 mt-8 border-t border-[#262626]/10">
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-[#171918] flex items-center justify-center text-[#ffffff] transition-transform duration-300 group-hover:-translate-y-2 shadow-lg">
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
'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  hasEntered?: boolean;
}

export default function Hero({ hasEntered = true }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const verticalGridRef = useRef<HTMLDivElement>(null);
  const horizontalGridRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const textRefs = useRef<(HTMLHeadingElement | HTMLDivElement | HTMLParagraphElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Audio Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasMusicPlaying = useRef(false);

  // New Ref for the Polaroid Photo
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    audioRef.current = new Audio('/trees.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0; 

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useGSAP(() => {
    gsap.set(bottomSectionRef.current, { yPercent: 100 });
    gsap.set(textRefs.current, { y: 40, opacity: 0 });
  }, { scope: containerRef }); 

  useGSAP(() => {
    if (!hasEntered) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(verticalGridRef.current, {
      scaleY: 1,
      duration: 1.2,
      ease: 'expo.inOut',
    });
    tl.to(horizontalGridRef.current, {
      scaleX: 1,
      duration: 1.2,
      ease: 'expo.inOut',
    }, '-=0.8');

    tl.to(bottomSectionRef.current, { 
      yPercent: 0, 
      duration: 1.2, 
      ease: 'expo.out' 
    }, '-=0.6');

    tl.to(textRefs.current, { 
      y: 0, 
      opacity: 1, 
      duration: 1.5, 
      stagger: 0.1, 
      ease: 'power2.out' 
    }, '-=0.7');

    gsap.to(scrollIndicatorRef.current, {
      y: 4,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=150',
      snap: {
        snapTo: [0, 1],
        duration: { min: 0.4, max: 0.6 },
        delay: 0.1,
        ease: 'power3.inOut'
      }
    });

    gsap.to(videoRef.current, {
      yPercent: 20, 
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => {
      ScrollTrigger.create({
        trigger: bottomSectionRef.current,
        start: 'top 60%', 
        end: 'bottom 40%', 
        onEnter: () => {
          audioRef.current?.play().catch(() => {});
          gsap.to(audioRef.current, { volume: 0.3, duration: 1, ease: 'power2.out' });

          const globalAudio = (window as any).__bgMusic;
          if (globalAudio && !globalAudio.paused) {
            wasMusicPlaying.current = true;
            gsap.killTweensOf(globalAudio);
            gsap.to(globalAudio, { volume: 0, duration: 1, ease: 'power2.out', onComplete: () => globalAudio.pause() });
          }
        },
        onLeave: () => {
          gsap.to(audioRef.current, { 
            volume: 0, 
            duration: 1, 
            ease: 'power2.out',
            onComplete: () => audioRef.current?.pause() 
          });

          const globalAudio = (window as any).__bgMusic;
          if (globalAudio && wasMusicPlaying.current) {
            globalAudio.play().catch(() => {});
            wasMusicPlaying.current = false;
            gsap.killTweensOf(globalAudio);
            gsap.to(globalAudio, { volume: 0.5, duration: 1, ease: 'power2.out' });
          }
        },
        onEnterBack: () => {
          audioRef.current?.play().catch(() => {});
          gsap.to(audioRef.current, { volume: 0.3, duration: 1, ease: 'power2.out' });

          const globalAudio = (window as any).__bgMusic;
          if (globalAudio && !globalAudio.paused) {
            wasMusicPlaying.current = true;
            gsap.killTweensOf(globalAudio);
            gsap.to(globalAudio, { volume: 0, duration: 1, ease: 'power2.out', onComplete: () => globalAudio.pause() });
          }
        },
        onLeaveBack: () => {
          gsap.to(audioRef.current, { 
            volume: 0, 
            duration: 1, 
            ease: 'power2.out',
            onComplete: () => audioRef.current?.pause() 
          });

          const globalAudio = (window as any).__bgMusic;
          if (globalAudio && wasMusicPlaying.current) {
            globalAudio.play().catch(() => {});
            wasMusicPlaying.current = false;
            gsap.killTweensOf(globalAudio);
            gsap.to(globalAudio, { volume: 0.5, duration: 1, ease: 'power2.out' });
          }
        }
      });
    });

    return () => mm.revert();
  }, { dependencies: [hasEntered], scope: containerRef });

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return; 
    
    if (audioRef.current) {
      gsap.killTweensOf(audioRef.current);
      audioRef.current.play().catch(() => {});
      gsap.to(audioRef.current, { volume: 0.3, duration: 0.8, ease: 'power2.inOut' });
    }

    const globalAudio = (window as any).__bgMusic;
    if (globalAudio && !globalAudio.paused) {
      wasMusicPlaying.current = true;
      gsap.killTweensOf(globalAudio);
      gsap.to(globalAudio, { 
        volume: 0, 
        duration: 0.8, 
        ease: 'power2.inOut', 
        onComplete: () => globalAudio.pause() 
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    
    if (audioRef.current) {
      gsap.killTweensOf(audioRef.current);
      gsap.to(audioRef.current, { 
        volume: 0, 
        duration: 0.6, 
        ease: 'power2.inOut',
        onComplete: () => {
          if (audioRef.current && audioRef.current.volume === 0) {
            audioRef.current.pause();
          }
        }
      });
    }

    const globalAudio = (window as any).__bgMusic;
    if (globalAudio && wasMusicPlaying.current) {
      globalAudio.play().catch(() => {});
      wasMusicPlaying.current = false;
      gsap.killTweensOf(globalAudio);
      gsap.to(globalAudio, { volume: 0.5, duration: 0.8, ease: 'power2.inOut' });
    }
  };

  const addToRefs = (el: HTMLHeadingElement | HTMLDivElement | HTMLParagraphElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  // --- NEW: Hover Handlers for the Portrait ---
  const handlePortraitEnter = () => {
    if (window.innerWidth < 768 || !photoRef.current) return;
    gsap.killTweensOf(photoRef.current);
    gsap.fromTo(photoRef.current, 
      { opacity: 0, scale: 0.8, rotation: -10, x: 20 },
      { opacity: 1, scale: 1, rotation: -4, x: 0, duration: 0.5, ease: 'back.out(1.5)' }
    );
  };

  const handlePortraitLeave = () => {
    if (window.innerWidth < 768 || !photoRef.current) return;
    gsap.killTweensOf(photoRef.current);
    gsap.to(photoRef.current, {
      opacity: 0,
      scale: 0.8,
      rotation: -10,
      x: 20,
      duration: 0.4,
      ease: 'power2.in'
    });
  };

  return (
    <section ref={containerRef} className="relative w-full flex flex-col bg-[#FAFAFA] overflow-hidden" style={{ fontFamily: "'Stack Sans Headline', sans-serif" }}>
      
      {/* --- TOP SECTION (60% Height) --- */}
      <div className="relative w-full h-[60vh] flex-none flex flex-col justify-center px-8 md:px-12 lg:px-24 border-b border-gray-100">
        
        {/* Background Grids */}
        <div 
          ref={verticalGridRef}
          className="absolute inset-0 w-full h-full pointer-events-none origin-top scale-y-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, #cccccd 1px, transparent 1px)`,
            backgroundSize: '90px 100%',
            backgroundPosition: '0 0',
          }}
        />
        <div 
          ref={horizontalGridRef}
          className="absolute inset-0 w-full h-full pointer-events-none origin-left scale-x-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(to bottom, #cccccd 1px, transparent 1px)`,
            backgroundSize: '100% 90px',
            backgroundPosition: '0 0',
          }}
        />

        <div className="relative z-10 w-full max-w-[850px] mx-auto grid grid-cols-1 md:grid-cols-[45%_auto] justify-between gap-y-12 lg:gap-y-16 mt-16 md:mt-24">
          
          {/* Row 1, Col 1: Identity */}
          <div 
            className="flex flex-col relative w-fit"
            onMouseEnter={handlePortraitEnter}
            onMouseLeave={handlePortraitLeave}
          >
            {/* Polaroid Photo Container */}
            <div 
              ref={photoRef}
              className="absolute top-1/2 -translate-y-1/2 right-[calc(100%+32px)] w-[160px] p-2.5 pb-8 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] pointer-events-none opacity-0 z-50 origin-bottom-right"
            >
              <img 
                src="/profile.jpg" 
                alt="Kaustubh Korde" 
                className="w-full h-auto object-cover" 
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            <h1
              ref={addToRefs}
              className="text-[28px] md:text-[32px] lg:text-[26px] text-[#C1001F] tracking-normal font-semibold leading-[1.1] m-0 p-0"
              data-cursor="hover"
            >
              Hello, I am Kaustubh Korde
            </h1>
            <p 
              ref={addToRefs} 
              className="font-dm-sans text-[#141613]/50 text-[11px] md:text-[14px] tracking-[-0.02em] uppercase font-medium mt-0.5"
            >
              Product Designer
            </p>
          </div>

          {/* Row 1, Col 2: Philosophy */}
          <div className="flex flex-col">
            <h2 
              ref={addToRefs} 
              className="text-[28px] md:text-[32px] lg:text-[26px] text-[#141613] leading-[1.1] tracking-normal font-semibold"
            >
              I design digital products that<br className="hidden md:block" /> work beautifully
            </h2>
            <h2 
              ref={addToRefs} 
              className="text-[28px] md:text-[32px] lg:text-[26px] text-[#141613] leading-[1.1] tracking-normal font-semibold mt-0.5 whitespace-nowrap"
            >
              Accessible, clear & intentional
            </h2>
          </div>

          {/* Row 2, Col 1: Location */}
          <div ref={addToRefs} className="hidden md:block">
            <p className="font-dm-sans text-[#141613]/40 text-[11px] md:text-[14px] tracking-[-0.02em] uppercase font-medium">
              Based in Mumbai
            </p>
          </div>

          {/* Row 2, Col 2: Previous */}
          <div ref={addToRefs}>
            <p className="font-dm-sans text-[#141613]/40 text-[11px] md:text-[14px] tracking-[-0.02em] uppercase font-medium">
              Previously at <a href="https://www.linkedin.com/company/realty-sharks/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#141613] transition-colors">Realty Sharks</a>
            </p>
          </div>

        </div>
      </div>

      {/* --- BOTTOM SECTION (40% Height) --- */}
      <div 
        ref={bottomSectionRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[40vh] flex-none bg-[#141613] will-change-transform cursor-crosshair overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#141613]/35 z-[5] pointer-events-none" />

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 w-full h-[170%] -top-[35%] object-cover object-center"
        >
          <source src="/trees.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 w-full max-w-[1440px] h-full mx-auto px-8 md:px-12 py-16 flex justify-end items-end pointer-events-none">
          
          <div className="flex flex-col items-end text-white gap-8 pointer-events-auto">
            <div className="group cursor-pointer flex flex-col items-end" data-cursor="hover">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1px] bg-white transition-transform duration-300 origin-right group-hover:scale-x-125" />
                <span className="font-dm-sans text-lg md:text-xl tracking-[-0.05em] drop-shadow-md">
                  About me
                </span>
              </div>
              <p className="font-dm-sans text-sm text-white/80 tracking-[-0.05em] mt-2 group-hover:text-white transition-colors duration-300 drop-shadow-md">
                What do I care about?
              </p>
            </div>

            <div ref={scrollIndicatorRef} className="font-dm-sans text-sm text-white/90 tracking-[-0.05em] mt-8 drop-shadow-md">
              Scroll!
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
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
  
  const textRefs = useRef<(HTMLHeadingElement | HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      stagger: 0.15, 
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

    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => {
      ScrollTrigger.create({
        trigger: bottomSectionRef.current,
        start: 'top 60%', 
        end: 'bottom 40%', 
        onEnter: () => {
          audioRef.current?.play().catch(() => {});
          gsap.to(audioRef.current, { volume: 0.3, duration: 1, ease: 'power2.out' });
        },
        onLeave: () => {
          gsap.to(audioRef.current, { 
            volume: 0, 
            duration: 1, 
            ease: 'power2.out',
            onComplete: () => audioRef.current?.pause() 
          });
        },
        onEnterBack: () => {
          audioRef.current?.play().catch(() => {});
          gsap.to(audioRef.current, { volume: 0.3, duration: 1, ease: 'power2.out' });
        },
        onLeaveBack: () => {
          gsap.to(audioRef.current, { 
            volume: 0, 
            duration: 1, 
            ease: 'power2.out',
            onComplete: () => audioRef.current?.pause() 
          });
        }
      });
    });

    return () => mm.revert();
  }, { dependencies: [hasEntered], scope: containerRef });

  const handleMouseEnter = () => {
    if (!audioRef.current || window.innerWidth < 768) return; 
    
    // Kill any ongoing volume tweens to prevent stuttering/glitching on rapid hover
    gsap.killTweensOf(audioRef.current);

    audioRef.current.play().catch(() => {});
    gsap.to(audioRef.current, { volume: 0.3, duration: 0.8, ease: 'power2.inOut' });
  };

  const handleMouseLeave = () => {
    if (!audioRef.current || window.innerWidth < 768) return;

    // Kill any ongoing volume tweens
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
  };

  const addToRefs = (el: HTMLHeadingElement | HTMLDivElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full flex flex-col bg-white overflow-hidden">
      
      <div className="relative w-full h-[70vh] flex-none flex flex-col justify-center px-8 md:px-12 border-b border-gray-100 pb-6">
        
        <div 
          ref={verticalGridRef}
          className="absolute inset-0 w-full h-full pointer-events-none origin-top scale-y-0"
          style={{
            backgroundImage: `linear-gradient(to right, #E5E7EB 1px, transparent 1px)`,
            backgroundSize: '90px 100%',
            backgroundPosition: '0 0',
          }}
        />

        <div 
          ref={horizontalGridRef}
          className="absolute inset-0 w-full h-full pointer-events-none origin-left scale-x-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)`,
            backgroundSize: '100% 90px',
            backgroundPosition: '0 0',
          }}
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto flex items-end justify-between mt-13">
          <div className="flex flex-col gap-3 w-fit" data-cursor="hover">
            {['Product', 'Experience', 'Designer'].map((word, i) => (
              <h1
                key={i}
                ref={addToRefs}
                className="text-[9vw] lg:text-[105px] font-momo text-[#C1001F] tracking-[-0.03em] font-normal leading-none m-0 p-0"
              >
                {word}
              </h1>
            ))}
          </div>

          <div ref={addToRefs} className="hidden lg:block pb-1" data-cursor="hover">
            <p className="font-dm-sans text-[#C1001F] text-xl tracking-[-0.05em] font-normal">
              I design digital products that work beautifully
            </p>
          </div>
        </div>
      </div>

      <div 
        ref={bottomSectionRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[35vh] flex-none bg-[#141613] will-change-transform cursor-crosshair"
      >
        <div className="absolute inset-0 bg-[#141613]/50 z-[5] pointer-events-none" />

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/trees.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 w-full max-w-[1440px] h-full mx-auto px-8 md:px-12 py-12 flex justify-between items-end pointer-events-none">
          
          <div className="max-w-[460px] text-white">
            <p className="font-dm-sans text-base md:text-lg leading-relaxed tracking-[-0.03em] font-light text-white/90">
              I’m interested in the everyday interactions,
              ......we stop questioning the awkward flow,
              unnecessary step or confusing interface
              that has simply become normal. I like
              understanding why it happens and turning
              it into a product experience that feels
              obvious in hindsight.
            </p>
          </div>

          <div className="flex flex-col items-end text-white gap-8 pointer-events-auto">
            <div className="group cursor-pointer flex flex-col items-end" data-cursor="hover">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1px] bg-white transition-transform duration-300 origin-right group-hover:scale-x-125" />
                <span className="font-dm-sans text-lg md:text-xl tracking-[-0.05em]">
                  About me
                </span>
              </div>
              <p className="font-dm-sans text-sm text-white/60 tracking-[-0.05em] mt-2 group-hover:text-white transition-colors duration-300">
                What do I care about?
              </p>
            </div>

            <div ref={scrollIndicatorRef} className="font-dm-sans text-sm text-white/80 tracking-[-0.05em] mt-8">
              Scroll!
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
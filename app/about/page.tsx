'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import About from '@/components/About'; 

gsap.registerPlugin(ScrollTrigger);

const bitsAndPieces = [
  {
    id: 1,
    type: 'single',
    image: '/about/bit-1.jpg',
    caption: 'Riding is probably my favourite way to disappear for a while.'
  },
  {
    id: 2,
    type: 'single',
    image: '/about/bit-2.jpg',
    caption: 'Animals have a permanent place in my life. I will stop for them almost everytime.'
  },
  {
    id: 3,
    type: 'split',
    image: '/about/hotwheels-left.jpg', 
    video: '/about/hotwheels-right.mp4', 
    caption: 'Building tiny dioramas for my Hot Wheels is how I unwind.'
  },
  {
    id: 4,
    type: 'single',
    image: '/about/bit-4.jpg',
    caption: 'I enjoy moving—running, riding or just being outdoors.'
  },
  {
    id: 5,
    type: 'single',
    image: '/about/bit-5.jpg',
    caption: 'A little obsessed with good stories and fast things.'
  },
  {
    id: 6,
    type: 'single',
    image: '/about/bit-6.jpg',
    caption: 'A little obsessed with good stories and fast things.'
  }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const verticalGridRef = useRef<HTMLDivElement>(null);
  const horizontalGridRef = useRef<HTMLDivElement>(null);
  const slideUpElementsRef = useRef<(HTMLElement | null)[]>([]);
  
  // --- NEW: Dedicated ref for the polaroid image ---
  const polaroidRef = useRef<HTMLDivElement>(null);

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
    // Initial Setup
    gsap.set(videoContainerRef.current, { yPercent: -100 });
    // --- UPDATED: Set the polaroid to start high up, ready to drop ---
    gsap.set(polaroidRef.current, { y: -250, opacity: 0 });
    gsap.set(slideUpElementsRef.current, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Grid Lines Draw In
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

    // 2. Video Panel and Photo Drop Down Together
    tl.to(videoContainerRef.current, { 
      yPercent: 0, 
      duration: 1.2, 
      ease: 'expo.out' 
    }, '-=0.6');

    // --- UPDATED: Polaroid drops at the exact same time ('<' syncs it with the animation above) ---
    tl.to(polaroidRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'expo.out'
    }, '<');

    // 3. Text and Blossoms Slide Up
    tl.to(slideUpElementsRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 1.5, 
      stagger: 0.15, 
      ease: 'power2.out' 
    }, '-=0.7');

  }, { scope: containerRef });

  useGSAP(() => {
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
        trigger: videoContainerRef.current,
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
  }, { scope: containerRef });

  const handleMouseEnter = () => {
    if (!audioRef.current || window.innerWidth < 768) return; 
    gsap.killTweensOf(audioRef.current);
    audioRef.current.play().catch(() => {});
    gsap.to(audioRef.current, { volume: 0.3, duration: 0.8, ease: 'power2.inOut' });
  };

  const handleMouseLeave = () => {
    if (!audioRef.current || window.innerWidth < 768) return;
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

  const addToSlideUp = (el: HTMLElement | null) => {
    if (el && !slideUpElementsRef.current.includes(el)) {
      slideUpElementsRef.current.push(el);
    }
  };

  return (
    <main 
      ref={containerRef} 
      className="relative w-full bg-[#ffffff] overflow-hidden flex flex-col"
      style={{ fontFamily: "'Stack Sans Headline', sans-serif" }}
    >
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full flex flex-col">
        
        <div 
          ref={verticalGridRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 origin-top scale-y-0 opacity-60"
          style={{
            backgroundImage: `linear-gradient(to right, #E5E7EB 1px, transparent 1px)`,
            backgroundSize: '90px 100%',
            backgroundPosition: '0 0',
          }}
        />
        <div 
          ref={horizontalGridRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 origin-left scale-x-0 opacity-60"
          style={{
            backgroundImage: `linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)`,
            backgroundSize: '100% 90px',
            backgroundPosition: '0 0',
          }}
        />

        <div 
          ref={videoContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor="hover"
          className="relative w-full h-[45vh] lg:h-[45vh] flex-none bg-[#141613] overflow-hidden z-10 will-change-transform"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 w-full h-[170%] -top-[17%] object-cover object-center pointer-events-none z-[1]"
          >
            <source src="/trees.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative w-full max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 z-20 flex flex-col pb-12">
          <div className="flex flex-col items-start lg:ml-12">
            
            {/* --- UPDATED: Uses polaroidRef instead of addToSlideUp --- */}
            <div ref={polaroidRef}>
              <div className="relative w-[310px] md:w-[380px] -mt-20 lg:-mt-60 group cursor-pointer transition-transform duration-500 hover:rotate-[-3deg] hover:scale-[1.02] origin-bottom-left">
                <img 
                  src="/about/me-child.png" 
                  alt="Kaustubh as a child" 
                  className="absolute inset-0 w-full h-auto object-contain drop-shadow-2xl"
                  onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                />
                <img 
                  src="/about/me-now.png" 
                  alt="Kaustubh currently" 
                  className="relative w-full h-auto object-contain drop-shadow-2xl transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                  onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                />
              </div>
            </div>

            <div className="w-full max-w-[550px] mt-2 md:mt-4 pl-6 md:pl-8 flex flex-col z-20 relative">
              <h1 
                ref={addToSlideUp}
                className="text-3xl md:text-4xl lg:text-[42px] text-[#141613] tracking-tight leading-[1.1] mb-6 font-bold"
              >
                a little about myself
              </h1>

              <div className="flex flex-col gap-5 text-[#141613]/80 text-[14px] md:text-[16px] leading-relaxed tracking-[-0.01em]">
                <p ref={addToSlideUp}>
                  Hi, I'm Kaustubh. I'm a designer who enjoys figuring things out and making things my own.
                </p>
                <p ref={addToSlideUp}>
                  Outside of design, I'm usually exploring the city, riding, running, clicking photos, collecting tiny cars, cooking something new or spending time around people and animals.
                </p>
                <p ref={addToSlideUp}>
                  I enjoy things that slow me down, let me explore, and occasionally bring out the kid in me.
                </p>
              </div>
            </div>
          </div>
        </div>

        <img 
          ref={addToSlideUp}
          src="/about/branch-left.png" 
          alt="Cherry Blossom" 
          className="absolute left-[-5%] lg:left-[-2%] top-[55%] md:top-[30%] w-32 md:w-56 object-contain z-10 pointer-events-none"
          onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
        />
        <img 
          ref={addToSlideUp}
          src="/about/branch-right.png" 
          alt="Cherry Blossom" 
          className="absolute right-[-5%] lg:right-[-2%] bottom-[5%] lg:bottom-[22%] w-48 md:w-[380px] object-contain z-10 pointer-events-none"
          onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
        />
      </div>

      {/* --- NATIVE HORIZONTAL SCROLL SECTION --- */}
      <section className="relative w-full pt-16 pb-20 z-20 bg-transparent">
        <div className="w-full max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 mb-6 md:mb-10 flex flex-col items-start lg:ml-12">
          <div className="w-full pl-6 md:pl-8">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] text-[#141613] tracking-[-0.01em] leading-[1.1] font-bold mb-2">
              bits and pieces of me
            </h2>
            <p className="text-[#141613]/80 text-[14px] md:text-[16px] leading-relaxed tracking-[-0.01em] font-normal">
              A few things, moments and interests that make me, me.
            </p>
          </div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24">
          <div className="w-full pl-6 md:pl-8">
            <div className="flex overflow-x-auto gap-6 md:gap-10 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {bitsAndPieces.map((item) => (
                <div key={item.id} className="flex flex-col w-[280px] md:w-[380px] lg:w-[420px] flex-shrink-0 snap-start">
                  
                  <div className="w-full aspect-square md:aspect-[4/3] bg-gray-100 overflow-hidden mb-4 md:mb-6 shadow-sm">
                    {item.type === 'split' ? (
                      <div className="flex w-full h-full">
                        <div className="w-[55%] h-full relative">
                          <img 
                            src={item.image} 
                            alt="Hot wheels diorama left" 
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                        <div className="w-[45%] h-full bg-[#141613] relative">
                          <video 
                            src={item.video} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={item.image} 
                        alt={`Bit and piece ${item.id}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://placehold.co/600x450/eaeaea/a3a3a3?text=Image+${item.id}`;
                        }}
                      />
                    )}
                  </div>

                  <p className="text-[#141613]/90 text-[16px] md:text-[16px] leading-relaxed tracking-[-0.01em] font-normal max-w-[95%]">
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PRODUCT DESIGNER / MUMBAI SECTION --- */}
      <section className="relative w-full pt-10 pb-16 z-20 bg-transparent">
        <div className="w-full max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 flex flex-col items-start lg:ml-12">
          <div className="w-full max-w-[650px] pl-6 md:pl-8 flex flex-col">
            
            <h2 className="text-3xl md:text-4xl lg:text-[28px] text-[#141613] tracking-[-0.01em] leading-[1.2] mb-8">
              <span className="font-bold">Product Designer</span> <span className="font-normal">/ Mumbai</span>
            </h2>

            <div className="flex flex-col gap-5 text-[#141613]/70 text-[15px] md:text-[16px] leading-[1.6] tracking-[-0.01em] font-normal">
              <p>
                My work moves between product thinking, UX, UI and visual design. I care about how something works, but also about how it looks, feels and communicates.
              </p>
              <p>
                I’m also someone who likes to keep pushing a design after it is “done” by refining the details until the whole thing feels right.
              </p>
            </div>

            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              data-cursor="hover"
              className="mt-10 inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-[#141613] text-[#141613] rounded-full hover:bg-[#141613] hover:text-white transition-all duration-300 w-fit group"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:translate-y-[2px] transition-transform duration-300"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span className="font-bold font-dm-sans text-[13px] tracking-wider uppercase">Resume</span>
            </a>

          </div>
        </div>
      </section>

      {/* --- CURIOSITY SECTION --- */}
      <section className="relative w-full pt-12 pb-16 z-20 bg-transparent">
        <div className="w-full max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 flex flex-col items-start lg:ml-12">
          <div className="w-full max-w-[650px] pl-6 md:pl-8 flex flex-col">
            
            <div className="w-[280px] md:w-[340px] lg:w-[380px] mb-8 md:mb-10 overflow-hidden bg-gray-100">
              <img 
                src="/about/curiosity.jpg" 
                alt="Looking at art in a gallery" 
                className="w-full h-auto object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[42px] text-[#141613] tracking-tight leading-[1.1] mb-6 font-bold">
              I think curiosity is probably the one thing that connects everything I do.
            </h2>

            <div className="flex flex-col gap-5 text-[#141613]/80 text-[15px] md:text-[16px] leading-relaxed tracking-[-0.01em]">
              <p>
                Whether I'm exploring a new place, building a tiny Hot Wheels diorama, taking photos, meeting people or designing a product basically I like collecting observations, objects, stories and ideas
              </p>
              <p>
                Design just happens to be where all of those things come together.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- OUTRO SECTION --- */}
      <section className="relative w-full pt-12 pb-32 z-20 bg-transparent">
        <div className="w-full max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 flex flex-col items-start lg:ml-12">
          <div className="w-full max-w-[650px] pl-6 md:pl-8 flex flex-col">
            
            <h2 className="text-3xl md:text-4xl lg:text-[42px] text-[#141613] tracking-tight leading-[1.1] mb-6 font-bold">
              Let’s make something interesting.
            </h2>

            <div className="flex flex-col gap-5 text-[#141613]/80 text-[15px] md:text-[16px] leading-relaxed tracking-[-0.01em]">
              <p>
                Have an idea, a project, or just want to talk design, cars, photography or anything in between?
              </p>
            </div>

            <a 
              href="mailto:kaustubh.workspace@gmail.com" 
              data-cursor="hover"
              className="mt-8 font-dm-sans text-[16px] md:text-[18px] font-medium text-[#141613] underline decoration-1 underline-offset-4 hover:text-[#C1001F] transition-colors w-fit"
            >
              kaustubh.workspace@gmail.com
            </a>

          </div>
        </div>
      </section>
      
      {/* --- Contact Footer Module --- */}
      <About hideIntro={true} />

    </main>
  );
}
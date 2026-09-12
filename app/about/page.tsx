'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const bitsAndPieces = [
  {
    id: 1,
    image: '/about/bit-1.jpg',
    caption: 'Riding is probably my favourite way to disappear for a while.'
  },
  {
    id: 2,
    image: '/about/bit-2.jpg',
    caption: 'Animals have a permanent place in my life. I will stop for them almost everytime.'
  },
  {
    id: 3,
    image: '/about/bit-3.jpg',
    caption: 'I like getting lost in unfamiliar parts of the city.'
  },
  {
    id: 4,
    image: '/about/bit-4.jpg',
    caption: 'I enjoy moving—running, riding or just being outdoors.'
  },
  {
    id: 5,
    image: '/about/bit-5.jpg',
    caption: 'A little obsessed with good stories and fast things.'
  },
  {
    id: 6,
    image: '/about/bit-6.jpg',
    caption: 'A little obsessed with good stories and fast things.'
  }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
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
    // Parallax for top video
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

  return (
    <main 
      ref={containerRef} 
      className="relative w-full bg-[#ffffff] overflow-hidden flex flex-col"
      style={{ fontFamily: "'Stack Sans Headline', sans-serif" }}
    >
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full flex flex-col">
        {/* --- BACKGROUND GRID --- */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(to right, #E5E7EB 1px, transparent 1px),
              linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)
            `,
            backgroundSize: '90px 90px',
          }}
        />

        {/* --- LIVE VIDEO SECTION --- */}
        <div 
          ref={videoContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor="hover"
          className="relative w-full h-[45vh] lg:h-[45vh] flex-none bg-[#141613] overflow-hidden z-10"
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

        {/* --- CONTENT SECTION --- */}
        <div className="relative w-full max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 z-20 flex flex-col pb-12">
          
          <div className="flex flex-col items-start lg:ml-12">
            
            {/* --- POLAROID --- */}
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

            {/* --- TEXT CONTENT --- */}
            <div className="w-full max-w-[550px] mt-2 md:mt-4 pl-6 md:pl-8 flex flex-col z-20 relative">
             
              
              <h1 className="text-3xl md:text-4xl lg:text-[42px] text-[#141613] tracking-tight leading-[1.1] mb-6 font-bold">
                a little about myself
              </h1>

              <div className="flex flex-col gap-5 text-[#141613]/80 text-[14px] md:text-[16px] leading-relaxed tracking-[-0.01em]">
                <p>
                  Hi, I'm Kaustubh. I'm a designer who enjoys figuring things out and making things my own.
                </p>
                <p>
                  Outside of design, I'm usually exploring the city, riding, running, clicking photos, collecting tiny cars, cooking something new or spending time around people and animals.
                </p>
                <p>
                  I enjoy things that slow me down, let me explore, and occasionally bring out the kid in me.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- DECORATIVE CHERRY BLOSSOMS --- */}
        <img 
          src="/about/branch-left.png" 
          alt="Cherry Blossom" 
          className="absolute left-[-5%] lg:left-[-2%] top-[55%] md:top-[30%] w-32 md:w-56 object-contain z-10 pointer-events-none opacity-90"
          onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
        />
        <img 
          src="/about/branch-right.png" 
          alt="Cherry Blossom" 
          className="absolute right-[-5%] lg:right-[-2%] bottom-[5%] lg:bottom-[22%] w-48 md:w-[380px] object-contain z-10 pointer-events-none opacity-90"
          onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
        />
      </div>

      {/* --- NATIVE HORIZONTAL SCROLL SECTION --- */}
      <section className="relative w-full pt-16 pb-20 z-20 bg-transparent">
        
        {/* Title Block Wrapper */}
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

        {/* Native CSS Horizontal Scroll Container */}
        <div className="w-full max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24">
          <div className="w-full pl-6 md:pl-8">
            <div className="flex overflow-x-auto gap-6 md:gap-10 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {bitsAndPieces.map((item) => (
                <div key={item.id} className="flex flex-col w-[280px] md:w-[380px] lg:w-[420px] flex-shrink-0 snap-start">
                  <div className="w-full aspect-square md:aspect-[4/3] bg-gray-100 overflow-hidden mb-4 md:mb-6 shadow-sm">
                    <img 
                      src={item.image} 
                      alt={`Bit and piece ${item.id}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x450/eaeaea/a3a3a3?text=Image+${item.id}`;
                      }}
                    />
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

      {/* --- NEW: PRODUCT DESIGNER / MUMBAI SECTION --- */}
      <section className="relative w-full pt-10 pb-32 z-20 bg-transparent">
        <div className="w-full max-w-[1440px] mx-auto px-8 md:px-12 lg:px-24 flex flex-col items-start lg:ml-12">
          
          <div className="w-full max-w-[650px] pl-6 md:pl-8 flex flex-col">
            
            <h2 className="text-3xl md:text-4xl lg:text-[28px] text-[#141613] tracking-[-0.01em] leading-[1.2] mb-8">
              <span className="font-bold">Product Designer</span> <span className="font-normal">/ Mumbai</span>
            </h2>

            <div className="flex flex-col gap-5 text-[#141613]/70 text-[15px] md:text-[16px] leading-[1.6] tracking-[-0.01em] font-normal">
              <p>
                I'm someone who finds joy in observing, exploring and understanding the world around me.
              </p>
              <p>
                Whether it's discovering a new part of the city, meeting someone new, collecting miniature cars or figuring out how something works, I've always been curious about the things and people around me.
              </p>
              <p>
                That curiosity eventually led me to design.
              </p>
            </div>

            {/* Resume Button */}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              data-cursor="hover"
              className="mt-10 inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-[#141613] rounded-full hover:bg-[#141613] hover:text-white transition-all duration-300 w-fit group"
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
              <span className="font-bold text-[13px] tracking-wider uppercase">Resume</span>
            </a>

          </div>
        </div>
      </section>

    </main>
  );
}
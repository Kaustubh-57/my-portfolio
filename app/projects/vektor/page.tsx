'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
// import Navbar from '@/components/Navbar'; // Uncomment if using your Navbar

export default function VektorCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  useGSAP(() => {
    gsap.fromTo('.anim-element',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }, { scope: containerRef });

  const handleGoBack = () => {
    if (isExiting) return;
    setIsExiting(true);

    gsap.to('.case-study-content', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push('/?returnTo=vektor');
      }
    });
  };

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-[#0E0E0E]">
      {/* <Navbar /> */}
      
      <div className="case-study-content w-full flex flex-col h-full">
        
        {/* --- HEADER CONTROLS --- */}
        <div className="w-full px-6 lg:px-12 xl:px-16 pt-[120px] pb-8 z-10 absolute top-0 left-0">
          <button 
            onClick={handleGoBack}
            className="anim-element flex items-center justify-center gap-2 w-fit px-5 py-2 rounded-full border border-white/30 text-white font-dm-sans text-[14px] tracking-[-0.05em] hover:bg-white hover:text-[#0E0E0E] transition-colors duration-300 opacity-0"
            data-cursor="hover"
          >
            <span className="text-lg leading-none -mt-[2px]">←</span> Go back
          </button>
        </div>

        {/* --- FULL BLEED CONTENT (Zero Padding, Zero Gap) --- */}
        <div className="w-full flex flex-col items-center justify-start p-0 m-0 gap-0 leading-none overflow-hidden">
          
          <img src="/projects/vektor/1.jpg" alt="Vektor Case Study Image 1" className="anim-element opacity-0 w-full h-auto block object-cover m-0 p-0" />
          <img src="/projects/vektor/2.jpg" alt="Vektor Case Study Image 2" className="anim-element opacity-0 w-full h-auto block object-cover m-0 p-0" />
          <img src="/projects/vektor/3.jpg" alt="Vektor Case Study Image 3" className="anim-element opacity-0 w-full h-auto block object-cover m-0 p-0" />
          <img src="/projects/vektor/4.jpg" alt="Vektor Case Study Image 4" className="anim-element opacity-0 w-full h-auto block object-cover m-0 p-0" />
          <img src="/projects/vektor/5.jpg" alt="Vektor Case Study Image 5" className="anim-element opacity-0 w-full h-auto block object-cover m-0 p-0" />
          <img src="/projects/vektor/6.jpg" alt="Vektor Case Study Image 6" className="anim-element opacity-0 w-full h-auto block object-cover m-0 p-0" />
          
          {/* =========================================
              FULL SECTION VIDEO (Auto-playing & Looping)
          ========================================= */}
          <video 
            src="/projects/vektor/logo-application-section.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="anim-element opacity-0 w-full h-auto block object-cover m-0 p-0 -mt-[1px]"
          />
          <img src="/projects/vektor/8.jpg" alt="Vektor Case Study Image 8" className="anim-element opacity-0 w-full h-auto block object-cover m-0 p-0 -mt-[1px]" />
        </div>

      </div>
    </main>
  );
}
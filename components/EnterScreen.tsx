'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface EnterScreenProps {
  onEnter: () => void;
}

// All images: The last item is ALWAYS the final image. 
// Everything before it is automatically treated as a cycling image, no matter how many you add.
const ALL_PRELOADER_IMAGES = [
  '/preloader/1.png',
  '/preloader/2.png',
  '/preloader/3.png',
  '/preloader/4.png',
  '/preloader/5.png',
  '/preloader/6.png',
  '/preloader/7.png', // Newly added image
  '/preloader/final.jpg', // Lands here smoothly at 100%
];

const FINAL_IMAGE_INDEX = ALL_PRELOADER_IMAGES.length - 1;
const CYCLING_COUNT = FINAL_IMAGE_INDEX; // Dynamic count of cycling images

export default function EnterScreen({ onEnter }: EnterScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentBlockRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Initial Reveal (Horizontal line clip-path)
    tl.fromTo(
      imageContainerRef.current,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' },
      0 
    );

    // 2. 3-Second Loading Counter with dynamic, perfectly distributed image mapping
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 3,
      ease: 'power2.out',
      onUpdate: () => {
        const val = Math.round(counter.val);
        setProgress(val);

        if (val === 100) {
          setCurrentImage(FINAL_IMAGE_INDEX);
        } else {
          // Dynamically map 0-99 across all cycling images evenly
          const imgIndex = Math.min(
            Math.floor((val / 100) * CYCLING_COUNT),
            CYCLING_COUNT - 1
          );
          setCurrentImage(imgIndex);
        }
      },
      onComplete: () => {
        setIsReady(true);
        
        // Fade in the "Click to enter" CTA
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }
    }, 0);
  }, { scope: overlayRef });

  const handleEnterClick = () => {
    if (!isReady) return;

    const tl = gsap.timeline({
      onComplete: onEnter,
    });

    // 3. Seamless Exit Animation
    tl.to(contentBlockRef.current, { 
      scale: 0.95, 
      opacity: 0, 
      duration: 0.6, 
      ease: 'power3.inOut' 
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    }, '-=0.2');
  };

  return (
    <div 
      ref={overlayRef}
      className={`fixed inset-0 z-[200] bg-[#ffffff] flex flex-col items-center justify-center transition-colors ${
        isReady ? 'cursor-pointer' : 'cursor-wait'
      }`}
      onClick={handleEnterClick}
    >
      
      {/* Main Center Composition */}
      <div ref={contentBlockRef} className="flex flex-col w-44 md:w-[220px]">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-end mb-2.5 font-dm-sans text-[#141613]">
          <span className="text-[11px] md:text-xs font-medium tracking-wide uppercase">
            doesKaus
          </span>
          <span className="text-[11px] md:text-xs font-medium">
            {progress}
          </span>
        </div>

        {/* Image Container */}
        <div 
          ref={imageContainerRef}
          className="relative w-full aspect-square overflow-hidden bg-[#F7F6F0]"
          style={{ willChange: 'clip-path', clipPath: 'inset(100% 0% 0% 0%)' }}
        >
          {ALL_PRELOADER_IMAGES.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preloader frame ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-150 ease-out will-change-transform"
              style={{
                opacity: currentImage === index ? 1 : 0,
                zIndex: currentImage === index ? 10 : 1,
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div 
        ref={ctaRef}
        className="absolute bottom-12 font-dm-sans text-[10px] md:text-xs text-[#141613]/60 tracking-[0.1em] uppercase opacity-0 pointer-events-none"
      >
        Click to enter
      </div>

    </div>
  );
}
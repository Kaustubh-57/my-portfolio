'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface EnterScreenProps {
  onEnter: () => void;
}

const ALL_PRELOADER_IMAGES = [
  '/preloader/1.png',
  '/preloader/2.png',
  '/preloader/3.png',
  '/preloader/4.png',
  '/preloader/5.png',
  '/preloader/6.png',
  '/preloader/7.png',
  '/preloader/final.jpg',
];

const FINAL_IMAGE_INDEX = ALL_PRELOADER_IMAGES.length - 1;
const CYCLING_COUNT = FINAL_IMAGE_INDEX;

export default function EnterScreen({ onEnter }: EnterScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentBlockRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

 // Check memory on mount and cache images
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Silently force the browser to download all images into memory
    ALL_PRELOADER_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    
    if (sessionStorage.getItem('hasSeenPreloader') === 'true') {
      setShouldRender(false);
      onEnter();
    } else {
      window.scrollTo(0, 0);
    }
  }, [onEnter]);

  useGSAP(() => {
    if (!shouldRender) return;

    const tl = gsap.timeline();

    tl.fromTo(
      imageContainerRef.current,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' },
      0 
    );

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
          const imgIndex = Math.min(
            Math.floor((val / 100) * CYCLING_COUNT),
            CYCLING_COUNT - 1
          );
          setCurrentImage(imgIndex);
        }
      },
      onComplete: () => {
        setIsReady(true);
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }
    }, 0);
  }, { scope: overlayRef, dependencies: [shouldRender] });

  const handleEnterClick = () => {
    if (!isReady) return;

    // Save to memory so it doesn't play again when they hit 'Go back'
    sessionStorage.setItem('hasSeenPreloader', 'true');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const tl = gsap.timeline({
      onComplete: onEnter,
    });

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

  if (!shouldRender) return null;

  return (
    <div 
      ref={overlayRef}
      className={`fixed inset-0 z-[200] bg-[#ffffff] flex flex-col items-center justify-center transition-colors ${
        isReady ? 'cursor-pointer' : 'cursor-wait'
      }`}
      onClick={handleEnterClick}
    >
      <div ref={contentBlockRef} className="flex flex-col w-44 md:w-[220px]">
        <div className="flex justify-between items-end mb-2.5 font-dm-sans text-[#141613]">
          <span className="text-[11px] md:text-xs font-medium tracking-wide uppercase">
            doesKaus
          </span>
          <span className="text-[11px] md:text-xs font-medium">
            {progress}
          </span>
        </div>

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

      <div 
        ref={ctaRef}
        className="absolute bottom-12 font-dm-sans text-[10px] md:text-xs text-[#141613]/60 tracking-[0.1em] uppercase opacity-0 pointer-events-none"
      >
        Click to enter
      </div>
    </div>
  );
}
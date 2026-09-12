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

const PRELOADER_TEXTS = [
  'Look Around',
  'Stay Curious',
  'Make Something',
  'Make It Better',
];

const FINAL_IMAGE_INDEX = ALL_PRELOADER_IMAGES.length - 1;
const CYCLING_COUNT = FINAL_IMAGE_INDEX;

export default function EnterScreen({ onEnter }: EnterScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentBlockRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const animatedTextRef = useRef<HTMLDivElement>(null); // --- NEW REF for the text block ---
  
  const [progress, setProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  // Check memory on mount and cache images
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
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

  // --- UPDATED: Timer now waits until isReady is true to start cycling ---
  useEffect(() => {
    if (!shouldRender || !isReady) return;

    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => prev + 1);
    }, 2000); 
    
    return () => clearInterval(timer);
  }, [shouldRender, isReady]);

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
        
        // Static entrance for CTA
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );

        // --- NEW: Static entrance for the animated text block ---
        gsap.fromTo(animatedTextRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );
      }
    }, 0);
  }, { scope: overlayRef, dependencies: [shouldRender] });

  const handleEnterClick = () => {
    if (!isReady) return;

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

  const activeTextIndex = currentTextIndex % PRELOADER_TEXTS.length;
  const prevTextIndex = (currentTextIndex - 1 + PRELOADER_TEXTS.length) % PRELOADER_TEXTS.length;

  return (
    <div 
      ref={overlayRef}
      className={`fixed inset-0 z-[200] bg-[#ffffff] flex flex-col items-center justify-center transition-colors ${
        isReady ? 'cursor-pointer' : 'cursor-wait'
      }`}
      onClick={handleEnterClick}
    >
      <div ref={contentBlockRef} className="relative flex flex-col w-44 md:w-[220px]">
        
        <div className="flex justify-between items-end mb-2.5 font-dm-sans text-[#141613]">
          <span className="text-[11px] md:text-xs font-medium tracking-wide uppercase">
            DOESKAUS
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

        {/* --- UPDATED: Added ref, initial opacity-0, and increased text/container sizes --- */}
        <div 
          ref={animatedTextRef}
          className="absolute top-[55%] -translate-y-1/2 left-[calc(100%+80px)] md:left-[calc(100%+160px)] font-dm-sans text-[#383838] opacity-0"
        >
          {/* Increased container dimensions to accommodate larger text */}
          <div className="relative h-[20px] md:h-[24px] w-[180px] md:w-[200px] overflow-hidden">
            {PRELOADER_TEXTS.map((text, index) => {
              const isAnimating = index === activeTextIndex || index === prevTextIndex;
              
              return (
                <span
                  key={index}
                  // Increased text size to text-sm md:text-base
                  className={`absolute left-0 bottom-0 text-sm md:text-base font-medium tracking-wide will-change-transform ${
                    isAnimating ? 'transition-all duration-700 ease-out' : 'transition-none'
                  } ${
                    index === activeTextIndex
                      ? 'translate-y-0 opacity-100'
                      : index === prevTextIndex
                      ? '-translate-y-full opacity-0'
                      : 'translate-y-full opacity-0'
                  }`}
                >
                  {text}
                </span>
              );
            })}
          </div>
        </div>

      </div>

      <div 
        ref={ctaRef}
        className="absolute bottom-24 font-dm-sans text-[11px] md:text-xs font-medium text-[#4A4A4A] tracking-[0.1em] uppercase opacity-0 pointer-events-none"
      >
        Click to enter
      </div>
    </div>
  );
}
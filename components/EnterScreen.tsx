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
  const animatedTextRef = useRef<HTMLDivElement>(null); 
  
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

  // --- UPDATED: Slowed down to 1500ms and stops automatically on the last text ---
  useEffect(() => {
    if (!shouldRender || isReady) return;

    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => {
        // If we are about to hit the last index, clear the interval so it stops cycling
        if (prev >= PRELOADER_TEXTS.length - 2) {
          clearInterval(timer);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 1500); 
    
    return () => clearInterval(timer);
  }, [shouldRender, isReady]);

  useGSAP(() => {
    if (!shouldRender) return;

    const tl = gsap.timeline();

    // 1. Initial entrance of the image box and the cycling text
    tl.fromTo(
      imageContainerRef.current,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' },
      0 
    );
    
    gsap.fromTo(animatedTextRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    // 2. The 5-second progress counter
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 5,
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
        
        // Automatic "Curtain Reveal" Exit Sequence
        const exitTl = gsap.timeline({
          delay: 1.2, 
          onComplete: () => {
            sessionStorage.setItem('hasSeenPreloader', 'true');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            onEnter();
          }
        });

        exitTl.to(contentBlockRef.current, { 
          scale: 0.85, 
          opacity: 0, 
          duration: 0.8, 
          ease: 'power3.inOut' 
        })
        .to(overlayRef.current, {
          yPercent: -100, 
          duration: 1.2,
          ease: 'expo.inOut',
        }, '-=0.4'); 
      }
    }, 0);
  }, { scope: overlayRef, dependencies: [shouldRender] });

  if (!shouldRender) return null;

  const activeTextIndex = currentTextIndex % PRELOADER_TEXTS.length;
  const prevTextIndex = (currentTextIndex - 1 + PRELOADER_TEXTS.length) % PRELOADER_TEXTS.length;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-[#ffffff] flex flex-col items-center justify-center cursor-wait will-change-transform"
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

        <div 
          ref={animatedTextRef}
          className="absolute top-[55%] -translate-y-1/2 left-[calc(100%+80px)] md:left-[calc(100%+160px)] font-dm-sans text-[#383838] opacity-0"
        >
          <div className="relative h-[20px] md:h-[24px] w-[180px] md:w-[200px] overflow-hidden">
            {PRELOADER_TEXTS.map((text, index) => {
              const isAnimating = index === activeTextIndex || index === prevTextIndex;
              
              return (
                <span
                  key={index}
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
    </div>
  );
}
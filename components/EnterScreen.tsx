'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface EnterScreenProps {
  onEnter: () => void;
}

const ALL_PRELOADER_IMAGES = [
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
  const bottomTextRef = useRef<HTMLDivElement>(null); 
  
  const [progress, setProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

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

  useGSAP(() => {
    if (!shouldRender) return;

    const tl = gsap.timeline();

    tl.fromTo(
      imageContainerRef.current,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'expo.inOut' }
    );
    
    gsap.fromTo(bottomTextRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
    );

    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 3.6,
      ease: 'none',
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
        
        const exitTl = gsap.timeline({
          delay: 0.1, 
          onComplete: () => {
            sessionStorage.setItem('hasSeenPreloader', 'true');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            onEnter();
          }
        });

        exitTl.to(imageContainerRef.current, { 
          clipPath: 'inset(0% 0% 100% 0%)', 
          duration: 1, 
          ease: 'power3.inOut' 
        })
        .to([bottomTextRef.current, '.preloader-header'], {
          opacity: 0,
          duration: 0.3
        }, '<')
        .to(overlayRef.current, {
          opacity: 0, 
          duration: 0.4, 
          ease: 'power2.inOut',
        }, '-=0.1'); 
      }
    }); 
  }, { scope: overlayRef, dependencies: [shouldRender] });

  if (!shouldRender) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-[#ffffff] flex flex-col items-center justify-center cursor-wait will-change-transform"
    >
      <div ref={contentBlockRef} className="relative flex flex-col w-44 md:w-[220px]">
        
        {/* --- UPDATED: Matching the exact sizes and tracking of the Hero Product Designer text --- */}
        <div className="preloader-header flex justify-between items-end mb-2.5 font-dm-sans text-[#141613]">
          <span className="text-[11px] md:text-[14px] font-medium tracking-[-0.02em] uppercase">
            DOESKAUS
          </span>
          <span className="text-[11px] md:text-[14px] font-medium tracking-[-0.02em]">
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

        {/* --- UPDATED: Elegant editorial serif italic --- */}
        <div 
          ref={bottomTextRef}
          className="mt-4 text-[15px] md:text-[17px] text-[#141613]/80 text-center opacity-0 tracking-wide italic"
          style={{ fontFamily: "'Instrument Serif', 'Newsreader', 'Playfair Display', Georgia, serif" }}
        >
          Staying curious
        </div>

      </div>
    </div>
  );
}
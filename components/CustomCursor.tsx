'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [pillText, setPillText] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.classList.remove('is-pill');
    setPillText('');

    gsap.to(cursor, {
      width: '12px',
      height: '12px',
      padding: '0px',
      scale: 1,
      backgroundColor: '#141613',
      borderColor: 'transparent',
      borderWidth: '0px',
      borderRadius: '9999px',
      boxShadow: 'none',
      duration: 0.25,
      ease: 'power2.out',
    });
  }, [pathname]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      if (cursor.classList.contains('is-pill')) {
        moveX(e.clientX - 75); 
        moveY(e.clientY - 20);
      } else {
        moveX(e.clientX - 6);
        moveY(e.clientY - 6);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      
      if (target) {
        const cursorData = target.getAttribute('data-cursor');

        if (cursorData === 'case-study') {
          setPillText('See Case Study');
          cursor.classList.add('is-pill');

          gsap.to(cursor, {
            width: 'auto',
            height: 'auto',
            scale: 1,
            backgroundColor: '#FFFFFF',
            borderColor: 'transparent',
            borderRadius: '40px',
            padding: '12px 24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            duration: 0.25,
            ease: 'power2.out',
          });
        } else if (cursorData === 'hover') {
          cursor.classList.remove('is-pill');
          setPillText('');

          gsap.to(cursor, {
            width: '12px',
            height: '12px',
            padding: '0px',
            scale: 3,
            backgroundColor: 'transparent',
            borderColor: '#C1001F',
            borderWidth: '1px',
            borderRadius: '9999px',
            boxShadow: 'none',
            duration: 0.25,
            ease: 'power2.out',
          });
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      
      // --- THE FIX IS HERE ---
      // If we are moving to another element that is STILL INSIDE the same target container, 
      // ignore the event and don't shrink the cursor.
      if (target && e.relatedTarget instanceof Node && target.contains(e.relatedTarget)) {
        return; 
      }
      
      if (target) {
        cursor.classList.remove('is-pill');
        setPillText('');

        gsap.to(cursor, {
          width: '12px',
          height: '12px',
          padding: '0px',
          scale: 1,
          backgroundColor: '#141613',
          borderColor: 'transparent',
          borderWidth: '0px',
          borderRadius: '9999px',
          boxShadow: 'none',
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-[#141613] rounded-full pointer-events-none z-[100] flex items-center justify-center transform origin-center transition-colors"
      style={{ willChange: 'transform' }}
    >
      {pillText && (
        <div className="font-dm-sans text-[13px] font-bold tracking-tight text-black flex items-center gap-2 whitespace-nowrap select-none">
          <span>{pillText}</span>
          <span className="text-sm font-normal">→</span>
        </div>
      )}
    </div>
  );
}
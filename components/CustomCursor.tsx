'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // quickTo for 60fps hardware-accelerated tracking
    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      // Offset by 6px to center the 12px (w-3 h-3) cursor on the mouse pointer
      moveX(e.clientX - 6);
      moveY(e.clientY - 6);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      
      if (target) {
        // Expand into a hollow red ring
        gsap.to(cursor, {
          scale: 3, 
          backgroundColor: 'transparent',
          borderColor: '#C1001F',
          borderWidth: '1px',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      
      if (target) {
        // Snap back to the solid dark dot
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: '#141613',
          borderColor: 'transparent',
          borderWidth: '0px',
          duration: 0.3,
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
      className="fixed top-0 left-0 w-3 h-3 bg-[#141613] rounded-full pointer-events-none z-[100] transform origin-center"
      style={{ willChange: 'transform' }}
    />
  );
}
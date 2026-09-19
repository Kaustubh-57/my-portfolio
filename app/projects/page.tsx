'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CATEGORIES = [
  'All',
  'UI/UX',
  'Visual Design',
  'Industrial Design',
  'AR/VR',
  'Photography'
];

const PROJECTS = [
  {
    id: '01',
    slug: 'shoppin',
    title: 'SHoppin',
    subtitle: 'Making street shopping easier to explore',
    tags: ['DIGITAL PRODUCT', 'UI/UX DESIGN'],
    category: 'UI/UX',
    image: '/projects/shoppin/mockup.png', 
  },
  {
    id: '02',
    slug: 'bubbleshare',
    title: 'Bubbleshare',
    subtitle: 'Making File Sending feel Natural',
    tags: ['DIGITAL PRODUCT', 'UI/UX DESIGN'],
    category: 'UI/UX',
    image: '/projects/bubbleshare/mockup.png',
  },
  {
    id: '03',
    slug: 'decicon',
    title: 'Decicon',
    subtitle: 'A quieter way to experience the everyday.',
    tags: ['SYSTEM DESIGN', 'UI/UX DESIGN'],
    category: 'Industrial Design',
    image: '/projects/decicon/mockup.png',
  },
  {
    id: '04',
    slug: 'lilavati',
    title: 'Lilavati Hospital',
    subtitle: 'Website Redesign for streamlined healthcare journeys.',
    tags: ['UX/UI REDESIGN', 'USABILITY TESTING'],
    category: 'UI/UX',
    image: '/projects/lilavati/mockup.png',
  },
  {
    id: '05',
    slug: 'chromebuds',
    title: 'Chromebuds',
    subtitle: 'Rethinking why people are leaving TWS behind.',
    tags: ['INDUSTRIAL DESIGN', 'UX DESIGN'],
    category: 'Industrial Design',
    image: '/projects/chromebuds/mockup.png',
  }
];

// PHOTOGRAPHY GRID DATA
// The 'span' perfectly recreates the exact proportions of your mockup using a 12-column grid.
const PHOTOGRAPHY_IMAGES = [
  // ROW 1
  { id: 1, src: '/photography/1.jpg', span: 'col-span-12 md:col-span-6' },
  { id: 2, src: '/photography/2.jpg', span: 'col-span-6 md:col-span-3' },
  { id: 3, src: '/photography/3.jpg', span: 'col-span-6 md:col-span-3' },
  // ROW 2
  { id: 4, src: '/photography/4.jpg', span: 'col-span-12 md:col-span-5' },
  { id: 5, src: '/photography/5.jpg', span: 'col-span-6 md:col-span-3' },
  { id: 6, src: '/photography/6.jpg', span: 'col-span-6 md:col-span-4' },
  // ROW 3
  { id: 7, src: '/photography/7.jpg', span: 'col-span-12 md:col-span-4' },
  { id: 8, src: '/photography/8.jpg', span: 'col-span-6 md:col-span-4' },
  { id: 9, src: '/photography/90.jpg', span: 'col-span-6 md:col-span-4' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // UPDATED: Now stores the index of the image instead of the URL string so we can navigate
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Simple fade-in animation for the page load
  useGSAP(() => {
    gsap.fromTo(
      '.project-element',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  // Animate the grid when category changes
  useGSAP(() => {
    gsap.fromTo(
      '.grid-item',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out' }
    );
  }, { dependencies: [activeCategory] });

  // Navigation handlers for Lightbox
  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => 
      prev !== null ? (prev === PHOTOGRAPHY_IMAGES.length - 1 ? 0 : prev + 1) : null
    );
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => 
      prev !== null ? (prev === 0 ? PHOTOGRAPHY_IMAGES.length - 1 : prev - 1) : null
    );
  };

  // Keyboard navigation hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setLightboxIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <main className="relative w-full bg-[#ffffff] min-h-screen pb-32">
      <Navbar />
      
      <div className="w-full px-8 md:px-12 pt-28 md:pt-36">
        
        {/* --- HEADER --- */}
        <h1 
          className="project-element text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#141613] leading-none tracking-[-0.03em] mb-10 md:mb-12"
          style={{ fontFamily: "'Stack Sans Headline', sans-serif" }}
        >
          Projects
        </h1>

        {/* --- CATEGORY TABS --- */}
        <div className="project-element w-full flex overflow-x-auto gap-6 md:gap-10 border-b border-[#141613]/15 pb-3 mb-10 md:mb-12 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap transition-colors duration-300 snap-start outline-none ${
                activeCategory === category 
                  ? 'text-[#141613] font-bold' 
                  : 'text-[#141613]/50 font-medium hover:text-[#141613]/80'
              } text-[18px] md:text-[22px] tracking-tight`}
              style={{ fontFamily: "'Stack Sans Headline', sans-serif" }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* --- DYNAMIC RENDER: Projects vs Photography --- */}
        {activeCategory === 'Photography' ? (
          
          /* PHOTOGRAPHY 12-COLUMN GRID */
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {PHOTOGRAPHY_IMAGES.map((img, index) => (
              <div 
                key={img.id} 
                onClick={() => setLightboxIndex(index)}
                className={`grid-item ${img.span} h-[250px] md:h-[350px] bg-[#141613] overflow-hidden cursor-zoom-in relative group`}
              >
                <img 
                  src={img.src} 
                  alt={`Photography ${img.id}`} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x600/141613/444444?text=Photo+${img.id}`;
                  }}
                />
              </div>
            ))}
          </div>

        ) : (

          /* STANDARD PROJECT GRID OR EMPTY STATE */
          filteredProjects.length === 0 ? (
            <div className="w-full py-32 flex justify-center items-center">
              <p className="font-dm-sans text-[20px] md:text-[24px] text-[#141613]/40 tracking-tight font-medium">
                Updating soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-20">
              {filteredProjects.map((project) => (
                <a 
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="grid-item group flex flex-col cursor-pointer"
                  data-cursor="hover"
                >
                  {/* Image Container */}
                  <div className="w-full aspect-[16/10] bg-[#F4F7FA] overflow-hidden mb-5">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.style.backgroundColor = '#E5E7EB';
                      }}
                    />
                  </div>

                  {/* Text Content */}
                  <h3 
                    className="text-[22px] md:text-[26px] font-bold text-[#141613] tracking-tight leading-[1.2] mb-1.5"
                    style={{ fontFamily: "'Stack Sans Headline', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  
                  <p className="font-dm-sans text-[15px] md:text-[16px] text-[#141613]/70 tracking-[-0.01em] mb-5">
                    {project.subtitle}
                  </p>

                  {/* Tags / Pills */}
                  <div className="flex flex-wrap items-center gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="font-dm-sans text-[9px] md:text-[10px] font-bold tracking-[0.06em] text-[#141613] uppercase px-3.5 py-1.5 border border-[#141613]/25 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          )
        )}

      </div>

      {/* --- LIGHTBOX POP-UP --- */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[200] bg-[#141613]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-[210]"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          {/* Previous Button */}
          <button 
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-[210]"
            onClick={handlePrev}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Next Button */}
          <button 
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-[210]"
            onClick={handleNext}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Main Image */}
          <img 
            src={PHOTOGRAPHY_IMAGES[lightboxIndex].src} 
            alt="Expanded view" 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking directly on the image
          />
        </div>
      )}

    </main>
  );
}
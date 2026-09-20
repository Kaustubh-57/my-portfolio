'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import About from '@/components/About'; 

gsap.registerPlugin(ScrollTrigger);

// --- RESTORED SIDEBAR (All 10 Items) ---
const SIDEBAR_ITEMS = [
  { id: '01', title: 'Overview', target: 'overview' },
  { id: '02', title: 'The Context', target: 'context' },
  { id: '03', title: 'The Problem', target: 'problem' },
  { id: '04', title: 'Digging Deeper', target: 'deeper' },
  { id: '05', title: 'The Direction', target: 'direction' },
  { id: '06', title: 'Key Features', target: 'features' },
  { id: '07', title: 'Designing Shoppin', target: 'designing' },
  { id: '08', title: 'Usability Testing', target: 'testing' },
  { id: '09', title: 'Final Experience', target: 'final' },
  { id: '10', title: 'Reflection', target: 'reflection' }
];

// --- TAB DATA FOR SECTION 4 (Digging Deeper) ---
const TAB_DATA = {
  OBSERVATIONS: {
    leftTitle: 'WHAT WE SAW ON THE GROUND',
    leftContent: (
      <>
        <p className="mb-4 lg:mb-6">At Hill Road, navigation wasn't really about addresses. People moved through the market using landmarks, familiar shops and whatever visual cues they could recognise along the way.</p>
        <p>Most stalls didn't have clear nameplates, making individual shops difficult to identify and revisit.</p>
      </>
    ),
    rightContent: [
      { title: 'LANDMARKS', desc: 'People used cafés, shops and other familiar places as reference points.' },
      { title: 'VISUAL CUES', desc: 'Shoppers relied on what they could see around them to understand where they were.' },
      { title: 'UNSTRUCTURED LAYOUT', desc: 'Crowded lanes and changing vendor setups made conventional navigation difficult.' }
    ]
  },
  INTERVIEWS: {
    leftTitle: 'WHAT PEOPLE TOLD US',
    leftContent: (
      <>
        <p className="mb-4 lg:mb-6">Talking to vendors and shoppers showed that street shopping already runs on a strong offline network of trust, recommendations and familiarity. The problem starts when someone doesn't already know the market.</p>
        <p><strong className="font-bold">One interaction stood out:</strong><br />Two Argentinian tourists found Hill Road through ChatGPT, but once they arrived, they still couldn't find the shops they were looking for.</p>
      </>
    ),
    rightContent: [
      { title: 'TRUST STAYS OFFLINE', desc: 'Most vendors had years of experience and strong relationships with repeat customers. They preferred staying offline because of concerns around returns, personal connection and the limitations of online selling.' },
      { title: 'DISCOVERY RUNS THROUGH PEOPLE', desc: 'Regular shoppers often discovered vendors through friends, family and WhatsApp.' },
      { title: 'NEW VISITORS DON\'T HAVE THAT KNOWLEDGE', desc: 'First-time shoppers didn\'t have the same mental map. Without familiar landmarks or information about specific shops and their current collections, discovering the right place became much harder.' }
    ]
  },
  SURVEY: {
    leftTitle: 'THE PATTERN SHOWED UP IN THE NUMBERS',
    leftContent: (
      <p>People weren't asking for directions in the traditional sense. They were looking for familiar things to orient themselves around.</p>
    ),
    rightContent: [
      { isStat: true, title: '97%', desc: 'discovered street shopping through family or friends' },
      { isStat: true, title: '60%', desc: 'used famous shops or stalls as landmarks' },
      { isStat: true, title: '68%', desc: 'didn\'t find what they came looking for' },
      { isStat: true, title: '32%', desc: 'were able to find what they were looking for' },
      { isFooter: true, desc: 'WHEN THERE WASN\'T A MAP TO RELY ON, PEOPLE BUILT THEIR OWN.' }
    ]
  }
};

// --- DATA FOR DESIGN SYSTEM ACCORDION ---
const DESIGN_SYSTEM_ITEMS = [
  { id: 'typography', title: 'Typography System', image: '/projects/shoppin/typography.png' },
  { id: 'color', title: 'Color Pallete', image: '/projects/shoppin/color.png' },
  { id: 'iconography', title: 'Iconography', image: '/projects/shoppin/iconography.png' },
  { id: 'guidelines', title: 'Design Guidelines', image: '/projects/shoppin/guidelines.png' },
  { id: 'components', title: 'Component Library', image: '/projects/shoppin/components.png' },
  { id: 'buttons', title: 'Buttons & Controls', image: '/projects/shoppin/buttons.png' },
  { id: 'status', title: 'Status Overlays', image: '/projects/shoppin/status.png' },
  { id: 'feedback', title: 'Feedback', image: '/projects/shoppin/feedback.png' },
  { id: 'map', title: 'Map Card', image: '/projects/shoppin/Map Cards.png' },
  { id: 'category', title: 'Category Cards', image: '/projects/shoppin/category.png' },
  { id: 'save', title: 'Save Boards', image: '/projects/shoppin/save.png' }
];

// --- TAB DATA FOR SECTION 6 (Key Features) ---
type DesignTabData = {
  title: string;
  screens: { label: string; src: string }[];
  footer?: string; 
};

const DESIGN_TAB_DATA: Record<'DISCOVER' | 'NAVIGATE' | 'CONNECT' | 'SAVE', DesignTabData> = {
  DISCOVER: {
    title: "Find markets, categories and popular shops before and during your visit.",
    screens: [
      { label: "Find Markets", src: "/projects/shoppin/discover-1.png" },
      { label: "Categories", src: "/projects/shoppin/discover-2.png" },
      { label: "Popular Shops", src: "/projects/shoppin/discover-3.png" }
    ],
    footer: "From finding a market to finding a specific shop Shoppin connects the entire journey."
  },
  NAVIGATE: {
    title: "Find specific shops and move through the market using location, directions and landmarks.",
    screens: [
      { label: "Market Maps", src: "/projects/shoppin/navigate-1.png" },
      { label: "Navigation", src: "/projects/shoppin/navigate-2.png" },
      { label: "Offline Navigation", src: "/projects/shoppin/navigate-3.png" }
    ]
  },
  CONNECT: {
    title: "See where your friends are and find your way to them.",
    screens: [
      { label: "Find Friends", src: "/projects/shoppin/connect-1.png" },
      { label: "Find them", src: "/projects/shoppin/connect-2.png" },
      { label: ".", src: "/projects/shoppin/connect-3.png" }
    ]
  },
  SAVE: {
    title: "Keep favourite shops and places so they're easier to find again.",
    screens: [
      { label: "Save Shops", src: "/projects/shoppin/save-1.png" },
      { label: "Find them again", src: "/projects/shoppin/save-2.png" },
      { label: "Navigate To Them", src: "/projects/shoppin/save-3.png" }
    ]
  }
};

// --- DATA FOR TESTING TABS ---
const TEST_TAB_DATA = {
  'TASK 1 : FIND A SHOP': { image: '/projects/shoppin/task-1.png' },
  'TASK 2 : SAVE SHOP': { image: '/projects/shoppin/task-2.png' },
  'TASK 3 : FIND FRIEND': { image: '/projects/shoppin/task-3.png' }
};

export default function ShoppinCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const designContentRef = useRef<HTMLDivElement>(null);
  const testContentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const [activeSection, setActiveSection] = useState('01');
  
  const [activeTab, setActiveTab] = useState<keyof typeof TAB_DATA>('OBSERVATIONS');
  const [isAnimatingTab, setIsAnimatingTab] = useState(false);
  
  const [activeDesignTab, setActiveDesignTab] = useState<keyof typeof DESIGN_TAB_DATA>('DISCOVER');
  const [isAnimatingDesignTab, setIsAnimatingDesignTab] = useState(false);

  const [activeTestTab, setActiveTestTab] = useState<keyof typeof TEST_TAB_DATA>('TASK 1 : FIND A SHOP');
  const [isAnimatingTestTab, setIsAnimatingTestTab] = useState(false);
  
  const [isExiting, setIsExiting] = useState(false);

  // --- REFACTORED PROGRESS BAR LOGIC ---
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hasStartedLoading = useRef(false);
  
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  // --- TAB ANIMATIONS ---
  const handleTabClick = (tab: keyof typeof TAB_DATA) => {
    if (tab === activeTab || isAnimatingTab) return;
    setIsAnimatingTab(true);

    gsap.to(tabContentRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(tab);
        gsap.fromTo(tabContentRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', onComplete: () => setIsAnimatingTab(false) }
        );
      }
    });
  };

  const handleDesignTabClick = (tab: keyof typeof DESIGN_TAB_DATA) => {
    if (tab === activeDesignTab || isAnimatingDesignTab) return;
    setIsAnimatingDesignTab(true);

    gsap.to(designContentRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setActiveDesignTab(tab);
        gsap.fromTo(designContentRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', onComplete: () => setIsAnimatingDesignTab(false) }
        );
      }
    });
  };

  const handleTestTabClick = (tab: keyof typeof TEST_TAB_DATA) => {
    if (tab === activeTestTab || isAnimatingTestTab) return;
    setIsAnimatingTestTab(true);

    gsap.to(testContentRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTestTab(tab);
        gsap.fromTo(testContentRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', onComplete: () => setIsAnimatingTestTab(false) }
        );
      }
    });
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(prev => prev === id ? null : id);
  };

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo('.sidebar-anim',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }
    );

    tl.fromTo('.overview-anim',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
      '-=0.6'
    );

    // Fade in the back-to-top section when scrolled to the bottom
    gsap.fromTo('.footer-anim',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-anim', start: 'top 95%', toggleActions: 'play none none none' }
      }
    );

    const sectionClasses = ['.context-anim', '.problem-anim', '.found-anim', '.direction-anim', '.features-anim', '.designing-anim', '.testing-anim', '.final-anim', '.reflection-anim'];
    
    sectionClasses.forEach(selector => {
      gsap.utils.toArray(selector).forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });
    });

    SIDEBAR_ITEMS.forEach((item) => {
      ScrollTrigger.create({
        trigger: `#${item.target}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(item.id);
          }
        }
      });
    });

  }, { scope: containerRef });

  const handleGoBack = () => {
    if (isExiting) return;
    setIsExiting(true);

    gsap.to('.case-study-content', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push('/?returnTo=shoppin');
      }
    });
  };

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-[#ffffff]">
      <Navbar />
      
      <div className="case-study-content w-full flex">
        
        {/* --- LEFT SIDEBAR --- */}
        <aside className="hidden lg:flex flex-col w-[19%] h-screen sticky top-0 bg-[#FFFAF1] pl-6 xl:pl-10 pt-[120px] pb-12 z-10 border-r border-[#141613]/5">
          <button 
            onClick={handleGoBack}
            className="sidebar-anim flex items-center justify-center gap-2 w-fit px-5 py-2 rounded-full border border-[#262626] text-[#262626] font-dm-sans text-[14px] tracking-[-0.05em] hover:bg-[#262626] hover:text-[#FFFAF1] transition-colors duration-300 mb-14 opacity-0"
            data-cursor="hover"
          >
            <span className="text-lg leading-none -mt-[2px]">←</span> Go back
          </button>

          <nav className="flex flex-col gap-4 font-dm-sans text-[14px] xl:text-[15px] tracking-[-0.05em]">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.target)}
                  className={`sidebar-anim flex items-center gap-4 text-left transition-all duration-300 opacity-0 ${isActive ? 'text-[#262626] font-medium' : 'text-[#262626]/40 hover:text-[#262626]/80'}`}
                  data-cursor="hover"
                >
                  <span className="text-[11px] xl:text-xs font-momo w-4">{item.id}</span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* --- RIGHT CONTENT --- */}
        <div className="w-full lg:w-[81%] px-6 lg:px-12 xl:px-16 pt-[120px] pb-24 overflow-hidden z-10">
          
          {/* =========================================
              SECTION 1: OVERVIEW 
          ========================================= */}
          <div className="-mt-[180px] -mx-6 lg:-mx-12 xl:-mx-16 pt-[80px] lg:pt-[100px] pb-12 lg:pb-20 bg-[#FFFAF1] border-b border-[#262626]/10 flex flex-col">
            <section id="overview" className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 xl:gap-16 px-6 lg:px-12 xl:px-16">
              
              <div className="overview-anim flex flex-col items-center w-full lg:w-auto opacity-0 order-2 lg:order-1 pt-4 lg:pt-0 shrink-0">
                <div className="relative w-[320px] sm:w-[380px] h-[650px] sm:h-[750px]">
                  <iframe
                    src="https://embed.figma.com/proto/mS11cJ2vtJJcVtnLc1w27l/SHOPPIN?node-id=1986-7021&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2836%3A24193&hide-ui=1&embed-host=share"
                    title="Shoppin Interactive Prototype"
                    className="w-full h-full border-0 relative z-0"
                    allowFullScreen
                    onLoad={() => {
                      if (hasStartedLoading.current) return;
                      hasStartedLoading.current = true;
                      
                      if (progressBarRef.current) {
                        gsap.to(progressBarRef.current, {
                          width: '100%',
                          duration: 10,
                          ease: 'none', 
                          onComplete: () => setIsIframeLoading(false)
                        });
                      } else {
                        setTimeout(() => setIsIframeLoading(false), 10000);
                      }
                    }} 
                  />
                </div>
              </div>

              <div className="overview-anim flex-1 flex flex-col items-start w-full opacity-0 order-1 lg:order-2 mt-6 lg:mt-[60px] xl:mt-[80px]">
                
                <div className="flex items-center w-full mb-6 lg:mb-8">
                  <div className="inline-flex items-center px-6 md:px-7 py-1.5 md:py-2 rounded-full border-[1.5px] border-[#262626]/30 font-dm-sans text-[11px] md:text-xs tracking-wider uppercase text-[#262626]/80">
                    CONNECTED PRODUCT • SYSTEM DESIGN • UX/UI
                  </div>
                </div>

                <h1 className="font-momo text-[32px] lg:text-[36px] xl:text-[42px] font-bold leading-[1.1] text-[#262626] tracking-[-0.02em] max-w-[650px] mb-5">
                  Shoppin: Finding your way through Mumbai's street markets.
                </h1>
                <p className="font-dm-sans text-[15px] lg:text-[16px] leading-[1.5] text-[#262626]/80 tracking-[-0.05em] max-w-[550px]">
                  A digital companion for exploring Mumbai's street markets. It helps people discover shops, navigate crowded lanes, find what they're looking for and keep track of places.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#262626]/50 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                    <p className="font-dm-sans text-[13px] text-[#262626]/60 tracking-[-0.02em] leading-relaxed">
                      Interact with the final version of the prototype here.<br/>
                    </p>
                  </div>

                  {isIframeLoading && (
                    <div className="flex flex-col gap-2 pl-6 pt-1">
                      <div className="w-[200px] h-2 border border-[#262626]/20 bg-[#262626]/5 p-[1px] rounded-[2px] overflow-hidden">
                        <div 
                          ref={progressBarRef}
                          className="h-full bg-[#262626] rounded-[1px]" 
                          style={{ width: '0%' }}
                        />
                      </div>
                      <p className="font-dm-sans text-[13px] text-[#262626]/50 tracking-[-0.02em]">
                        The prototype is loading.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </section>
          </div>

          {/* =========================================
              SECTION 2: THE CONTEXT (Grid Details)
          ========================================= */}
          <section id="context" className="w-full pt-16 lg:pt-20">
            <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 lg:gap-16">
              
              <div className="flex flex-col gap-8 mt-1">
                <div className="context-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">Timeframe</h3>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em]">July 2025 (4 weeks)</p>
                </div>
                <div className="context-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">Done at</h3>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em]">NMIMS School of Design</p>
                </div>
                <div className="context-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">The Team</h3>
                  <ul className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em] leading-relaxed">
                    <li>Kaustubh Korde</li>
                    <li>Aaron Carvalho</li>
                    <li>Deshna Deora</li>
                    <li>Fariya Hasan</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="context-anim opacity-0">
                  <h2 className="font-momo text-[24px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] mb-3">Context</h2>
                  <div className="flex flex-col gap-4 font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.6]">
                    <p className="font-bold text-[#262626]">Mumbai's street markets don't work like conventional shopping spaces.</p>
                    <p>They are made up of hundreds of independent stalls and shops spread across busy, constantly changing streets. Shops may not have clear names or addresses, while shoppers often rely on familiar places, landmarks and visual cues to understand where they are.</p>
                    <p>Unlike a mall or an online marketplace, there isn't always a fixed structure telling you <strong className="font-bold text-[#262626]">what is where</strong>. The experience is built around exploration, recommendations, bargaining and discovering something along the way.</p>
                    <p>This made street markets an interesting space to explore: <strong className="font-bold text-[#262626]">could digital tools support the experience without turning it into another online shopping platform?</strong></p>
                  </div>
                </div>
                <div className="context-anim opacity-0">
                  <h2 className="font-momo text-[24px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] mb-3">My role</h2>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.4]">
                    <li>Contributed to the initial concept and product direction.</li>
                    <li>Worked on UX/UI ideation with Aaron.</li>
                    <li>Designed the Login, Home and Maps experiences.</li>
                    <li>Fully prototyped the screens I designed and co-handled the overall interactive prototype with Aaron.</li>
                    <li>Participated in the field research and development of the overall experience, IA and user flows.</li>
                    <li>Contributed to testing and refining the experience through the final iterations.</li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          <hr className="context-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 3: THE PROBLEM (Map Section)
          ========================================= */}
          <section id="problem" className="w-full">
            <div className="flex flex-col md:flex-row justify-between gap-8 lg:gap-12 items-stretch">
              <div className="flex flex-col justify-between w-full md:w-[48%] lg:w-[46%] py-2">
                <div className="flex flex-col gap-6">
                  <h2 className="problem-anim font-momo text-[22px] lg:text-[26px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] opacity-0 max-w-[480px]">
                    The market was easy to find.<br />The shops weren't.
                  </h2>
                  <p className="problem-anim font-dm-sans text-[13px] lg:text-[15px] text-[#262626]/80 tracking-[-0.05em] leading-[1.6] opacity-0 max-w-[460px]">
                   Street markets are easy to reach, but difficult to navigate once you're inside.<br /> <br />Shops are often spread across crowded lanes without clear names, addresses or consistent signage, making it difficult to know where a particular shop is or how to get back to it. Shoppers instead rely on landmarks, familiar stores and visual cues to orient themselves.<br />
<br />This becomes especially difficult when you're looking for something specific. You may know the market, or even know that a particular shop exists, but still have no clear way to locate it among hundreds of stalls and changing storefronts.
                  </p>
                </div>
                <h2 className="problem-anim font-momo text-[22px] lg:text-[26px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.25] mt-16 md:mt-auto opacity-0 max-w-[460px]">
                  If digital tools can get you to the market, why do they stop helping once you enter it?
                </h2>
              </div>

              <div className="flex flex-col items-center justify-start w-full md:w-[48%] lg:w-[45%] problem-anim opacity-0">
                <div className="relative w-full aspect-[3/4] rounded-[16px] overflow-hidden group cursor-crosshair bg-[#f5f5f5]">
                  <img 
                    src="/projects/shoppin/Map.png" 
                    alt="Map view of the market" 
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0 z-20"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <img 
                    src="/projects/shoppin/Market.png" 
                    alt="Hill road street market navigation problem" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-105 z-10"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <p className="font-dm-sans text-[12px] lg:text-[13px] text-[#262626]/60 tracking-[-0.05em] mt-3 text-center">
                  *hover over the images to see the problem
                </p>
              </div>
            </div>
          </section>

          <hr className="problem-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 4: DIGGING DEEPER 
          ========================================= */}
          <section id="deeper" className="w-full">
            <div className="found-anim flex flex-col md:flex-row justify-between items-end mb-0 opacity-0 relative z-20">
              <h2 className="font-momo text-[26px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] pb-3 whitespace-nowrap flex-shrink-0">
                Digging deeper
              </h2>
              <div className="flex items-center gap-2 lg:gap-6">
                {(Object.keys(TAB_DATA) as Array<keyof typeof TAB_DATA>).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={`flex items-center gap-2 px-5 lg:px-6 py-3 font-dm-sans text-[12px] lg:text-[13px] font-bold tracking-[-0.05em] transition-colors duration-300 relative top-[1px] ${
                        isActive 
                          ? 'bg-[#FDF9F1] text-[#262626] rounded-t-[12px]' 
                          : 'bg-transparent text-[#262626]/60 hover:text-[#262626]'
                      }`}
                    >
                      {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#4A1515]"></span>}
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="-ml-6 lg:-ml-8 w-[calc(100%+1.5rem)] lg:w-[calc(100%+2rem)]">
              <div className="found-anim bg-[#FDF9F1] rounded-none relative z-10 opacity-0 min-h-[300px]">
                <div ref={tabContentRef} className="p-6 lg:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16">
                    <div className="flex flex-col">
                      <h3 className="font-dm-sans text-[14px] lg:text-[15px] font-bold text-[#262626] tracking-[-0.05em] uppercase mb-4 lg:mb-5">
                        {TAB_DATA[activeTab].leftTitle}
                      </h3>
                      <div className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/80 tracking-[-0.05em] leading-[1.5]">
                        {TAB_DATA[activeTab].leftContent}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      {TAB_DATA[activeTab].rightContent.map((item: any, index: number) => (
                        <React.Fragment key={index}>
                          {index > 0 && <hr className="border-t border-[#262626]/10 my-4" />}
                          {item.isFooter ? (
                            <p className="font-dm-sans text-[13px] lg:text-[14px] font-bold text-[#262626] tracking-[-0.05em] uppercase mt-1">
                              {item.desc}
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-6 items-start">
                              <h4 className={`font-dm-sans text-[#262626] tracking-[-0.05em] ${item.isStat ? 'text-[40px] font-bold leading-none' : 'text-[14px] font-bold uppercase mt-1'}`}>
                                {item.title}
                              </h4>
                              <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/80 tracking-[-0.05em] leading-[1.5]">
                                {item.desc}
                              </p>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="found-anim flex flex-col md:flex-row w-full mt-4 opacity-0 rounded-none overflow-hidden">
                <div className="w-full md:w-[60%] lg:w-[62%] bg-[#F0A8AF] p-6 lg:p-8 flex flex-col gap-4">
                  <h3 className="font-dm-sans text-[18px] lg:text-[20px] font-bold text-[#262626] tracking-[-0.05em] leading-[1.3] max-w-[500px]">
                    The problem wasn't getting to the market.<br/>It was knowing what to do once you got there.
                  </h3>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/85 tracking-[-0.05em] leading-[1.5] lg:pr-8">
                    <span className="font-semibold italic">The digital and physical parts of the experience were disconnected.</span> Digital tools helped people decide <span className="italic font-semibold">where to go</span>, while the market itself determined how <span className="italic font-semibold">they found their way once they arrived.</span>
                  </p>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/85 tracking-[-0.05em] leading-[1.5] lg:pr-8">
                    <span className="font-bold">Shoppin</span> became an opportunity to connect these two parts without taking away what makes street shopping different.
                  </p>
                </div>
                <div className="w-full md:w-[40%] lg:w-[38%] bg-[#FCE49C] p-6 lg:p-8 flex flex-col gap-3">
                  <h3 className="font-dm-sans text-[22px] lg:text-[24px] font-bold text-[#262626] tracking-[-0.05em]">
                    How Might We
                  </h3>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/85 tracking-[-0.05em] leading-[1.5] max-w-[280px]">
                    bring the essence of street shopping into a digital tool that helps people explore markets with ease, confidence and minimal hassle?
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="found-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 5: THE DIRECTION
          ========================================= */}
          <section id="direction" className="w-full">
            <div className="flex flex-col">
              <h2 className="direction-anim font-momo text-[26px] lg:text-[32px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.2] opacity-0 max-w-[650px] mb-8">
                We didn't want to build another map.<br />We wanted to build a guide to the market.
              </h2>
              
              <div className="flex flex-col gap-6">
                <p className="direction-anim font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/85 tracking-[-0.05em] leading-[1.6] opacity-0 max-w-[650px]">
                  A conventional map could tell someone where a shop is. But street markets aren't experienced through addresses alone.
                </p>
                <p className="direction-anim font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/85 tracking-[-0.05em] leading-[1.6] opacity-0 max-w-[650px]">
                  We wanted Shoppin to work more like the way people already experience these markets by what they're looking for, what's around them, people they know and recommendations.
                </p>
              </div>
            </div>
          </section>

          <hr className="direction-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 6: KEY FEATURES (Hero + 4 Things)
          ========================================= */}
          <section id="features" className="w-full">
            
            {/* 1. FULL BLEED HERO IMAGE */}
            <div className="-mx-6 lg:-mx-12 xl:-mx-16 mb-16 lg:mb-24 features-anim opacity-0">
              <img 
                src="/projects/shoppin/shoppin.png" 
                alt="Introducing Shoppin" 
                className="w-full h-auto object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            {/* 2. 4 THINGS TABS */}
            <h2 className="features-anim font-momo text-[26px] lg:text-[32px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] mb-10 lg:mb-14 opacity-0 text-center">
              4 things make up the Shoppin experience.
            </h2>

            {/* FULL BLEED WRAPPER FOR 4 THINGS */}
            <div className="-mx-6 lg:-mx-12 xl:-mx-16 mb-20 lg:mb-32">
              <div className="features-anim flex flex-col w-full opacity-0">
                
                {/* TABS HEADER */}
                <div className="flex w-full px-6 lg:px-12 xl:px-16 relative z-20 translate-y-[2px]">
                  {(Object.keys(DESIGN_TAB_DATA) as Array<keyof typeof DESIGN_TAB_DATA>).map((tab) => {
                    const isActive = activeDesignTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => handleDesignTabClick(tab)}
                        className={`flex-1 text-center py-4 lg:py-5 flex justify-center items-center gap-2 font-dm-sans text-[13px] lg:text-[15px] font-bold tracking-[0.05em] transition-colors duration-300 relative ${
                          isActive 
                            ? 'bg-[#FDF9F1] text-[#262626] rounded-t-[16px] z-30' 
                            : 'bg-transparent text-[#262626]/60 hover:text-[#262626] z-10'
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* CONTENT BODY */}
                <div className="w-full bg-[#FDF9F1] px-6 lg:px-12 xl:px-16 py-8 lg:py-10 relative z-10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),_0_-12px_24px_-8px_rgba(0,0,0,0.12)] flex flex-col justify-between">
                  <div ref={designContentRef} className="w-full flex flex-col h-full justify-between items-center">
                    
                    <p className="font-dm-sans text-[15px] lg:text-[17px] text-[#262626]/85 tracking-[-0.05em] leading-[1.5] max-w-[700px] mb-4 text-center mx-auto">
                      {DESIGN_TAB_DATA[activeDesignTab].title}
                    </p>

                    <div className="flex flex-wrap lg:flex-nowrap justify-center items-end mt-0 mb-0 gap-4 lg:gap-8 w-full">
                      {DESIGN_TAB_DATA[activeDesignTab].screens.map((screen, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <span className="font-dm-sans text-[13px] lg:text-[14px] font-bold text-[#262626] tracking-[-0.05em] mb-4">
                            {screen.label}
                          </span>
                          <img 
                            src={screen.src} 
                            alt={screen.label} 
                            className="w-[240px] sm:w-[280px] lg:w-[280px] xl:w-[320px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* FOOTER TEXT */}
                {DESIGN_TAB_DATA[activeDesignTab].footer && (
                  <div className="w-full bg-[#ffffff] pt-12 pb-6 relative z-0 flex justify-center">
                    <p className="font-dm-sans text-[16px] lg:text-[18px] xl:text-[20px] font-bold text-[#262626] tracking-[-0.03em] text-center max-w-[600px] leading-[1.5]">
                      {DESIGN_TAB_DATA[activeDesignTab].footer}
                    </p>
                  </div>
                )}

              </div>
            </div>
          </section>

          <hr className="features-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 7: DESIGNING SHOPPIN (Accordion)
          ========================================= */}
          <section id="designing" className="w-full">
            <div className="designing-anim opacity-0 mb-10">
              <h2 className="font-momo text-[26px] lg:text-[32px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] mb-6">
                Designing Shoppin
              </h2>
              <p className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/85 tracking-[-0.05em] leading-[1.6] max-w-[650px] mb-12">
                With the product direction established, I worked with Aaron on the UI direction and interaction ideas. I took ownership of the Login, Home and Maps experiences, and prototyped these flows as part of the final product.
              </p>

              {/* Accordion Component */}
              <div className="flex flex-col w-full max-w-[800px]">
                {DESIGN_SYSTEM_ITEMS.map((item) => {
                  const isOpen = openAccordionId === item.id;
                  
                  return (
                    <div key={item.id} className="flex flex-col border-b border-[#262626]/20">
                      <button
                        onClick={() => toggleAccordion(item.id)}
                        className="w-full flex justify-between items-center py-5 lg:py-6 text-left hover:opacity-70 transition-opacity"
                      >
                        <span className="font-dm-sans text-[20px] lg:text-[24px] font-bold text-[#262626] tracking-[-0.02em]">
                          {item.title}
                        </span>
                        
                        {/* Circular Arrow Icon */}
                        <div className={`w-10 h-10 rounded-full bg-[#f4f4f4] border border-[#e5e5e5] flex items-center justify-center shrink-0 transition-transform duration-300 shadow-sm ${isOpen ? 'rotate-180' : ''}`}>
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7L13 1" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </button>
                      
                      {/* Expandable Image Content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-auto object-contain mt-4"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <hr className="designing-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 8: USABILITY TESTING
          ========================================= */}
          <section id="testing" className="w-full">
            {/* Header Area */}
            <div className="testing-anim opacity-0 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12 lg:mb-16">
              
              {/* Header Text */}
              <div className="flex-1 max-w-[480px]">
                <h2 className="font-momo text-[26px] lg:text-[32px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] mb-4">
                  Testing the experience
                </h2>
                <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/85 tracking-[-0.05em] leading-[1.6]">
                  We tested the Shoppin prototype through three tasks focused on the core experience: finding a shop, saving a shop and finding a friend.
                </p>
              </div>
              
              {/* Header Icons */}
              <div className="flex items-center gap-6 lg:gap-10 shrink-0">
                {/* Performance Test */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#FDF9F1] flex items-center justify-center">
                    <svg className="w-6 h-6 lg:w-7 lg:h-7 text-[#262626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <span className="font-dm-sans text-[11px] lg:text-[12px] font-bold text-[#262626] tracking-[-0.05em]">Performance Test</span>
                </div>
                {/* Observation Test */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#FDF9F1] flex items-center justify-center">
                    <svg className="w-6 h-6 lg:w-7 lg:h-7 text-[#262626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <span className="font-dm-sans text-[11px] lg:text-[12px] font-bold text-[#262626] tracking-[-0.05em]">Observation Test</span>
                </div>
                {/* Participant Ratings */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#FDF9F1] flex items-center justify-center">
                    <svg className="w-6 h-6 lg:w-7 lg:h-7 text-[#262626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </div>
                  <span className="font-dm-sans text-[11px] lg:text-[12px] font-bold text-[#262626] tracking-[-0.05em]">Participant Ratings</span>
                </div>
              </div>

            </div>

            {/* Folder Tabs & Image Content */}
            <div className="-mx-6 lg:-mx-12 xl:-mx-16">
              <div className="testing-anim flex flex-col w-full opacity-0">
                
                {/* TABS HEADER */}
                <div className="flex w-full px-6 lg:px-12 xl:px-16 relative z-20 translate-y-[2px]">
                  {(Object.keys(TEST_TAB_DATA) as Array<keyof typeof TEST_TAB_DATA>).map((tab) => {
                    const isActive = activeTestTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => handleTestTabClick(tab)}
                        className={`flex-1 text-center py-4 lg:py-5 flex justify-center items-center gap-2 font-dm-sans text-[13px] lg:text-[15px] font-bold tracking-[0.05em] transition-colors duration-300 relative ${
                          isActive 
                            ? 'bg-[#FDF9F1] text-[#262626] rounded-t-[16px] z-30' 
                            : 'bg-transparent text-[#262626]/60 hover:text-[#262626] z-10'
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* CONTENT BODY */}
                <div className="w-full bg-[#FDF9F1] px-6 lg:px-12 xl:px-16 py-8 lg:py-12 relative z-10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),_0_-12px_24px_-8px_rgba(0,0,0,0.12)] flex flex-col items-center">
                  <div ref={testContentRef} className="w-full">
                    {/* Placeholder for the compiled image containing charts & data */}
                    <img 
                      src={TEST_TAB_DATA[activeTestTab].image} 
                      alt={`Test Data for ${activeTestTab}`} 
                      className="w-full h-auto object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>

          <hr className="testing-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 9: FINAL EXPERIENCE
          ========================================= */}
          <section id="final" className="w-full">
            <div className="final-anim opacity-0 flex flex-col items-center text-center pb-10">
              
              {/* Logo Image Placeholder */}
              <div className="mb-6 lg:mb-8">
                <img 
                  src="/projects/shoppin/final-logo.png" 
                  alt="Shoppin Logo" 
                  className="h-16 lg:h-20 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>

              {/* Heading & Intro Text */}
              <h2 className="font-momo text-[28px] lg:text-[36px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] mb-4">
                Final Experience
              </h2>
              <p className="font-dm-sans text-[15px] lg:text-[17px] text-[#262626]/85 tracking-[-0.05em] leading-[1.6] max-w-[750px] mb-16">
                <strong className="font-bold">Shoppin</strong> connects the street-shopping journey from discovering a market to finding a specific shop, navigating through it, saving places and meeting friends along the way.
              </p>

              {/* Screens Image Placeholder */}
              <div className="w-full max-w-[1200px] mb-16">
                <img 
                  src="/projects/shoppin/final-screens.png" 
                  alt="Final Experience Screens" 
                  className="w-full h-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>

              {/* Footer Text */}
              <p className="font-dm-sans text-[16px] lg:text-[18px] font-bold text-[#262626] tracking-[-0.03em] leading-[1.5] max-w-[800px]">
                The final experience gives shoppers a digital layer for the parts of street shopping that are difficult to navigate on their own <br className="hidden md:block"/> while keeping discovery, exploration and social interaction at the centre.
              </p>

            </div>
          </section>

          <hr className="final-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 10: REFLECTION
          ========================================= */}
          <section id="reflection" className="w-full">
            <div className="reflection-anim opacity-0 flex flex-col max-w-[800px]">
              <h2 className="font-momo text-[26px] lg:text-[32px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] mb-6 lg:mb-8">
                Reflection
              </h2>
              
              <div className="flex flex-col gap-6">
                <p className="font-dm-sans text-[16px] lg:text-[18px] font-bold text-[#262626] tracking-[-0.03em] leading-[1.5]">
                  The biggest thing I took away from Shoppin was that users don't always follow the path we design for them.
                </p>
                <p className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/85 tracking-[-0.05em] leading-[1.6]">
                  Testing showed us that people found their own routes through the product, whether that meant accessing categories from a different screen or saving a shop before creating a board.
                </p>
                <p className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/85 tracking-[-0.05em] leading-[1.6]">
                  It reinforced the value of designing around actual behaviour rather than assumptions.
                </p>
              </div>
            </div>
          </section>

          {/* =========================================
              BACK TO TOP
          ========================================= */}
          <div className="footer-anim opacity-0 w-full flex flex-col items-center justify-center pt-12 pb-24 mt-16 border-t border-[#262626]/10">
            <h3 className="font-momo text-[20px] lg:text-[24px] font-bold text-[#262626] tracking-[-0.02em] mb-2 text-center">
              Interact with the Shoppin prototype
            </h3>
            <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.02em] mb-8 text-center">
              Go back to the top to explore the final experience yourself.
            </p>

            <button
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-[#262626] flex items-center justify-center text-[#FFFAF1] transition-transform duration-300 group-hover:-translate-y-2 shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </div>
              <span className="font-dm-sans text-[14px] font-bold tracking-[-0.02em] text-[#262626]/50 group-hover:text-[#262626] transition-colors">
                Back to top
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* --- Contact Footer Module (From About Page) --- */}
      <About hideIntro={true} />

    </main>
  );
}
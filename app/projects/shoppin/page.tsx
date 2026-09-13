'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const SIDEBAR_ITEMS = [
  { id: '01', title: 'Overview', target: 'overview' },
  { id: '02', title: 'The Context', target: 'context' },
  { id: '03', title: 'Digging Deeper', target: 'deeper' },
  { id: '04', title: 'The Direction', target: 'direction' },
  { id: '05', title: 'Designing Shoppin', target: 'designing' },
  { id: '06', title: 'Key Features', target: 'features' },
  { id: '07', title: 'Prototyping & Testing', target: 'prototyping' },
  { id: '08', title: 'Iterations', target: 'iterations' },
  { id: '09', title: 'Final Experience', target: 'final' },
  { id: '10', title: 'Reflection', target: 'reflection' }
];

// --- TAB DATA FOR SECTION 3 ---
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

// --- TAB DATA FOR SECTION 5 ---
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

export default function ShoppinCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const designContentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const [activeSection, setActiveSection] = useState('01');
  
  const [activeTab, setActiveTab] = useState<keyof typeof TAB_DATA>('OBSERVATIONS');
  const [isAnimatingTab, setIsAnimatingTab] = useState(false);
  
  const [activeDesignTab, setActiveDesignTab] = useState<keyof typeof DESIGN_TAB_DATA>('DISCOVER');
  const [isAnimatingDesignTab, setIsAnimatingDesignTab] = useState(false);
  
  const [isExiting, setIsExiting] = useState(false);

  // --- SECTION 3 TAB ANIMATION ---
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

  // --- SECTION 5 TAB ANIMATION ---
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

    const sectionClasses = ['.context-anim', '.found-anim', '.direction-anim', '.designing-anim'];
    
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
                  className={`sidebar-anim flex items-center gap-4 text-left transition-all duration-300 opacity-0 ${
                    isActive ? 'text-[#262626] font-medium' : 'text-[#262626]/40 hover:text-[#262626]/80'
                  }`}
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
        <div className="w-full lg:w-[81%] px-6 lg:px-12 xl:px-16 pt-[120px] pb-32 overflow-hidden">
          
          {/* =========================================
              SECTION 1: OVERVIEW (UPDATED HEADER)
          ========================================= */}
          <div className="-mt-[120px] -mx-6 lg:-mx-12 xl:-mx-16 pt-[120px] pb-0 bg-[#FFFAF1] border-b border-[#262626]/10 flex flex-col">
            <section id="overview" className="w-full max-w-[1400px] mx-auto flex flex-col flex-1">
              
              {/* Text Area */}
              <div className="px-6 lg:px-12 xl:px-16 w-full flex flex-col">
                {/* UPDATED: Thinner capsule, thicker border, standard dark gray color, centered alignment */}
                <div className="overview-anim flex justify-between items-center w-full pr-0 mb-10 opacity-0 mt-6 lg:mt-0">
                  <div 
                    className="inline-flex items-center px-6 md:px-7 py-1.5 md:py-2 rounded-full border-[1.5px] border-[#262626]/30 font-dm-sans text-xs tracking-wider uppercase text-[#262626]/80"
                  >
                    CONNECTED PRODUCT • SYSTEM DESIGN • UX/UI
                  </div>
                  <div className="font-momo text-2xl md:text-3xl font-light text-[#262626]/60">
                    (01)
                  </div>
                </div>

                <h1 className="overview-anim font-momo text-[36px] lg:text-[40px] xl:text-[48px] font-bold leading-[1.1] text-[#262626] tracking-[-0.02em] max-w-[850px] mb-6 opacity-0">
                  Shoppin: Finding your way through Mumbai's street markets.
                </h1>
                <p className="overview-anim font-dm-sans text-[16px] lg:text-[18px] leading-[1.5] text-[#262626]/80 tracking-[-0.05em] max-w-[700px] mb-12 lg:mb-16 opacity-0">
                  A digital companion for exploring Mumbai's street markets. It helps people discover shops, navigate crowded lanes, find what they're looking for and keep track of places
                </p>
              </div>

              {/* Image Area */}
              <div className="overview-anim w-full opacity-0 mt-auto flex items-end px-3 lg:px-5">
                <img 
                  src="/projects/shoppin/hero image.png" 
                  alt="Shoppin interface showcase" 
                  className="w-full h-auto object-cover rounded-t-[16px] md:rounded-t-[20px] rounded-b-none block align-bottom"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            </section>
          </div>

          {/* Project Details Grid (White Background) */}
          <div className="w-full pt-16 lg:pt-20">
            <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 lg:gap-16">
              
              <div className="flex flex-col gap-8 mt-1">
                <div className="overview-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">Timeframe</h3>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em]">Aug 2025 – Oct 2025</p>
                </div>
                <div className="overview-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">Done at</h3>
                  <p className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em]">NMIMS School of Design</p>
                </div>
                <div className="overview-anim opacity-0">
                  <h3 className="font-dm-sans text-[15px] lg:text-[16px] text-[#262626] tracking-[-0.05em] mb-1.5 font-bold">The Team</h3>
                  <ul className="font-dm-sans text-[14px] lg:text-[15px] text-[#262626]/60 tracking-[-0.05em] leading-relaxed">
                    <li>Kaustubh Korde</li>
                    <li>Aaron Carvalho</li>
                    <li>Sai Ghate</li>
                    <li>Rohit Chhatre</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="overview-anim opacity-0">
                  <h2 className="font-momo text-[24px] lg:text-[28px] font-bold text-[#262626] tracking-[-0.02em] mb-3">Context</h2>
                  <div className="flex flex-col gap-4 font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.4]">
                    <p>I started noticing how differently people navigate street markets compared to regular streets. At Hill Road, people weren't always relying on shop names or addresses. They used cafés, familiar shops and other landmarks to remember where things were.</p>
                    <p>That made me look at the problem differently. Instead of trying to turn street shopping into another online marketplace, I wanted to explore how a digital product could help people navigate the market that already exists.</p>
                  </div>
                </div>
                <div className="overview-anim opacity-0">
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
          </div>

          <hr className="overview-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 2: THE CONTEXT 
          ========================================= */}
          <section id="context" className="w-full">
            <div className="flex flex-col md:flex-row justify-between gap-8 lg:gap-12 items-stretch">
              <div className="flex flex-col justify-between w-full md:w-[48%] lg:w-[46%] py-2">
                <div className="flex flex-col gap-6">
                  <h2 className="context-anim font-momo text-[22px] lg:text-[26px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] opacity-0 max-w-[480px]">
                    The market was easy to find.<br />The shops weren't.
                  </h2>
                  <p className="context-anim font-dm-sans text-[13px] lg:text-[15px] text-[#262626]/80 tracking-[-0.05em] leading-[1.6] opacity-0 max-w-[460px]">
                    We started looking at how people actually navigate Mumbai's street markets. At Hill Road, we noticed that finding a specific shop often depended less on addresses and more on landmarks, familiar shops and visual cues.
                  </p>
                  <p className="context-anim font-dm-sans text-[15px] lg:text-[16px] text-[#262626]/80 tracking-[-0.05em] leading-[1.6] opacity-0 max-w-[460px]">
                    What stood out to me was meeting two tourists from Argentina. They had discovered Hill Road through an AI recommendation, but once they reached the market, they struggled to find specific shops and products because there weren't many reference points to guide them.
                  </p>
                </div>
                <h2 className="context-anim font-momo text-[22px] lg:text-[26px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.25] mt-16 md:mt-auto opacity-0 max-w-[460px]">
                  If digital tools can get you to the market, why do they stop helping once you enter it?
                </h2>
              </div>

              <div className="flex flex-col items-center justify-start w-full md:w-[48%] lg:w-[45%] context-anim opacity-0">
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

          <hr className="context-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* =========================================
              SECTION 3: DIGGING DEEPER 
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
              SECTION 4: THE DIRECTION
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
              SECTION 5: DESIGNING SHOPPIN
          ========================================= */}
          <section id="designing" className="w-full">
            <h2 className="designing-anim font-momo text-[26px] lg:text-[32px] font-bold text-[#262626] tracking-[-0.02em] leading-[1.1] mb-8 lg:mb-12 opacity-0">
              Four things make up the Shoppin experience.
            </h2>

            <div className="-ml-6 lg:-ml-12 w-[calc(100%+3rem)] lg:w-[calc(100%+6rem)]">
              <div className="designing-anim flex items-stretch w-full opacity-0">
                
                <div className="flex flex-col w-[130px] lg:w-[150px] shrink-0 pt-16 lg:pt-4 relative z-10">
                  {(Object.keys(DESIGN_TAB_DATA) as Array<keyof typeof DESIGN_TAB_DATA>).map((tab) => {
                    const isActive = activeDesignTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => handleDesignTabClick(tab)}
                        className={`w-full text-left py-6 lg:py-6 pl-6 lg:pl-8 pr-4 flex items-center gap-2.5 lg:gap-3 font-dm-sans text-[12px] lg:text-[13px] font-bold tracking-[0.05em] transition-colors duration-300 ${
                          isActive 
                            ? 'bg-[#FDF9F1] text-[#262626] rounded-l-[20px]' 
                            : 'bg-transparent text-[#262626] hover:text-[#262626]/80'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#4A1515] shrink-0"></span>
                        {tab}
                      </button>
                    );
                  })}
                </div>

                <div className="flex-1 bg-[#FDF9F1] rounded-[0px] p-4 lg:p-8 min-h-[580px] relative overflow-hidden flex flex-col justify-between">
                  <div ref={designContentRef} className="w-full flex flex-col h-full justify-between">
                    
                    <p className="font-dm-sans text-[16px] lg:text-[18px] text-[#262626]/85 tracking-[-0.05em] leading-[1.5] max-w-[700px] mb-8">
                      {DESIGN_TAB_DATA[activeDesignTab].title}
                    </p>

                    <div className="flex flex-wrap lg:flex-nowrap justify-center items-end mt-4 mb-10 gap-0">
                      {DESIGN_TAB_DATA[activeDesignTab].screens.map((screen, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <span className="font-dm-sans text-[13px] lg:text-[14px] font-bold text-[#262626] tracking-[-0.05em] mb-4">
                            {screen.label}
                          </span>
                          <img 
                            src={screen.src} 
                            alt={screen.label} 
                            className="w-[280px] lg:w-[320px] xl:w-[360px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
              
              {DESIGN_TAB_DATA[activeDesignTab].footer && (
                <p className="font-dm-sans text-[13px] lg:text-[14px] font-bold text-[#262626] tracking-[-0.05em] text-center mt-auto pt-6 border-t border-[#262626]/5">
                  {DESIGN_TAB_DATA[activeDesignTab].footer}
                </p>
              )}
            </div>
          </section>

          <hr className="designing-anim w-full border-t border-[#262626]/10 mt-16 mb-16 opacity-0" />

          {/* Dummy sections for ScrollTrigger */}
          {SIDEBAR_ITEMS.slice(5).map(item => (
             <section key={item.id} id={item.target} className="w-full h-[50vh] pt-12">
                <h2 className="font-momo text-2xl text-[#262626]/20 tracking-[-0.02em]">{item.title} Placeholder</h2>
             </section>
          ))}

        </div>
      </div>
    </main>
  );
}
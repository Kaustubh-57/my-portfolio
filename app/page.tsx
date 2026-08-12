import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="w-full bg-white relative">
      <Hero />
      
      {/* --- TEMPORARY SCROLL PLACEHOLDER --- */}
      <section className="w-full h-[150vh] bg-white flex flex-col items-center justify-start pt-48 px-8 md:px-12 border-t border-gray-100">
         <h2 className="font-momo text-4xl text-[#141613]">Projects / Section 2</h2>
         <p className="font-dm-sans text-gray-500 mt-4 max-w-md text-center">
           Scroll down to watch the top-right navbar morph into frosted glass and the red progress line grow across the top of the screen.
         </p>
      </section>
    </main>
  );
}
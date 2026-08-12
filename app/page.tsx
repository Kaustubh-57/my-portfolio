import Hero from '@/components/Hero';
import SelectedWorks from '@/components/SelectedWorks';
import About from '@/components/About';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <SelectedWorks />
      <About />
    </main>
  );
}
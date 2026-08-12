import Hero from '@/components/Hero';
import SelectedWorks from '@/components/SelectedWorks';

export default function Home() {
  return (
    <main className="w-full bg-white relative">
      <Hero />
      <SelectedWorks />
    </main>
  );
}
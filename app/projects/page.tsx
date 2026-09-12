import React from 'react';
import Navbar from '@/components/Navbar'; // Update path if necessary
import SelectedWorks from '@/components/SelectedWorks'; // Update path if necessary

export const metadata = {
  title: 'Works | Kaustubh Korde',
  description: 'Selected UI/UX and interaction design works by Kaustubh Korde.',
};

export default function ProjectsPage() {
  return (
    <main className="relative w-full bg-[#ffffff] min-h-screen">
      <Navbar />
      <div className="pt-16 md:pt-20">
        <SelectedWorks />
      </div>
    </main>
  );
}
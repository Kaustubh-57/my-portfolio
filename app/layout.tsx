import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { DM_Sans } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor'; // Import the cursor
import Navbar from '@/components/Navbar'; // Import the Navbar
import './globals.css';

const momoTrust = localFont({
  src: './Fonts/MomoTrustDisplay-Regular.ttf',
  variable: '--font-momo',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kaustubh Korde | Product Experience Designer',
  description: 'I design digital products that work beautifully.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${momoTrust.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-white text-black">
        <CustomCursor /> {/* Mount globally */}
        <Navbar />       {/* Mount globally */}
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { DM_Sans } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'; // 1. Import the Analytics component
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
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
        <CustomCursor /> 
        <Navbar />       
        {children}
      </body>
      {/* 2. Add the component and paste your specific Measurement ID here */}
      <GoogleAnalytics gaId="G-Z4X5CMLDHG" /> 
    </html>
  );
}
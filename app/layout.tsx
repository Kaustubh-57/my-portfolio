import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { DM_Sans } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'; 
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
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
  // Required so Next.js can generate absolute URLs for preview images
  metadataBase: new URL('https://doeskaus.vercel.app'),
  title: 'doeskaus® Portfolio of Kaustubh Korde',
  description: 'I design digital products that work beautifully.',
  openGraph: {
    title: 'doeskaus® Portfolio of Kaustubh Korde',
    description: 'I design digital products that work beautifully.',
    url: 'https://doeskaus.vercel.app', 
    siteName: 'Kaustubh Korde',
    images: [
      {
        url: '/opengraph-image.png',
        width: 800,
        height: 800,
        alt: 'Kaustubh Korde Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'doeskaus® Portfolio of Kaustubh Korde',
    description: 'I design digital products that work beautifully.',
    images: ['/opengraph-image.png'],
  },
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
        
        {/* Vercel Performance Tracking */}
        <SpeedInsights />
        
        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
      
      {/* Google Analytics Tracking */}
      <GoogleAnalytics gaId="G-Z4X5CMLDHG" /> 
    </html>
  );
}
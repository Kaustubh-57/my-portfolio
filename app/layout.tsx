import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next"
import localFont from 'next/font/local';
import { DM_Sans } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'; 
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
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
  openGraph: {
    title: 'Kaustubh Korde | Portfolio',
    description: 'I design digital products that work beautifully.',
    url: 'https://doeskaus.vercel.app', 
    siteName: 'Kaustubh Korde',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Kaustubh Korde Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaustubh Korde | Portfolio',
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
        <Analytics />
      </body>
      
      {/* Google Analytics Tracking */}
      <GoogleAnalytics gaId="G-Z4X5CMLDHG" /> 
    </html>
  );
}
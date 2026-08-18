import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { DM_Sans } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'; 
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script'; // <-- 1. Import Next.js Script

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
        
        <SpeedInsights />
        <Analytics />
        
        {/* --- 2. Microsoft Clarity Script --- */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y4iwgjglla");
          `}
        </Script>
      </body>
      
      {/* Google Analytics Tracking */}
      <GoogleAnalytics gaId="G-Z4X5CMLDHG" /> 
    </html>
  );
}
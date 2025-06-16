
"use client";

// import type { Metadata } from 'next'; // Metadata should be handled in a server component parent or page
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedBackground } from '@/components/animated-background';
import FullScreenTerminalLoader, { type GeolocationData } from '@/components/loader/full-screen-terminal-loader';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

// export const metadata: Metadata = { // Static metadata for root layout
//   title: {
//     default: 'Umer Farooq | Cybersecurity Professional',
//     template: '%s | Umer Farooq',
//   },
//   description: 'Portfolio of Umer Farooq, a cybersecurity professional based in Faisalabad, Pakistan. Showcasing projects, blog, and cybersecurity insights.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMainContentVisible, setIsMainContentVisible] = useState(false);
  const { toast } = useToast();

   useEffect(() => {
    // Set document title for client component
    // For SEO, it's better to set titles in page.tsx or specific layout.tsx files using Next.js Metadata API
    if (typeof document !== 'undefined') {
        document.title = 'Umer Farooq | Cybersecurity Professional';
    }
  }, []);

  const handleSequenceComplete = (geoData: GeolocationData | null) => {
    setIsLoading(false); // Loader is done

    let toastMessage = "System Online. Welcome to UmerFarooq.Cyber!";
    if (geoData && geoData.city && geoData.country) {
      toastMessage = `Welcome, visitor from ${geoData.city}, ${geoData.country}!`;
    } else if (geoData && geoData.ip && geoData.ip !== 'Anonymous') {
      toastMessage = `Welcome, visitor (${geoData.ip})!`;
    }
    
    toast({
      title: "Connection Established",
      description: toastMessage,
      duration: 4500, 
    });

    // Delay showing main content to allow loader to animate out completely
    setTimeout(() => {
      setIsMainContentVisible(true);
    }, 300); // Adjust this delay if loader exit animation is longer
  };


  return (
    <html lang="en" className="dark">
      <head>
        {/* Fonts are preloaded in globals.css or via Next/Font for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Using Source Code Pro as primary code/body font, Orbitron for cyberName */}
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&family=Orbitron:wght@400;500;700&display=swap" rel="stylesheet" />
        {/* Inter is good for general UI text if needed, but sticking to theme for now */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" /> */}
        {/* Space Grotesk is also an option if Orbitron feels too much for some headlines */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" /> */}
      </head>
      <body className="font-code antialiased min-h-screen flex flex-col bg-background text-foreground">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="fixed inset-0 z-[300]" // Ensure loader is on top
            >
              <FullScreenTerminalLoader onSequenceComplete={handleSequenceComplete} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content area that fades in after loader */}
        {/* Conditional rendering based on isMainContentVisible to allow loader to exit first */}
        {isMainContentVisible && (
            <motion.div
              key="main-app-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.7, delay: 0.1 } }}
              className="flex flex-col min-h-screen" // Ensure it takes full screen
            >
              <AnimatedBackground />
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
                {children}
              </main>
              <Footer />
            </motion.div>
        )}
        <Toaster />
      </body>
    </html>
  );
}

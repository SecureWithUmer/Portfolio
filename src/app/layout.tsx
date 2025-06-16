
"use client";

import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedBackground } from '@/components/animated-background';
import { FullScreenTerminalLoader, type GeolocationData } from '@/components/loader/full-screen-terminal-loader';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

// export const metadata: Metadata = { // Metadata should be defined in a server component if possible, or handle dynamically
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
    // Handle document title for client component
    document.title = 'Umer Farooq | Cybersecurity Professional';
  }, []);

  const handleSequenceComplete = (geoData: GeolocationData | null) => {
    setIsLoading(false);

    let toastMessage = "Welcome to UmerFarooq.Cyber!";
    if (geoData && geoData.city && geoData.country) {
      toastMessage = `Welcome, visitor from ${geoData.city}, ${geoData.country}!`;
    } else if (geoData && geoData.ip) {
      toastMessage = `Welcome, visitor (${geoData.ip})!`;
    }
    
    toast({
      title: "Access Granted",
      description: toastMessage,
      duration: 4000, 
    });

    // Delay showing main content to allow loader to animate out
    setTimeout(() => {
      setIsMainContentVisible(true);
    }, 500); // Adjust delay as needed for loader animation
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="fixed inset-0 z-[100]" // Ensure loader is on top
            >
              <FullScreenTerminalLoader onSequenceComplete={handleSequenceComplete} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMainContentVisible && (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.7, delay: 0.2 } }} // Slight delay for content fade in
              className="flex flex-col min-h-screen"
            >
              <AnimatedBackground />
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
                {children}
              </main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
        <Toaster />
      </body>
    </html>
  );
}


"use client";

import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedBackground } from '@/components/animated-background';
import FullScreenTerminalLoader from '@/components/loader/full-screen-terminal-loader';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMainContentVisible, setIsMainContentVisible] = useState(false);
  const { toast } = useToast();

   useEffect(() => {
    if (typeof document !== 'undefined') {
        document.title = 'Umer Farooq | Cybersecurity Professional';
    }
  }, []);

  const handleSequenceComplete = () => {
    setIsLoading(false); 
    
    toast({
      title: "System Online",
      description: "Welcome to UmerFarooq.Cyber!",
      duration: 4500, 
    });

    setTimeout(() => {
      setIsMainContentVisible(true);
    }, 300); 
  };

  useEffect(() => {
    if (isMainContentVisible) {
      // Delay scrolling to top slightly to ensure it happens after content is fully visible and interactive
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50); 
      return () => clearTimeout(timer);
    }
  }, [isMainContentVisible]);


  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Updated to include both Source Code Pro and Orbitron */}
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-code antialiased min-h-screen flex flex-col bg-background text-foreground">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="fixed inset-0 z-[300]" 
            >
              <FullScreenTerminalLoader onSequenceComplete={handleSequenceComplete} />
            </motion.div>
          )}
        </AnimatePresence>

        {isMainContentVisible && (
            <motion.div
              key="main-app-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.7, delay: 0.1 } }}
              className="flex flex-col min-h-screen" 
            >
              <AnimatedBackground />
              <Header />
              <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 relative z-10">
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

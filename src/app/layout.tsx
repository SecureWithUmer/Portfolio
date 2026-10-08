
"use client";

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedBackground } from '@/components/animated-background';
import FullScreenTerminalLoader from '@/components/loader/full-screen-terminal-loader';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Umer Farooq",
  "alternateName": "SecureWithUmer",
  "url": "https://securewithumer.vercel.app",
  "jobTitle": "Penetration Tester & Cybersecurity Professional",
  "description": "Penetration Tester from Faisalabad, Pakistan, specializing in web and API penetration testing, network security, and offensive security research.",
  "knowsAbout": [
    "Penetration Testing",
    "Network Security",
    "API Pen Testing",
    "Bug Bounty Hunting",
    "Cloud Security",
    "Linux",
    "BurpSuite",
    "Wazuh",
    "Kali Linux",
    "Frida",
    "Postman",
    "ISO/IEC 27001"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/securewithumer",
    "https://github.com/SecureWithUmer",
    "https://tryhackme.com/p/SecureWithUmer",
    "https://bugcrowd.com/securewithumer",
    "https://hackerone.com/securewithumer"
  ]
};

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
        document.title = 'SecurewithUmer';
    }
  }, []);

  const handleSequenceComplete = () => {
    setIsLoading(false); 
    
    toast({
      title: "System Online",
      description: "Welcome to my portfolio.",
      duration: 4500, 
    });

    setTimeout(() => {
      setIsMainContentVisible(true);
    }, 300); 
  };

  useEffect(() => {
    if (isMainContentVisible) {
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
        <meta name="description" content="Welcome to the portfolio of Umer Farooq (SecureWithUmer), a Penetration Tester and cybersecurity specialist with verified rankings on Bugcrowd and HackerOne." />
        <link rel="icon" href="/assets/profile.jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Source+Code+Pro:wght@400;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
              className="flex flex-col flex-grow"
            >
                <AnimatedBackground />
                <main className="flex-grow flex relative z-10">
                    {children}
                </main>
            </motion.div>
        )}
        <Toaster />
      </body>
    </html>
  );
}

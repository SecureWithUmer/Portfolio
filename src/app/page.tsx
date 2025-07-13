
"use client";

import { HackerTerminal } from '@/components/misc/hacker-terminal';
import { IdCard } from '@/components/misc/id-card';
import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';


// Custom WhatsApp SVG Component
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);


const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/hackandsecurewithumer', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/SecureWithUmer', icon: Github },
  { name: 'Email', href: 'mailto:hackwithumer@outlook.com', icon: Mail },
  { name: 'WhatsApp', href: 'https://wa.me/923261149625', icon: WhatsAppIcon },
];

const StatusBar = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-primary px-4 py-1 flex justify-between items-center text-xs z-20 border-t border-primary/20">
            <span>umer@portfolio:~$</span>
            <span>{time}</span>
        </div>
    );
};


export default function HomePage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning) {
      setScanProgress(0);
      const totalDuration = 2800;
      const intervalDuration = 50;
      const steps = totalDuration / intervalDuration;
      const increment = 100 / steps;

      let currentProgress = 0;
      timer = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= 100) {
          setScanProgress(100);
          clearInterval(timer);
        } else {
          setScanProgress(currentProgress);
        }
      }, intervalDuration);
    }
    return () => clearInterval(timer);
  }, [isScanning]);

  const handleResumeDownload = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      setScanProgress(100);
      const link = document.createElement('a');
      link.href = '/assets/resume.pdf';
      link.download = 'Umer_Farooq_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: "Download Started", description: "Your resume download should begin shortly." });
    }, 3000);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen p-2 sm:p-4 pb-8 md:gap-x-4 lg:gap-x-6">
      <aside className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 md:pt-8 md:pl-4 lg:pl-8 flex-shrink-0">
        <div className="md:sticky md:top-8 text-center md:text-left">
           <div className="p-4 md:p-0">
                <h1 className="text-2xl sm:text-3xl font-bold font-cyberName text-primary">Umer Farooq</h1>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 md:mb-6">Cybersecurity Professional</p>
           </div>
          <IdCard />
          <div className="mt-4 flex justify-center items-center gap-4">
            {socialLinks.map(({ name, href, icon: Icon }) => (
                <Link
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect with Umer Farooq on ${name}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                >
                    <Icon className="h-6 w-6" />
                </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            {isScanning ? (
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="text-muted-foreground text-sm">Scanning document...</p>
                <Progress value={scanProgress} className="w-full max-w-[150px] mx-auto mt-1 h-1.5" />
                <p className="text-xs text-muted-foreground/70 mt-1">Ensuring file integrity.</p>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 text-sm w-full max-w-[200px] mx-auto"
                onClick={handleResumeDownload}
              >
                Download Resume <Download className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      <div className="hidden md:block animated-border-ray" />

      <main className="w-full md:flex-1 mt-4 md:mt-0">
        <HackerTerminal />
      </main>
      
      <StatusBar />
    </div>
  );
}

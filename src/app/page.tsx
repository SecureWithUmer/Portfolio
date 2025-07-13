
"use client";

import { HackerTerminal } from '@/components/misc/hacker-terminal';
import { IdCard } from '@/components/misc/id-card';
import { useEffect, useState } from 'react';

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
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen p-2 sm:p-4 pb-8 md:gap-x-4 lg:gap-x-6">
      {/* On mobile, card is in the main flow. On desktop, it's a separate column. */}
      <aside className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 md:pt-8 md:pl-4 lg:pl-8 flex-shrink-0">
        <div className="md:sticky md:top-8 text-center md:text-left">
           <div className="p-4 md:p-0">
                <h1 className="text-2xl font-bold font-cyberName text-primary">Umer Farooq</h1>
                <p className="text-base text-muted-foreground mb-4 md:mb-8">Cybersecurity Professional</p>
           </div>
          <IdCard />
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


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
    <div className="flex w-full min-h-screen p-4 pb-8">
      <aside className="hidden md:block md:w-1/3 lg:w-1/4 xl:w-1/5 pt-8 pr-8">
        <div className="sticky top-8">
          <h1 className="text-2xl font-bold font-cyberName text-primary">Umer Farooq</h1>
          <p className="text-base text-muted-foreground mb-8">Cybersecurity Professional</p>
          <IdCard />
        </div>
      </aside>

      <main className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5">
        <HackerTerminal />
      </main>
      
      <StatusBar />
    </div>
  );
}

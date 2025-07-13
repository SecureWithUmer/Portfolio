
"use client";

import { HackerTerminal } from '@/components/misc/hacker-terminal';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <HackerTerminal />
      <div className="mt-8 text-center">
         <p className="text-xs text-muted-foreground mb-2">Prefer a traditional view?</p>
         <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
            <Link href="/about" className="text-sm text-accent hover:underline">About Me</Link>
            <Link href="/certifications" className="text-sm text-accent hover:underline">Certifications</Link>
            <Link href="/ai-assistant" className="text-sm text-accent hover:underline">AI Assistant</Link>
            <Link href="/contact" className="text-sm text-accent hover:underline">Contact</Link>
        </div>
      </div>
    </div>
  );
}

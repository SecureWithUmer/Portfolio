
"use client";

import { HackerTerminal } from '@/components/misc/hacker-terminal';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <HackerTerminal />
    </div>
  );
}

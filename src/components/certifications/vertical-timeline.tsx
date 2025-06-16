
import type { ReactNode } from 'react';

interface VerticalTimelineProps {
  children: ReactNode;
}

export function VerticalTimeline({ children }: VerticalTimelineProps) {
  return (
    <div className="relative mx-auto max-w-full md:max-w-3xl space-y-8 sm:space-y-10 py-4 
                   before:absolute before:inset-0 before:left-3 sm:before:left-5 
                   md:before:left-1/2 md:before:-translate-x-px 
                   before:h-full before:w-0.5 before:bg-primary/20 dark:before:bg-primary/40">
      {children}
    </div>
  );
}

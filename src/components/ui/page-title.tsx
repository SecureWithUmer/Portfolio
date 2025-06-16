import type { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  subtitle?: string;
}

export function PageTitle({ children, subtitle }: PageTitleProps) {
  return (
    <div className="mb-8 sm:mb-12 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
        {children}
      </h1>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-foreground/80 px-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}

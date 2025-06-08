import type { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  subtitle?: string;
}

export function PageTitle({ children, subtitle }: PageTitleProps) {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl cyber-glow">
        {children}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg text-foreground/80">
          {subtitle}
        </p>
      )}
    </div>
  );
}

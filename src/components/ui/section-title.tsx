import type { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={`text-3xl font-semibold tracking-tight text-primary mb-8 ${className}`}>
      {children}
    </h2>
  );
}

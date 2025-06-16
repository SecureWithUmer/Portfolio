
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Me' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-4 flex items-center space-x-2 sm:mr-6">
          <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <span className="font-bold font-headline text-base sm:text-lg">UmerFarooq.Cyber</span>
        </Link>
        {/* Basic responsive nav - consider a hamburger menu for more items or smaller screens */}
        <nav className="flex flex-1 items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs sm:text-sm font-medium text-foreground/70 transition-colors hover:text-foreground whitespace-nowrap px-1 py-1 sm:px-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

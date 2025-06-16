
import Link from 'next/link';
import { ShieldCheck, LayoutGrid } from 'lucide-react'; // Changed Menu to LayoutGrid
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger, // Added SheetTrigger here
} from "@/components/ui/sheet";

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Me' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <span className="font-bold font-headline text-base sm:text-lg">Portfolio</span> {/* Changed title */}
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-end space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
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

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              {/* Updated Menu Button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-primary border-primary hover:bg-primary/10 animate-neon-glow-primary focus-visible:ring-primary/50"
              >
                <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] bg-background p-6">
              <SheetHeader className="mb-8 text-left">
                <SheetTitle className="flex items-center space-x-2">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">Portfolio</span> {/* Changed title in sheet */}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="text-base font-medium text-foreground/90 transition-colors hover:text-primary py-2 px-3 rounded-md hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

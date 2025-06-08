import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AnimatedBackground } from '@/components/animated-background';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: 'Umer Farooq | Cybersecurity Professional',
    template: '%s | Umer Farooq',
  },
  description: 'Portfolio of Umer Farooq, a cybersecurity professional based in Faisalabad, Pakistan. Showcasing projects, blog, and cybersecurity insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <AnimatedBackground />
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

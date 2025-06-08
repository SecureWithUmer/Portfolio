import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/ui/page-title';
import { SectionTitle } from '@/components/ui/section-title';
import { AiTipGenerator } from '@/components/ai/ai-tip-generator';
import Link from 'next/link';
import { ArrowRight, Briefcase, BookOpen, Send } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center py-16">
        <Image 
          src="https://placehold.co/150x150.png" 
          alt="Umer Farooq" 
          width={150} 
          height={150} 
          className="rounded-full mx-auto mb-6 border-4 border-primary shadow-lg"
          data-ai-hint="professional portrait" 
        />
        <h1 className="text-5xl md:text-6xl font-bold font-headline mb-4">
          <span className="text-primary cyber-glow">UMER FAROOQ</span>
        </h1>
        <p className="text-2xl text-foreground/80 mb-6 font-headline">
          Cybersecurity Professional &amp; Strategist
        </p>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          Dedicated to safeguarding digital landscapes with innovative security solutions and expert insights. Based in Faisalabad, Pakistan, I specialize in threat analysis, risk management, and robust defense strategies.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/portfolio">
              View My Work <Briefcase className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/contact">
              Get In Touch <Send className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="expertise" className="py-12">
        <SectionTitle className="text-center">My Expertise</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-primary/20 transition-shadow">
            <ShieldCheckIcon className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Threat Intelligence</h3>
            <p className="text-muted-foreground">Proactive identification and analysis of cyber threats to preempt attacks.</p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-primary/20 transition-shadow">
            <NetworkIcon className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Network Security</h3>
            <p className="text-muted-foreground">Designing and implementing secure network architectures and protocols.</p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-primary/20 transition-shadow">
            <LockIcon className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ethical Hacking</h3>
            <p className="text-muted-foreground">Simulating attacks to identify vulnerabilities and strengthen defenses.</p>
          </div>
        </div>
      </section>

      <section id="ai-tip" className="py-12">
        <AiTipGenerator />
      </section>

      <section id="cta-blog" className="py-12 text-center bg-card rounded-lg shadow-lg p-8">
        <SectionTitle>Stay Informed</SectionTitle>
        <p className="max-w-xl mx-auto text-muted-foreground mb-6">
          Explore my latest articles and insights on cybersecurity trends, best practices, and threat landscapes.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/blog">
            Read The Blog <BookOpen className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
}

// Placeholder icons, replace with lucide-react or custom SVGs if available
function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function NetworkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  )
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

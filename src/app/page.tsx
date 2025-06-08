
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/ui/page-title';
import { SectionTitle } from '@/components/ui/section-title';
import { AiTipGenerator } from '@/components/ai/ai-tip-generator';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Briefcase, 
  BookOpen, 
  Send, 
  ShieldCheck, 
  Network, 
  Lock,
  ClipboardCheck,
  Target,
  MessagesSquare,
  ServerCog,
  ExternalLink
} from 'lucide-react';
import { projects as allProjects } from './portfolio/page'; // Import projects
import { ProjectCard, type Project } from '@/components/portfolio/project-card'; // Import ProjectCard and Project type

const featuredProjects = allProjects.slice(0, 3); // Get first 3 projects

const services = [
  {
    icon: ClipboardCheck,
    title: 'Comprehensive Security Audits',
    description: 'In-depth analysis of your infrastructure to identify vulnerabilities and ensure compliance.',
  },
  {
    icon: Target,
    title: 'Advanced Penetration Testing',
    description: 'Simulate real-world attacks to test your defenses and uncover exploitable weaknesses.',
  },
  {
    icon: MessagesSquare,
    title: 'Strategic Security Consulting',
    description: 'Expert guidance to develop and implement robust cybersecurity strategies tailored to your business needs.',
  },
  {
    icon: ServerCog,
    title: 'Managed Detection & Response (MDR)',
    description: 'Continuous monitoring, threat detection, and incident response to protect your assets around the clock.',
  },
];

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
            <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Threat Intelligence</h3>
            <p className="text-muted-foreground">Proactive identification and analysis of cyber threats to preempt attacks.</p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-primary/20 transition-shadow">
            <Network className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Network Security</h3>
            <p className="text-muted-foreground">Designing and implementing secure network architectures and protocols.</p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-primary/20 transition-shadow">
            <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ethical Hacking</h3>
            <p className="text-muted-foreground">Simulating attacks to identify vulnerabilities and strengthen defenses.</p>
          </div>
        </div>
      </section>

      <section id="services" className="py-12">
        <SectionTitle className="text-center">Our Services</SectionTitle>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {services.map((service) => (
            <div key={service.title} className="p-6 bg-card rounded-lg shadow-md hover:shadow-primary/20 transition-shadow">
              <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="featured-projects" className="py-12">
        <SectionTitle className="text-center">Featured Projects</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
            <Link href="/portfolio">
              View All Projects <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
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

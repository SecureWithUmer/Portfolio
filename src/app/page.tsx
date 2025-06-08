
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/ui/page-title';
import { SectionTitle } from '@/components/ui/section-title';
import { AiTipGenerator } from '@/components/ai/ai-tip-generator';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const expertiseItems = [
  {
    icon: ShieldCheck,
    title: 'Threat Intelligence',
    description: 'Proactive identification and analysis of cyber threats to preempt attacks.',
  },
  {
    icon: Network,
    title: 'Network Security',
    description: 'Designing and implementing secure network architectures and protocols.',
  },
  {
    icon: Lock,
    title: 'Ethical Hacking',
    description: 'Simulating attacks to identify vulnerabilities and strengthen defenses.',
  },
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
          className="rounded-full mx-auto mb-6 border-4 border-primary shadow-lg animate-slide-in-down opacity-0"
          data-ai-hint="professional portrait" 
          style={{ animationDelay: '0s' }}
        />
        <h1 
          className="text-5xl md:text-6xl font-bold font-cyberName mb-4 animate-slide-in-down opacity-0"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="text-primary cyber-glow">UMER FAROOQ</span>
        </h1>
        <p 
          className="text-2xl text-foreground/80 mb-6 font-headline animate-slide-in-down opacity-0"
          style={{ animationDelay: '0.2s' }}
        >
          Cybersecurity Professional &amp; Strategist
        </p>
        <p 
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8 animate-slide-in-down opacity-0"
          style={{ animationDelay: '0.3s' }}
        >
          Dedicated to safeguarding digital landscapes with innovative security solutions and expert insights. Based in Faisalabad, Pakistan, I specialize in threat analysis, risk management, and robust defense strategies.
        </p>
        <div 
          className="space-x-4 animate-slide-in-down opacity-0"
          style={{ animationDelay: '0.4s' }}
        >
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {expertiseItems.map((item, index) => (
            <Card 
              key={item.title} 
              className="flex flex-col items-center text-center hover:shadow-primary/20 transition-shadow duration-300 animate-slide-in-down opacity-0"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <item.icon className="h-12 w-12 text-primary mx-auto mb-3" />
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="featured-projects" className="py-12">
        <SectionTitle className="text-center">Featured Projects</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="animate-slide-in-down opacity-0" 
              style={{ animationDelay: `${0.8 + expertiseItems.length * 0.1 + index * 0.1}s` }} // Adjusted delay
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        <div 
          className="text-center mt-12 animate-slide-in-down opacity-0"
          style={{ animationDelay: `${0.8 + expertiseItems.length * 0.1 + featuredProjects.length * 0.1}s` }} // Adjusted delay
        >
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
            <Link href="/portfolio">
              View All Projects <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section 
        id="ai-tip" 
        className="py-12 animate-slide-in-down opacity-0"
        style={{ animationDelay: `${0.9 + expertiseItems.length * 0.1 + featuredProjects.length * 0.1}s` }} // Adjusted delay
      >
        <AiTipGenerator />
      </section>

      <section 
        id="cta-blog" 
        className="py-12 text-center bg-card rounded-lg shadow-lg p-8 animate-slide-in-down opacity-0"
        style={{ animationDelay: `${1.0 + expertiseItems.length * 0.1 + featuredProjects.length * 0.1}s` }} // Adjusted delay
      >
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


"use client";

import { Typewriter } from 'react-simple-typewriter';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import { AiTipGenerator } from '@/components/ai/ai-tip-generator';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight, Briefcase, BookOpen, Send, ShieldCheck,
  Network, Lock, ClipboardCheck, Target, MessagesSquare,
  ServerCog, ExternalLink
} from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/project-card';
import { motion } from 'framer-motion';

const featuredProjects = projects.slice(0, 3);

const expertiseItems = [
  { icon: ShieldCheck, title: 'Threat Intelligence', description: 'Proactive identification and analysis of cyber threats to preempt attacks.' },
  { icon: Network, title: 'Network Security', description: 'Designing and implementing secure network architectures and protocols.' },
  { icon: Lock, title: 'Ethical Hacking', description: 'Simulating attacks to identify vulnerabilities and strengthen defenses.' },
  { icon: ClipboardCheck, title: 'Security Audits', description: 'Identify vulnerabilities and ensure compliance.' },
  { icon: Target, title: 'Penetration Testing', description: 'Simulate real-world attacks to test defenses.' },
  { icon: MessagesSquare, title: 'Security Consulting', description: 'Guidance for robust cybersecurity strategies.' },
  { icon: ServerCog, title: 'MDR', description: '24/7 threat detection and response.' },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};


export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center py-16 min-h-[70vh] flex flex-col justify-center items-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <Image
            src="https://placehold.co/200x200.png"
            alt="Umer Farooq"
            width={200}
            height={200}
            className="rounded-full mx-auto mb-8 border-4 border-primary"
            data-ai-hint="cybersecurity shield abstract"
            priority
          />
        </motion.div>
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-cyberName mb-6 text-primary animate-neon-glow-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          <Typewriter
            words={["Hi, I'm Umer Farooq | Cybersecurity Specialist 🔒"]}
            loop={1}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </motion.h1>
        <motion.p 
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          Safeguarding digital landscapes with advanced threat analysis and expert insights from Faisalabad, Pakistan.
        </motion.p>
        <motion.div 
          className="space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        >
          <Button asChild size="lg">
            <Link href="/portfolio">
              View My Work <Briefcase className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">
              Get In Touch <Send className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      <motion.section 
        id="expertise" 
        className="py-12"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionTitle className="text-center animate-glitch">My Expertise</SectionTitle>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-center"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {expertiseItems.map((item) => (
            <motion.div key={item.title} variants={cardVariants}>
              <Card className="flex flex-col items-center h-full">
                <CardHeader className="pb-4">
                  <item.icon className="h-12 w-12 text-primary mx-auto mb-3" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section 
        id="featured-projects" 
        className="py-12"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionTitle className="text-center animate-glitch">Featured Projects</SectionTitle>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + featuredProjects.length * 0.1 }}
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/portfolio">
              View All Projects <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </motion.section>

      <motion.section 
        id="ai-tip" 
        className="py-12"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <AiTipGenerator />
      </motion.section>

      <motion.section 
        id="cta-blog" 
        className="py-12 text-center bg-card rounded-lg p-8"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionTitle className="animate-glitch">Stay Informed</SectionTitle>
        <p className="max-w-xl mx-auto text-muted-foreground mb-6">
          Explore my latest articles and insights on cybersecurity trends, best practices, and threat landscapes.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/blog">
            Read The Blog <BookOpen className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </motion.section>
    </div>
  );
}

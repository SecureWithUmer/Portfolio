
"use client";

import { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import { AiTipGenerator } from '@/components/ai/ai-tip-generator';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen, Send, ShieldCheck,
  Network, ClipboardCheck, Target, MessagesSquare,
  ServerCog
} from 'lucide-react';
import { motion } from 'framer-motion';

const expertiseItems = [
  { id: 'threat-intel', icon: ShieldCheck, title: 'Threat Intelligence', description: 'Proactive identification and analysis of cyber threats to preempt attacks.', skillsAndTools: ['MITRE ATT&CK', 'OSINT Tools', 'Maltego', 'VirusTotal API', 'Threat Feeds Integration', 'YARA Rules'] },
  { id: 'network-sec', icon: Network, title: 'Network Security', description: 'Designing and implementing secure network architectures and protocols.', skillsAndTools: ['Firewalls (NGFW)', 'IDS/IPS', 'VPN Setup', 'Microsegmentation', 'Zscaler', 'Palo Alto Networks'] },
  { id: 'ethical-hack', icon: ShieldCheck, title: 'Ethical Hacking', description: 'Simulating attacks to identify vulnerabilities and strengthen defenses.', skillsAndTools: ['Metasploit', 'Burp Suite', 'Nmap', 'Kali Linux', 'Penetration Testing methodologies'] },
  { id: 'sec-audits', icon: ClipboardCheck, title: 'Security Audits', description: 'Identify vulnerabilities and ensure compliance.', skillsAndTools: ['ISO 27001', 'NIST CSF', 'Compliance Scanning', 'Vulnerability Assessment Tools', 'CIS Benchmarks'] },
  { id: 'pen-testing', icon: Target, title: 'Penetration Testing', description: 'Simulate real-world attacks to test defenses.', skillsAndTools: ['OWASP ZAP', 'SQLMap', 'Nessus', 'Manual Exploit Development', 'Report Writing'] },
  { id: 'sec-consult', icon: MessagesSquare, title: 'Security Consulting', description: 'Guidance for robust cybersecurity strategies.', skillsAndTools: ['Risk Assessment', 'Security Policy Development', 'Incident Response Planning', 'Tabletop Exercises'] },
  { id: 'mdr', icon: ServerCog, title: 'MDR', description: '24/7 threat detection and response.', skillsAndTools: ['SIEM (Splunk, ELK)', 'EDR Solutions (CrowdStrike, SentinelOne)', 'SOAR Playbooks', 'Threat Hunting'] },
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
      staggerChildren: 0.1, // Reduced stagger for faster appearance
      delayChildren: 0.1, // Reduced delay
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 }, // Slightly less dramatic scale/y
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }, // Faster transition
  },
};


export default function HomePage() {
  const [hoveredExpertiseId, setHoveredExpertiseId] = useState<string | null>(null);

  const professions = [
    "Ethical Hacker",
    "Penetration Tester",
    "API Security Expert",
    "Cloud Security Engineer",
    "Cybersecurity Analyst",
    "Security Consultant",
    "Threat Hunter"
  ];

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
            className="rounded-full mx-auto mb-6 border-4 border-primary"
            data-ai-hint="cybersecurity shield abstract"
            priority
          />
        </motion.div>
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-cyberName mb-2 text-primary animate-neon-glow-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          Umer Farooq
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-foreground/80 mb-6 font-code"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          I am a{' '}
          <Typewriter
            words={professions}
            loop={0} 
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </motion.p>
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
            <Link href="/about">
              About Me 
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
          viewport={{ once: true, amount: 0.1 }}
        >
          {expertiseItems.map((item) => (
            <motion.div 
              key={item.id} 
              variants={cardVariants}
              onMouseEnter={() => setHoveredExpertiseId(item.id)}
              onMouseLeave={() => setHoveredExpertiseId(null)}
              // layout prop removed here to prevent other cards from animating positionally
              className="cursor-pointer"
            >
              <Card className="flex flex-col items-center h-full">
                <CardHeader className="pb-4 w-full">
                  <motion.div
                    className="inline-block p-2"
                    whileHover={{ scale: 1.15, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="h-12 w-12 text-primary mx-auto" />
                  </motion.div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow w-full">
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                  {hoveredExpertiseId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="pt-4 border-t border-border/50"
                    >
                      <h4 className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">Key Skills & Tools:</h4>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {item.skillsAndTools.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs font-code">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
    

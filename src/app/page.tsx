
"use client";

import { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import {
  Send, ShieldCheck,
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
  { id: 'mdr', icon: ServerCog, title: 'MDR', description: '24/7 threat detection and response.', skillsAndTools: ['SIEM (Splunk', 'ELK)', 'EDR Solutions (CrowdStrike', 'SentinelOne)', 'SOAR Playbooks', 'Threat Hunting'] },
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
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
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
    <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28">
      <section className="text-center pt-0 pb-12 sm:pb-16 md:pb-20 min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-start items-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <Image
            src="https://placehold.co/200x200.png"
            alt="Umer Farooq"
            width={160}
            height={160}
            className="rounded-full mx-auto mb-4 sm:mb-6 border-4 border-primary w-32 h-32 sm:w-36 md:w-40 sm:h-36 md:h-40"
            data-ai-hint="cybersecurity shield abstract"
            priority
          />
        </motion.div>
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cyberName mb-2 text-primary animate-neon-glow-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          Umer Farooq
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-foreground/80 mb-4 sm:mb-6 font-code"
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
          className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          Safeguarding digital landscapes with advanced threat analysis and expert insights from Faisalabad, Pakistan.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        >
          <Button asChild size="default" className="w-full sm:w-auto text-sm sm:text-base md:h-11 md:px-8">
            <Link href="/about">
              About Me
            </Link>
          </Button>
          <Button asChild size="default" variant="outline" className="w-full sm:w-auto text-sm sm:text-base md:h-11 md:px-8">
            <Link href="/contact">
              Get In Touch <Send className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      <motion.section
        id="expertise"
        className="py-8 sm:py-12 md:py-16"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionTitle className="text-center animate-glitch">My Expertise</SectionTitle>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center"
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
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                zIndex: 10, 
                transition: { duration: 0.2, ease: "easeInOut" } 
              }}
              className="cursor-pointer"
            >
              <Card className="flex flex-col items-center h-full p-3 sm:p-4">
                <CardHeader className="pb-3 sm:pb-4 w-full px-2 sm:px-3">
                  <motion.div
                    className="inline-block p-1 sm:p-2"
                    whileHover={{ scale: 1.15, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="h-8 w-8 sm:h-10 md:h-12 sm:w-10 md:w-12 text-primary mx-auto" />
                  </motion.div>
                  <CardTitle className="text-base sm:text-lg md:text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow w-full px-2 sm:px-3">
                  <p className="text-muted-foreground text-xs sm:text-sm">{item.description}</p>
                  {hoveredExpertiseId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: '0.75rem' }} 
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="pt-2 sm:pt-3 md:pt-4 border-t border-border/50"
                    >
                      <h4 className="text-xs font-semibold text-accent mb-1.5 sm:mb-2 uppercase tracking-wider">Key Skills & Tools:</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center">
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
    </div>
  );
}

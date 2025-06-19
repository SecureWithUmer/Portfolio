
"use client";

import type { Metadata } from 'next'; 
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/ui/page-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, ShieldCheck, Network, ClipboardCheck, Target, MessagesSquare, ServerCog, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";


const expertiseItems = [
  { id: 'threat-intel', icon: ShieldCheck, title: 'Threat Intelligence', description: 'Proactive identification and analysis of cyber threats to preempt attacks.', skillsAndTools: ['MITRE ATT&CK', 'OSINT Tools', 'Maltego', 'VirusTotal API', 'Threat Feeds Integration', 'YARA Rules'] },
  { id: 'network-sec', icon: Network, title: 'Network Security', description: 'Designing and implementing secure network architectures and protocols.', skillsAndTools: ['Firewalls (NGFW)', 'IDS/IPS', 'VPN Setup', 'Microsegmentation', 'Zscaler', 'Palo Alto Networks'] },
  { id: 'ethical-hack', icon: ShieldCheck, title: 'Ethical Hacking', description: 'Simulating attacks to identify vulnerabilities and strengthen defenses.', skillsAndTools: ['Metasploit', 'Burp Suite', 'Nmap', 'Kali Linux', 'Penetration Testing methodologies'] },
  { id: 'sec-audits', icon: ClipboardCheck, title: 'Security Audits', description: 'Identify vulnerabilities and ensure compliance.', skillsAndTools: ['ISO 27001', 'NIST CSF', 'Compliance Scanning', 'Vulnerability Assessment Tools', 'CIS Benchmarks'] },
  { id: 'pen-testing', icon: Target, title: 'Penetration Testing', description: 'Simulate real-world attacks to test defenses.', skillsAndTools: ['OWASP ZAP', 'SQLMap', 'Nessus', 'Manual Exploit Development', 'Report Writing'] },
  { id: 'sec-consult', icon: MessagesSquare, title: 'Security Consulting', description: 'Guidance for robust cybersecurity strategies.', skillsAndTools: ['Risk Assessment', 'Security Policy Development', 'Incident Response Planning', 'Tabletop Exercises'] },
  { id: 'mdr', icon: ServerCog, title: 'MDR', description: '24/7 threat detection and response.', skillsAndTools: ['SIEM (Splunk, ELK)', 'EDR Solutions (CrowdStrike, SentinelOne)', 'SOAR Playbooks', 'Threat Hunting'] },
];


export default function AboutMePage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning) {
      setScanProgress(0); 
      const totalDuration = 2800; 
      const intervalDuration = 50;
      const steps = totalDuration / intervalDuration;
      const increment = 100 / steps;

      let currentProgress = 0;
      timer = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= 100) {
          setScanProgress(100);
          clearInterval(timer);
        } else {
          setScanProgress(currentProgress);
        }
      }, intervalDuration);
    }
    return () => clearInterval(timer);
  }, [isScanning]);


  const aboutMeText = "As a passionate cybersecurity enthusiast hailing from Faisalabad, Pakistan, I am deeply committed to the art and science of digital defense. My journey in cybersecurity is driven by a relentless curiosity to understand and mitigate evolving threats. I possess a diverse skill set encompassing threat intelligence, network security, ethical hacking, and security audits. I thrive on dissecting complex security challenges and architecting robust solutions to protect digital assets and ensure operational resilience. My goal is to contribute meaningfully to creating a safer digital environment for individuals and organizations alike.";

  const handleResumeDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      setScanProgress(100); 
      const link = document.createElement('a');
      link.href = '/assets/resume.pdf'; 
      link.download = 'Umer_Farooq_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: "Download Started", description: "Your resume download should begin shortly." });
    }, 3000); 
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      <PageTitle subtitle="Get to know the professional behind the passion for cybersecurity.">
        About Umer Farooq
      </PageTitle>

      <section className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 items-center">
        <div className="md:col-span-2 space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Umer Farooq</h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
            {aboutMeText}
          </p>
        </div>
        <div className="flex justify-center order-first md:order-last md:justify-start md:pl-8">
          <Image
            src="/assets/profile-picture.png" 
            alt="Umer Farooq - Cybersecurity Professional"
            width={200}
            height={200}
            className="rounded-full border-4 border-primary shadow-lg w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60"
            data-ai-hint="professional headshot"
            priority
          />
        </div>
      </section>

      <section className="space-y-6 sm:space-y-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-primary mb-8 sm:mb-10">My Core Skills & Expertise</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {expertiseItems.map((item) => (
            <Card key={item.id} className="flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50">
              <CardHeader className="items-center pt-4 sm:pt-6 pb-3">
                <item.icon className="h-8 w-8 sm:h-10 sm:w-10 text-accent mb-2 sm:mb-3" />
                <CardTitle className="text-lg sm:text-xl text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center space-y-3 px-3 sm:px-4">
                <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                <div className="pt-2 sm:pt-3 border-t border-border/30">
                    <h4 className="text-xs font-semibold text-accent mb-1.5 sm:mb-2 uppercase tracking-wider mt-2 sm:mt-3">Skills & Tools:</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center">
                    {item.skillsAndTools.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs font-code bg-secondary/70">
                        {skill}
                        </Badge>
                    ))}
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center py-6 sm:py-8">
        {isScanning ? (
          <div className="flex flex-col items-center space-y-2 sm:space-y-3">
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-primary" />
            <p className="text-muted-foreground text-base sm:text-lg">Scanning document for security...</p>
            <Progress value={scanProgress} className="w-full max-w-xs sm:max-w-sm mt-2 h-2 sm:h-2.5" />
             <p className="text-xs text-muted-foreground mt-1">Ensuring file integrity and safety.</p>
          </div>
        ) : (
          <Button
            asChild={!isScanning} 
            size="default"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 sm:px-8 sm:py-6 text-base sm:text-lg md:size-lg"
            onClick={isScanning ? undefined : handleResumeDownload}
          >
            <a href="/assets/resume.pdf" download="Umer_Farooq_Resume.pdf">
              Download My Resume <Download className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </Button>
        )}
      </section>
    </div>
  );
}

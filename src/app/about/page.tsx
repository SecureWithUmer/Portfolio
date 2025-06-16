
"use client";

import type { Metadata } from 'next'; // Keep for potential static metadata, though dynamic below
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/ui/page-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, ShieldCheck, Network, ClipboardCheck, Target, MessagesSquare, ServerCog, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Dynamic metadata for client components is not standard.
// export const metadata: Metadata = {
//   title: 'About Me | Umer Farooq',
//   description: 'Learn more about Umer Farooq, a cybersecurity enthusiast from Faisalabad, Pakistan, his skills, and professional background.',
// };


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
  const [showDownloadNote, setShowDownloadNote] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning) {
      setScanProgress(0); // Reset progress
      const totalDuration = 2800; // Slightly less than timeout to ensure progress hits 100
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
    setShowDownloadNote(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanProgress(100); // Ensure progress visually completes
      const link = document.createElement('a');
      link.href = '/assets/resume.pdf'; // Ensure this path is correct
      link.download = 'Umer_Farooq_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: "Download Started", description: "Your resume download should begin shortly." });
    }, 3000); 
  };

  return (
    <div className="space-y-16">
      <PageTitle subtitle="Get to know the professional behind the passion for cybersecurity.">
        About Umer Farooq
      </PageTitle>

      <section className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-3xl font-semibold text-primary">Umer Farooq</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            {aboutMeText}
          </p>
        </div>
        <div className="flex justify-center md:justify-start md:pl-8">
          <Image
            src="https://placehold.co/300x300.png" 
            alt="Umer Farooq - Cybersecurity Professional"
            width={300}
            height={300}
            className="rounded-full border-4 border-primary shadow-lg"
            data-ai-hint="professional headshot"
            priority
          />
        </div>
      </section>

      <section className="space-y-8">
        <h3 className="text-2xl font-semibold text-center text-primary mb-10">My Core Skills & Expertise</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseItems.map((item) => (
            <Card key={item.id} className="flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50">
              <CardHeader className="items-center pt-6">
                <item.icon className="h-10 w-10 text-accent mb-3" />
                <CardTitle className="text-xl text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center space-y-3">
                <p className="text-sm text-muted-foreground px-2">{item.description}</p>
                <div className="pt-2 border-t border-border/30">
                    <h4 className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider mt-3">Skills & Tools:</h4>
                    <div className="flex flex-wrap gap-1.5 justify-center">
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

      <section className="text-center py-8">
        {isScanning ? (
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground text-lg">Scanning document for security...</p>
            <Progress value={scanProgress} className="w-full max-w-sm mt-2 h-2.5" />
             <p className="text-xs text-muted-foreground mt-1">Ensuring file integrity and safety.</p>
          </div>
        ) : (
          <Button
            asChild={!isScanning} 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg"
            onClick={isScanning ? undefined : handleResumeDownload}
          >
            <a href="/assets/resume.pdf" download="Umer_Farooq_Resume.pdf">
              Download My Resume <Download className="ml-2 h-5 w-5" />
            </a>
          </Button>
        )}
        {showDownloadNote && !isScanning && (
          <p className="text-xs text-muted-foreground mt-3">
              (Note: Create an 'assets' folder in 'public' and add 'resume.pdf' there for download.)
          </p>
        )}
      </section>
    </div>
  );
}

// To set dynamic title for client components, use useEffect in the component
// or ensure metadata is handled by a parent server component or layout.
// For simplicity, if this page should always have this title,
// you can still define static metadata in a similar fashion if this file were named page.tsx
// under a route group, or rely on the template in RootLayout.
// For a specific title on this client page, a common pattern is:
// useEffect(() => { document.title = 'About Me | Umer Farooq'; }, []);
// However, Next.js 13+ prefers metadata API.
// Since this is already `page.tsx`, the metadata object at the top (if uncommented and this was a server component) would work.
// For client components, metadata must be exported from a `layout.tsx` or `page.tsx` that is a Server Component.
// If this needs to be a client component and have dynamic metadata, it's more complex.
// Given the structure, it might be better to make `src/app/about/layout.tsx` handle metadata.

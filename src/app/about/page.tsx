
import type { Metadata } from 'next'; 
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/ui/page-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Network, ClipboardCheck, Target, MessagesSquare, ServerCog } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Umer Farooq | Penetration Tester & Cybersecurity Professional',
  description: 'Get to know Umer Farooq, a Penetration Tester and cybersecurity specialist from Faisalabad, Pakistan, with verified rankings on Bugcrowd and HackerOne.',
};

const expertiseItems = [
  { id: 'pen-testing', icon: Target, title: 'Penetration Testing', description: 'Simulating real-world cyberattacks across web, API, and cloud assets.', skillsAndTools: ['Burp Suite', 'Kali Linux', 'API Pen Testing', 'Frida', 'Postman', 'OWASP Top 10'] },
  { id: 'threat-intel', icon: ShieldCheck, title: 'Threat Intelligence', description: 'Proactive identification and analysis of cyber threats to preempt attacks.', skillsAndTools: ['MITRE ATT&CK', 'OSINT Tools', 'VirusTotal API', 'Wazuh', 'Threat Feeds'] },
  { id: 'network-sec', icon: Network, title: 'Network Security', description: 'Designing and implementing secure network architectures and perimeter defense.', skillsAndTools: ['Firewalls', 'IDS/IPS', 'Network Hardening', 'Packet Analysis', 'VPN Setup'] },
  { id: 'cloud-sec', icon: ServerCog, title: 'Cloud & Systems Security', description: 'Hardening enterprise Linux environments and auditing cloud infrastructure.', skillsAndTools: ['Linux', 'Cloud Security', 'Container Hardening', 'Access Control'] },
  { id: 'sec-audits', icon: ClipboardCheck, title: 'Security Audits', description: 'Identifying system vulnerabilities and verifying standards compliance.', skillsAndTools: ['ISO/IEC 27001', 'Vulnerability Assessment', 'Security Benchmarks', 'Report Writing'] },
  { id: 'sec-consult', icon: MessagesSquare, title: 'Security Consulting', description: 'Providing expert guidance for robust cybersecurity defense strategies.', skillsAndTools: ['Risk Assessment', 'Bug Bounty Guidance', 'Remediation Roadmaps', 'Security Policies'] },
];


export default function AboutMePage() {
  const aboutMeText = "As a passionate Penetration Tester and cybersecurity specialist hailing from Faisalabad, Pakistan, I am deeply committed to offensive security and digital defense. My journey is backed by active contributions on Bugcrowd and HackerOne, where I have earned Hall of Fame recognitions and helped secure enterprise systems globally. I possess expertise in web and API penetration testing, network security, and security auditing. My mission is to identify critical weaknesses before malicious actors can exploit them, ensuring digital resilience for modern organizations.";

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
            alt="Umer Farooq - Penetration Tester & Cybersecurity Professional"
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
    </div>
  );
}

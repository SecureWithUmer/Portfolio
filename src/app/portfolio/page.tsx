
import type { Metadata } from 'next';
import { PageTitle } from '@/components/ui/page-title';
import { ProjectCard, type Project } from '@/components/portfolio/project-card';

export const metadata: Metadata = {
  title: 'Project Portfolio',
  description: 'Showcasing cybersecurity projects by Umer Farooq.',
};

// Export the projects array
export const projects: Project[] = [
  {
    id: '1',
    title: 'Secure Network Infrastructure Design',
    description: 'Designed and implemented a resilient network infrastructure for a mid-sized enterprise, focusing on segmentation, intrusion detection, and secure remote access.',
    technologies: ['Firewalls', 'VPN', 'IDS/IPS', 'SIEM', 'Python'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'network diagram cybersecurity',
    liveLink: '#', 
  },
  {
    id: '2',
    title: 'Vulnerability Assessment & Penetration Testing',
    description: 'Conducted comprehensive VAPT for a web application, identifying critical vulnerabilities and providing actionable remediation strategies.',
    technologies: ['Nessus', 'Metasploit', 'Burp Suite', 'OWASP ZAP'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'code vulnerability',
    repoLink: '#', 
  },
  {
    id: '3',
    title: 'Phishing Awareness Campaign Platform',
    description: 'Developed a platform to simulate phishing attacks and train employees, significantly reducing successful phishing incidents by 40%.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Docker'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'phishing email security',
    liveLink: '#',
  },
   {
    id: '4',
    title: 'Incident Response Plan Development',
    description: 'Authored a comprehensive incident response plan for a financial institution, detailing procedures for containment, eradication, and recovery from cyber attacks.',
    technologies: ['NIST Framework', 'ISO 27001', 'Risk Management'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'security policy document',
  },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-12">
      <PageTitle subtitle="A collection of my significant contributions and projects in the cybersecurity domain.">
        My Portfolio
      </PageTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

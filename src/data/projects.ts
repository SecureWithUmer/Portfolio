
import type { Project } from '@/components/portfolio/project-card';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Zero Trust Network Architecture',
    description: 'Designed and implemented a comprehensive Zero Trust network architecture for a financial institution, enhancing security posture and reducing lateral movement risk.',
    technologies: ['Zero Trust', 'Microsegmentation', 'SASE', 'IAM'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'network security',
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: '2',
    title: 'Cloud Security Posture Management (CSPM)',
    description: 'Developed and deployed a CSPM solution for a multi-cloud environment (AWS, Azure), automating compliance checks and threat detection.',
    technologies: ['AWS Security Hub', 'Azure Security Center', 'Terraform', 'Python'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cloud security',
  },
  {
    id: '3',
    title: 'Advanced Persistent Threat (APT) Simulation',
    description: 'Conducted a red team exercise simulating an APT attack to test the resilience of a healthcare provider\'s defenses and incident response capabilities.',
    technologies: ['Red Teaming', 'Metasploit', 'Cobalt Strike (Simulated)', 'MITRE ATT&CK'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cyber attack',
    repoLink: '#',
  },
  {
    id: '4',
    title: 'Secure SDLC Implementation',
    description: 'Integrated security best practices and tools into the software development lifecycle (SDLC) for a SaaS company, including SAST, DAST, and threat modeling.',
    technologies: ['DevSecOps', 'SAST', 'DAST', 'CI/CD Security'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'software development',
  },
   {
    id: '5',
    title: 'Managed Detection & Response (MDR) Service Setup',
    description: 'Led the setup and operationalization of an MDR service, focusing on 24/7 threat monitoring, analysis, and rapid response for multiple clients.',
    technologies: ['SIEM', 'SOAR', 'Endpoint Detection (EDR)', 'Threat Hunting'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'security operations',
    liveLink: '#',
  }
];

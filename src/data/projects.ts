
import type { Project } from '@/components/portfolio/project-card';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Zero Trust Network Architecture',
    description: 'Designed and implemented a comprehensive Zero Trust network architecture for a financial institution, enhancing security posture and reducing lateral movement risk.',
    technologies: ['Zero Trust', 'Microsegmentation', 'SASE', 'IAM'],
    tags: ['Network Security', 'Architecture', 'Zero Trust'],
    toolsUsed: ['Okta', 'Zscaler', 'Palo Alto NGFW'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: '2',
    title: 'Cloud Security Posture Management (CSPM)',
    description: 'Developed and deployed a CSPM solution for a multi-cloud environment (AWS, Azure), automating compliance checks and threat detection.',
    technologies: ['AWS Security Hub', 'Azure Security Center', 'Terraform', 'Python'],
    tags: ['Cloud Security', 'Automation', 'Compliance'],
    toolsUsed: ['AWS Config', 'Azure Policy', 'Checkov'],
  },
  {
    id: '3',
    title: 'Advanced Persistent Threat (APT) Simulation',
    description: 'Conducted a red team exercise simulating an APT attack to test the resilience of a healthcare provider\'s defenses and incident response capabilities.',
    technologies: ['Red Teaming', 'Metasploit', 'Cobalt Strike (Simulated)', 'MITRE ATT&CK'],
    tags: ['Pentesting', 'Red Teaming', 'APT Simulation'],
    toolsUsed: ['Metasploit Framework', 'Nmap', 'BloodHound'],
    repoLink: '#',
  },
  {
    id: '4',
    title: 'Secure SDLC Implementation',
    description: 'Integrated security best practices and tools into the software development lifecycle (SDLC) for a SaaS company, including SAST, DAST, and threat modeling.',
    technologies: ['DevSecOps', 'SAST', 'DAST', 'CI/CD Security'],
    tags: ['DevSecOps', 'Application Security', 'SDLC'],
    toolsUsed: ['SonarQube', 'OWASP ZAP', 'GitLab CI'],
  },
   {
    id: '5',
    title: 'Managed Detection & Response (MDR) Service Setup',
    description: 'Led the setup and operationalization of an MDR service, focusing on 24/7 threat monitoring, analysis, and rapid response for multiple clients.',
    technologies: ['SIEM', 'SOAR', 'Endpoint Detection (EDR)', 'Threat Hunting'],
    tags: ['Security Operations', 'MDR', 'Incident Response'],
    toolsUsed: ['Splunk', 'Elastic SIEM', 'CrowdStrike Falcon'],
    liveLink: '#',
  },
  {
    id: '6',
    title: 'CTF Challenge Development',
    description: 'Developed a series of Capture The Flag (CTF) challenges focusing on web vulnerabilities, reverse engineering, and cryptography for a cybersecurity competition.',
    technologies: ['PHP', 'Python', 'Docker', 'GDB'],
    tags: ['CTF', 'Reverse Engineering', 'Web Security', 'Cryptography'],
    toolsUsed: ['IDA Pro', 'Ghidra', 'Burp Suite', 'CyberChef'],
    repoLink: '#',
  },
  {
    id: '7',
    title: 'Android Malware Analysis',
    description: 'Performed static and dynamic analysis of Android malware samples to understand their behavior, identify indicators of compromise, and develop mitigation strategies.',
    technologies: ['Android Internals', 'Mobile Security', 'Static Analysis', 'Dynamic Analysis'],
    tags: ['Malware Analysis', 'Mobile Security', 'Android'],
    toolsUsed: ['JADX', 'Frida', 'Drozer', 'Wireshark'],
  }
];


export interface Certification {
  id: string;
  slug: string;
  title: string;
  issuingBody: string;
  issueDate: string;
  expiryDate: string;
  category?: 'technical' | 'non-technical';
  logoUrl: string;
  description: string;
  downloadLink?: string;
  verificationLink?: string;
  dataAiHint?: string;
}

export const certifications: Certification[] = [
  {
    id: '1',
    slug: 'microsoft-cybersecurity-architect',
    title: 'Microsoft Cybersecurity Architect',
    issuingBody: 'Microsoft',
    issueDate: '2023-08-15',
    expiryDate: 'Lifetime',
    category: 'technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Validates expertise in designing and evolving cybersecurity strategies, zero-trust architectures, and governance, risk, and compliance (GRC) frameworks across hybrid cloud environments.',
    downloadLink: '#',
    verificationLink: 'https://learn.microsoft.com/users/securewithumer',
    dataAiHint: 'microsoft cybersecurity architect badge'
  },
  {
    id: '2',
    slug: 'google-cybersecurity-professional',
    title: 'Google Cybersecurity Professional',
    issuingBody: 'Google',
    issueDate: '2023-09-10',
    expiryDate: 'Lifetime',
    category: 'technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Demonstrates comprehensive understanding of cybersecurity concepts, hands-on security operations, SIEM tools, packet analysis, incident detection, and Python automation for security workflows.',
    downloadLink: '#',
    verificationLink: 'https://www.coursera.org/verify/professional-cert',
    dataAiHint: 'google cybersecurity shield'
  },
  {
    id: '3',
    slug: 'google-network-security-professional',
    title: 'Google Network Security Professional',
    issuingBody: 'Google',
    issueDate: '2023-10-05',
    expiryDate: 'Lifetime',
    category: 'technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Covers core network defense protocols, firewall management, secure network architecture, intrusion detection/prevention systems (IDS/IPS), and zero-trust perimeter configuration.',
    downloadLink: '#',
    verificationLink: 'https://www.coursera.org/verify/professional-cert',
    dataAiHint: 'google network security emblem'
  },
  {
    id: '4',
    slug: 'certified-social-engineering-defense-practitioner-csedp',
    title: 'Certified Social Engineering Defense Practitioner (CSEDP)',
    issuingBody: 'Cyber Security Global Alliance',
    issueDate: '2023-11-20',
    expiryDate: 'Lifetime',
    category: 'technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Focuses on identifying, analyzing, and mitigating human-centric cyber threats, psychological manipulation vectors, spear-phishing campaigns, and organizational social engineering vulnerabilities.',
    downloadLink: '#',
    verificationLink: 'https://www.csga-global.org',
    dataAiHint: 'csedp defense emblem'
  },
  {
    id: '5',
    slug: 'cpps-certified-phishing-prevention-specialist',
    title: 'CPPS - Certified Phishing Prevention Specialist',
    issuingBody: 'Cyber Security Global Alliance',
    issueDate: '2023-12-15',
    expiryDate: 'Lifetime',
    category: 'technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Validates expertise in analyzing advanced phishing campaigns, business email compromise (BEC), deceptive email header inspection, and implementing technical anti-phishing controls.',
    downloadLink: '#',
    verificationLink: 'https://www.csga-global.org',
    dataAiHint: 'cpps phishing prevention badge'
  },
  {
    id: '6',
    slug: 'iso-iec-27001-information-security-associate',
    title: 'ISO/IEC 27001 Information Security Associate™',
    issuingBody: 'SkillFront',
    issueDate: '2024-01-18',
    expiryDate: 'Lifetime',
    category: 'technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Certifies foundational mastery of Information Security Management Systems (ISMS), risk assessment methodologies, security controls implementation, and compliance with the international ISO/IEC 27001 standard.',
    downloadLink: '#',
    verificationLink: 'https://www.skillfront.com',
    dataAiHint: 'iso 27001 associate seal'
  },
  {
    id: '7',
    slug: 'iso-iec-27001-2022-lead-auditor',
    title: 'ISO/IEC 27001:2022 Lead Auditor',
    issuingBody: 'Exemplar Global',
    issueDate: '2024-03-22',
    expiryDate: 'Lifetime',
    category: 'technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Advanced qualification validating competence to lead and conduct full ISMS audits against ISO/IEC 27001:2022 standards, evaluate organizational security posture, and verify compliance across technical controls.',
    downloadLink: '#',
    verificationLink: '#',
    dataAiHint: 'iso 27001 lead auditor badge'
  },
  {
    id: '8',
    slug: 'certified-deep-web-security-cdws',
    title: 'Certified Deep Web Security - CDWS',
    issuingBody: 'Cyber Security Institute',
    issueDate: '2024-05-10',
    expiryDate: 'Lifetime',
    category: 'technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Specialized credential examining dark web reconnaissance, onion routing protocols, underground threat intelligence gathering, leak monitoring, and advanced defensive operational security (OPSEC).',
    downloadLink: '#',
    verificationLink: '#',
    dataAiHint: 'cdws deep web security badge'
  },
  {
    id: '9',
    slug: 'critical-thinking-imperial-college-london',
    title: 'Critical thinking - Imperial College London',
    issuingBody: 'Imperial College London',
    issueDate: '2023-06-12',
    expiryDate: 'Lifetime',
    category: 'non-technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Develops advanced analytical reasoning, hypothesis testing, cognitive bias identification, and evidence-based problem-solving frameworks applied to complex technological and strategic decision making.',
    downloadLink: '#',
    verificationLink: 'https://www.coursera.org/verify',
    dataAiHint: 'imperial college london emblem'
  },
  {
    id: '10',
    slug: 'innovation-through-design-university-of-sydney',
    title: 'Innovation Through Design: Think, Make, Break, Repeat - University of Sydney',
    issuingBody: 'University of Sydney',
    issueDate: '2023-07-20',
    expiryDate: 'Lifetime',
    category: 'non-technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Explores design-thinking methodologies, iterative prototyping, multidisciplinary problem framing, and user-centric problem solving to build innovative and resilient technological solutions.',
    downloadLink: '#',
    verificationLink: 'https://www.coursera.org/verify',
    dataAiHint: 'university of sydney seal'
  },
  {
    id: '11',
    slug: 'ai-justice-and-rule-of-law-university-of-oxford',
    title: 'AI justice and rule of law - University of Oxford',
    issuingBody: 'University of Oxford',
    issueDate: '2023-11-05',
    expiryDate: 'Lifetime',
    category: 'non-technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Rigorous academic inquiry into artificial intelligence ethics, algorithmic accountability, human rights frameworks, judicial AI applications, and legal governance in algorithmic decision systems.',
    downloadLink: '#',
    verificationLink: 'https://www.unesco.org',
    dataAiHint: 'university of oxford coat of arms'
  },
  {
    id: '12',
    slug: 'internet-history-technology-and-security-university-of-michigan',
    title: 'Internet History, Technology, and Security - University of Michigan',
    issuingBody: 'University of Michigan',
    issueDate: '2024-02-14',
    expiryDate: 'Lifetime',
    category: 'non-technical',
    logoUrl: '/assets/profile-picture.png',
    description: 'Comprehensive study of Internet origins, TCP/IP network protocol evolution, the World Wide Web architecture, foundational cryptography, and the emergence of modern cybersecurity warfare.',
    downloadLink: '#',
    verificationLink: 'https://www.coursera.org/verify',
    dataAiHint: 'university of michigan block m'
  }
];

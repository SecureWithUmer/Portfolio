
export interface Certification {
  id: string;
  slug: string;
  title: string;
  issuingBody: string;
  issueDate: string; // YYYY-MM-DD
  expiryDate?: string; // YYYY-MM-DD or "Lifetime"
  logoUrl: string; // Path to logo in public/assets/logos/ or placeholder
  description: string; // For tooltip
  downloadLink?: string; // Path to certificate PDF in public/assets/certs/
  verificationLink?: string;
  dataAiHint?: string; // For placeholder image generation hint
}

export const certifications: Certification[] = [
  {
    id: '1',
    slug: 'comptia-security-plus',
    title: 'CompTIA Security+',
    issuingBody: 'CompTIA',
    issueDate: '2023-05-15',
    expiryDate: '2026-05-15',
    logoUrl: 'https://placehold.co/120x60.png', // Replace with actual path e.g., /assets/logos/comptia-sec-plus.png
    description: 'Global certification that validates the baseline skills necessary to perform core security functions and pursue an IT security career. Covers network security, compliance, threats, vulnerabilities, application, data and host security, access control, and cryptography.',
    downloadLink: '#', // Replace with actual path e.g., /assets/certs/comptia-security-plus.pdf
    verificationLink: 'https://www.credly.com/badges/your-comptia-badge-id', // Example verification
    dataAiHint: 'security shield'
  },
  {
    id: '2',
    slug: 'certified-ethical-hacker',
    title: 'Certified Ethical Hacker (CEH)',
    issuingBody: 'EC-Council',
    issueDate: '2024-01-20',
    logoUrl: 'https://placehold.co/120x60.png', // Replace with actual path e.g., /assets/logos/ec-council-ceh.png
    description: 'A credential that demonstrates knowledge of assessing the security of computer systems by looking for weaknesses and vulnerabilities in target systems, using the same knowledge and tools as a malicious hacker, but in a lawful and legitimate manner.',
    downloadLink: '#',
    verificationLink: 'https://aspen.eccouncil.org/verify', // Example verification
    dataAiHint: 'hacker logo'
  },
  {
    id: '3',
    slug: 'offensive-security-certified-professional',
    title: 'Offensive Security Certified Professional (OSCP)',
    issuingBody: 'Offensive Security',
    issueDate: '2024-07-01', // Hypothetical future or recent date
    logoUrl: 'https://placehold.co/120x60.png',
    description: 'A hands-on penetration testing certification, the OSCP challenges holders to prove they have a clear and practical understanding of the penetration testing process and life-cycle.',
    downloadLink: '#',
    verificationLink: '#',
    dataAiHint: 'lock key'
  },
  {
    id: '4',
    slug: 'cissp',
    title: 'Certified Information Systems Security Professional (CISSP)',
    issuingBody: '(ISC)²',
    issueDate: '2023-11-10',
    logoUrl: 'https://placehold.co/120x60.png',
    description: 'Globally recognized standard of achievement that confirms an individual\'s knowledge in the field of information security. CISSPs are information assurance professionals who define the architecture, design, management and/or controls that assure the security of business environments.',
    downloadLink: '#',
    verificationLink: '#',
    dataAiHint: 'certificate official'
  }
];

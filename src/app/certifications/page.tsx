
import type { Metadata } from 'next';
import { PageTitle } from '@/components/ui/page-title';
import { VerticalTimeline } from '@/components/certifications/vertical-timeline';
import { CertificationTimelineItem } from '@/components/certifications/certification-timeline-item';
import { certifications } from '@/data/certifications';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Certifications | Umer Farooq',
  description: 'A timeline of cybersecurity certifications achieved by Umer Farooq, showcasing expertise and continuous learning in the field.',
};

export default function CertificationsPage() {
  if (!certifications || certifications.length === 0) {
    return (
      <div className="space-y-12">
        <PageTitle subtitle="My professional credentials and qualifications in cybersecurity.">
          Certifications Timeline
        </PageTitle>
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-lg">No certifications to display at the moment.</p>
          <p className="text-sm text-muted-foreground">Please check back later as I continue to grow my expertise.</p>
          <Button asChild variant="outline">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <PageTitle subtitle="My professional credentials and qualifications in cybersecurity.">
        Certifications Timeline
      </PageTitle>
      
      <VerticalTimeline>
        {certifications.map((cert, index) => (
          <CertificationTimelineItem
            key={cert.id}
            certification={cert}
            align={index % 2 === 0 ? 'left' : 'right'} // Alternate alignment for visual balance
          />
        ))}
      </VerticalTimeline>
       <p className="text-center text-sm text-muted-foreground mt-12">
        Note: Some download/verification links are placeholders. Logos are illustrative.
      </p>
    </div>
  );
}

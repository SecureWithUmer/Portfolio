
import type { Metadata } from 'next';
import { PageTitle } from '@/components/ui/page-title';
import { certifications, type Certification } from '@/data/certifications';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, CalendarDays, Building, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

async function getCertificationData(slug: string): Promise<Certification | null> {
  // Simulate API delay for fetching data if needed in future
  // await new Promise(resolve => setTimeout(resolve, 50)); 
  return certifications.find(cert => cert.slug === slug) || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cert = await getCertificationData(params.slug);
  if (!cert) {
    return {
      title: 'Certification Not Found | Umer Farooq',
    };
  }
  return {
    title: `${cert.title} | Umer Farooq`,
    description: `Details about the ${cert.title} certification obtained by Umer Farooq from ${cert.issuingBody}. ${cert.description.substring(0,120)}...`,
  };
}

export default async function CertificationDetailPage({ params }: { params: { slug: string } }) {
  const cert = await getCertificationData(params.slug);

  if (!cert) {
    return (
      <div className="py-10">
        <PageTitle>Certification Not Found</PageTitle>
        <p className="text-center text-muted-foreground text-lg">Sorry, the certification you are looking for does not exist or the link is incorrect.</p>
        <div className="text-center mt-8">
            <Button asChild>
                <Link href="/certifications">View All Certifications</Link>
            </Button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-8">
      <PageTitle>{cert.title}</PageTitle>
      
      <Card className="overflow-hidden shadow-xl">
        {cert.logoUrl && (
            <div className="bg-muted/30 p-6 flex justify-center items-center border-b">
                 <Image
                    src={cert.logoUrl}
                    alt={`${cert.title} logo`}
                    width={180}
                    height={90}
                    className="rounded object-contain"
                    data-ai-hint={cert.dataAiHint || "logo certification"}
                />
            </div>
        )}
        <CardHeader className="text-center">
            <p className="text-xl font-semibold text-muted-foreground flex items-center justify-center gap-2">
              <Building className="h-6 w-6 text-accent" />
              Issued by: {cert.issuingBody}
            </p>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-6">
            <div className="text-center text-sm text-muted-foreground border-y py-3">
                <p className="flex items-center justify-center gap-2">
                    <CalendarDays className="h-4 w-4 text-accent" />
                    Date Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                {cert.expiryDate && (
                    <p className="flex items-center justify-center gap-2 mt-1">
                        <CalendarDays className="h-4 w-4 text-accent" />
                        {cert.expiryDate === "Lifetime" ? "Validity: Lifetime" : `Expires: ${new Date(cert.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                    </p>
                )}
            </div>
          
            <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-primary prose-p:text-foreground/90">
              <h3 className="text-lg font-semibold text-primary mb-2 flex items-center"><Info className="h-5 w-5 mr-2 text-accent"/>Description</h3>
              <p className="leading-relaxed">{cert.description}</p>
            </div>

            {(cert.downloadLink && cert.downloadLink !== '#') || (cert.verificationLink && cert.verificationLink !== '#') ? (
                 <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold text-primary mb-3 text-center">Actions</h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                    {cert.downloadLink && cert.downloadLink !== '#' && (
                        <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href={cert.downloadLink} target="_blank" download>
                            <Download className="mr-2 h-4 w-4" /> Download Certificate
                        </Link>
                        </Button>
                    )}
                    {cert.verificationLink && cert.verificationLink !== '#' && (
                        <Button asChild variant="outline">
                        <Link href={cert.verificationLink} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" /> Verify Online
                        </Link>
                        </Button>
                    )}
                    </div>
                </div>
            ) : (
                 <p className="text-xs text-muted-foreground text-center italic pt-4 border-t">No download or verification links available for this certification.</p>
            )}
        </CardContent>
      </Card>

       <div className="text-center mt-10">
            <Button asChild variant="secondary">
                <Link href="/certifications">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Back to Certifications Timeline
                </Link>
            </Button>
        </div>
    </article>
  );
}

export async function generateStaticParams() {
  return certifications.map((cert) => ({
    slug: cert.slug,
  }));
}

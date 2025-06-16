
import type { Metadata } from 'next';
import { PageTitle } from '@/components/ui/page-title';
import { certifications, type Certification } from '@/data/certifications';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, CalendarDays, Building, Info, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

async function getCertificationData(slug: string): Promise<Certification | null> {
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
      <div className="py-8 sm:py-10">
        <PageTitle>Certification Not Found</PageTitle>
        <p className="text-center text-muted-foreground text-base sm:text-lg">Sorry, the certification you are looking for does not exist or the link is incorrect.</p>
        <div className="text-center mt-6 sm:mt-8">
            <Button asChild>
                <Link href="/certifications">View All Certifications</Link>
            </Button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-full md:max-w-3xl mx-auto py-6 sm:py-8">
      <PageTitle>{cert.title}</PageTitle>
      
      <Card className="overflow-hidden shadow-xl">
        {cert.logoUrl && (
            <div className="bg-muted/30 p-4 sm:p-6 flex justify-center items-center border-b">
                 <Image
                    src={cert.logoUrl}
                    alt={`${cert.title} logo`}
                    width={150}
                    height={75}
                    className="rounded object-contain h-16 sm:h-20 w-auto"
                    data-ai-hint={cert.dataAiHint || "logo certification"}
                />
            </div>
        )}
        <CardHeader className="text-center px-4 py-4 sm:px-6 sm:py-5">
            <p className="text-lg sm:text-xl font-semibold text-muted-foreground flex items-center justify-center gap-1.5 sm:gap-2">
              <Building className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              Issued by: {cert.issuingBody}
            </p>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4 sm:space-y-6">
            <div className="text-center text-xs sm:text-sm text-muted-foreground border-y py-2.5 sm:py-3">
                <p className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                    Date Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                {cert.expiryDate && (
                    <p className="flex items-center justify-center gap-1.5 sm:gap-2 mt-1">
                        <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                        {cert.expiryDate === "Lifetime" ? "Validity: Lifetime" : `Expires: ${new Date(cert.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                    </p>
                )}
            </div>
          
            <div className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none prose-headings:text-primary prose-p:text-foreground/90">
              <h3 className="text-base sm:text-lg font-semibold text-primary mb-1.5 sm:mb-2 flex items-center"><Info className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-accent"/>Description</h3>
              <p className="leading-relaxed">{cert.description}</p>
            </div>

            {(cert.downloadLink && cert.downloadLink !== '#') || (cert.verificationLink && cert.verificationLink !== '#') ? (
                 <div className="pt-3 sm:pt-4 border-t">
                    <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 sm:mb-3 text-center">Actions</h3>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center">
                    {cert.downloadLink && cert.downloadLink !== '#' && (
                        <Button asChild variant="default" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground sm:text-base">
                        <Link href={cert.downloadLink} target="_blank" download>
                            <Download className="mr-1.5 h-4 w-4" /> Download
                        </Link>
                        </Button>
                    )}
                    {cert.verificationLink && cert.verificationLink !== '#' && (
                        <Button asChild variant="outline" size="sm" className="sm:text-base">
                        <Link href={cert.verificationLink} target="_blank">
                            <ExternalLink className="mr-1.5 h-4 w-4" /> Verify Online
                        </Link>
                        </Button>
                    )}
                    </div>
                </div>
            ) : (
                 <p className="text-xs text-muted-foreground text-center italic pt-3 sm:pt-4 border-t">No download or verification links available for this certification.</p>
            )}
        </CardContent>
      </Card>

       <div className="text-center mt-8 sm:mt-10">
            <Button asChild variant="secondary" size="sm" className="sm:text-base">
                <Link href="/certifications">
                    <ChevronLeft className="mr-1.5 h-4 w-4" />
                    Back to Certifications
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

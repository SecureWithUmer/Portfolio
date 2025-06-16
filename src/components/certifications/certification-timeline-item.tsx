
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Download, Info, ExternalLink, CalendarDays, CheckCircle2 } from 'lucide-react';
import type { Certification } from '@/data/certifications';
import { Badge } from '@/components/ui/badge';

interface CertificationTimelineItemProps {
  certification: Certification;
  align?: 'left' | 'right'; // For alternating layout on larger screens
}

export function CertificationTimelineItem({ certification, align = 'left' }: CertificationTimelineItemProps) {
  const alignmentClasses = align === 'left' 
    ? 'md:flex-row-reverse md:text-right' 
    : 'md:flex-row md:text-left';
  const cardMargin = align === 'left' 
    ? 'md:mr-[calc(50%+1.25rem)]' // 1.25rem is half the icon width + spacing
    : 'md:ml-[calc(50%+1.25rem)]';
  const iconPosition = 'md:left-1/2 md:-translate-x-1/2';


  return (
    <div className={`relative flex items-start ${alignmentClasses}`}>
      <div className={`absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground ring-8 ring-background shadow-md ${iconPosition}`}>
        <CheckCircle2 className="h-5 w-5" />
      </div>
      <Card className={`w-full shadow-xl hover:shadow-primary/40 transition-all duration-300 ease-in-out ${cardMargin} md:max-w-md`}>
        <CardHeader className="p-4 md:p-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {certification.logoUrl && (
              <div className="flex-shrink-0 p-1 border border-border rounded-md bg-background">
                <Image
                  src={certification.logoUrl}
                  alt={`${certification.title} logo`}
                  width={100}
                  height={50}
                  className="rounded object-contain"
                  data-ai-hint={certification.dataAiHint || "logo"}
                />
              </div>
            )}
            <div className={`flex-grow ${align === 'left' ? 'sm:text-right' : 'sm:text-left'} text-center sm:text-inherit`}>
              <CardTitle className="text-lg md:text-xl text-primary mb-0.5">
                <Link href={`/certifications/${certification.slug}`} className="hover:underline">
                  {certification.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{certification.issuingBody}</CardDescription>
            </div>
          </div>
          <div className={`mt-2 text-xs text-muted-foreground flex items-center gap-1 ${align === 'left' ? 'sm:justify-end justify-center' : 'sm:justify-start justify-center'}`}>
             <CalendarDays className="h-3.5 w-3.5"/> 
             <span>Issued: {new Date(certification.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              {certification.expiryDate && (
                <>• Expires: {certification.expiryDate === "Lifetime" ? "Lifetime" : new Date(certification.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</>
              )}
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-5 pt-0 text-sm text-muted-foreground">
           <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="line-clamp-3 cursor-help">{certification.description}</p>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs bg-background border-border text-foreground p-3 rounded-md shadow-lg text-xs">
                {certification.description}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
        {(certification.downloadLink && certification.downloadLink !== '#') || (certification.verificationLink && certification.verificationLink !== '#') ? (
          <CardFooter className={`p-4 md:p-5 pt-0 border-t border-border/20 flex flex-wrap gap-2 ${align === 'left' ? 'sm:justify-end justify-center' : 'sm:justify-start justify-center'}`}>
            {certification.downloadLink && certification.downloadLink !== '#' && (
              <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link href={certification.downloadLink} target="_blank" download>
                  <Download className="mr-1.5 h-3.5 w-3.5" /> Download
                </Link>
              </Button>
            )}
            {certification.verificationLink && certification.verificationLink !== '#' && (
              <Button asChild variant="secondary" size="sm">
                <Link href={certification.verificationLink} target="_blank">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Verify
                </Link>
              </Button>
            )}
          </CardFooter>
        ) : null}
      </Card>
    </div>
  );
}

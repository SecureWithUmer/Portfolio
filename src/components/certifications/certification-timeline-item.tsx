
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Download, Info, ExternalLink, CalendarDays, CheckCircle2 } from 'lucide-react';
import type { Certification } from '@/data/certifications';

interface CertificationTimelineItemProps {
  certification: Certification;
  align?: 'left' | 'right'; 
}

export function CertificationTimelineItem({ certification, align = 'left' }: CertificationTimelineItemProps) {
  const alignmentClasses = align === 'left' 
    ? 'md:flex-row-reverse md:text-right' 
    : 'md:flex-row md:text-left';
  const cardMargin = align === 'left' 
    ? 'md:mr-[calc(50%+1rem)]' 
    : 'md:ml-[calc(50%+1rem)]';
  const iconPosition = 'md:left-1/2 md:-translate-x-1/2';


  return (
    <div className={`relative flex items-start ${alignmentClasses} w-full`}>
      <div className={`absolute left-3 sm:left-5 top-4 sm:top-5 z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 sm:ring-8 ring-background shadow-md ${iconPosition}`}>
        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <Card className={`w-full shadow-xl hover:shadow-primary/40 transition-all duration-300 ease-in-out ${cardMargin} md:max-w-md`}>
        <CardHeader className="p-3 sm:p-4 md:p-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
            {certification.logoUrl && (
              <div className="flex-shrink-0 p-1 border border-border rounded-md bg-background">
                <Image
                  src={certification.logoUrl}
                  alt={`${certification.title} logo`}
                  width={80} 
                  height={40}
                  className="rounded object-contain h-10 sm:h-12 w-auto"
                  data-ai-hint={certification.dataAiHint || "logo"}
                />
              </div>
            )}
            <div className={`flex-grow ${align === 'left' ? 'sm:text-right' : 'sm:text-left'} text-center sm:text-inherit`}>
              <CardTitle className="text-base sm:text-lg md:text-xl text-primary mb-0.5">
                <Link href={`/certifications/${certification.slug}`} className="hover:underline">
                  {certification.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">{certification.issuingBody}</CardDescription>
            </div>
          </div>
          <div className={`mt-1.5 sm:mt-2 text-xs text-muted-foreground flex flex-col xs:flex-row items-center gap-x-2 gap-y-0.5 ${align === 'left' ? 'sm:justify-end justify-center' : 'sm:justify-start justify-center'} flex-wrap`}>
             <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5"/> 
                <span>Issued: {new Date(certification.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
             </div>
              {certification.expiryDate && (
                <div className="flex items-center gap-1">
                    <span className="hidden xs:inline">•</span>
                    <span>Expires: {certification.expiryDate === "Lifetime" ? "Lifetime" : new Date(certification.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              )}
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-5 pt-0 text-xs sm:text-sm text-muted-foreground">
           <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="line-clamp-2 sm:line-clamp-3 cursor-help">{certification.description}</p>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[250px] sm:max-w-xs bg-background border-border text-foreground p-2 sm:p-3 rounded-md shadow-lg text-xs">
                {certification.description}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
        {(certification.downloadLink && certification.downloadLink !== '#') || (certification.verificationLink && certification.verificationLink !== '#') ? (
          <CardFooter className={`p-3 sm:p-4 md:p-5 pt-0 border-t border-border/20 flex flex-wrap gap-2 ${align === 'left' ? 'sm:justify-end justify-center' : 'sm:justify-start justify-center'}`}>
            {certification.downloadLink && certification.downloadLink !== '#' && (
              <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link href={certification.downloadLink} target="_blank" download>
                  <Download className="mr-1 h-3 w-3 sm:mr-1.5 sm:h-3.5 sm:w-3.5" /> Download
                </Link>
              </Button>
            )}
            {certification.verificationLink && certification.verificationLink !== '#' && (
              <Button asChild variant="secondary" size="sm" className="text-xs sm:text-sm">
                <Link href={certification.verificationLink} target="_blank">
                  <ExternalLink className="mr-1 h-3 w-3 sm:mr-1.5 sm:h-3.5 sm:w-3.5" /> Verify
                </Link>
              </Button>
            )}
          </CardFooter>
        ) : null}
      </Card>
    </div>
  );
}

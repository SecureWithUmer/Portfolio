
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ShieldCheck, Tag, Wrench } from 'lucide-react';
import Link from 'next/link';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  tags: string[];
  toolsUsed: string[];
  imageUrl: string;
  imageHint: string;
  liveLink?: string;
  repoLink?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-shadow duration-300 relative">
      <CardHeader>
        <div className="aspect-video relative w-full overflow-hidden rounded-t-lg">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={project.imageHint}
          />
        </div>
        <CardTitle className="mt-4 text-xl text-primary">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-muted-foreground text-sm mb-4">
          {project.description}
        </CardDescription>
        
        <div className="mb-3">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 flex items-center">
            <Tag className="h-3.5 w-3.5 mr-1.5 text-accent" /> Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-code text-xs border-accent text-accent">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 flex items-center">
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-primary" /> Key Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="font-code text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-0">
        <div className="flex justify-end w-full space-x-3">
          {project.liveLink && (
            <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline flex items-center">
              Live Demo <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          )}
          {project.repoLink && (
            <Link href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline flex items-center">
              Repository <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          )}
        </div>
      </CardFooter>

      {/* Hover Reveal for Tools Used */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center">
        <Wrench className="h-10 w-10 text-primary mb-4" />
        <h3 className="text-lg font-semibold text-primary mb-2">Tools Used</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {project.toolsUsed.map((tool) => (
            <Badge key={tool} variant="default" className="text-xs">
              {tool}
            </Badge>
          ))}
          {project.toolsUsed.length === 0 && (
            <p className="text-sm text-muted-foreground">No specific tools listed.</p>
          )}
        </div>
      </div>
    </Card>
  );
}

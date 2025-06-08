import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
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
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
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
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="font-code text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="flex justify-end w-full space-x-2">
          {project.liveLink && (
            <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center text-sm">
              Live Demo <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          )}
          {project.repoLink && (
            <Link href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center text-sm">
              Repository <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

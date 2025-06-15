
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  liveLink?: string;
  repoLink?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <motion.div
      className="h-full w-full" // Ensure the motion div itself has dimensions for perspective
      style={{ perspective: '1000px' }} // Apply perspective to the parent for 3D effect
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative h-full w-full transition-transform duration-700"
        style={{ transformStyle: 'preserve-3d' }}
        animate={isFlipped ? 'back' : 'front'}
        variants={flipVariants}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Face */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Card className="flex flex-col h-full overflow-hidden">
            <CardHeader>
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
          </Card>
        </motion.div>

        {/* Back Face */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <Card className="flex flex-col h-full overflow-hidden justify-center items-center p-6 bg-card">
              <Wrench className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-lg font-semibold text-primary mb-3">Tools Used</CardTitle>
              <CardContent className="text-center">
                {project.toolsUsed.length > 0 ? (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.toolsUsed.map((tool) => (
                      <Badge key={tool} variant="default" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No specific tools listed for this project.</p>
                )}
              </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

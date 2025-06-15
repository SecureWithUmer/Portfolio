
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageTitle } from '@/components/ui/page-title';
import { ProjectCard } from '@/components/portfolio/project-card';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tags, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Project Portfolio',
  description: 'Showcasing cybersecurity projects by Umer Farooq, filterable by expertise.',
};

interface PortfolioPageProps {
  searchParams?: {
    tag?: string;
  };
}

export default function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const currentTag = searchParams?.tag;

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort();

  const filteredProjects = currentTag
    ? projects.filter(project => project.tags.includes(currentTag))
    : projects;

  return (
    <div className="space-y-12">
      <PageTitle subtitle="A selection of projects demonstrating my skills. Filter by tags to explore specific areas.">
        My Project Portfolio
      </PageTitle>

      <div className="mb-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant={!currentTag ? "default" : "outline"} size="sm">
            <Link href="/portfolio">All Projects</Link>
          </Button>
          {allTags.map(tag => (
            <Button 
              key={tag} 
              asChild 
              variant={currentTag === tag ? "default" : "outline"} 
              size="sm"
            >
              <Link href={`/portfolio?tag=${encodeURIComponent(tag)}`}>
                {tag}
              </Link>
            </Button>
          ))}
        </div>
        {currentTag && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            Showing projects tagged with: <Badge variant="secondary" className="ml-1">{currentTag}</Badge>
          </p>
        )}
      </div>
      
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">No projects found for the selected filter.</p>
          <p className="text-sm text-muted-foreground mt-2">Try selecting a different tag or viewing all projects.</p>
        </div>
      )}
    </div>
  );
}

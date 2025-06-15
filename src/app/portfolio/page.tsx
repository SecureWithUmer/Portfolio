
import type { Metadata } from 'next';
import { PageTitle } from '@/components/ui/page-title';
import { ProjectCard } from '@/components/portfolio/project-card';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Project Portfolio',
  description: 'Showcasing cybersecurity projects by Umer Farooq.',
};

export default function PortfolioPage() {
  return (
    <div className="space-y-12">
      <PageTitle subtitle="A selection of projects that demonstrate my skills and experience in cybersecurity.">
        My Project Portfolio
      </PageTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

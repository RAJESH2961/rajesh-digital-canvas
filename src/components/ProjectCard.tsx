
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  featured = false
}) => {
  return (
    <div className={`card-professional relative group ${
      featured ? 'ring-2 ring-primary-500/50' : ''
    }`}>
      {featured && (
        <div className="absolute -top-3 left-6">
          <Badge className="bg-accent-500 text-black font-semibold">Featured</Badge>
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary-500 group-hover:text-accent-500 transition-colors">
          {title}
        </h3>
        
        <p className="text-text-secondary leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-background-tertiary text-text-primary border border-primary-500/20"
            >
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-4 pt-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex-1 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Live Preview
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

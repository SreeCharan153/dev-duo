import { Calendar, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  image_url?: string;
  project_url?: string;
  technologies?: string[];
  created_at: string;
}

export const ProjectCard = ({ 
  title, 
  description, 
  category, 
  image_url, 
  project_url, 
  technologies,
  created_at 
}: ProjectCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="project-card bg-card group">
      {image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
            {category}
          </span>
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar size={16} className="mr-1" />
            {formatDate(created_at)}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {project_url && (
          <a
            href={project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary-glow transition-colors"
          >
            View Project <ExternalLink size={16} className="ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};
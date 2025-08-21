import { Star } from 'lucide-react';

interface FeedbackCardProps {
  client_name_sanitized: string;
  feedback: string;
  rating: number;
  project_title?: string;
  created_at: string;
}

export const FeedbackCard = ({ 
  client_name_sanitized, 
  feedback, 
  rating, 
  project_title,
  created_at 
}: FeedbackCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="project-card bg-card p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-semibold text-lg">
            {client_name_sanitized.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">{client_name_sanitized}</h4>
            <span className="text-xs text-muted-foreground">
              {formatDate(created_at)}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">{renderStars(rating)}</div>
            <span className="text-sm text-muted-foreground">({rating}/5)</span>
          </div>
          
          {project_title && (
            <p className="text-sm text-accent mb-2">Project: {project_title}</p>
          )}
          
          <p className="text-muted-foreground">{feedback}</p>
        </div>
      </div>
    </div>
  );
};
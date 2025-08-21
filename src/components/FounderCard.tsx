import { Instagram, Linkedin, Mail } from 'lucide-react';

interface FounderCardProps {
  name: string;
  image: string;
  linkedin: string;
  instagram: string;
  email: string;
}

export const FounderCard = ({ name, image, linkedin, instagram, email }: FounderCardProps) => {
  return (
    <div className="founder-card p-8 max-w-sm mx-auto animate-fade-in-cyber perspective-1000">
      <div className="relative transform-3d">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={name}
            className="w-full h-80 object-cover transition-transform duration-700 hover:scale-110"
          />
          
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-primary-glow/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
          
          {/* Scan line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-glow/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 animate-matrix-scan" />
        </div>
        
        {/* Social Icons - Futuristic design */}
        <div className="founder-social-icons">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 glass-effect neon-border rounded-full hover:bg-primary/20 transition-all duration-300 group"
          >
            <Linkedin size={24} className="text-primary-glow group-hover:text-primary-foreground transition-colors" />
          </a>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 glass-effect neon-border rounded-full hover:bg-primary/20 transition-all duration-300 group"
          >
            <Instagram size={24} className="text-primary-glow group-hover:text-primary-foreground transition-colors" />
          </a>
          <a
            href={email}
            className="p-4 glass-effect neon-border rounded-full hover:bg-primary/20 transition-all duration-300 group"
          >
            <Mail size={24} className="text-primary-glow group-hover:text-primary-foreground transition-colors" />
          </a>
        </div>
      </div>
      
      <div className="text-center mt-6 space-y-2">
        <h3 className="text-2xl font-bold cyber-text">{name}</h3>
        <p className="text-primary-glow font-mono text-lg">Co-Founder</p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
      </div>
    </div>
  );
};
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

export const Logo = ({ className, size = 'md', animated = false }: LogoProps) => {
  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <img 
        src="/lovable-uploads/logo.png" 
        alt="DEV DUO Logo"
        className={cn(
          'w-full h-full object-contain',
          animated && 'animate-pulse'
        )}
      />
    </div>
  );
};
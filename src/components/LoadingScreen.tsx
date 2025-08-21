import { useEffect, useState } from 'react';
import { Logo } from './Logo';

const AnimatedLogo = ({ progress }: { progress: number }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 500);
    const textTimer = setTimeout(() => setShowText(true), 2000);
    
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Logo Animation */}
      <div className={`transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <Logo size="xl" animated={showLogo} className="mb-8" />
      </div>
      
      {/* Text Animation */}
      <div className={`transition-all duration-1000 delay-500 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-6xl font-bold cyber-text animate-hologram">
          DEV DUO
        </h1>
      </div>
    </div>
  );
};

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingSteps = [
    'Initializing...',
    'Loading components...',
    'Setting up workspace...',
    'Connecting services...',
    'Finalizing setup...',
    'Welcome to Dev Duo!'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // Update loading text based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        if (stepIndex < loadingSteps.length) {
          setLoadingText(loadingSteps[stepIndex]);
        }

        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'var(--gradient-hero)',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* Background Effects - Same as main website */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0" 
          style={{
            background: `
              radial-gradient(circle at 20% 50%, hsl(285 100% 55% / 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, hsl(295 100% 65% / 0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, hsl(305 100% 55% / 0.05) 0%, transparent 50%)
            `,
            pointerEvents: 'none'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(285 100% 55% / 0.03) 1px, transparent 1px),
              linear-gradient(90deg, hsl(285 100% 55% / 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            pointerEvents: 'none'
          }}
        />
      </div>
      
      {/* Loading UI */}
      <div className="relative z-10 text-center">
        <div className="glass-effect p-12 rounded-3xl max-w-lg mx-auto">
          <AnimatedLogo progress={progress} />
          
          <div className="mt-12 mb-8">
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary via-primary-glow to-primary transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>
            <div className="mt-4 text-primary-glow font-mono text-lg">
              {progress}%
            </div>
          </div>

          <p className="text-foreground/80 text-lg font-mono animate-pulse">
            {loadingText}
          </p>
        </div>
      </div>
    </div>
  );
};
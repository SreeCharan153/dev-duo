import { useEffect, useRef, useState } from 'react';

interface VideoLoadingScreenProps {
  onComplete: () => void;
  videoSrc?: string;
  poster?: string;
}

export const VideoLoadingScreen = ({ 
  onComplete, 
  videoSrc = '/loading-video.mp4',
  poster = '/loading-poster.jpg' 
}: VideoLoadingScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoReady(true);
    };

    const handleVideoEnd = () => {
      setFadeOut(true);
      setTimeout(onComplete, 1000);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [onComplete]);

  useEffect(() => {
    // Fallback timeout if video fails to load
    const timeout = setTimeout(() => {
      if (!isVideoReady) {
        setFadeOut(true);
        setTimeout(onComplete, 1000);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isVideoReady, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[hsl(258,80%,4%)] transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
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
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      
      {/* Optional overlay for branding */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-2xl font-bold mb-2">DEV DUO</h2>
          <p className="text-sm opacity-80">Creative Tech Solutions</p>
        </div>
      </div>

      {/* Loading indicator while video loads */}
      {!isVideoReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[hsl(258,80%,4%)]" style={{ background: 'var(--gradient-hero)' }}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white font-mono"></p>
          </div>
        </div>
      )}
    </div>
  );
};

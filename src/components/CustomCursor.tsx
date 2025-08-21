import { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    let trailId = 0;

    const updatePosition = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Smooth cursor movement
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      animationId = requestAnimationFrame(() => {
        setPosition({ x: newX, y: newY });
        
        // Add trail point
        setTrail(prevTrail => {
          const newTrail = [...prevTrail, { x: newX, y: newY, id: trailId++ }];
          return newTrail.slice(-8); // Keep only last 8 points
        });
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prevTrail => prevTrail.slice(1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Trail points */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: `${point.x - 2}px`,
            top: `${point.y - 2}px`,
            width: `${4 + index}px`,
            height: `${4 + index}px`,
            background: `hsl(285 100% ${55 + index * 3}% / ${0.1 + index * 0.1})`,
            transition: 'opacity 0.3s ease-out',
            opacity: index / trail.length,
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: `${position.x - 8}px`,
          top: `${position.y - 8}px`,
        }}
      />
    </>
  );
};
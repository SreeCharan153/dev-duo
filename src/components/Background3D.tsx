import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating Orb Component
function FloatingOrb({ position, color, size = 0.1 }: { position: [number, number, number], color: string, size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

// Particle System
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const count = 1000;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8B5CF6"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Main 3D Background Scene
function BackgroundScene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#8B5CF6" />
      
      {/* Floating orbs */}
      <FloatingOrb position={[-15, 10, -20]} color="#8B5CF6" size={0.15} />
      <FloatingOrb position={[15, -10, -25]} color="#A855F7" size={0.12} />
      <FloatingOrb position={[-10, -5, -15]} color="#C084FC" size={0.18} />
      <FloatingOrb position={[12, 8, -30]} color="#DDD6FE" size={0.1} />
      <FloatingOrb position={[0, 15, -35]} color="#7C3AED" size={0.14} />
      
      {/* Particle field */}
      <ParticleField />
      
      {/* Starfield */}
      <Stars 
        radius={100} 
        depth={50} 
        count={2000} 
        factor={2} 
        saturation={0} 
        fade 
        speed={0.5} 
      />
    </>
  );
}

interface Background3DProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const Background3D = ({ intensity = 'medium', className = '' }: Background3DProps) => {
  const getOpacity = () => {
    switch (intensity) {
      case 'low': return 0.3;
      case 'medium': return 0.5;
      case 'high': return 0.8;
      default: return 0.5;
    }
  };

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: getOpacity() }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <BackgroundScene />
      </Canvas>
    </div>
  );
};

export default Background3D;

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

const ParticleField = ({ count = 2000 }) => {
  const ref = useRef<THREE.Points>(null);
  const { isDark } = useTheme();
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create a more distributed particle field
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      
      // Dynamic colors based on theme with better contrast
      const t = Math.random();
      if (isDark) {
        if (t < 0.3) {
          // Bright pink for dark mode
          colors[i * 3] = 0.85;
          colors[i * 3 + 1] = 0.09;
          colors[i * 3 + 2] = 0.34;
        } else if (t < 0.6) {
          // Purple
          colors[i * 3] = 0.6;
          colors[i * 3 + 1] = 0.2;
          colors[i * 3 + 2] = 0.8;
        } else {
          // Blue
          colors[i * 3] = 0.2;
          colors[i * 3 + 1] = 0.4;
          colors[i * 3 + 2] = 0.9;
        }
      } else {
        // Light mode - darker, more visible colors
        if (t < 0.3) {
          // Darker pink for light mode
          colors[i * 3] = 0.7;
          colors[i * 3 + 1] = 0.1;
          colors[i * 3 + 2] = 0.3;
        } else if (t < 0.6) {
          // Darker purple
          colors[i * 3] = 0.4;
          colors[i * 3 + 1] = 0.1;
          colors[i * 3 + 2] = 0.6;
        } else {
          // Darker blue
          colors[i * 3] = 0.1;
          colors[i * 3 + 1] = 0.2;
          colors[i * 3 + 2] = 0.7;
        }
      }
    }
    
    return [positions, colors];
  }, [count, isDark]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={isDark ? 0.003 : 0.004}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        opacity={isDark ? 0.8 : 0.9}
      />
    </Points>
  );
};

const FloatingOrbs = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { isDark } = useTheme();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 2) * 8,
            Math.sin(i * 1.5) * 4,
            Math.sin(i * 0.8) * 6
          ]}
        >
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color={
              isDark 
                ? (i === 0 ? "#D91656" : i === 1 ? "#8B5CF6" : "#3B82F6")
                : (i === 0 ? "#BE3144" : i === 1 ? "#6366F1" : "#2563EB")
            }
            transparent
            opacity={isDark ? 0.1 : 0.08}
          />
        </mesh>
      ))}
    </group>
  );
};

const ModernThreeBackground = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 z-0">
      {/* Dynamic Gradient Background with proper contrast */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: isDark 
            ? `
              radial-gradient(circle at 20% 80%, rgba(217, 22, 86, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, #000000 0%, #0a0a0a 100%)
            `
            : `
              radial-gradient(circle at 20% 80%, rgba(190, 49, 68, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)
            `
        }}
      />
      
      {/* Three.js Canvas with proper background handling */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl, scene }) => {
          // Set transparent background for canvas
          gl.setClearColor('#000000', 0);
          scene.background = null;
        }}
      >
        <ambientLight intensity={isDark ? 0.3 : 0.4} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={isDark ? 0.5 : 0.6} 
          color={isDark ? "#D91656" : "#BE3144"} 
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={isDark ? 0.3 : 0.4} 
          color={isDark ? "#8B5CF6" : "#6366F1"} 
        />
        <ParticleField count={1500} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
};

export default ModernThreeBackground;

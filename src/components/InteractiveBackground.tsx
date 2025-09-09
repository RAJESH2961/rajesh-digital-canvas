
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

const AnimatedPoints = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const ref = useRef<THREE.Points>(null);
  const { isDark } = useTheme();
  
  const particlesPosition = new Float32Array(3000 * 3);
  
  for (let i = 0; i < 3000; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 8;
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 8;
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = mouse.y * 0.0001;
      ref.current.rotation.y = mouse.x * 0.0001;
      ref.current.rotation.z = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#D91656' : '#D91656'}
        size={0.006}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const FloatingSpheres = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const group = useRef<THREE.Group>(null);
  const { isDark } = useTheme();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      group.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.2;
      group.current.position.x = mouse.x * 0.0003;
      group.current.position.y = -mouse.y * 0.0003;
    }
  });

  return (
    <group ref={group}>
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 1) * 2.5,
            Math.cos(i * 1) * 2.5,
            Math.sin(i * 0.5) * 1.5
          ]}
          scale={0.2 + Math.sin(i) * 0.1}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={isDark ? '#D91656' : '#D91656'}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

const InteractiveBackground = () => {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const { isDark } = useTheme();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX - window.innerWidth / 2,
        y: event.clientY - window.innerHeight / 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: isDark 
            ? `radial-gradient(circle at ${50 + mouse.x * 0.02}% ${50 + mouse.y * 0.02}%, #000000 0%, #000000 100%)`
            : `radial-gradient(circle at ${50 + mouse.x * 0.02}% ${50 + mouse.y * 0.02}%, #FFFFFF 0%, #F5F5F5 100%)`
        }}
      />
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={1}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <AnimatedPoints mouse={mouse} />
        <FloatingSpheres mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default InteractiveBackground;

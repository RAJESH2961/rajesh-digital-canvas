
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ErrorFallback = () => (
  <div className="fixed inset-0 bg-background-dark/50" />
);

const ParticleField = ({ count = 5000 }) => {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Use new color palette
      colors[i * 3] = 0.85; // Red component of #D91656
      colors[i * 3 + 1] = 0.09; // Green component
      colors[i * 3 + 2] = 0.34; // Blue component
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#D91656"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const FloatingGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[2, 0, 0]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhongMaterial color="#BE3144" wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

class ThreeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Three.js Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

const CanvasWrapper = () => {
  try {
    return (
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#E17564" />
          <ParticleField count={3000} />
          <FloatingGeometry />
        </Suspense>
      </Canvas>
    );
  } catch (error) {
    console.error('Canvas creation error:', error);
    return <ErrorFallback />;
  }
};

const EnhancedThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-30">
      <ThreeErrorBoundary>
        <CanvasWrapper />
      </ThreeErrorBoundary>
    </div>
  );
};

export default EnhancedThreeBackground;

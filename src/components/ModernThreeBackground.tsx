
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Single shared mouse listener
const useMouse = () => {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return mouse;
};

// Minimal particle field — slow rotation + gentle mouse parallax
const ParticleField = ({ count = 2500 }) => {
  const ref = useRef<THREE.Points>(null);
  const mouse = useMouse();
  const smoothed = useRef({ x: 0, y: 0 });

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      positions[i3]     = Math.cos(theta) * radius + (Math.random() - 0.5) * 1.5;
      positions[i3 + 1] = (Math.random() - 0.5) * 6;
      positions[i3 + 2] = Math.sin(theta) * radius + (Math.random() - 0.5) * 1.5;

      // Center crimson → outer violet
      const mix = radius / 12;
      colors[i3]     = 0.85 - mix * 0.5;
      colors[i3 + 1] = 0.08 + mix * 0.1;
      colors[i3 + 2] = 0.34 + mix * 0.5;
    }
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    smoothed.current.x += (mouse.current.x - smoothed.current.x) * 0.03;
    smoothed.current.y += (mouse.current.y - smoothed.current.y) * 0.03;
    ref.current.rotation.y = t * 0.02 + smoothed.current.x * 0.15;
    ref.current.rotation.x = smoothed.current.y * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
        opacity={0.7}
      />
    </Points>
  );
};

// Subtle camera parallax for depth
const CameraRig = () => {
  const mouse = useMouse();
  const smoothed = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useFrame(() => {
    smoothed.current.x += (mouse.current.x - smoothed.current.x) * 0.02;
    smoothed.current.y += (mouse.current.y - smoothed.current.y) * 0.02;
    camera.position.x = smoothed.current.x * 0.5;
    camera.position.y = smoothed.current.y * 0.4;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const ModernThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 85%, rgba(217,22,86,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 15%, rgba(139,92,246,0.12) 0%, transparent 55%),
            #000005
          `
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 10], fov: 65 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor('#000000', 0)}
      >
        <CameraRig />
        <ParticleField count={2500} />
      </Canvas>
    </div>
  );
};

export default ModernThreeBackground;

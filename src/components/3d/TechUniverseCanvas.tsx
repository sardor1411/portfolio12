import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { detectPerformancePreset } from '../../utils/performance';

const TECH_NODES = [
  { name: 'React', pos: [-3, 1.5, 0], color: '#61DAFB' },
  { name: 'TypeScript', pos: [-1.2, 2.5, 1], color: '#3178C6' },
  { name: 'Node.js', pos: [1.5, 2, -1], color: '#339933' },
  { name: 'Next.js', pos: [3, 0.8, 0.5], color: '#FFFFFF' },
  { name: 'Three.js', pos: [0, 0, 1.5], color: '#C9D3E0' },
  { name: 'GSAP', pos: [-2.5, -1.2, 0.8], color: '#88CE02' },
  { name: 'Cloudflare', pos: [2.2, -1.8, -0.5], color: '#F38020' },
  { name: 'AWS', pos: [0.8, -2.5, 0], color: '#FF9900' },
  { name: 'Prisma', pos: [-1.5, -2.2, -1], color: '#2D3748' },
  { name: 'PostgreSQL', pos: [2.8, 2.2, 0], color: '#4169E1' },
  { name: 'Supabase', pos: [-3.2, 0, -1.2], color: '#3ECF8E' },
];

const NodeItem = React.memo(({
  node,
  onHover,
  isHovered,
}: {
  node: typeof TECH_NODES[0];
  onHover: (name: string | null) => void;
  isHovered: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const safeDelta = Math.min(delta, 0.05);
      meshRef.current.rotation.x += safeDelta * 0.5;
      meshRef.current.rotation.y += safeDelta * 0.6;
    }
  });

  return (
    <group position={node.pos as [number, number, number]}>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(node.name);
          }}
          onPointerOut={() => onHover(null)}
        >
          <octahedronGeometry args={[isHovered ? 0.45 : 0.3, 0]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={isHovered ? 0.8 : 0.2}
            roughness={0.2}
            metalness={0.8}
            wireframe={!isHovered}
          />
        </mesh>
        <Html distanceFactor={10} center>
          <div
            className={`font-mono text-xs px-2.5 py-1 rounded-full backdrop-blur-md transition-all duration-300 pointer-events-none select-none whitespace-nowrap ${
              isHovered
                ? 'bg-white text-black font-semibold border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110'
                : 'bg-white/10 text-[#C9D3E0] border border-white/10'
            }`}
          >
            {node.name}
          </div>
        </Html>
      </Float>
    </group>
  );
});

function Connections() {
  const linesGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < TECH_NODES.length; i++) {
      for (let j = i + 1; j < TECH_NODES.length; j++) {
        const p1 = new THREE.Vector3(...TECH_NODES[i].pos);
        const p2 = new THREE.Vector3(...TECH_NODES[j].pos);
        if (p1.distanceTo(p2) < 4.2) {
          points.push(p1);
          points.push(p2);
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useEffect(() => {
    return () => {
      linesGeometry.dispose();
    };
  }, [linesGeometry]);

  return (
    <lineSegments geometry={linesGeometry}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
    </lineSegments>
  );
}

function RotatingGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const safeDelta = Math.min(delta, 0.05);
      groupRef.current.rotation.y += safeDelta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Connections />
      {TECH_NODES.map((node) => (
        <NodeItem
          key={node.name}
          node={node}
          onHover={setHoveredNode}
          isHovered={hoveredNode === node.name}
        />
      ))}
    </group>
  );
}

export const TechUniverseCanvas: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const perf = useMemo(() => detectPerformancePreset(), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] sm:h-[600px] relative rounded-2xl overflow-hidden border border-white/10 bg-[#050506]"
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={perf.dpr}
          gl={{
            powerPreference: perf.preset === 'LOW' ? 'low-power' : 'high-performance',
            antialias: perf.preset !== 'LOW',
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#C9D3E0" />
          <RotatingGroup />
        </Canvas>
      )}
    </div>
  );
});


import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore } from '../../store/useScrollStore';
import { detectPerformancePreset } from '../../utils/performance';

function LiquidMesh({ perf }: { perf: ReturnType<typeof detectPerformancePreset> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const secondaryMeshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const secondaryMaterialRef = useRef<any>(null);
  const liquidState = useScrollStore((state) => state.liquidState);

  useFrame((_, delta) => {
    // Cap delta to prevent large jumps
    const safeDelta = Math.min(delta, 0.05);

    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, liquidState.x, safeDelta * 3.5);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, liquidState.y, safeDelta * 3.5);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, liquidState.z, safeDelta * 3.5);

      const targetScale = liquidState.scale * 1.6;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, safeDelta * 3.5)
      );

      meshRef.current.rotation.x += safeDelta * 0.2;
      meshRef.current.rotation.y += safeDelta * 0.25;

      if (materialRef.current) {
        materialRef.current.distort = THREE.MathUtils.lerp(
          materialRef.current.distort,
          liquidState.distortion,
          safeDelta * 2.5
        );
        materialRef.current.roughness = THREE.MathUtils.lerp(
          materialRef.current.roughness,
          liquidState.roughness ?? 0.1,
          safeDelta * 3
        );
        materialRef.current.metalness = THREE.MathUtils.lerp(
          materialRef.current.metalness,
          liquidState.metalness ?? 0.85,
          safeDelta * 3
        );
      }
    }

    if (secondaryMeshRef.current && perf.preset !== 'LOW') {
      const secX = liquidState.x - 2.8;
      const secY = liquidState.y + 1.2;
      secondaryMeshRef.current.position.x = THREE.MathUtils.lerp(
        secondaryMeshRef.current.position.x,
        secX,
        safeDelta * 2.5
      );
      secondaryMeshRef.current.position.y = THREE.MathUtils.lerp(
        secondaryMeshRef.current.position.y,
        secY,
        safeDelta * 2.5
      );
      secondaryMeshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(secondaryMeshRef.current.scale.x, liquidState.scale * 1.6 * 0.45, safeDelta * 2.5)
      );
      secondaryMeshRef.current.rotation.x -= safeDelta * 0.2;
      secondaryMeshRef.current.rotation.y += safeDelta * 0.15;
    }
  });

  return (
    <>
      <Float speed={perf.preset === 'LOW' ? 1.0 : 1.8} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={meshRef} position={[2.2, 0.8, 0]}>
          <icosahedronGeometry args={[1.5, perf.blobSubdivisions]} />
          <MeshDistortMaterial
            ref={materialRef}
            color={liquidState.color}
            roughness={0.1}
            metalness={0.85}
            clearcoat={perf.preset === 'HIGH' ? 1 : 0.5}
            clearcoatRoughness={0.08}
            distort={0.45}
            speed={perf.distortSpeed}
          />
        </mesh>
      </Float>

      {perf.preset !== 'LOW' && (
        <Float speed={2.4} rotationIntensity={1.2} floatIntensity={1.2}>
          <mesh ref={secondaryMeshRef} position={[-0.6, 2.0, -1.0]}>
            <icosahedronGeometry args={[1.0, Math.floor(perf.blobSubdivisions * 0.5)]} />
            <MeshDistortMaterial
              ref={secondaryMaterialRef}
              color={liquidState.color}
              roughness={0.2}
              metalness={0.9}
              clearcoat={0.8}
              distort={0.5}
              speed={perf.distortSpeed * 1.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      )}
    </>
  );
}

export const LiquidCanvas: React.FC = React.memo(() => {
  const perf = useMemo(() => detectPerformancePreset(), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={perf.dpr}
        gl={{
          antialias: perf.preset !== 'LOW',
          alpha: true,
          powerPreference: perf.preset === 'LOW' ? 'low-power' : 'high-performance',
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#F2F3F5" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#38BDF8" />
        <spotLight position={[0, 15, 10]} angle={0.4} penumbra={1} intensity={2.2} color="#C9D3E0" />
        <LiquidMesh perf={perf} />
      </Canvas>
    </div>
  );
});

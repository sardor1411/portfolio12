import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { detectPerformancePreset } from '../../utils/performance';

interface Project3DMockupProps {
  title: string;
  category: string;
  metrics?: { label: string; value: string }[];
}

/* ==========================================
 * ULTRABOOK LAPTOP MODEL (MacBook / XPS Style)
 * ========================================== */
function PremiumLaptop({ title, category }: { title: string; category: string }) {
  const laptopGroupRef = useRef<THREE.Group>(null);

  // Subtle slow rotation & mouse responsiveness
  useFrame((state) => {
    if (laptopGroupRef.current) {
      const t = state.clock.getElapsedTime();
      const mouseX = (state.pointer.x * Math.PI) / 12;
      const mouseY = (state.pointer.y * Math.PI) / 18;

      laptopGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        laptopGroupRef.current.rotation.y,
        Math.sin(t * 0.6) * 0.12 + mouseX,
        0.05
      );
      laptopGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        laptopGroupRef.current.rotation.x,
        0.1 + Math.cos(t * 0.4) * 0.05 - mouseY,
        0.05
      );
    }
  });

  // Materials
  const aluminumMaterial = new THREE.MeshStandardMaterial({
    color: '#2a2d34',
    metalness: 0.92,
    roughness: 0.18,
  });

  const keyboardWellMaterial = new THREE.MeshStandardMaterial({
    color: '#121316',
    metalness: 0.8,
    roughness: 0.4,
  });

  const keyCapMaterial = new THREE.MeshStandardMaterial({
    color: '#1a1b1f',
    metalness: 0.2,
    roughness: 0.6,
  });

  const glassTrackpadMaterial = new THREE.MeshStandardMaterial({
    color: '#22252a',
    metalness: 0.85,
    roughness: 0.1,
  });

  const bezelMaterial = new THREE.MeshStandardMaterial({
    color: '#0a0b0d',
    metalness: 0.9,
    roughness: 0.2,
  });

  return (
    <group ref={laptopGroupRef} position={[-0.7, 0.1, 0]}>
      {/* ---------------- SCREEN SECTION ---------------- */}
      <group position={[0, 0.95, -0.35]} rotation={[0.15, 0, 0]}>
        {/* Back Aluminum Shell Lid */}
        <RoundedBox args={[3.4, 2.2, 0.06]} radius={0.06} smoothness={6} position={[0, 0, -0.03]}>
          <primitive object={aluminumMaterial} attach="material" />
        </RoundedBox>

        {/* Glossy Metallic Apple/Logo Notch */}
        <mesh position={[0, 0, -0.065]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial color="#606670" metalness={0.98} roughness={0.05} />
        </mesh>

        {/* Screen Bezel */}
        <RoundedBox args={[3.34, 2.14, 0.02]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
          <primitive object={bezelMaterial} attach="material" />
        </RoundedBox>

        {/* Web Camera Hole */}
        <mesh position={[0, 0.98, 0.012]}>
          <circleGeometry args={[0.012, 16]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Screen Display Panel (Emissive Glow) */}
        <mesh position={[0, 0, 0.011]}>
          <planeGeometry args={[3.2, 2.0]} />
          <meshBasicMaterial color="#0a0c10" />
          <Html transform distanceFactor={2.35} position={[0, 0, 0.001]} portal={undefined}>
            <div className="w-[390px] h-[244px] bg-[#07080B] p-4 flex flex-col justify-between border border-white/15 rounded-lg select-none shadow-[0_0_50px_rgba(0,255,200,0.08)]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="font-mono text-[9px] text-[#85898F] ml-1">system://production</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span className="font-mono text-[8px] text-emerald-400 font-bold uppercase tracking-wider">LIVE 120 FPS</span>
                </div>
              </div>

              {/* Main Display Body */}
              <div className="my-auto space-y-2">
                <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {category}
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                  {title}
                </h3>
                <p className="font-mono text-[10px] text-[#85898F]">
                  Next-Gen Digital Experience Engine • Sub-20ms Reactive State
                </p>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                <div className="bg-white/5 p-1.5 rounded border border-white/10 text-center">
                  <div className="text-[7px] font-mono text-[#85898F]">LATENCY</div>
                  <div className="text-[10px] font-mono font-bold text-emerald-400">14ms avg</div>
                </div>
                <div className="bg-white/5 p-1.5 rounded border border-white/10 text-center">
                  <div className="text-[7px] font-mono text-[#85898F]">RENDER</div>
                  <div className="text-[10px] font-mono font-bold text-cyan-400">WebGL 2.0</div>
                </div>
                <div className="bg-white/5 p-1.5 rounded border border-white/10 text-center">
                  <div className="text-[7px] font-mono text-[#85898F]">STATUS</div>
                  <div className="text-[10px] font-mono font-bold text-white">Verified</div>
                </div>
              </div>
            </div>
          </Html>
        </mesh>

        {/* Screen Glow Soft Light onto Keyboard Base */}
        <pointLight position={[0, -0.2, 0.4]} intensity={1.8} distance={1.8} color="#00e5ff" />
      </group>

      {/* ---------------- LAPTOP BASE DECK ---------------- */}
      <group position={[0, -0.12, 0.75]}>
        {/* Main Base Body */}
        <RoundedBox args={[3.48, 0.1, 2.25]} radius={0.06} smoothness={6} position={[0, 0, 0]}>
          <primitive object={aluminumMaterial} attach="material" />
        </RoundedBox>

        {/* Keyboard Recessed Well */}
        <RoundedBox args={[3.1, 0.02, 1.1]} radius={0.02} smoothness={4} position={[0, 0.045, -0.35]}>
          <primitive object={keyboardWellMaterial} attach="material" />
        </RoundedBox>

        {/* Simplified Keyboard Grid Keys */}
        <group position={[0, 0.06, -0.35]}>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <group key={rowIndex} position={[0, 0, (rowIndex - 2) * 0.2]}>
              {Array.from({ length: 14 }).map((_, colIndex) => (
                <mesh key={colIndex} position={[(colIndex - 6.5) * 0.21, 0, 0]}>
                  <boxGeometry args={[0.18, 0.02, 0.17]} />
                  <primitive object={keyCapMaterial} attach="material" />
                </mesh>
              ))}
            </group>
          ))}
        </group>

        {/* Glass Precision Trackpad */}
        <RoundedBox args={[1.2, 0.01, 0.75]} radius={0.02} smoothness={4} position={[0, 0.052, 0.6]}>
          <primitive object={glassTrackpadMaterial} attach="material" />
        </RoundedBox>

        {/* Hinge Cylinder */}
        <mesh position={[0, 0.05, -1.08]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 3.2, 24]} />
          <meshStandardMaterial color="#1a1b1f" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Rubber Feet Underneath */}
        {[-1.5, 1.5].map((x) =>
          [-0.8, 0.8].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, -0.055, z]}>
              <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
              <meshBasicMaterial color="#08080a" />
            </mesh>
          ))
        )}
      </group>
    </group>
  );
}

/* ==========================================
 * FLAGSHIP PHONE MODEL (iPhone / Pixel Style)
 * ========================================== */
function PremiumPhone() {
  const phoneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (phoneRef.current) {
      const t = state.clock.getElapsedTime();
      const mouseX = (state.pointer.x * Math.PI) / 16;
      const mouseY = (state.pointer.y * Math.PI) / 20;

      phoneRef.current.rotation.y = THREE.MathUtils.lerp(
        phoneRef.current.rotation.y,
        -0.2 - Math.sin(t * 0.8) * 0.18 + mouseX,
        0.05
      );
      phoneRef.current.position.y = THREE.MathUtils.lerp(
        phoneRef.current.position.y,
        0.1 + Math.cos(t * 0.7) * 0.12 - mouseY,
        0.05
      );
      phoneRef.current.rotation.z = Math.sin(t * 0.5) * 0.04;
    }
  });

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: '#3a3e47',
    metalness: 0.98,
    roughness: 0.1,
  });

  const backGlassMaterial = new THREE.MeshStandardMaterial({
    color: '#121418',
    metalness: 0.9,
    roughness: 0.15,
  });

  return (
    <group ref={phoneRef} position={[1.75, 0.1, 1.05]}>
      {/* Outer Metallic Frame Body */}
      <RoundedBox args={[0.92, 1.88, 0.08]} radius={0.12} smoothness={6}>
        <primitive object={frameMaterial} attach="material" />
      </RoundedBox>

      {/* Back Glass */}
      <mesh position={[0, 0, -0.041]}>
        <planeGeometry args={[0.88, 1.84]} />
        <primitive object={backGlassMaterial} attach="material" />
      </mesh>

      {/* Camera Bump Ring */}
      <mesh position={[-0.22, 0.65, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.02, 24]} />
        <meshStandardMaterial color="#22252c" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Front Glass Bezel Screen */}
      <mesh position={[0, 0, 0.041]}>
        <planeGeometry args={[0.86, 1.82]} />
        <meshBasicMaterial color="#050608" />
        <Html transform distanceFactor={2.45} position={[0, 0, 0.001]}>
          <div className="w-[115px] h-[235px] bg-[#07080A] p-2.5 flex flex-col justify-between border border-white/20 rounded-[18px] select-none shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            {/* Dynamic Island / Pill Camera Notch */}
            <div className="w-9 h-2.5 bg-black border border-white/10 rounded-full mx-auto flex items-center justify-center gap-1">
              <span className="w-1 h-1 rounded-full bg-blue-500/80 inline-block" />
            </div>

            {/* Mobile Interface Content */}
            <div className="space-y-2 text-center my-auto">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/30 via-emerald-500/20 to-transparent border border-white/20 mx-auto flex items-center justify-center shadow-inner">
                <span className="font-mono text-[10px] text-white font-bold">OS</span>
              </div>
              <div className="text-[9px] font-mono font-bold text-white tracking-wide">
                MOBILE UX
              </div>
              <div className="text-[7.5px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 inline-block">
                Touch Ready
              </div>
            </div>

            {/* Home Bar Indicator */}
            <div className="w-10 h-1 bg-white/40 rounded-full mx-auto" />
          </div>
        </Html>
      </mesh>

      {/* Phone Screen Soft Light */}
      <pointLight position={[0, 0, 0.3]} intensity={0.8} distance={1.2} color="#ffffff" />
    </group>
  );
}

/* ==========================================
 * SHOWCASE STAGE PLATFORM & LIGHTING
 * ========================================== */
function ShowcaseStage() {
  return (
    <group position={[0, -1.15, 0]}>
      {/* Floating Dark Charcoal Beveled Base Stage */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[3.8, 4.2, 0.2, 64]} />
        <meshStandardMaterial
          color="#0f1115"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Glowing Metallic Rim Outline on Stage Edge */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.78, 3.82, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          roughness={0.1}
        />
      </mesh>

      {/* Contact Shadows under devices for true grounding depth */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.8}
        scale={8}
        blur={2.5}
        far={3}
        color="#000000"
      />
    </group>
  );
}

/* ==========================================
 * MAIN 3D SHOWCASE CANVAS CONTAINER
 * ========================================== */
export const Project3DMockup: React.FC<Project3DMockupProps> = React.memo(({ title, category }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const perf = useMemo(() => detectPerformancePreset(), []);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '250px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[88vw] max-w-sm sm:max-w-none sm:w-full mx-auto h-[290px] xs:h-[330px] sm:h-[420px] md:h-[480px] relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0B0D12] via-[#07080B] to-[#040405] shadow-[0_20px_80px_rgba(0,0,0,0.9)]"
    >
      {/* Subtle Grid Ambient Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top Glass Highlight Rim */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />

      {isVisible && (
        <Canvas
          camera={{ position: [0, 0.5, isMobile ? 6.2 : 5.2], fov: isMobile ? 44 : 42 }}
          dpr={perf.dpr}
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
            outputColorSpace: THREE.SRGBColorSpace,
            antialias: perf.preset !== 'LOW',
            powerPreference: perf.preset === 'LOW' ? 'low-power' : 'high-performance',
          }}
        >
          {/* Studio Lighting System */}
          <ambientLight intensity={0.6} />
          
          {/* Soft Key Light */}
          <directionalLight position={[4, 6, 4]} intensity={2.2} color="#ffffff" castShadow={!isMobile && perf.enableShadows} />
          
          {/* Cool Rim Highlight Light (Metal Edges) */}
          <directionalLight position={[-6, 4, -3]} intensity={2.4} color="#38bdf8" />
          
          {/* Warm Fill Light */}
          <directionalLight position={[0, -3, 3]} intensity={0.6} color="#e0e7ff" />
          
          {/* Focused Spot Light onto Laptop Center */}
          <spotLight
            position={[0, 7, 2]}
            angle={0.6}
            penumbra={0.8}
            intensity={3.0}
            color="#ffffff"
          />

          {/* Floating Devices & Stage */}
          <Float speed={isMobile ? 0.8 : 1.2} rotationIntensity={isMobile ? 0.1 : 0.2} floatIntensity={isMobile ? 0.15 : 0.3}>
            <PremiumLaptop title={title} category={category} />
            <PremiumPhone />
          </Float>

          <ShowcaseStage />
        </Canvas>
      )}

      {/* Subtle Bottom Vignette */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#040405] to-transparent pointer-events-none z-10" />
    </div>
  );
});


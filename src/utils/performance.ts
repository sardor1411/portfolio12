export type PerformancePreset = 'HIGH' | 'MEDIUM' | 'LOW';

export interface PerformanceConfig {
  preset: PerformancePreset;
  dpr: number;
  particleCount: number;
  blobSubdivisions: number;
  enableShadows: boolean;
  distortSpeed: number;
  isReducedMotion: boolean;
  fpsTarget: number;
  enableComplexShaders: boolean;
}

export function detectPerformancePreset(): PerformanceConfig {
  if (typeof window === 'undefined') {
    return {
      preset: 'HIGH',
      dpr: 1.5,
      particleCount: 40,
      blobSubdivisions: 48,
      enableShadows: true,
      distortSpeed: 3.0,
      isReducedMotion: false,
      fpsTarget: 120,
      enableComplexShaders: true,
    };
  }

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as any).deviceMemory || 4;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;

  // WebGL GPU Tier Detection
  let isLowEndGpu = false;
  let isHighEndGpu = false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
        const lowerRenderer = renderer.toLowerCase();
        if (
          lowerRenderer.includes('mali-g31') ||
          lowerRenderer.includes('mali-g51') ||
          lowerRenderer.includes('intel hd') ||
          lowerRenderer.includes('swiftshader') ||
          lowerRenderer.includes('llvmpipe') ||
          lowerRenderer.includes('adreno 3') ||
          lowerRenderer.includes('adreno 505')
        ) {
          isLowEndGpu = true;
        } else if (
          lowerRenderer.includes('nvidia') ||
          lowerRenderer.includes('radeon') ||
          lowerRenderer.includes('apple m') ||
          lowerRenderer.includes('rtx') ||
          lowerRenderer.includes('gtx')
        ) {
          isHighEndGpu = true;
        }
      }
    }
  } catch (e) {
    // fallback
  }

  // Preset scoring
  let preset: PerformancePreset = 'HIGH';

  if (isReducedMotion || isLowEndGpu || hardwareConcurrency <= 2 || deviceMemory <= 2) {
    preset = 'LOW';
  } else if (isMobile || hardwareConcurrency <= 4 || deviceMemory <= 4 || (!isHighEndGpu && window.innerWidth < 1024)) {
    preset = 'MEDIUM';
  } else {
    preset = 'HIGH';
  }

  const baseDpr = Math.min(window.devicePixelRatio || 1, 2);

  switch (preset) {
    case 'LOW':
      return {
        preset: 'LOW',
        dpr: 1.0,
        particleCount: 12,
        blobSubdivisions: 20,
        enableShadows: false,
        distortSpeed: 1.2,
        isReducedMotion,
        fpsTarget: 60,
        enableComplexShaders: false,
      };
    case 'MEDIUM':
      return {
        preset: 'MEDIUM',
        dpr: Math.min(baseDpr, 1.25),
        particleCount: 22,
        blobSubdivisions: 32,
        enableShadows: false,
        distortSpeed: 2.0,
        isReducedMotion,
        fpsTarget: 60,
        enableComplexShaders: true,
      };
    case 'HIGH':
    default:
      return {
        preset: 'HIGH',
        dpr: Math.min(baseDpr, 2.0),
        particleCount: 42,
        blobSubdivisions: 64,
        enableShadows: true,
        distortSpeed: 3.2,
        isReducedMotion,
        fpsTarget: 120,
        enableComplexShaders: true,
      };
  }
}

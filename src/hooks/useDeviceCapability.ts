import { useState, useEffect } from 'react';
import { getGPUTier } from 'detect-gpu';

export type DeviceTier = 'High' | 'Medium' | 'Low';

export interface DeviceCapability {
  tier: DeviceTier;
  hardwareConcurrency: number;
  deviceMemory: number;
  gpuTier: number;
  gpuIsMobile: boolean;
  gpuFps: number | undefined;
  gpuGpu: string | undefined;
  isLoading: boolean;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>(() => {
    const hardwareConcurrency = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
    const deviceMemory = typeof navigator !== 'undefined' ? (navigator as any).deviceMemory || 4 : 4;

    let initialTier: DeviceTier = 'High';
    if (hardwareConcurrency <= 2 || deviceMemory <= 2) {
      initialTier = 'Low';
    } else if (hardwareConcurrency <= 4 || deviceMemory <= 4) {
      initialTier = 'Medium';
    }

    return {
      tier: initialTier,
      hardwareConcurrency,
      deviceMemory,
      gpuTier: initialTier === 'High' ? 3 : initialTier === 'Medium' ? 2 : 1,
      gpuIsMobile: false,
      gpuFps: undefined,
      gpuGpu: undefined,
      isLoading: true,
    };
  });

  useEffect(() => {
    let isMounted = true;

    async function evaluateCapability() {
      const hardwareConcurrency = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
      const deviceMemory = typeof navigator !== 'undefined' ? (navigator as any).deviceMemory || 4 : 4;

      let gpuTierNumber = 2;
      let isMobileGpu = false;
      let fps: number | undefined;
      let gpuName: string | undefined;

      try {
        const gpuResult = await getGPUTier();
        if (gpuResult) {
          gpuTierNumber = gpuResult.tier;
          isMobileGpu = !!gpuResult.isMobile;
          fps = gpuResult.fps;
          gpuName = gpuResult.gpu;
        }
      } catch (err) {
        console.warn('detect-gpu evaluation fallback:', err);
      }

      // Determine overall device classification
      let classifiedTier: DeviceTier = 'High';

      if (
        gpuTierNumber <= 1 ||
        hardwareConcurrency <= 2 ||
        deviceMemory <= 2
      ) {
        classifiedTier = 'Low';
      } else if (
        gpuTierNumber === 2 ||
        hardwareConcurrency <= 4 ||
        deviceMemory <= 4 ||
        isMobileGpu
      ) {
        classifiedTier = 'Medium';
      } else {
        classifiedTier = 'High';
      }

      if (isMounted) {
        setCapability({
          tier: classifiedTier,
          hardwareConcurrency,
          deviceMemory,
          gpuTier: gpuTierNumber,
          gpuIsMobile: isMobileGpu,
          gpuFps: fps,
          gpuGpu: gpuName,
          isLoading: false,
        });
      }
    }

    evaluateCapability();

    return () => {
      isMounted = false;
    };
  }, []);

  return capability;
}

export default useDeviceCapability;

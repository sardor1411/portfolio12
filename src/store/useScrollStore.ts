import { create } from 'zustand';

export interface LiquidState {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  refraction: number;
  distortion: number;
  color: string;
  roughness: number;
  metalness: number;
  transmission: number;
  opacity: number;
}

interface ScrollStore {
  progress: number;
  currentScene: number;
  activeSection: 'work' | 'about' | 'toolkit' | 'contact';
  liquidState: LiquidState;
  setProgress: (progress: number) => void;
  setCurrentScene: (scene: number) => void;
  setActiveSection: (section: 'work' | 'about' | 'toolkit' | 'contact') => void;
  setLiquidState: (state: Partial<LiquidState>) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  progress: 0,
  currentScene: 1,
  activeSection: 'work',
  liquidState: {
    x: 2.2,
    y: 0.8,
    z: 0,
    scale: 1.1,
    rotationX: 0,
    rotationY: 0,
    rotationZ: -0.2,
    refraction: 1.2,
    distortion: 0.45,
    color: '#C9D3E0',
    roughness: 0.1,
    metalness: 0.85,
    transmission: 0.3,
    opacity: 0.95,
  },
  setProgress: (progress) => set({ progress }),
  setCurrentScene: (currentScene) => set({ currentScene }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setLiquidState: (newState) =>
    set((store) => ({
      liquidState: { ...store.liquidState, ...newState },
    })),
}));

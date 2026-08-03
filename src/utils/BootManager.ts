export interface BootProgress {
  percentage: number;
  status: string;
  isComplete: boolean;
}

type ProgressCallback = (progress: BootProgress) => void;

class BootManager {
  private progress: number = 0;
  private status: string = 'Initializing system...';
  private callbacks: Set<ProgressCallback> = new Set();
  private isComplete: boolean = false;

  public subscribe(callback: ProgressCallback): () => void {
    this.callbacks.add(callback);
    callback({
      percentage: Math.round(this.progress),
      status: this.status,
      isComplete: this.isComplete,
    });
    return () => this.callbacks.delete(callback);
  }

  private notify() {
    const payload = {
      percentage: Math.round(this.progress),
      status: this.status,
      isComplete: this.isComplete,
    };
    this.callbacks.forEach((cb) => cb(payload));
  }

  public setProgress(pct: number, statusMessage: string) {
    this.progress = Math.min(100, Math.max(this.progress, pct));
    this.status = statusMessage;
    if (this.progress >= 100) {
      this.isComplete = true;
    }
    this.notify();
  }

  public async startBootSequence(): Promise<void> {
    if (typeof window === 'undefined') {
      this.setProgress(100, 'Ready.');
      return;
    }

    // Step 1: Load fonts and critical DOM resources (25%)
    this.setProgress(15, 'Loading critical assets...');
    try {
      if (document.fonts) {
        await document.fonts.ready;
      }
    } catch {
      // Fallback
    }
    this.setProgress(35, 'Compiling WebGL shaders...');

    // Step 2: WebGL Warmup (65%)
    await new Promise((res) => setTimeout(res, 200));
    this.setProgress(60, 'Warming up 3D engine...');

    // Step 3: Graphics Optimization & Pre-fetch (85%)
    await new Promise((res) => setTimeout(res, 250));
    this.setProgress(88, 'Optimizing graphics...');

    // Step 4: System Ready (100%)
    await new Promise((res) => setTimeout(res, 200));
    this.setProgress(100, 'Ready.');
  }
}

export const bootManager = new BootManager();

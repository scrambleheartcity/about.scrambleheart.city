import { useCallback, useEffect, useState } from 'react';

class GpuTracker {
  // ensure that textures are not GCed
  readonly textures: GPUTexture[] = [];
  constructor(readonly device: GPUDevice) {
    device.lost.then(info => {
      console.error('GPU Device lost', info);
    });
    device.onuncapturederror = error => {
      console.error(`GPU Uncaptured error`, error);
    };
  }

  addTexture(): GPUTexture {
    const texture = this.device.createTexture({
      size: [4096, 4096],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
    });
    this.textures.push(texture);
    return texture;
  }

  static async fromNavigator() {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      throw new Error('WebGPU not supported');
    }
    const device = await adapter.requestDevice();
    return new GpuTracker(device);
  }
}

export function useGpuTest() {
  const [tracker, setTracker] = useState<GpuTracker>();
  const [textures, setTextures] = useState<GPUTexture[]>([]);

  useEffect(() => {
    GpuTracker.fromNavigator().then(t => setTracker(t));
  }, [setTracker]);

  const addTexture = useCallback(() => {
    if (!tracker) return;
    tracker.addTexture();
    setTextures([...tracker.textures]);
  }, [tracker]);

  return {
    textures,
    addTexture,
    loaded: !!tracker,
  };
}

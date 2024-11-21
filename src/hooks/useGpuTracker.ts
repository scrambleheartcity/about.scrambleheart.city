import { GpuTracker } from '@/lib/GpuTracker';
import { useCallback, useEffect, useState } from 'react';

export function useGpuTracker() {
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

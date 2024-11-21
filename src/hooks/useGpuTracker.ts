import { GpuTracker } from '@/lib/GpuTracker';
import { useEffect, useState } from 'react';

export function useGpuTracker() {
  const [tracker, setTracker] = useState<GpuTracker>();
  useEffect(() => {
    GpuTracker.fromNavigator().then(t => setTracker(t));
  }, [setTracker]);
  return tracker;
}

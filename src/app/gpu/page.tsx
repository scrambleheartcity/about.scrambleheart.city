'use client';

import { useGpuTracker } from '@/hooks/useGpuTracker';
import { useCallback, useState } from 'react';

function prettyPrintBytes(bytes: number): string {
  let current = bytes;
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  while (current > 1024) {
    current = current / 1014;
    units.shift();
  }
  return `${current.toFixed(1)} ${units[0]}`;
}

export default function GpuTest() {
  const tracker = useGpuTracker();
  const [_, setBit] = useState(false);

  const addTexture = useCallback(() => {
    tracker?.addTexture();
    setBit(b => !b);
  }, [tracker, setBit]);

  return (
    <main
      style={{
        textAlign: 'center',
        margin: '2em',
      }}
    >
      <h1>GPU Test</h1>
      {tracker ? (
        <>
          <button onClick={addTexture}>Add Texture</button>
          <div>
            Allocated memory: {prettyPrintBytes(tracker.getMemoryUsage())}
          </div>
        </>
      ) : (
        <div>loading...</div>
      )}
    </main>
  );
}

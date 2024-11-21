'use client';

import { useGpuTracker } from '@/hooks/useGpuTracker';
import { useTimer } from '@/hooks/useInterval';
import { useCallback, useState } from 'react';

function prettyPrintBytes(bytes: number): string {
  let current = bytes;
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const decimalPoints = [0, 0, 0, 2, 3];
  while (current > 1024) {
    current = current / 1024;
    units.shift();
    decimalPoints.shift();
  }
  return `${current.toFixed(decimalPoints[0])} ${units[0]}`;
}

export default function GpuTest() {
  const tracker = useGpuTracker();
  const timer = useTimer();
  const [_, setBit] = useState(false);

  const addTexture = useCallback(() => {
    tracker?.addTexture();
    setBit(b => !b);
  }, [tracker, setBit]);

  const startAuto = useCallback(() => {
    timer.startInterval(addTexture, 100);
    setBit(b => !b);
  }, [timer, setBit]);

  const stopAuto = useCallback(() => {
    timer.clear();
    setBit(b => !b);
  }, [timer, setBit]);

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
          {timer.timeoutRef.current ? (
            <p>
              <button onClick={stopAuto}>Stop Auto</button>
            </p>
          ) : (
            <p>
              <button onClick={startAuto}>Start Auto</button>
              <br />
              <button onClick={addTexture}>Add Texture</button>
            </p>
          )}
          <p>Allocated memory: {prettyPrintBytes(tracker.getMemoryUsage())}</p>
        </>
      ) : (
        <div>loading...</div>
      )}
    </main>
  );
}

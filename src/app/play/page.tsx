'use client';

import { detectWebGPU } from '@/components/util';
import { WebGpuError } from '@/components/webgpu';
import { useEffect, useState } from 'react';
import styles from './play.module.css';

const target =
  'https://play.void.dev/mpaulweeks/scramble-heart-city/preview/playtest/';

export default function Playtest() {
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const webgpu = await detectWebGPU();
      if (webgpu) {
        const search = window.location.search;
        window.location.href = target + search;
      } else {
        setError(true);
      }
    })();
  }, []);

  return (
    <main className={styles.page}>
      {error ? <WebGpuError /> : <h1>checking for WebGPU...</h1>}
    </main>
  );
}

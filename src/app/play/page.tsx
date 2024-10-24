'use client';

import { detectWebGPU } from '@/components/util';
import { WebGpuError } from '@/components/webgpu';
import { useEffect, useState } from 'react';
import styles from './play.module.css';

const performRedirect = false;
const target =
  'https://play.void.dev/mpaulweeks/scramble-heart-city/preview/playtest/';

enum WebGPU {
  Checking = 1,
  Detected,
  Missing,
}

export default function Playtest() {
  const [webgpu, setWebGPU] = useState(WebGPU.Checking);
  const [userAgent, setUserAgent] = useState<string>();

  useEffect(() => {
    (async () => {
      const webgpu = await detectWebGPU();
      if (webgpu) {
        setWebGPU(WebGPU.Detected);
        if (performRedirect) {
          const search = window.location.search;
          window.location.href = target + search;
        }
      } else {
        setWebGPU(WebGPU.Missing);
      }
      setUserAgent(navigator.userAgent);
    })();
  }, []);

  return (
    <main className={styles.page}>
      <div>
        {
          {
            [WebGPU.Checking]: <h1>checking for WebGPU...</h1>,
            [WebGPU.Detected]: (
              <h1>
                WebGPU detected!
                <br />
                you're all set for the playtest
              </h1>
            ),
            [WebGPU.Missing]: <WebGpuError />,
          }[webgpu]
        }
        {userAgent ? (
          <div className={styles.userAgent}>
            <h1>debug info</h1>
            <div>{userAgent}</div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

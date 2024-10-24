'use client';

import { useEffect, useState } from 'react';
import { detectWebGPU } from './util';
import styles from './webgpu.module.css';

enum WebGPU {
  Checking = 1,
  Detected,
  Missing,
}

export function WebGpuError(props: {
  showWorkarounds?: boolean;
  onSuccess(): void;
}) {
  const [webgpu, setWebGPU] = useState(WebGPU.Checking);
  const [userAgent, setUserAgent] = useState<string>();

  useEffect(() => {
    (async () => {
      const webgpu = await detectWebGPU();
      if (webgpu) {
        setWebGPU(WebGPU.Detected);
        props.onSuccess?.();
      } else {
        setWebGPU(WebGPU.Missing);
      }
      setUserAgent(navigator.userAgent);
    })();
  }, [props.onSuccess]);

  const StatusRender = {
    [WebGPU.Checking]: () => <h1>checking for WebGPU...</h1>,
    [WebGPU.Detected]: () => (
      <h1>
        WebGPU detected!
        <br />
        you're all set for the playtest
      </h1>
    ),
    [WebGPU.Missing]: () => (
      <>
        <h1>WebGPU not found!</h1>
        <div>
          this alpha build requires WebGPU to run.
          <br />
          please use the latest version of either <u>Google Chrome</u> or{' '}
          <u>Microsoft Edge</u>.
        </div>
        {props.showWorkarounds ? (
          <>
            <h1>possible workarounds:</h1>
            <p>
              <h3>
                <u>Safari</u>
              </h3>
              <div>
                open <code>Develop &gt; Feature Flags</code> and check{' '}
                <code>WebGPU</code>
              </div>
            </p>
            <p>
              <h3>
                <u>Firefox</u>
              </h3>
              <div>
                goto <code>about:config</code> and set{' '}
                <code>dom.webgpu.enabled</code> to <code>true</code>
              </div>
            </p>
          </>
        ) : null}
      </>
    ),
  }[webgpu];

  return (
    <div className={styles.webgpu}>
      <div>
        <StatusRender />
        {userAgent ? (
          <div className={styles.userAgent}>
            <h1>debug info</h1>
            <div>{userAgent}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { ExternalLink } from './externalLink';
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

  useEffect(() => {
    (async () => {
      const webgpu = await detectWebGPU();
      if (webgpu) {
        setWebGPU(WebGPU.Detected);
        props.onSuccess?.();
      } else {
        setWebGPU(WebGPU.Missing);
      }
    })();
  }, [props]);

  const StatusRender = {
    [WebGPU.Checking]: () => <h1>checking for WebGPU...</h1>,
    [WebGPU.Detected]: () => (
      <>
        <h1>WebGPU detected ✅</h1>
        <div>You are all set for the playtest!</div>
      </>
    ),
    [WebGPU.Missing]: () => (
      <>
        <h1>WebGPU not found ⚠️</h1>
        <div>
          This pre-alpha build requires WebGPU to run, which is not yet
          supported by all web browsers. Please use the latest version of either{' '}
          <b>Google Chrome</b> or <b>Microsoft Edge</b>. If you are using
          Chrome, make sure{' '}
          <ExternalLink href="https://support.google.com/chrome/thread/274266347?hl=en&msgid=274267394">{`"Graphics Acceleration"`}</ExternalLink>{' '}
          is enabled. If you are on Linux, try <b>Firefox Nightly</b>.
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
      <StatusRender />
    </div>
  );
}

import styles from './webgpu.module.css';

export function WebGpuError(props: { showWorkarounds?: boolean }) {
  return (
    <div className={styles.webgpu}>
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
    </div>
  );
}

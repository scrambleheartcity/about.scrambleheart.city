'use client';

import { WebGpuError } from '@/components/webgpu';
import styles from './play.module.css';

const performRedirect = false;
const target =
  'https://play.void.dev/mpaulweeks/scramble-heart-city/preview/playtest/';
function redirect() {
  if (!performRedirect) return;
  const search = window.location.search;
  window.location.href = target + search;
}

export default function Playtest() {
  return (
    <main className={styles.page}>
      <a href="/">
        <img
          src="/assets/scramble_logo.png"
          className={styles.logo}
          alt="Scramble Heart City logo"
        />
      </a>
      <WebGpuError showWorkarounds={false} onSuccess={redirect} />
    </main>
  );
}

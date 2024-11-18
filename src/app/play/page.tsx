'use client';

import { WebGpuError } from '@/components/webgpu';
import styles from './play.module.css';

const performRedirect = false;
const target = '';
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
      <section style={{ maxWidth: '800px' }}>
        Welcome, and thank you for participating in the first ever Scramble
        Heart City online playtest!
        <br />
        <br />
        The playtest will run from Friday November 29 to Sunday December 1.
        During that period, this page will redirect you to a place where you can
        play the game.
        <br />
        <br />
        You will need to enter a password, which you can find on our Discord or
        by joining our mailing list. Click the logo above to return to our home
        page for links to both.
        <br />
        <br />
        This is a very early build, and we expect there to be issues. Some
        machines might not be able to run the game at all. Thank you for your
        patience and understanding.
        <WebGpuError showWorkarounds={false} onSuccess={redirect} />
      </section>
    </main>
  );
}

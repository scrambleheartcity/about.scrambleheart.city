'use client';

import { Background } from '@/components/background';
import { WebGpuError } from '@/components/webgpu';
import { useUserAgent } from '@/hooks/useUserAgent';
import styles from './play.module.css';

const performRedirect = false;
const target = '';
function redirect() {
  if (!performRedirect) return;
  const search = window.location.search;
  window.location.href = target + search;
}

export default function Playtest() {
  const userAgent = useUserAgent();
  return (
    <main>
      <Background>
        <div className={styles.page}>
          <aside className={styles.column}>
            <section style={{ textAlign: 'center' }}>
              <a href="/">
                <img
                  src="/assets/scramble_logo.png"
                  className={styles.logo}
                  alt="Scramble Heart City logo"
                />
              </a>
            </section>

            <section>
              Welcome, and thank you for participating in the first ever
              Scramble Heart City online playtest!
              <br />
              <br />
              The playtest will run from Friday November 29 to Sunday December
              1. During that period, this page will have a button below that
              takes you to the game.
              <br />
              <br />
              This is a very early build, and we expect there to be issues. Some
              machines might not be able to run the game at all. Thank you for
              your patience and understanding.
            </section>

            <section>
              <WebGpuError showWorkarounds={false} onSuccess={redirect} />
            </section>

            <section>
              <h1>Debug Info</h1>
              <div>{userAgent}</div>
            </section>
          </aside>
        </div>
      </Background>
    </main>
  );
}

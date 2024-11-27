'use client';

import { Background } from '@/components/background';
import { ExternalLink } from '@/components/externalLink';
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
      <Background image="promo">
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
              <h1>FAQ</h1>
              <p>
                <b>Am I allowed to stream/record footage?</b>
                <br />
                Yes! We want to encourage people to share the game and record
                their experiences. There will be a channel on our official
                Discord where you can post any videos/links you have.
              </p>
              <p>
                <b>Can I share this with my friends?</b>
                <br />
                Yes! Feel free to share the URL + password all weekend.
              </p>
              <p>
                <b>The game doesn't have any tutorials yet. How do I play?</b>
                <br />
                There is a "How to Play" button within the game's main menu that
                shows you the keyboard controls. If you would like to refer to
                the "How to Play" handout from our offline appearances, you can
                read it{' '}
                <ExternalLink href="/assets/how_to_play.pdf">here</ExternalLink>
                .
              </p>
              <p>
                <b>How can I support the game?</b>
                <br />
                For now, just sharing the game with your friends and giving us
                feedback is more than enough!
              </p>
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

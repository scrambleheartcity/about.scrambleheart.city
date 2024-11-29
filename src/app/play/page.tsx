'use client';

import { Background } from '@/components/background';
import { ExternalLink } from '@/components/externalLink';
import { WebGpuError } from '@/components/webgpu';
import { useUserAgent } from '@/hooks/useUserAgent';
import { useEffect, useState } from 'react';
import { DiscordUrl } from '../data';
import styles from './play.module.css';

const redirectEnabled = false;
function performRedirect() {
  localStorage.setItem('played', '1');
  const target =
    'https://play.void.dev/mpaulweeks/scramble-heart-city/preview/playtest/';
  const search = window.location.search;
  window.location.href = target + search;
}

export default function Playtest() {
  const userAgent = useUserAgent();
  const [webgpu, setWebgpu] = useState(false);

  useEffect(() => {
    const autoRedirect =
      redirectEnabled &&
      localStorage.getItem('played') &&
      window.location.search.length > 1;
    if (autoRedirect) {
      performRedirect();
    }
  }, []);

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
              Thank you for participating in the first ever Scramble Heart City
              online playtest!
              <br />
              <br />
              The playtest will run from Friday November 29 to Sunday December
              1. You can find the <b>password</b> and other info in our{' '}
              <ExternalLink href={DiscordUrl}>
                official Discord server
              </ExternalLink>
              .
              <br />
              <br />
              This is a very early build, and we expect there to be issues. Some
              machines might not be able to run the game at all. Thank you for
              your patience and understanding.
            </section>

            <section>
              <WebGpuError
                showWorkarounds={false}
                onSuccess={() => setWebgpu(true)}
              />
            </section>

            {redirectEnabled && webgpu ? (
              <section className={styles.button}>
                <button onClick={performRedirect}>PLAY NOW</button>
              </section>
            ) : null}

            <section>
              <h1>FAQ</h1>
              <p>
                <b>{`> Am I allowed to stream/record footage?`}</b>
                <br />
                Yes! We want to encourage people to share the game and record
                their experiences. There will be a channel on our official
                Discord where you can post any videos/links you have.
              </p>
              <p>
                <b>{`> Can I share this with my friends?`}</b>
                <br />
                Yes! Feel free to share the URL + password all weekend.
              </p>
              <p>
                <b>{`> Can I play this on my phone?`}</b>
                <br />
                We are currently only targeting desktop web, but you are welcome
                to try.
              </p>
              <p>
                <b>
                  {`> The game doesn't have any tutorials yet. How do I play?`}
                </b>
                <br />
                There is a <b>How to Play</b> button within the game&apos;s main
                menu that shows you the keyboard controls. If you would like to
                refer to the informational handout from our offline appearances,
                you can read it{' '}
                <ExternalLink href="/assets/how_to_play.pdf">here</ExternalLink>
                .
              </p>
              <p>
                <b>&gt; How can I support the game?</b>
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

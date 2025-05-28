'use client';

import { Background } from '@/components/background';
import { ExternalLink } from '@/components/externalLink';
import { WebGpuError } from '@/components/webgpu';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useUserAgent } from '@/hooks/useUserAgent';
import { PropsWithChildren, useEffect, useState } from 'react';
import { DiscordUrl, PlaytestIsActive } from '../data';
import styles from './play.module.css';

const autoRedirectEnabled = false;
const storageKey = 'played-v2025-05-28';
function performRedirect() {
  localStorage.setItem(storageKey, '1');
  const target =
    'https://play.void.dev/mpaulweeks/scramble-heart-city/serve/playtest/';
  const search = window.location.search;
  window.location.href = target + search;
}

function PlaytestInfoActive(props: PropsWithChildren) {
  return (
    <>
      <section>
        Thank you for participating in the Scramble Heart City online playtest!
        <br />
        This playtest will run Friday June 6 to Sunday June 8.
        <br />
        <br />
        <b>
          You must join the{' '}
          <ExternalLink href={DiscordUrl}>official Discord server</ExternalLink>{' '}
          to get the password.
        </b>
        <br />
        <br />
        This is a very early build, and we expect there to be issues. Some
        machines might not be able to run the game at all. Thank you for your
        patience and understanding.
      </section>

      {props.children}

      <section>
        <h1>FAQ</h1>
        <p>
          <b>{`> My game keeps crashing with a white screen! How do I fix it?`}</b>
          <br />
          Unfortunately this is a known issue with the experimental engine
          we&apos;re using and won&apos;t be fixed for another few months. All
          you can do in the meantime is close other applications to reduce the
          stress on your machine and try refreshing.
        </p>
        <p>
          <b>{`> Am I allowed to stream/record footage?`}</b>
          <br />
          Yes! We want to encourage people to share the game and record their
          experiences. There will be a channel on our official Discord where you
          can post any videos/links you have.
        </p>
        <p>
          <b>{`> Can I share this with my friends?`}</b>
          <br />
          Yes! Just invite them to the Discord server so they can get the
          password and hear about updates.
        </p>
        <p>
          <b>{`> The game doesn't have any tutorials yet. How do I play?`}</b>
          <br />
          There is a <b>How to Play</b> button within the game&apos;s main menu
          that shows you the keyboard controls. If you would like to refer to
          the informational handout from our offline appearances, you can read
          it <ExternalLink href="/assets/how_to_play.pdf">here</ExternalLink>.
        </p>
        <p>
          <b>{`> Can I change the controls?`}</b>
          <br />
          You cannot change the keyboard controls, but if you go into "Options"
          and then "Button Mapping", you should be able to remap most
          controllers. If your controller does not work, please report it in the
          #playtest-bugs channel.
        </p>
        <p>
          <b>{`> Can I play this on my phone?`}</b>
          <br />
          We are currently only targeting desktop web, but you are welcome to
          try.
        </p>
        <p>
          <b>&gt; How can I support the game?</b>
          <br />
          For now, just sharing the game with your friends and giving us
          feedback is more than enough!
        </p>
      </section>
    </>
  );
}

function PlaytestInfoInactive(props: PropsWithChildren) {
  return (
    <>
      <section>
        Join the{' '}
        <ExternalLink href={DiscordUrl}>official Discord server</ExternalLink>{' '}
        to be alerted when the next playtest happens.
      </section>

      {props.children}
    </>
  );
}

export function PlaytestComp() {
  const userAgent = useUserAgent();
  const [webgpu, setWebgpu] = useState(false);
  const errorMessage = useQueryParam('error');

  useEffect(() => {
    const autoRedirect =
      autoRedirectEnabled &&
      localStorage.getItem(storageKey) &&
      (window.location.search.includes('pm=') ||
        window.location.search.includes('replay='));
    if (autoRedirect) {
      performRedirect();
    }
  }, []);

  if (errorMessage) {
    const errorSnippet = `
error v1
timestamp: ${new Date().toISOString()}
errorText: ${errorMessage}
useragent: ${userAgent}
    `.trim();
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
                <h1>{`Oh no! An error occurred :(`}</h1>
                Please copy/paste the following into #playtest-bugs:
              </section>

              <section>
                <div className={styles.error}>
                  {errorSnippet.split('\n').map((line, li) => (
                    <div key={li}>{line}</div>
                  ))}
                </div>
              </section>

              <section>
                You can <a href="?">click here</a> to go back to the game.
              </section>
            </aside>
          </div>
        </Background>
      </main>
    );
  }

  const InfoComp = PlaytestIsActive ? PlaytestInfoActive : PlaytestInfoInactive;

  return (
    <main>
      <Background image="promo" fixed={true}>
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

            <InfoComp>
              <section>
                <WebGpuError
                  showWorkarounds={false}
                  onSuccess={() => setWebgpu(true)}
                />
              </section>
              {PlaytestIsActive && webgpu ? (
                <section className={styles.button}>
                  <button onClick={performRedirect}>PLAY NOW</button>
                </section>
              ) : null}
            </InfoComp>

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

'use client';

import { ExternalLink } from '@/components/externalLink';
import { VertPage } from '@/components/vertPage';
import { WebGpuError } from '@/components/webgpu';
import { usePlaytestStatus } from '@/hooks/usePlaytestStatus';
import { useClientValue } from '@/hooks/useValue';
import { PropsWithChildren, useEffect, useState } from 'react';
import { DiscordUrl, PlaytestUrl, SteamUrl } from '../data';
import styles from './play.module.css';

const storageKey = 'played-v2025-08-15';
function performRedirect() {
  localStorage.setItem(storageKey, '1');
  const target = PlaytestUrl;
  const search = window.location.search;
  window.location.href = target + search;
}

function PlaytestInfoActive(props: PropsWithChildren) {
  return (
    <>
      <section>
        Thank you for participating in the Scramble Heart City online playtest!
        <br />
        This playtest will run Friday October 17 to Sunday October 19.
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
          This build does not support remapping keyboard controls, but if you go
          into &quot;Options&quot; and then &quot;Button Mapping&quot;, you
          should be able to remap most controllers. If your controller does not
          work, please report it in the <b>#playtest-bugs</b> channel.
        </p>
        <p>
          <b>{`> Can I play this on my phone?`}</b>
          <br />
          We are currently only targeting desktop web, but you are welcome to
          try.
        </p>
        <p>
          <b>{`> How can I support the game?`}</b>
          <br />
          Wishlist us on{' '}
          <a target="_blank" href={SteamUrl}>
            Steam
          </a>
          !
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
  const userAgent = useClientValue('loading...', navigator.userAgent);
  const [webgpu, setWebgpu] = useState(false);
  const playtestActive = usePlaytestStatus();

  useEffect(() => {
    const autoRedirect =
      playtestActive &&
      localStorage.getItem(storageKey) &&
      (window.location.search.includes('pm=') ||
        window.location.search.includes('replay='));
    if (autoRedirect) {
      performRedirect();
    }
  }, [playtestActive]);

  const InfoComp = playtestActive ? PlaytestInfoActive : PlaytestInfoInactive;

  return (
    <VertPage>
      <InfoComp>
        <section>
          <WebGpuError
            showWorkarounds={false}
            onSuccess={() => setWebgpu(true)}
          />
        </section>
        {playtestActive && webgpu ? (
          <section className={styles.button}>
            <button onClick={performRedirect}>PLAY NOW</button>
          </section>
        ) : null}
      </InfoComp>

      <section>
        <h1>Debug Info</h1>
        <div>{userAgent}</div>
      </section>
    </VertPage>
  );
}

'use client';

import { ExternalLink } from '@/components/externalLink';
import { VertPage } from '@/components/vertPage';
import { WebGpuError } from '@/components/webgpu';
import { usePlaytestStatus } from '@/hooks/usePlaytestStatus';
import { useClientValue } from '@/hooks/useValue';
import { useEffect, useState } from 'react';
import { DiscordUrl, PlaytestUrl, SteamUrl } from '../data';
import styles from './play.module.css';

const storageKey = 'played-v2025-08-15';
function performRedirect() {
  localStorage.setItem(storageKey, '1');
  const target = PlaytestUrl;
  const search = window.location.search;
  window.location.href = target + search;
}

function PlaytestDates() {
  return <b>Friday October 16 to Sunday October 18</b>;
}

function PlaytestInfoActive() {
  return (
    <>
      Thank you for participating in the Scramble Heart City online playtest!
      <br />
      This playtest will run <PlaytestDates />.
      <br />
      <br />
      <b>
        Please join the{' '}
        <ExternalLink href={DiscordUrl}>official Discord server</ExternalLink>{' '}
        for the latest info.
      </b>
      <br />
      <br />
      This is a very early build, and we expect there to be issues. Some
      machines might not be able to run the game at all. Thank you for your
      patience and understanding.
    </>
  );
}

function PlaytestInfoInactive() {
  return (
    <>
      The next playtest is scheduled to run <PlaytestDates />. Please join the{' '}
      <ExternalLink href={DiscordUrl}>official Discord server</ExternalLink> for
      the latest info.
    </>
  );
}

function FAQ() {
  return (
    <>
      <p>
        <b>{`> How can I support the game?`}</b>
        <br />
        Wishlist us on <ExternalLink href={SteamUrl}>Steam</ExternalLink> and
        tell your friends!
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
        Yes! You can share the URL or point them to the playtest on our{' '}
        <ExternalLink href={SteamUrl}>Steam page</ExternalLink>.
      </p>
      <p>
        <b>{`> The game doesn't have any tutorials yet. How do I play?`}</b>
        <br />
        There is a <b>How to Play</b> button within the game&apos;s main menu
        that shows you the keyboard controls. If you would like to refer to the
        informational handout from our offline appearances, you can read it{' '}
        <ExternalLink href="/assets/how_to_play.pdf">here</ExternalLink>.
      </p>
      <p>
        <b>{`> Can I play this on my phone?`}</b>
        <br />
        We are currently only targeting desktop web, but you are welcome to try!
      </p>
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
      <section>
        <h1 style={{ textAlign: 'center' }}>
          Scramble Heart City
          <br />
          Playtest Info
        </h1>
        <InfoComp />
      </section>

      {playtestActive && webgpu ? (
        <section className={styles.button}>
          <button onClick={performRedirect}>CLICK TO PLAY NOW</button>
        </section>
      ) : null}

      <section>
        <WebGpuError
          showWorkarounds={false}
          onSuccess={() => setWebgpu(true)}
        />
      </section>

      <section>
        <h1>FAQ</h1>
        <FAQ />
      </section>

      <section>
        <h1>Debug Info</h1>
        <div>{userAgent}</div>
      </section>
    </VertPage>
  );
}

'use client';

import { VertPage } from '@/components/vertPage';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useUserAgent } from '@/hooks/useUserAgent';
import { PlaytestUrl } from '../data';
import styles from '../play/play.module.css';

export default function ErrorPage() {
  const userAgent = useUserAgent();
  const passThru = useQueryParam('passThrough');
  const errorMessage = useQueryParam('message') ?? '';
  const errorSnippet = `
error v1
timestamp: ${new Date().toISOString()}
errorText: ${errorMessage || '(none)'}
useragent: ${userAgent}
  `.trim();

  return (
    <VertPage>
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
        <pre>{errorMessage}</pre>
        {passThru && <a href={`${PlaytestUrl}/?${passThru}`}>back to game</a>}
      </section>
    </VertPage>
  );
}

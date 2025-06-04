'use client';

import { VertPage } from '@/components/vertPage';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useUserAgent } from '@/hooks/useUserAgent';
import { PlaytestUrl } from '../data';
import styles from '../play/play.module.css';

export default function ErrorPage() {
  const userAgent = useUserAgent();
  const passThru = useQueryParam('passThrough');
  const errorText = useQueryParam('error') ?? '';
  const messageToPlayer = useQueryParam('message') ?? '';
  const errorSnippet = `
## error: ${errorText}
${new Date().toISOString()}
\`\`\`
${userAgent}
\`\`\`
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
        <p>{messageToPlayer}</p>
        {passThru && <a href={`${PlaytestUrl}/?${passThru}`}>back to game</a>}
      </section>
    </VertPage>
  );
}

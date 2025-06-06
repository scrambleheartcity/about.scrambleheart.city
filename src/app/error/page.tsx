'use client';

import { VertPage } from '@/components/vertPage';
import { usePlaytestStatus } from '@/hooks/usePlaytestStatus';
import { useQueryParam } from '@/hooks/useQueryParam';
import { PlaytestUrl } from '../data';
import styles from '../play/play.module.css';

export default function ErrorPage() {
  const playtestActive = usePlaytestStatus();
  const passThru = useQueryParam('passThrough');
  const errorHead = useQueryParam('head') ?? '';
  const errorBody = useQueryParam('body') ?? '';
  const messageToPlayer = useQueryParam('message') ?? '';
  const errorSnippet = `

## [error] ${errorHead}

\`\`\`
${errorBody}
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
        {playtestActive && (
          <>
            {passThru && (
              <p>
                <a href={`${PlaytestUrl}/?${passThru}`}>
                  Restart the game with new settings
                </a>
              </p>
            )}
            <p>
              <a href={`${PlaytestUrl}`}>Restart the game</a>
            </p>
          </>
        )}
      </section>
    </VertPage>
  );
}

'use client';

import { VertPage } from '@/components/vertPage';
import { useQueryParam } from '@/hooks/useQueryParam';
import { PlaytestUrl } from '../data';
import styles from '../play/play.module.css';

export default function ErrorPage() {
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
        {passThru && <a href={`${PlaytestUrl}/?${passThru}`}>back to game</a>}
      </section>
    </VertPage>
  );
}
